/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-dropdown
 * ----------------------------------------------------------
 * Built on top of the shared OverlayController (open/close,
 * positioning, outside-click, Escape, focus trap, focus
 * restoration). This file owns only dropdown-specific
 * semantics: single-value selection and the listbox roving
 * keyboard pattern.
 *
 * First real consumer of @quevy/core's `query` decorator.
 *
 * @packageDocumentation
 */
import { type PropertyValues, type TemplateResult } from "lit";
import { QvElement } from "@quevy/core";
import type { QvDropdownItem } from "./qv-dropdown.types.js";
declare const QvDropdownBase: typeof QvElement & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/disabled.js").DisabledInterface>;
export declare class QvDropdown extends QvDropdownBase {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    items: QvDropdownItem[];
    /** Controlled value prop. Leave unset for uncontrolled usage. */
    value?: string;
    placeholder: string;
    private readonly controllableValue;
    private readonly overlay;
    private triggerEl;
    private panelEl;
    private get currentValue();
    private get selectedItem();
    protected updated(changedProperties: PropertyValues): void;
    private readonly handleTriggerClick;
    private readonly handleTriggerKeyDown;
    private selectItem;
    private readonly handleOptionKeyDown;
    protected render(): TemplateResult;
}
export {};
//# sourceMappingURL=qv-dropdown.d.ts.map