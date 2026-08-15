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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { QvElement, createComponentMetadata, createTagName, FocusableMixin, DisabledMixin, FormAssociatedMixin, } from '@quevy/core';
import { qvButtonStyles } from './qv-button.styles.js';
const QvButtonBase = FormAssociatedMixin(DisabledMixin(FocusableMixin(QvElement)));
let QvButton = class QvButton extends QvButtonBase {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvButton',
            tagName: createTagName('button'),
            version: '0.1.3',
        });
        this.variant = 'primary';
        this.size = 'md';
        this.loading = false;
        this.type = 'button';
        this.handleClick = (event) => {
            if (this.isInert) {
                event.preventDefault();
                event.stopImmediatePropagation();
                return;
            }
            this.activate();
        };
        this.handleKeyDown = (event) => {
            if (this.isInert) {
                return;
            }
            // Native <button> prevents page scroll on Space and
            // fires its click on keyup,  not keydown - matched here
            // so keyboard behavior is indistinguishable from 
            // a real button.
            if (event.key === ' ') {
                event.preventDefault();
            }
            if (event.key === 'Enter') {
                event.preventDefault();
                this.click();
            }
        };
        this.handleKeyUp = (event) => {
            if (this.isInert) {
                return;
            }
            if (event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        };
    }
    static { this.styles = qvButtonStyles; }
    /**
     * Whether the button currently rejects all interaction.
     *
     * `disabled` (native attribute) additionally removes the
     * button  from the tab  order - see syncAccessibility().
     * `loading` keeps it focusable/annouceable (aria-busy)
     * but eqully inert to activation.
     */
    get isInert() {
        return this.disabled || this.loading;
    }
    onConnected() {
        this.addEventListener('click', this.handleClick);
        this.addEventListener('keydown', this.handleKeyDown);
        this.addEventListener('keyup', this.handleKeyUp);
    }
    onDisconnected() {
        this.removeEventListener('click', this.handleClick);
        this.removeEventListener('keydown', this.handleKeyDown);
        this.removeEventListener('keyup', this.handleKeyUp);
    }
    update(changedProperties) {
        super.update(changedProperties);
        // Runs on every update rather tahn being gated on a
        // specific changed property: `disabled` is managed by
        // DisabledMixin's own get/set (not a Lit @property), so
        // it never appears in `changedProperties` even though it
        // does call requestUpdate() itself when it changes.
        this.syncAccessibility();
    }
    syncAccessibility() {
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'button');
        }
        this.tabIndex = this.disabled ? -1 : 0;
        if (this.loading) {
            this.setAttribute('aria-busy', 'true');
        }
        else {
            this.removeAttribute('aria-busy');
        }
    }
    /**
     * Runs the button's `type` behavior. Only reached for real
     * (non-inert) activations - are handleClick().
     */
    activate() {
        if (this.type === 'submit') {
            this.form?.requestSubmit();
            return;
        }
        if (this.type === 'reset') {
            this.form?.reset();
        }
    }
    render() {
        return html `
            <span class="icon" part="prefix" aria-hidden="true">
                ${this.loading
            ? html `<span class="spinner" part"spinner"></span>`
            : html `<slot name="prefix"></slot>`}
            </span>
            <span class="label" part="label">
                <slot></slot>
            </span>
            <span class="icon" part="suffix" aria-hidden="true">
                <slot name="suffix"></slot>
            </span>
        `;
    }
};
__decorate([
    property({ reflect: true })
], QvButton.prototype, "variant", void 0);
__decorate([
    property({ reflect: true })
], QvButton.prototype, "size", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], QvButton.prototype, "loading", void 0);
__decorate([
    property()
], QvButton.prototype, "type", void 0);
QvButton = __decorate([
    customElement('qv-button')
], QvButton);
export { QvButton };
//# sourceMappingURL=qv-button.js.map