/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-collapsible
 * ----------------------------------------------------------
 * Header is conditional: built-in (title + chevron) when
 * `label` is set and slot="trigger" is empty; fully custom via
 * slot="trigger" otherwise (same fallback pattern as qv-menu's
 * trigger slot).
 *
 * Expand/collapse animation uses grid-template-rows 0fr→1fr —
 * animates to intrinsic content height without any JS
 * measurement (no ResizeObserver, no getBoundingClientRect).
 *
 * @packageDocumentation
 */
import { type PropertyValues } from "lit";
import { QvElement } from "@quevy/core";
export declare class QvCollapsible extends QvElement {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    label?: string;
    /** Controlled prop. Leave unset for uncontrolled usage. */
    open?: boolean;
    disabled: boolean;
    private readonly controllableOpen;
    private hasCustomTrigger;
    private get isOpen();
    onConnected(): void;
    protected updated(changedProperties: PropertyValues): void;
    private toggle;
    private readonly handleTriggerSlotChange;
    protected render(): import("lit").TemplateResult<1>;
}
//# sourceMappingURL=qv-collapsible.d.ts.map