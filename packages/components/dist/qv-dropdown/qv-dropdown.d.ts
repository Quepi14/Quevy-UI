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
import type { QvDropdownVariant, QvDropdownItem } from "./qv-dropdown.types.js";
declare const QvDropdownBase: typeof QvElement & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/disabled.js").DisabledInterface>;
export declare class QvDropdown extends QvDropdownBase {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    items: QvDropdownItem[];
    /** Controlled value prop. Leave unset for uncontrolled usage. */
    value?: string;
    placeholder: string;
    variant: QvDropdownVariant;
    searchPlaceholder: string;
    private searchTerm;
    private readonly controllableValue;
    private readonly overlay;
    private triggerEl;
    private panelEl;
    private searchInputEl;
    private wasOpen;
    private get currentValue();
    private get selectedItem();
    private get displayLabel();
    protected updated(changedProperties: PropertyValues): void;
    private readonly handleTriggerFocus;
    private readonly handleTriggerInputKeyDown;
    private readonly handleTriggerBlur;
    private readonly handleTriggerClick;
    private readonly handleTriggerKeyDown;
    private readonly handleSearchInput;
    private readonly handleSearchKeyDown;
    private selectItem;
    private commitCustomvalue;
    private get visibleItems();
    private readonly handleOptionKeyDown;
    private readonly handleTriggerInput;
    protected render(): TemplateResult;
}
export {};
//# sourceMappingURL=qv-dropdown.d.ts.map