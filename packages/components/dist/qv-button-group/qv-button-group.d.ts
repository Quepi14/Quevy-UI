/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-button-group
 * ----------------------------------------------------------
 * Purely structural (no JS behavior) — joins slotted qv-button
 * children edge-to-edge with only the outer corners rounded.
 *
 * Width ratio between buttons is NOT a dedicated prop — each
 * qv-button already has flex: 1 1 0 by default (equal split);
 * override per-button via a plain inline style to get any ratio
 * (e.g. flex: 1 vs flex: 3 gives a 1:3 split). This avoids a
 * rigid ratio="1:3" API for something plain CSS flex already
 * does more flexibly.
 *
 * @packageDocumentation
 */
import { type PropertyValues } from "lit";
import { QvElement } from "@quevy/core";
export declare class QvButtonGroup extends QvElement {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    ratio?: string;
    onConnected(): void;
    private readonly handleSlotChange;
    protected updated(changedProperties: PropertyValues): void;
    /**
     * Sets each child's flex-grow via inlines style. Deliberately
     * NOT done through a CSS custom property + nth-child selector
     * - ratio values are arbitrary and per-instance, an inline
     * style is the straightforward fit here(same reasoning
     * qv-carousel and other use inline style for computed, per
     * -render value rather than forcing everything through
     * the stylesheet).
     */
    private applyRatio;
    protected render(): import("lit").TemplateResult<1>;
}
//# sourceMappingURL=qv-button-group.d.ts.map