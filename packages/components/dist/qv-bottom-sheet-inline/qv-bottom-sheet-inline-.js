var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement } from "lit/decorators.js";
import { createComponentMetadata, createTagName } from "@quevy/core";
import { QvBottomSheetBase } from "../_internal/bottom-sheet/bottom-sheet-base.js";
/**
 * Non-modal: no backdrop, no scroll lock, no focus trap - the
 * page underneath stays fully usable (scrollable, clickable)
 * while this is open. Good fit for things liek a persistent
 * filter panel or mini-player, not confirmations/forms.
 */
let QvBottomSheetInline = class QvBottomSheetInline extends QvBottomSheetBase {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvBottomSheetInline',
            tagName: createTagName('bottom-sheet-inline'),
            version: '0.1.1',
        });
    }
    overlayOptions() {
        return {
            lockScroll: false,
            trapFocus: false,
            restoreFocus: false,
            closeOnOutsideClick: false,
            onOpenChange: () => this.requestUpdate(),
        };
    }
    get hasBackdrop() {
        return false;
    }
};
QvBottomSheetInline = __decorate([
    customElement('qv-bottom-sheet-inline')
], QvBottomSheetInline);
export { QvBottomSheetInline };
//# sourceMappingURL=qv-bottom-sheet-inline-.js.map