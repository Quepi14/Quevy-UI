/**
 * ----------------------------------------------------------
 * QUEVY UI (internal) — drag-to-dismiss
 * ----------------------------------------------------------
 * Not a ReactiveController — bottom sheets render conditionally
 * (nothing when closed), so the handle/panel elements don't
 * exist yet at hostConnected() time. Attach/detach is called
 * manually from QvBottomSheetBase.updated() instead, whenever
 * the panel is actually in the DOM.
 *
 * Dismisses if dragged past 30% of panel height OR flicked
 * fast enough (velocity), whichever comes first — otherwise
 * snaps back to resting position.
 *
 * @packageDocumentation
 */
export interface DragToDismissOptions {
    distanceThreshold?: number;
    velocityThreshold?: number;
    onDismiss: () => void;
}
export declare class DragToDismiss {
    private handle;
    private panel;
    private startY;
    private startTime;
    private offset;
    private dragging;
    private readonly options;
    constructor(options: DragToDismissOptions);
    attach(handle: HTMLElement, panel: HTMLElement): void;
    detach(): void;
    private readonly handlePointerDown;
    private readonly handlePointerMove;
    private readonly handlePointerUp;
}
//# sourceMappingURL=drag-to-dismiss.d.ts.map