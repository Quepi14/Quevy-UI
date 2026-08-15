/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-bar
 * ----------------------------------------------------------
 * Structural layout component covering topbar/navbar/footbar
 * (position="top"/"bottom") and sidebar (position="left"/
 * "right"). Deliberately near-zero JS behavior — this is a
 * layout primitive, not an interactive component, closer in
 * complexity to qv-card than to qv-modal/qv-dropdown.
 *
 * @packageDocumentation
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property } from "lit/decorators.js";
import { html } from "lit";
import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";
;
import { qvBarStyles } from "./qv-bar.styles.js";
let QvBar = class QvBar extends QvElement {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvBar',
            tagName: createTagName('bar'),
            version: '0.1.0',
        });
        this.position = 'top';
        this.sticky = false;
    }
    static { this.styles = qvBarStyles; }
    onConnected() {
        const isVertical = this.position === 'left' || this.position === 'right';
        this.setAttribute('role', isVertical ? 'complementary' : 'banner');
    }
    render() {
        return html `
            <slot name="start"></slot>
            <slot name="center"></slot>
            <slot name="end"></slot>
        `;
    }
};
__decorate([
    property({ reflect: true })
], QvBar.prototype, "position", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], QvBar.prototype, "sticky", void 0);
QvBar = __decorate([
    customElement('qv-bar')
], QvBar);
export { QvBar };
//# sourceMappingURL=qv-bar.js.map