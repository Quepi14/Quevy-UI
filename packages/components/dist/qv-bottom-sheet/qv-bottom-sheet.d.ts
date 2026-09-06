import type { OverlayControllerOptions } from "../_internal/overlay/overlay-controller.js";
import { QvBottomSheetBase } from "../_internal/bottom-sheet/bottom-sheet-base.js";
/**
 * @event {CustomEvent<QvBottomSheetToggleEventDetail>} open - Fired when the sheet opens.
 * @event {CustomEvent<QvBottomSheetToggleEventDetail>} close - Fired when the sheet closes.
 */
export declare class QvBottomSheet extends QvBottomSheetBase {
    readonly metadata: import("@quevy/core").ComponentMetadata;
    dismissible: boolean;
    protected overlayOptions(): OverlayControllerOptions;
    protected get hasBackdrop(): boolean;
}
//# sourceMappingURL=qv-bottom-sheet.d.ts.map