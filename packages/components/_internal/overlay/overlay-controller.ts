/**
 * ----------------------------------------------------------
 * QUEVY UI (internal) — overlay behavior controller
 * ----------------------------------------------------------
 * Shared floating-panel behavior for qv-dropdown and qv-menu:
 * open/close state, anchor positioning, outside-click, Escape,
 * a basic focus trap, and focus restoration on close.
 *
 * NOT a QvController — see file-level discussion for why
 * (QvControllerManager.create() only supports a host-only
 * constructor; this needs options too). Registered directly via
 * host.addController(this), same pattern as
 * integrations/lit/state.ts's ReactiveBinding.
 *
 * Pure overlay mechanics only — no notion of "selected value"
 * (qv-dropdown) vs "action items" (qv-menu). That distinction
 * stays in the components built on top of this.
 *
 * @packageDocumentation
 */
import type { ReactiveController } from 'lit';
import type { QvElement } from '@quevy/core';
import { getFocusableElement } from '@quevy/core';

import { computeOverlayPosition, type OverlayPlacement } from './overlay-position.js';

export interface OverlayControllerOptions {
    placement?: OverlayPlacement;
    closeOnOutsideClick?: boolean | (() => boolean);
    closeOnEscape?: boolean;
    trapFocus?: boolean;
    restoreFocus?: boolean;
    lockScroll?: boolean;
    onOpenChange?: (open: boolean) => void;
}

let scrollLockCount = 0;
let previousHtmlOverflow: string | null = null;

function acquireScrollLock(): void {
    if (scrollLockCount === 0) {
        previousHtmlOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = 'hidden';
    }
    scrollLockCount += 1; 
}

function releaseScrollLock(): void {
    scrollLockCount = Math.max(0, scrollLockCount -1);
    if (scrollLockCount === 0){
        document.documentElement.style.overflow = previousHtmlOverflow ?? '';
        previousHtmlOverflow = null;
    }
}

export class OverlayController implements  ReactiveController {
    public trigger: HTMLElement | null = null;
    public panel : HTMLElement | null = null;

    private readonly options: Required<Omit<OverlayControllerOptions, 'onOpenChange'>> &
        Pick<OverlayControllerOptions, 'onOpenChange'>;
        
    private _open = false;
    private previouslyFocused: HTMLElement | null = null;
        
public constructor(
        private readonly host: QvElement,
        options: OverlayControllerOptions = {},
    ) {
        this.options = {
            placement: options.placement ?? 'bottom-start',
            closeOnOutsideClick: options.closeOnOutsideClick ?? true,
            closeOnEscape: options.closeOnEscape ?? true,
            trapFocus: options.trapFocus  ?? true,
            restoreFocus: options.restoreFocus ?? true,
            lockScroll: options.lockScroll ?? false,
            onOpenChange: options.onOpenChange,
        }
        this.host.addController(this);
    }

    public get isOpen(): boolean {
        return this._open;
    }

    public open(): void {
        if (this._open) return;

        this._open = true;
        this.previouslyFocused = document.activeElement as HTMLElement | null;

        if (this.options.lockScroll) {
            acquireScrollLock();
        }

        document.addEventListener('pointerdown', this.handleOutsidePointerDown, true);
        document.addEventListener('keydown', this.handleDocumentKeyDown, true);
        window.addEventListener('resize', this.reposition);
        window.addEventListener('scroll', this.reposition, true);

        this.host.requestUpdate();
        this.options.onOpenChange?.(true);

        // Wait for the panel to actually be in the DOM (it's
        // conditionally rendered by the host) before positioning
        // or moving focus into it.
        void this.host.updateComplete.then(() => {
            this.reposition();
            if(this.options.trapFocus) {
                getFocusableElement(this.panel ?? this.host)[0]?.focus();
            }
        });
    }

    public close(): void {
        if  (!this._open) return;

        this._open  = false;

        if (this.options.lockScroll) {
            releaseScrollLock();
        }

        document.removeEventListener('pointerdown', this.handleOutsidePointerDown, true);
        document.removeEventListener('keydown', this.handleDocumentKeyDown, true);
        window.removeEventListener('resize', this.reposition);
        window.removeEventListener('scroll', this.reposition, true);

        this.host.requestUpdate();
        this.options.onOpenChange?.(false);

        if(this.options.restoreFocus) {
            this.previouslyFocused?.focus();
        }
        this.previouslyFocused = null;
    }

    public toggle(): void{
        this._open ? this.close() : this.open();
    }

    private readonly reposition = (): void => {
        if  (!this._open || !this.trigger || !this.panel)return;

        const triggerRect = this.trigger.getBoundingClientRect();
        const panelRect = this.panel.getBoundingClientRect();

        const { top, left } = computeOverlayPosition(
            triggerRect,
            { width: panelRect.width, height:  panelRect.height},
            { width: window.innerWidth, height: window.innerHeight},
            this.options.placement,
        );

        this.panel.style.position = 'fixed';
        this.panel.style.top = `${top}px`;
        this.panel.style.left = `${left}px`;
    };

    private readonly handleOutsidePointerDown = (event: PointerEvent): void => {
        const shouldClose = 
            typeof this.options.closeOnOutsideClick === 'function'
                ? this.options.closeOnOutsideClick()
                : this.options.closeOnOutsideClick;

            if (!shouldClose) return;

        const path = event.composedPath();
        if (path.includes(this.host) || (this.panel && path.includes(this.panel))) {
            return;
        }

        this.close();
    };

    private readonly handleDocumentKeyDown = (event: KeyboardEvent): void => {
        if (this.options.closeOnEscape && event.key === 'Escape') {
            event.preventDefault();
            this.close();
            return;
        }

        if (this.options.trapFocus && event.key === 'Tab' && this.panel) {
            this.trapTab(event);
        }
    };

    private trapTab(event: KeyboardEvent): void {
        const focusable = getFocusableElement(this.panel!);
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if(event.shiftKey && active == first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && active === last){
            event.preventDefault();
            first.focus();
        }
    }

    // ReactiveController lifecycle

    public hostConnected(): void {
        // Intentionally empty: listeners are attached is open(),
        // not here - no need to listen document-wide while closed.
    }

    public hostUpdate(): void {
        if (this._open) {
            this.reposition();
        }
    }

    public hostDisconnected(): void {
        // Safety net if the host is removed from the DOM while
        // the overlay is still open - without this, the document
        // listeners from open() would leak.
        this.close();   
    }

}