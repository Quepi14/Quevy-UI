import { customElement, property } from "lit/decorators.js";
import { createComponentMetadata, createTagName  } from "@quevy/core"
import type { OverlayControllerOptions } from "../_internal/overlay/overlay-controller.js";
import { QvBottomSheetBase } from "../_internal/bottom-sheet/bottom-sheet-base.js";
import type { QvBottomSheetToggleEventDetail } from "../_internal/bottom-sheet/bottom-sheet.types.js";

/**
 * @event {CustomEvent<QvBottomSheetToggleEventDetail>} open - Fired when the sheet opens.
 * @event {CustomEvent<QvBottomSheetToggleEventDetail>} close - Fired when the sheet closes.
 */
@customElement('qv-bottom-sheet')
export class QvBottomSheet extends QvBottomSheetBase {
    public override readonly metadata = createComponentMetadata({
        name:'QvBottomSheet',
        tagName: createTagName('botton-sheet'),
        version: '0.1.3',
    });

    @property({ type: Boolean, reflect: true})
    public dismissible = true;

    protected override overlayOptions(): OverlayControllerOptions {
        return {
            lockScroll: true,
            trapFocus: true,
            closeOnOutsideClick: () => this.dismissible,
            onOpenChange: () => this.requestUpdate(),
        };
    }

    protected override get hasBackdrop(): boolean{
        return true
    }
}
