var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-tooltip
 * ----------------------------------------------------------
 * Wraps its slotted trigger. Hover/focus opens, mouse-leave/
 * blur closes, with a short open delay (avoids flashing on
 * quick mouse passes) and no close delay (should disappear
 * immediately once attention moves away). Reuses
 * computeOverlayPosition for placement math only — none of
 * OverlayController's click/escape/focus-trap machinery applies
 * to a purely informational, non-interactive bubble.
 *
 * @packageDocumentation
 */
import { html } from "lit";
import { property, state, customElement } from "lit/decorators.js";
import { QvElement, createComponentMetadata, createTagName, queryDecorator as query } from "@quevy/core";
import { computeOverlayPosition } from "../_internal/overlay/overlay-position.js";
import { qvTootltipStyles } from "./qv-tooltip.styles.js";
const PLACEMENT_MAP = {
    top: 'top-start',
    bottom: 'bottom-start',
    left: 'top-start',
    right: 'bottom-start',
};
const OPEN_DELAY = 300;
let QvTooltip = class QvTooltip extends QvElement {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvTooltip',
            tagName: createTagName('tooltip'),
            version: '0.1.0',
        });
        this.text = '';
        this.placement = 'top';
        this.visible = false;
        this.openTimer = null;
        this.tooltipid = `qv-tooltip-${Math.random().toString(36).slice(2, 9)}`;
        this.scheduleOpen = () => {
            this.openTimer = setTimeout(() => this.open(), OPEN_DELAY);
        };
        this.open = () => {
            if (this.openTimer)
                clearTimeout(this.openTimer);
            this.visible = true;
        };
        this.close = () => {
            if (this.openTimer)
                clearTimeout(this.openTimer);
            this.visible = false;
        };
    }
    static { this.styles = qvTootltipStyles; }
    onConnected() {
        this.addEventListener('pointerenter', this.scheduleOpen);
        this.addEventListener('pointerleave', this.close);
        this.addEventListener('focusin', this.open);
        this.addEventListener('focusout', this.close);
    }
    onDisconnected() {
        this.removeEventListener('pointerenter', this.scheduleOpen);
        this.removeEventListener('pointerleave', this.close);
        this.removeEventListener('focusin', this.open);
        this.removeEventListener('focusout', this.close);
        if (this.openTimer)
            clearTimeout(this.openTimer);
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (this.visible)
            this.reposition();
    }
    reposition() {
        if (!this.bubbleEl)
            return;
        const triggerRect = this.getBoundingClientRect();
        const bubbleRect = this.bubbleEl.getBoundingClientRect();
        const { top, left } = computeOverlayPosition(triggerRect, { width: bubbleRect.width, height: bubbleRect.height }, { width: window.innerWidth, height: window.innerHeight }, PLACEMENT_MAP[this.placement], 6);
        this.bubbleEl.style.top = `${top}px`;
        this.bubbleEl.style.left = `${left}px`;
    }
    render() {
        return html `
            <slot aria-describedby=${this.id}></slot>
            <div id=${this.tooltipid} class=${this.visible ? 'bubble visible' : 'bubble'} part="bubble" role="tooltip">
                ${this.text}
            </div>
        `;
    }
};
__decorate([
    property()
], QvTooltip.prototype, "text", void 0);
__decorate([
    property({ reflect: true })
], QvTooltip.prototype, "placement", void 0);
__decorate([
    state()
], QvTooltip.prototype, "visible", void 0);
__decorate([
    query('.bubble', false)
], QvTooltip.prototype, "bubbleEl", void 0);
QvTooltip = __decorate([
    customElement('qv-tooltip')
], QvTooltip);
export { QvTooltip };
//# sourceMappingURL=qv-tooltip.js.map