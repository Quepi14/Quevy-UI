var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-collapsible
 * ----------------------------------------------------------
 * Header is conditional: built-in (title + chevron) when
 * `label` is set and slot="trigger" is empty; fully custom via
 * slot="trigger" otherwise (same fallback pattern as qv-menu's
 * trigger slot).
 *
 * Expand/collapse animation uses grid-template-rows 0fr→1fr —
 * animates to intrinsic content height without any JS
 * measurement (no ResizeObserver, no getBoundingClientRect).
 *
 * @packageDocumentation
 */
import { html, nothing } from "lit";
import { property, state, customElement } from "lit/decorators.js";
import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";
import { createControllableValue } from "@quevy/state";
import { qvCollapsibleStyles } from "./qv-collapsible.styles.js";
let QvCollapsible = class QvCollapsible extends QvElement {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvCollapsible',
            tagName: createTagName('collapsible'),
            version: '0.1.0',
        });
        this.disabled = false;
        this.controllableOpen = createControllableValue(false);
        this.hasCustomTrigger = false;
        this.handleTriggerSlotChange = () => {
            this.hasCustomTrigger = this.hasSlot('trigger');
        };
    }
    static { this.styles = qvCollapsibleStyles; }
    get isOpen() {
        return this.controllableOpen.value(this.open);
    }
    onConnected() {
        this.setAttribute('role', 'group');
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        this.classList.toggle('is-open', this.isOpen);
    }
    toggle() {
        if (this.disabled)
            return;
        const next = this.controllableOpen.request(this.open, !this.isOpen);
        // Bubbles + composed so an enclosing qv-accordian can hear
        // it across shadow boundaries and enforce exclusive mode.
        this.dispatch(new CustomEvent('qv-collapsible-toggle', { bubbles: true, composed: true, detail: { open: next } }));
        this.emit('toggle', { open: next });
        this.invalidate();
    }
    render() {
        return html `
            <button class="header" part="header" aria-expanded=${this.isOpen} ?disabled=${this.disabled} @click=${() => this.toggle()}>
                <slot name="trigger" @slotchange=${this.handleTriggerSlotChange}>
                    ${this.hasCustomTrigger ? nothing : html `<span>${this.label ?? ''}</span>`}
                </sot>
                ${this.hasCustomTrigger
            ? nothing
            : html `
                        <svg class="chevron" part="chevron" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5.2 7.2a1 1 0 011.4 0L10 10.6l3.4-3.4a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z"/>
                        </svg>
                    `}
            </button>

            <div class="panel" part="panel">
                <div class="panel-inner">
                    <div class="content" part="content"><slot></slot></div>
                </div>
            </div>
        `;
    }
};
__decorate([
    property()
], QvCollapsible.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], QvCollapsible.prototype, "open", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], QvCollapsible.prototype, "disabled", void 0);
__decorate([
    state()
], QvCollapsible.prototype, "hasCustomTrigger", void 0);
QvCollapsible = __decorate([
    customElement('qv-collapsible')
], QvCollapsible);
export { QvCollapsible };
//# sourceMappingURL=qv-collapsible.js.map