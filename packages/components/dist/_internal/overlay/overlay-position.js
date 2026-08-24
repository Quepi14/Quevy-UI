/**
 * Computes where the panel should sit relative to the trigger,
 * flipping vertically (bottom ->  top or vice versa) if the
 * preferred placement doesn't fit in the viewport. Does not
 * flip horizontally - start/end alignment is assumed to always
 * fit; revisit if a consumer needs that too.
 */
export function computeOverlayPosition(trigger, panel, viewport, preferred, gap = 4) {
    const [preferredSide, align] = preferred.split('-');
    const spaceBelow = viewport.height - (trigger.top + trigger.height);
    const spaceAbove = trigger.top;
    const fitsBelow = spaceBelow >= panel.height + gap;
    const fitsAbove = spaceAbove >= panel.height + gap;
    const side = preferredSide === 'bottom'
        ? fitsBelow || !fitsAbove
            ? 'bottom'
            : 'top'
        : fitsAbove || !fitsBelow
            ? 'top'
            : 'bottom';
    const top = side === 'bottom'
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
    const resolvedAlign = align === 'start'
        ? startFits || !endFits
            ? 'start'
            : 'end'
        : endFits || !startFits
            ? 'end'
            : 'start';
    let left = resolvedAlign === 'start' ? leftForStart : leftForEnd;
    // Last-resort clamp: viewport smaller than the panel itself.
    left = Math.max(0, Math.min(left, viewport.width - panel.width));
    return { top, left, placement: `${side}-${resolvedAlign}` };
}
//# sourceMappingURL=overlay-position.js.map