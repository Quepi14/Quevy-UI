import { customElement, property } from "lit/decorators.js";
import { createComponentMetadata, createTagName } from "@quevy/core";
import type { OverlayController, OverlayControllerOptions } from "../_internal/overlay/overlay-controller.js";
import { QvSideSheetBase } from "../_internal/side-sheet/side-sheet-base.js";
import type { QvSideSheetToggleEventDetail } from "../_internal/side-sheet/side-sheet.types.js";

/**
 * @event {CustomEvent<QvSideSheetToggleEventDetail>} open - Fired when the sheet opens.
 * @event {CustomEvent<QvSideSheetToggleEventDetail>} close - Fired when the sheet closes.
 */

@customElement('qv-side-sheet')
export class QvSideSheet extends QvSideSheetBase {
    public override readonly metadata = createComponentMetadata({
        name: 'QvSideSheet',
        tagName: createTagName('side-sheet'),
        version: '0.1.0',
    });

    @property({ type: Boolean, reflect: true })
    public dismissible = true;

    protected override overlayOptions(): OverlayControllerOptions {
        return {
            lockScroll: true,
            trapFocus: true,
            closeOnOutsideClick: () => this.dismissible,
            onOpenChange: () => this.requestUpdate(),
        };
    }

    protected override get hasBackdrop(): boolean {
        return true
    }
}