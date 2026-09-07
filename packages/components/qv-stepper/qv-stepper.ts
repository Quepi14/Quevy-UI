/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-stepper
 * ----------------------------------------------------------
 * Composite widget (decrement button, editable input, increment
 * button) — unlike qv-button/qv-card, the HOST is not itself
 * the interactive element (Pola 1 doesn't apply here); the real
 * interactive elements are native <button>/<input> inside the
 * shadow root, each with their own focus/keyboard handling for
 * free from the browser.
 *
 * canIncrement/canDecrement are plain getters, not
 * @quevy/state Computed — see surrounding discussion for why.
 *
 * @packageDocumentation
 */

import { html, type PropertyValues } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import { QvElement, createComponentMetadata, createTagName, DisabledMixin, FormAssociatedMixin, removeStyles, type MixinConstructor, type DisabledInterface, type FormAssociatedInterface } from '@quevy/core';
import { qvStepperStyles } from './qv-stepper.styles.js';
import { createControllableValue } from '@quevy/state';
import { LocalizedMixin, type LocalizedElement } from '../_internal/i18n/localized-mixin.js';
import type { QvStepperChangeEventDetail, QvStepperShape, QvStepperVariant, QvStepperSize } from './qv-stepper.types.js';
import { COMMON_MESSAGES } from '../i18n/common-messages.js';

abstract class QvStepperBase extends FormAssociatedMixin(DisabledMixin(LocalizedMixin(QvElement))) {}

/**
 * @event {CustomEvent<QvStepperChangeEventDetail>} change - FIred when the current step changes.
 */
@customElement('qv-stepper')
export class QvStepper extends QvStepperBase {
    static override styles = qvStepperStyles;

    public override readonly metadata = createComponentMetadata ({
        name: 'QvStepper',
        tagName: createTagName('stepper'),
        version: '0.2.1',
    });

    @property({ type: Number })
    public min!: number;

    @property({ type: Number})
    public max!: number;

    @property({ type: Number })
    public step = 1;

    /**Controlled value prop, Leave unset for uncontrolled usage. */
    @property({ type: Number})
    public value?: number;

    @property()
    public name?: string;

    @property({ reflect: true })
    public variant: QvStepperVariant = 'default';
     
    @property({ reflect: true })
    public shape: QvStepperShape = 'rectangle';
    
    @property({ reflect: true })
    public size: QvStepperSize = 'sm';

    private readonly controllableValue = createControllableValue<number>(0);

    private get currentValue(): number {
        return this.clamp(this.controllableValue.value(this.value));
    }

    private get canDecrement(): boolean {
        return !this.disabled && this.currentValue > this.min;
    }

    private get canIncrement(): boolean {
        return !this.disabled  && this.currentValue < this.max;
    }

    private clamp(value: number): number {
        if (Number.isNaN(value)) {
            return this.min;
        }

        return Math.min(this.max, Math.max(this.min, value));
    }

    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        this.internals?.setFormValue(String(this.currentValue));
    }

    private commit(next: number): void  {
        const clamped = this.clamp(next);
        const resolved = this.controllableValue.request(this.value, clamped);
        this.emit<QvStepperChangeEventDetail>('change', { value: resolved });
        this.invalidate();
    }

    private readonly handleDecrement = (): void  => {
        if(!this.canDecrement) return;
        this.commit(this.currentValue - this.step);
    };

    private readonly handleIncrement = (): void => {
        if (!this.canIncrement) return;
        this.commit(this.currentValue + this.step);
    };

    private readonly handleInputChange =  (event: Event): void => {
        const input = event.target as HTMLInputElement;
        const parsed = Number(input.value);
        this.commit(parsed);
    }

    private readonly handleKeyDown = (event: KeyboardEvent): void => {
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            this.handleIncrement();
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            this.handleDecrement();
        }
    };

    protected override render() {
        const value = this.currentValue;
        const messages = COMMON_MESSAGES[this.locale];

        return html`
            <button
                type="button"
                aria-label=${messages.decrease}
                ?disabled=${!this.canDecrement}
                @click=${this.handleDecrement}
            >&minus;</button>
            <input 
                type="text"
                inputMode="numeric"
                role="spinbutton"
                .value=${String(value)}
                aria-valuenow=${value}
                aria-valuemin=${this.min}
                aria-valuemax=${this.max}
                ?disabled=${this.disabled}
                @change=${this.handleInputChange}
                @keydown=${this.handleKeyDown}
            />

            <button
                type="button"
                aria-label=${messages.increase}
                ?disabled=${!this.canIncrement}
                @click=${this.handleIncrement}
            > &plus;</button>
        `;
    }
}