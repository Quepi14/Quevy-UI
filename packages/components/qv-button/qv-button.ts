/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-button
 * ----------------------------------------------------------
 * Standalone interactive button. The host element itself is
 * the focusable, form-associated control (Pola 1) — there is
 * no native <button> inside the shadow root. Keyboard
 * activation (Enter/Space) and tab order are implemented
 * manually here for that reason.
 *
 * @packageDocumentation
 */

import { html, type PropertyValues } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import {
    QvElement,
    createComponentMetadata,
    createTagName,
    FocusableMixin,
    DisabledMixin,
    FormAssociatedMixin,
    type ComponentMetadata,
} from '@quevy/core';

import { qvButtonStyles } from './qv-button.styles.js';

import type {
    QvButtonVariant,
    QvButtonSize,
    QvButtonType,
} from './qv-button.types.js';

const QvButtonBase = FormAssociatedMixin(
    DisabledMixin(
        FocusableMixin(QvElement),
    ),
);

@customElement('qv-button')
export class QvButton extends QvButtonBase {
    static styles = qvButtonStyles;

    public readonly metadata = createComponentMetadata({
        name: 'QvButton',
        tagName: createTagName('button'),
        version:  '0.1.3',
    });

    @property({ reflect: true })
    public variant: QvButtonVariant = 'primary';

    @property({ reflect: true})
    public size: QvButtonSize = 'md';

    @property({ type:Boolean, reflect: true})
    public loading = false;

    @property()
    public type: QvButtonType = 'button';

    /**
     * Whether the button currently rejects all interaction.
     * 
     * `disabled` (native attribute) additionally removes the
     * button  from the tab  order - see syncAccessibility().
     * `loading` keeps it focusable/annouceable (aria-busy)
     * but eqully inert to activation.
     */
    private get isInert(): boolean{
        return this.disabled || this.loading;
    }

    public onConnected(): void {
        this.addEventListener('click', this.handleClick);
        this.addEventListener('keydown', this.handleKeyDown);
        this.addEventListener('keyup', this.handleKeyUp);
    }

    public onDisconnected(): void {
        this.removeEventListener('click', this.handleClick);
        this.removeEventListener('keydown', this.handleKeyDown);
        this.removeEventListener('keyup', this.handleKeyUp);
    }

    protected update(changedProperties: PropertyValues): void {
        super.update(changedProperties);

        // Runs on every update rather tahn being gated on a
        // specific changed property: `disabled` is managed by
        // DisabledMixin's own get/set (not a Lit @property), so
        // it never appears in `changedProperties` even though it
        // does call requestUpdate() itself when it changes.
        this.syncAccessibility();
    }

    private syncAccessibility(): void{
        if (!this.hasAttribute('role')){
            this.setAttribute('role', 'button');
        }

        this.tabIndex = this.disabled ? -1 : 0;

        if (this.loading) {
            this.setAttribute('aria-busy', 'true');
        }else {
            this.removeAttribute('aria-busy')
        }
    }

    private readonly handleClick = (event: MouseEvent): void => {
        if (this.isInert) {
            event.preventDefault();
            event.stopImmediatePropagation();
            return;
        }

        this.activate();
    };

    private readonly handleKeyDown = (event: KeyboardEvent): void => {
        if (this.isInert) {
            return;
        }

        // Native <button> prevents page scroll on Space and
        // fires its click on keyup,  not keydown - matched here
        // so keyboard behavior is indistinguishable from 
        // a real button.
        if(event.key === ' ') {
            event.preventDefault();
        }

        if (event.key === 'Enter') {
            event.preventDefault();
            this.click();
        }
    };

    private readonly handleKeyUp = (event: KeyboardEvent): void => {
        if (this.isInert) {
            return;
        }

        if (event.key === ' ') {
            event.preventDefault();
            this.click();
        }
    };

    /**
     * Runs the button's `type` behavior. Only reached for real
     * (non-inert) activations - are handleClick().
     */
    private activate(): void {
        if (this.type === 'submit') {
            this.form?.requestSubmit();
            return;
        }

        if(this.type === 'reset') {
            this.form?.reset();
        }
    }

    protected render() {
        return html `
            <span class="icon" part="prefix" aria-hidden="true">
                ${this.loading
                    ? html`<span class="spinner" part"spinner"></span>`
                    : html`<slot name="prefix"></slot>`}
            </span>
            <span class="label" part="label">
                <slot></slot>
            </span>
            <span class="icon" part="suffix" aria-hidden="true">
                <slot name="suffix"></slot>
            </span>
        `;
    }
}