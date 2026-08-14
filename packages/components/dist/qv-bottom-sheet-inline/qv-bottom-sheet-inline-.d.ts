import type { OverlayControllerOptions } from "../_internal/overlay/overlay-controller.js";
import { QvBottomSheetBase } from "../_internal/bottom-sheet/bottom-sheet-base.js";
/**
 * Non-modal: no backdrop, no scroll lock, no focus trap - the
 * page underneath stays fully usable (scrollable, clickable)
 * while this is open. Good fit for things liek a persistent
 * filter panel or mini-player, not confirmations/forms.
 */
export declare class QvBottomSheetInline extends QvBottomSheetBase {
    readonly metadata: import("@quevy/core").ComponentMetadata;
    protected overlayOptions(): OverlayControllerOptions;
    protected get hasBackdrop(): boolean;
}
//# sourceMappingURL=qv-bottom-sheet-inline-.d.ts.map