import { customElement } from "lit/decorators.js";
import { createComponentMetadata, createTagName } from "@quevy/core";
import type { OverlayControllerOptions } from "../_internal/overlay/overlay-controller.js";
import { QvBottomSheetBase } from "../_internal/bottom-sheet/bottom-sheet-base.js";

/**
 * Non-modal: no backdrop, no scroll lock, no focus trap - the
 * page underneath stays fully usable (scrollable, clickable)
 * while this is open. Good fit for things liek a persistent
 * filter panel or mini-player, not confirmations/forms.
 */
@customElement('qv-bottom-sheet-inline')
export class QvBottomSheetInline extends QvBottomSheetBase {
    public override readonly metadata = createComponentMetadata({
        name: 'QvBottomSheetInline',
        tagName: createTagName('bottom-sheet-inline'),
        version: '0.1.0',
    });

    protected override overlayOptions(): OverlayControllerOptions {
        return {
            lockScroll: false,
            trapFocus: false,
            restoreFocus: false,
            closeOnOutsideClick: false,
            onOpenChange: () => this.requestUpdate(),
        };
    }

    protected override get hasBackdrop(): boolean {
        return false;
    }
}