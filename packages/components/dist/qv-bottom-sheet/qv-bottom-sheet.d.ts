import type { OverlayControllerOptions } from "../_internal/overlay/overlay-controller.js";
import { QvBottomSheetBase } from "../_internal/bottom-sheet/bottom-sheet-base.js";
export declare class QvBottomSheet extends QvBottomSheetBase {
    readonly metadata: import("@quevy/core").ComponentMetadata;
    dismissible: boolean;
    protected overlayOptions(): OverlayControllerOptions;
    protected get hasBackdrop(): boolean;
}
//# sourceMappingURL=qv-bottom-sheet.d.ts.map