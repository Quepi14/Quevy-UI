import { customElement } from "lit/decorators.js";
import { createComponentMetadata, createTagName, type ComponentMetadata } from "@quevy/core";
import type { OverlayControllerOptions } from "../_internal/overlay/overlay-controller.js";
import { QvSideSheetBase } from "../_internal/side-sheet/side-sheet-base.js";

/**
 * Non-modal: no backdrop, no scroll lock, no focus trap - the 
 * page underneath stays fully usable (scrollable, clickable)
 * while this is open. Good fit for things like a persistent
 * filter panel or detail rail, not confirmation/forms.
 */
@customElement('qv-side-sheet-inline')
export class QvSideSheetInline extends QvSideSheetBase {
    public override readonly metadata = createComponentMetadata({
        name: 'QvSideSheetInline',
        tagName: createTagName('side-sheet-inline'),
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