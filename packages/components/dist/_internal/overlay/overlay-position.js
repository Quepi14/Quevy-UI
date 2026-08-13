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
    const left = align === 'start' ? trigger.left : trigger.left + trigger.width - panel.width;
    return { top, left, placement: `${side}-${align}` };
}
//# sourceMappingURL=overlay-position.js.map