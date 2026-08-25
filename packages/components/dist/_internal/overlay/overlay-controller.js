import { getFocusableElement } from '@quevy/core';
import { computeOverlayPosition } from './overlay-position.js';
let scrollLockCount = 0;
let previousHtmlOverflow = null;
function acquireScrollLock() {
    if (scrollLockCount === 0) {
        previousHtmlOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = 'hidden';
    }
    scrollLockCount = 1;
}
function releaseScrollLock() {
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    if (scrollLockCount === 0) {
        document.documentElement.style.overflow = previousHtmlOverflow ?? '';
        previousHtmlOverflow = null;
    }
}
export class OverlayController {
    get panel() {
        return this._panel;
    }
    /**
     * Hides the panel the instant it's assigned - before the
     * browser gets a chance to paint it at whatever default (or
     * stale) position it currently has. applyPosition() reveals
     * it again once real coordinates are set. This is what eliminate
     * the "flashes in the wrong spot, then snaps into place" glitch
     * - the panel is simply never visible before it's correctly ,
     * positione, regardless of how many microtasks/frames that takes.
     */
    set panel(element) {
        if (element && element !== this._panel) {
            element.style.visibility = 'hidden';
        }
        this._panel = element;
    }
    constructor(host, options = {}) {
        this.host = host;
        this.trigger = null;
        this._panel = null;
        this._open = false;
        this.previouslyFocused = null;
        this.focusableCache = null;
        this.repositionScheduled = false;
        this.reposition = () => {
            if (!this._open || !this.trigger || !this.panel)
                return;
            if (this.host.tagName !== 'QV-MENU')
                return;
            if (this.repositionScheduled)
                return;
            this.repositionScheduled = true;
            requestAnimationFrame(() => {
                this.repositionScheduled = false;
                this.applyPosition();
            });
        };
        this.handleOutsidePointerDown = (event) => {
            const shouldClose = typeof this.options.closeOnOutsideClick === 'function'
                ? this.options.closeOnOutsideClick()
                : this.options.closeOnOutsideClick;
            if (!shouldClose)
                return;
            const path = event.composedPath();
            if (path.includes(this.host) || (this.panel && path.includes(this.panel))) {
                return;
            }
            this.close();
        };
        this.handleDocumentKeyDown = (event) => {
            if (this.options.closeOnEscape && event.key === 'Escape') {
                event.preventDefault();
                this.close();
                return;
            }
            if (this.options.trapFocus && event.key === 'Tab' && this.panel) {
                this.trapTab(event);
            }
        };
        this.options = {
            placement: options.placement ?? 'bottom-start',
            closeOnOutsideClick: options.closeOnOutsideClick ?? true,
            closeOnEscape: options.closeOnEscape ?? true,
            trapFocus: options.trapFocus ?? true,
            restoreFocus: options.restoreFocus ?? true,
            lockScroll: options.lockScroll ?? false,
            onOpenChange: options.onOpenChange,
        };
        this.host.addController(this);
    }
    get isOpen() {
        return this._open;
    }
    open() {
        if (this._open)
            return;
        this._open = true;
        this.previouslyFocused = document.activeElement;
        if (this.options.lockScroll) {
            acquireScrollLock();
        }
        document.addEventListener('pointerdown', this.handleOutsidePointerDown, true);
        document.addEventListener('keydown', this.handleDocumentKeyDown, true);
        window.addEventListener('resize', this.reposition);
        window.addEventListener('scroll', this.reposition, true);
        document.addEventListener('load', this.reposition, true);
        this.host.requestUpdate();
        this.options.onOpenChange?.(true);
        // Wait for the panel to actually be in the DOM (it's
        // conditionally rendered by the host) before positioning
        // or moving focus into it.
        void this.host.updateComplete.then(() => {
            /**Double rAF: waits for the browser to complete a
             * full layout pass across ALL pending component
             * udpates (not just this host's), not just the next
             * paint tick - cheap insurance againts the first
             * position calculation using stale ancestor layout
             * (e.g. a parent's slot positioning not fully settled
             * yet), which single-rAF wasn't reliably catching.
             */
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    this.applyPosition();
                });
            });
            if (this.options.trapFocus) {
                getFocusableElement(this.panel ?? this.host)[0]?.focus();
            }
        });
        this.focusableCache = null;
    }
    close() {
        if (!this._open)
            return;
        this._open = false;
        // Reset for next open - otherwise a panel that stays
        // mounted (future overlay types that don't fully unmount
        // on close) would remain permanently hidden.
        if (this.panel) {
            this.panel.style.visibility = '';
        }
        if (this.options.lockScroll) {
            releaseScrollLock();
        }
        document.removeEventListener('pointerdown', this.handleOutsidePointerDown, true);
        document.removeEventListener('keydown', this.handleDocumentKeyDown, true);
        window.removeEventListener('resize', this.reposition);
        window.removeEventListener('scroll', this.reposition, true);
        document.removeEventListener('load', this.reposition, true);
        this.host.requestUpdate();
        this.options.onOpenChange?.(false);
        if (this.options.restoreFocus) {
            this.previouslyFocused?.focus();
        }
        this.previouslyFocused = null;
    }
    toggle() {
        this._open ? this.close() : this.open();
    }
    setPlacement(placement) {
        this.options.placement = placement;
    }
    applyPosition() {
        if (!this._open || !this.trigger || !this.panel)
            return;
        const triggerRect = this.trigger.getBoundingClientRect();
        const panelRect = this.panel.getBoundingClientRect();
        const { top, left } = computeOverlayPosition(triggerRect, { width: panelRect.width, height: panelRect.height }, { width: window.innerWidth, height: window.innerHeight }, this.options.placement);
        this.panel.style.position = 'fixed';
        this.panel.style.top = `${top}px`;
        this.panel.style.left = `${left}px`;
        this.panel.style.visibility = 'visible';
    }
    ;
    trapTab(event) {
        if (!this.focusableCache) {
            this.focusableCache = getFocusableElement(this.panel);
        }
        const focusable = this.focusableCache;
        if (focusable.length === 0)
            return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;
        if (event.shiftKey && active == first) {
            event.preventDefault();
            last.focus();
        }
        else if (!event.shiftKey && active === last) {
            event.preventDefault();
            first.focus();
        }
    }
    // ReactiveController lifecycle
    hostConnected() {
        // Intentionally empty: listeners are attached is open(),
        // not here - no need to listen document-wide while closed.
    }
    hostUpdate() {
        if (this._open) {
            this.reposition();
        }
    }
    hostDisconnected() {
        // Safety net if the host is removed from the DOM while
        // the overlay is still open - without this, the document
        // listeners from open() would leak.
        this.close();
    }
}
//# sourceMappingURL=overlay-controller.js.map