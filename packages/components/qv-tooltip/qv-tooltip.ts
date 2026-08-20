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
import { html, type PropertyValues } from "lit";
import { property, state, customElement } from "lit/decorators.js";

import { QvElement, createComponentMetadata, createTagName, queryDecorator as query } from "@quevy/core";
import { computeOverlayPosition, type OverlayPlacement } from "../_internal/overlay/overlay-position.js";

import { qvTootltipStyles } from "./qv-tooltip.styles.js";
import type { QvTooltipPlacement } from "./qv-tooltip.types.js";

const PLACEMENT_MAP: Record<QvTooltipPlacement, OverlayPlacement> = {
    top: 'top-start',
    bottom: 'bottom-start',
    left: 'top-start',
    right: 'bottom-start', 
};

const OPEN_DELAY = 300;

@customElement('qv-tooltip')
export class QvTooltip extends QvElement {
    static override styles = qvTootltipStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvTooltip',
        tagName: createTagName('tooltip'),
        version: '0.1.0',
    });

    @property() public text = '';
    @property({ reflect: true }) public placement: QvTooltipPlacement = 'top';

    @state() private visible = false;

    @query('.bubble', false) private bubbleEl!: HTMLElement | null;
    private openTimer: ReturnType<typeof setTimeout> | null = null;
    private readonly tooltipid = `qv-tooltip-${Math.random().toString(36).slice(2, 9)}`;

    public override onConnected(): void {
        this.addEventListener('pointerenter', this.scheduleOpen);
        this.addEventListener('pointerleave', this.close);
        this.addEventListener('focusin', this.open);
        this.addEventListener('focusout', this.close);
    }

    public override onDisconnected(): void {
        this.removeEventListener('pointerenter', this.scheduleOpen);
        this.removeEventListener('pointerleave', this.close);
        this.removeEventListener('focusin', this.open);
        this.removeEventListener('focusout', this.close);
        if (this.openTimer) clearTimeout(this.openTimer);
    }

    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        if (this.visible) this.reposition();
    }
    private readonly scheduleOpen = (): void => {
        this.openTimer = setTimeout(() => this.open(), OPEN_DELAY);
    };

    private readonly open = (): void => {
        if (this.openTimer) clearTimeout(this.openTimer);
        this.visible = true;
    };

    private readonly close = (): void => {
        if (this.openTimer) clearTimeout(this.openTimer);
        this.visible = false;
    };

    private reposition(): void {
        if (!this.bubbleEl) return;

        const triggerRect = this.getBoundingClientRect();
        const bubbleRect = this.bubbleEl.getBoundingClientRect();

        const { top, left } = computeOverlayPosition(
            triggerRect,
            { width: bubbleRect.width, height: bubbleRect.height},
            { width: window.innerWidth, height: window.innerHeight},
            PLACEMENT_MAP[this.placement],
            6,
        );

        this.bubbleEl.style.top = `${top}px`;
        this.bubbleEl.style.left = `${left}px`;
    }

    protected override render() {
        return html`
            <slot aria-describedby=${this.id}></slot>
            <div id=${this.tooltipid} class=${this.visible ? 'bubble visible' : 'bubble'} part="bubble" role="tooltip">
                ${this.text}
            </div>
        `;
    }

}