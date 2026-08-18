/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-checkbox
 * ----------------------------------------------------------
 * Pola 1 (host is the interactive element), same trio of mixins
 * as qv-button. Keyboard activation is Space only — Enter is
 * intentionally NOT wired, matching native <input
 * type="checkbox"> behavior (Enter submits the enclosing form
 * instead, it doesn't toggle the checkbox).
 *
 * `indeterminate` is presentation-only (no separate value it
 * resolves to) — same convention as the native checkbox's
 * .indeterminate property: purely visual, doesn't change what
 * `checked` reports.
 *
 * @packageDocumentation
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { property, customElement } from "lit/decorators.js";
import { QvElement, createComponentMetadata, createTagName, FocusableMixin, DisabledMixin, FormAssociatedMixin } from "@quevy/core";
import { qvCheckboxStyles } from "./qv-checkbox.styles.js";
import { createControllableValue } from "@quevy/state";
const QvCheckboxBase = FormAssociatedMixin(DisabledMixin(FocusableMixin(QvElement)));
let QvCheckbox = class QvCheckbox extends QvCheckboxBase {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvCheckbox',
            tagName: createTagName('checkbox'),
            version: '0.1.0',
        });
        this.indeterminate = false;
        this.value = 'on';
        this.controllableChecked = createControllableValue(false);
        this.handleClick = () => this.toggle();
        this.handleKeyDown = (event) => {
            if (this.disabled)
                return;
            if (event.key === ' ')
                event.preventDefault();
        };
        this.handleKeyUp = (event) => {
            if (this.disabled)
                return;
            if (event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        };
    }
    static { this.styles = qvCheckboxStyles; }
    get isChecked() {
        return this.controllableChecked.value(this.checked);
    }
    onConnected() {
        this.addEventListener('clicked', this.handleClick);
        this.addEventListener('keydown', this.handleKeyDown);
        this.addEventListener('keyup', this.handleKeyUp);
    }
    onDisconnected() {
        this.removeEventListener('click', this.handleClick);
        this.removeEventListener('keydown', this.handleKeyDown);
        this.removeEventListener('keyup', this.handleKeyUp);
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        this.setAttribute('role', 'checkbox');
        this.tabIndex = this.disabled ? -1 : 0;
        this.setAttribute('aria-checked', this.indeterminate ? 'mixed' : String(this.isChecked));
        this.internals?.setFormValue(this.isChecked ? this.value : null);
    }
    toggle() {
        if (this.disabled)
            return;
        const next = this.controllableChecked.request(this.checked, !this.isChecked);
        this.emit('change', { checked: next });
        this.invalidate();
    }
    render() {
        return html `
            <span class="box" part="box">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                    ${this.indeterminate
            ? html `<path d="M4 8h8" stroke-linecap="round" />`
            : html `<path d="M3 813.5 3.5L13 5" stroke-linecap="round" stroke-linejoin="round"/>`}
                </svg>
            </span>
            <slot></slot>
        `;
    }
};
__decorate([
    property({ type: Boolean, reflect: true })
], QvCheckbox.prototype, "checked", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], QvCheckbox.prototype, "indeterminate", void 0);
__decorate([
    property()
], QvCheckbox.prototype, "name", void 0);
__decorate([
    property()
], QvCheckbox.prototype, "value", void 0);
QvCheckbox = __decorate([
    customElement('qv-checkbox')
], QvCheckbox);
export { QvCheckbox };
//# sourceMappingURL=qv-checkbox.js.map