/**
 * ----------------------------------------------------------
 * QUEVY UI (internal) — overlay positioning
 * ----------------------------------------------------------
 * Pure function, no DOM reads — takes plain rects/sizes so it's
 * unit-testable in isolation, same rationale as
 * qv-pagination.utils.ts.
 *
 * @packageDocumentation
 */
export type OverlayPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
export interface OverlayRect {
    top: number;
    left: number;
    width: number;
    height: number;
}
export interface OverlaySize {
    width: number;
    height: number;
}
export interface OverlayPosition {
    top: number;
    left: number;
    /** May differ from the preferred placement if it didn't fit - see flip logic below */
    placement: OverlayPlacement;
}
/**
 * Computes where the panel should sit relative to the trigger,
 * flipping vertically (bottom ->  top or vice versa) if the
 * preferred placement doesn't fit in the viewport. Does not
 * flip horizontally - start/end alignment is assumed to always
 * fit; revisit if a consumer needs that too.
 */
export declare function computeOverlayPosition(trigger: OverlayRect, panel: OverlaySize, viewport: OverlaySize, preferred: OverlayPlacement, gap?: number): OverlayPosition;
//# sourceMappingURL=overlay-position.d.ts.map