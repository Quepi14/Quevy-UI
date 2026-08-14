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

export class DragToDismiss {
    private handle: HTMLElement | null = null;
    private panel: HTMLElement | null = null;
    private startY = 0;
    private startTime = 0;
    private offset = 0;
    private dragging = false;

    private readonly options: Required<DragToDismissOptions>;

    public constructor(options: DragToDismissOptions) {
        this.options = {
            distanceThreshold: options.distanceThreshold ?? 0.3,
            velocityThreshold: options.velocityThreshold ?? 0.5,
            onDismiss: options.onDismiss,
        };
    }

    public attach(handle: HTMLElement, panel: HTMLElement): void {
        if (this.handle === handle && this.panel === panel) return;
        this.detach()
        this.handle = handle;
        this.panel = panel;
        handle.addEventListener('pointerdown', this.handlePointerDown);
    }

    public detach(): void {
        this.handle?.removeEventListener('pointerdown', this.handlePointerDown);
        this.handle = null;
        this.panel = null;
    }

    private readonly handlePointerDown = (event: PointerEvent): void => {
        if (!this.panel || !this.handle) return;

        this.dragging = true;
        this.startY = event.clientY;
        this.startTime = performance.now();
        this.offset = 0;

        this.handle.setPointerCapture(event.pointerId);
        this.handle.addEventListener('pointermove', this.handlePointerMove);
        this.handle.addEventListener('pointerup', this.handlePointerUp);
        this.handle.addEventListener('pointercancel', this.handlePointerUp);
    };

    private readonly handlePointerMove = (event: PointerEvent): void => {
        if (!this.dragging || !this.panel) return;

        this.offset = Math.max(0, event.clientY - this.startY);
        this.panel.style.transition = 'none';
        this.panel.style.transform = 'translateY(${this.offset}px)';
    }

    private readonly handlePointerUp = (): void => {
        if (!this.dragging || !this.panel || !this.handle) return;
        this.dragging = false;

        const elapsed = performance.now() - this.startTime;
        const velocity = this.offset / Math.max(elapsed,1);
        const panelHeight = this.panel.getBoundingClientRect().height;
        const distanceRatio = panelHeight > 0 ? this.offset / panelHeight : 0;

        this.handle.removeEventListener('pointermove', this.handlePointerMove);
        this.handle.removeEventListener('pointerup', this.handlePointerUp);
        this.handle.removeEventListener('pointercancel', this.handlePointerUp);

        this.panel.style.transition = '';

        if (distanceRatio >= this.options.distanceThreshold || velocity >= this.options.velocityThreshold) {
            this.options.onDismiss();
        } else {
            this.panel.style.transform = '';
        }
    };
}
