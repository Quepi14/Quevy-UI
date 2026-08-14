import { customElement, property } from "lit/decorators.js";
import { createComponentMetadata, createTagName  } from "@quevy/core"
import type { OverlayControllerOptions } from "../_internal/overlay/overlay-controller.js";
import { QvBottomSheetBase } from "../_internal/bottom-sheet/bottom-sheet-base.js";

@customElement('qv-bottom-sheet')
export class QvBottomSheet extends QvBottomSheetBase {
    public override readonly metadata = createComponentMetadata({
        name:'QvBottomSheet',
        tagName: createTagName('botton-sheet'),
        version: '0.1.1',
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
