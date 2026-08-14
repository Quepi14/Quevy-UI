/**
 * ----------------------------------------------------------
 * QUEVY UI (internal) — shared bottom sheet base
 * ----------------------------------------------------------
 * Not itself a custom element (no @customElement) — abstract
 * base for qv-bottom-sheet (modal) and qv-bottom-sheet-inline
 * (non-modal). Subclasses differ only in overlayOptions() and
 * hasBackdrop; everything else (slots, size, drag, controlled/
 * uncontrolled open) is shared here.
 *
 * IMPLEMENTATION CONSTRAINT: overlayOptions() is called from
 * this base class's constructor (to build the OverlayController
 * early). At that point, subclass field initializers have NOT
 * run yet — a classic JS superclass-constructor-calls-overridden-
 * method hazard. Subclasses MUST only read their own fields
 * lazily inside closures (e.g. `() => this.dismissible`), never
 * synchronously in the returned options object itself.
 *
 * @packageDocumentation
 */
import { nothing, type PropertyValues } from 'lit';
import { QvElement } from '@quevy/core';
import { OverlayController, type OverlayControllerOptions } from '../overlay/overlay-controller.js';
export type QvBottomSheetSize = 'sm' | 'md' | 'lg' | 'fullscreen';
export declare abstract class QvBottomSheetBase extends QvElement {
    static styles: CSSStyleSheet;
    size: QvBottomSheetSize;
    open?: boolean;
    closable: boolean;
    protected readonly controllableOpen: import("@quevy/state").ControllableValue<boolean>;
    protected readonly overlay: OverlayController;
    private readonly drag;
    protected panelEl: HTMLElement | null;
    private handleEl;
    protected hasHeaderTitle: boolean;
    protected hasFooter: boolean;
    protected constructor();
    protected abstract overlayOptions(): OverlayControllerOptions;
    protected abstract get hasBackdrop(): boolean;
    protected get isOpen(): boolean;
    willUpdate(changedProperties: PropertyValues): void;
    protected updated(changedProperties: PropertyValues): void;
    show(): void;
    close(): void;
    private readonly handleTitleSlotChange;
    private readonly handleFooterSlotChange;
    protected render(): typeof nothing | import("lit").TemplateResult<1>;
}
//# sourceMappingURL=bottom-sheet-base.d.ts.map