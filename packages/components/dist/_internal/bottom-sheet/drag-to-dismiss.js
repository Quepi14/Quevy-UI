export class DragToDismiss {
    constructor(options) {
        this.handle = null;
        this.panel = null;
        this.startY = 0;
        this.startTime = 0;
        this.offset = 0;
        this.dragging = false;
        this.handlePointerDown = (event) => {
            if (!this.panel || !this.handle)
                return;
            this.dragging = true;
            this.startY = event.clientY;
            this.startTime = performance.now();
            this.offset = 0;
            this.handle.setPointerCapture(event.pointerId);
            this.handle.addEventListener('pointermove', this.handlePointerMove);
            this.handle.addEventListener('pointerup', this.handlePointerUp);
            this.handle.addEventListener('pointercancel', this.handlePointerUp);
        };
        this.handlePointerMove = (event) => {
            if (!this.dragging || !this.panel)
                return;
            this.offset = Math.max(0, event.clientY - this.startY);
            this.panel.style.transition = 'none';
            this.panel.style.transform = 'translateY(${this.offset}px)';
        };
        this.handlePointerUp = () => {
            if (!this.dragging || !this.panel || !this.handle)
                return;
            this.dragging = false;
            const elapsed = performance.now() - this.startTime;
            const velocity = this.offset / Math.max(elapsed, 1);
            const panelHeight = this.panel.getBoundingClientRect().height;
            const distanceRatio = panelHeight > 0 ? this.offset / panelHeight : 0;
            this.handle.removeEventListener('pointermove', this.handlePointerMove);
            this.handle.removeEventListener('pointerup', this.handlePointerUp);
            this.handle.removeEventListener('pointercancel', this.handlePointerUp);
            this.panel.style.transition = '';
            if (distanceRatio >= this.options.distanceThreshold || velocity >= this.options.velocityThreshold) {
                this.options.onDismiss();
            }
            else {
                this.panel.style.transform = '';
            }
        };
        this.options = {
            distanceThreshold: options.distanceThreshold ?? 0.3,
            velocityThreshold: options.velocityThreshold ?? 0.5,
            onDismiss: options.onDismiss,
        };
    }
    attach(handle, panel) {
        if (this.handle === handle && this.panel === panel)
            return;
        this.detach();
        this.handle = handle;
        this.panel = panel;
        handle.addEventListener('pointerdown', this.handlePointerDown);
    }
    detach() {
        this.handle?.removeEventListener('pointerdown', this.handlePointerDown);
        this.handle = null;
        this.panel = null;
    }
}
//# sourceMappingURL=drag-to-dismiss.js.map