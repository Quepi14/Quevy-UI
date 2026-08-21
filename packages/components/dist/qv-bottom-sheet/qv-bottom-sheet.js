var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property } from "lit/decorators.js";
import { createComponentMetadata, createTagName } from "@quevy/core";
import { QvBottomSheetBase } from "../_internal/bottom-sheet/bottom-sheet-base.js";
let QvBottomSheet = class QvBottomSheet extends QvBottomSheetBase {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvBottomSheet',
            tagName: createTagName('botton-sheet'),
            version: '0.1.3',
        });
        this.dismissible = true;
    }
    overlayOptions() {
        return {
            lockScroll: true,
            trapFocus: true,
            closeOnOutsideClick: () => this.dismissible,
            onOpenChange: () => this.requestUpdate(),
        };
    }
    get hasBackdrop() {
        return true;
    }
};
__decorate([
    property({ type: Boolean, reflect: true })
], QvBottomSheet.prototype, "dismissible", void 0);
QvBottomSheet = __decorate([
    customElement('qv-bottom-sheet')
], QvBottomSheet);
export { QvBottomSheet };
//# sourceMappingURL=qv-bottom-sheet.js.map