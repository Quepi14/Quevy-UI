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
export function computeOverlayPosition(
    trigger: OverlayRect,
    panel: OverlaySize,
    viewport: OverlaySize,
    preferred: OverlayPlacement,
    gap =  4,
): OverlayPosition {
    const [preferredSide, align] = preferred.split('-') as ['bottom' | 'top', 'start' | 'end'];

    const spaceBelow = viewport.height - (trigger.top + trigger.height);
    const spaceAbove = trigger.top;

    const fitsBelow = spaceBelow >= panel.height + gap;
    const fitsAbove = spaceAbove >= panel.height + gap;

    const side: 'bottom' | 'top' =
        preferredSide === 'bottom'
            ? fitsBelow || !fitsAbove
                ? 'bottom'
                : 'top'
            : fitsAbove || !fitsBelow
                ? 'top'
                : 'bottom';

        const top =
            side === 'bottom'
                ? trigger.top + trigger.height + gap
                : trigger.top - panel.height - gap;

        /**
         * Horizontal flip: if the preferred alignment would push the
         * panel off either edge of the viewport, try the other alignment
         * instead - same "does it fit? if not, flip" logic already used
         * above for vertical placement.
         */

        const leftForStart = trigger.left;
        const leftForEnd = trigger.left + trigger.width - panel.width;

        const startFits = leftForStart + panel.width <= viewport.width;
        const endFits = leftForEnd >= 0;

        const resolvedAlign: 'start' | 'end' = 
            align === 'start'
                ? startFits || !endFits
                    ? 'start'
                    : 'end'
                : endFits || !startFits
                    ? 'end'
                    : 'start';
                    
        let left = resolvedAlign === 'start' ? leftForStart : leftForEnd;
        // Last-resort clamp: viewport smaller than the panel itself.
        left = Math.max(0, Math.min(left, viewport.width - panel.width));

    return { top, left, placement: `${side}-${resolvedAlign}`};
}