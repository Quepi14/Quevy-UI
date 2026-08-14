/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-modal
 * ----------------------------------------------------------
 * Built on OverlayController with `trigger` intentionally left
 * null (no anchor positioning — centered via CSS) and
 * `lockScroll: true` (new capability added to the controller
 * for this component and the upcoming bottom sheets).
 *
 * @packageDocumentation
 */
import { nothing, type PropertyValues } from "lit";
import { QvElement } from "@quevy/core";
import type { QvModalSize } from "./qv-modal.types.js";
export declare class QvModal extends QvElement {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    size: QvModalSize;
    /** Controlled open prop. Leave unset for uncontrolled usage. */
    open?: boolean;
    dismissible: boolean;
    closable: boolean;
    private readonly controllableOpen;
    private readonly overlay;
    private panelEl;
    private hasHeaderTitle;
    private hasFooter;
    private get isOpen();
    willUpdate(changedProperties: PropertyValues): void;
    protected updated(changedProperties: PropertyValues): void;
    /** Public method - consumers can call modelEl.show() directly (uncontrolled usage)*/
    show(): void;
    close(): void;
    readonly handleTitleSlotChange: () => void;
    private readonly handleFooterSlotChange;
    protected render(): typeof nothing | import("lit").TemplateResult<1>;
}
//# sourceMappingURL=qv-modal.d.ts.map