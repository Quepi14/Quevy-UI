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
import { type PropertyValues } from "lit";
import { QvElement } from "@quevy/core";
import type { QvTooltipPlacement } from "./qv-tooltip.types.js";
export declare class QvTooltip extends QvElement {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    text: string;
    placement: QvTooltipPlacement;
    private visible;
    private bubbleEl;
    private openTimer;
    private readonly tooltipid;
    onConnected(): void;
    onDisconnected(): void;
    protected updated(changedProperties: PropertyValues): void;
    private readonly scheduleOpen;
    private readonly open;
    private readonly close;
    private reposition;
    protected render(): import("lit").TemplateResult<1>;
}
//# sourceMappingURL=qv-tooltip.d.ts.map