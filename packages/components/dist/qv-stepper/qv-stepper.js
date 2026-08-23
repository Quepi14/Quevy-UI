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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { QvElement, createComponentMetadata, createTagName, DisabledMixin, FormAssociatedMixin, removeStyles } from '@quevy/core';
import { qvStepperStyles } from './qv-stepper.styles.js';
import { createControllableValue } from '@quevy/state';
const QvStepperBase = FormAssociatedMixin(DisabledMixin(QvElement));
let QvStepper = class QvStepper extends QvStepperBase {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvStepper',
            tagName: createTagName('stepper'),
            version: '0.2.0',
        });
        this.step = 1;
        this.variant = 'default';
        this.shape = 'rectangle';
        this.controllableValue = createControllableValue(0);
        this.handleDecrement = () => {
            if (!this.canDecrement)
                return;
            this.commit(this.currentValue - this.step);
        };
        this.handleIncrement = () => {
            if (!this.canIncrement)
                return;
            this.commit(this.currentValue + this.step);
        };
        this.handleInputChange = (event) => {
            const input = event.target;
            const parsed = Number(input.value);
            this.commit(parsed);
        };
        this.handleKeyDown = (event) => {
            if (event.key === 'ArrowUp') {
                event.preventDefault();
                this.handleIncrement();
            }
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                this.handleDecrement();
            }
        };
    }
    static { this.styles = qvStepperStyles; }
    get currentValue() {
        return this.clamp(this.controllableValue.value(this.value));
    }
    get canDecrement() {
        return !this.disabled && this.currentValue > this.min;
    }
    get canIncrement() {
        return !this.disabled && this.currentValue < this.max;
    }
    clamp(value) {
        if (Number.isNaN(value)) {
            return this.min;
        }
        return Math.min(this.max, Math.max(this.min, value));
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        this.internals?.setFormValue(String(this.currentValue));
    }
    commit(next) {
        const clamped = this.clamp(next);
        const resolved = this.controllableValue.request(this.value, clamped);
        this.emit('change', { value: resolved });
        this.invalidate();
    }
    render() {
        const value = this.currentValue;
        return html `
            <button
                type="button"
                aria-label="Decrease"
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
                aria-label="Increase"
                ?disabled=${!this.canIncrement}
                @click=${this.handleIncrement}
            > &plus;</button>
        `;
    }
};
__decorate([
    property({ type: Number })
], QvStepper.prototype, "min", void 0);
__decorate([
    property({ type: Number })
], QvStepper.prototype, "max", void 0);
__decorate([
    property({ type: Number })
], QvStepper.prototype, "step", void 0);
__decorate([
    property({ type: Number })
], QvStepper.prototype, "value", void 0);
__decorate([
    property()
], QvStepper.prototype, "name", void 0);
__decorate([
    property({ reflect: true })
], QvStepper.prototype, "variant", void 0);
__decorate([
    property({ reflect: true })
], QvStepper.prototype, "shape", void 0);
QvStepper = __decorate([
    customElement('qv-stepper')
], QvStepper);
export { QvStepper };
//# sourceMappingURL=qv-stepper.js.map