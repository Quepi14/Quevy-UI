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
import { type OverlayPlacement } from './overlay-position.js';
export interface OverlayControllerOptions {
    placement?: OverlayPlacement;
    closeOnOutsideClick?: boolean | (() => boolean);
    closeOnEscape?: boolean;
    trapFocus?: boolean;
    restoreFocus?: boolean;
    lockScroll?: boolean;
    onOpenChange?: (open: boolean) => void;
}
export declare class OverlayController implements ReactiveController {
    private readonly host;
    trigger: HTMLElement | null;
    panel: HTMLElement | null;
    private readonly options;
    private _open;
    private previouslyFocused;
    constructor(host: QvElement, options?: OverlayControllerOptions);
    get isOpen(): boolean;
    private focusableCache;
    open(): void;
    close(): void;
    toggle(): void;
    private repositionScheduled;
    private readonly reposition;
    private applyPosition;
    private readonly handleOutsidePointerDown;
    private readonly handleDocumentKeyDown;
    private trapTab;
    hostConnected(): void;
    hostUpdate(): void;
    hostDisconnected(): void;
}
//# sourceMappingURL=overlay-controller.d.ts.map