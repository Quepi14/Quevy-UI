/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-badge
 * ----------------------------------------------------------
 * Static, non-interactive indicator. Two modes, auto-detected
 * via slot content:
 *   - Standalone: no wrapped element → renders inline (status pill).
 *   - Overlap: wraps a slotted element → floats at its corner
 *     (notification count / status dot on an icon or avatar).
 *
 * Unlike qv-chip, this is purely presentational — no click
 * handler, no selected/dismissible state.
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
import { property, state, customElement } from "lit/decorators.js";
import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";
import { qvBadgeStyles } from "./qv-badge.styles.js";
let QvBadge = class QvBadge extends QvElement {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvBadge',
            tagName: createTagName('badge'),
            version: '0.1.0',
        });
        this.max = 99;
        this.dot = false;
        this.variant = 'default';
        this.hasWrappedContent = false;
        this.handleSlotChange = () => {
            this.hasWrappedContent = this.hasSlot();
        };
    }
    static { this.styles = qvBadgeStyles; }
    updated(changedProperties) {
        super.updated(changedProperties);
        this.toggleAttribute('standalone', !this.hasWrappedContent);
    }
    get displayValue() {
        if (this.dot || this.count === undefined)
            return '';
        return this.count > this.max ? `${this.max}+` : String(this.count);
    }
    render() {
        return html `
            <slot @slotchange=${this.handleSlotChange}></slot>
            <span class="indicator" part="indicator" aria-hidden=${this.dot ? 'true' : 'false'}>
                ${this.displayValue}
            </span>
        `;
    }
};
__decorate([
    property({ type: Number })
], QvBadge.prototype, "count", void 0);
__decorate([
    property({ type: Number })
], QvBadge.prototype, "max", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], QvBadge.prototype, "dot", void 0);
__decorate([
    property({ reflect: true })
], QvBadge.prototype, "variant", void 0);
__decorate([
    state()
], QvBadge.prototype, "hasWrappedContent", void 0);
QvBadge = __decorate([
    customElement('qv-badge')
], QvBadge);
export { QvBadge };
//# sourceMappingURL=qv-badge.js.map