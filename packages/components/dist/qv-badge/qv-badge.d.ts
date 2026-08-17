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
import { type PropertyValues } from "lit";
import { QvElement } from "@quevy/core";
import type { QvBadgeVariant } from "./qv-badge.types.js";
export declare class QvBadge extends QvElement {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    count?: number;
    max: number;
    dot: boolean;
    variant: QvBadgeVariant;
    private hasWrappedContent;
    protected updated(changedProperties: PropertyValues): void;
    private readonly handleSlotChange;
    private get displayValue();
    protected render(): import("lit").TemplateResult<1>;
}
//# sourceMappingURL=qv-badge.d.ts.map