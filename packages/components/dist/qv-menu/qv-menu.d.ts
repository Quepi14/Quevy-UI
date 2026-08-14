/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-menu
 * ----------------------------------------------------------
 * Built on the shared OverlayController, same as qv-dropdown.
 * Unlike qv-dropdown, this holds no "selected value" — every
 * item click is a one-shot action (navigate via href, or emit
 * `select` for the consumer to handle).
 *
 * Trigger is slotted: defaults to a kebab icon (⋮) when empty,
 * but accepts any custom content — this is what makes it also
 * fit the navbar "Products ▾" use case, not just card kebab
 * menus.
 *
 * @packageDocumentation
 */
import { type PropertyValues } from "lit";
import { QvElement } from "@quevy/core";
import type { QvMenuItem } from "./qv-menu.types.js";
export declare class QvMenu extends QvElement {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    items: QvMenuItem[];
    label: string;
    private hasCustomTrigger;
    private readonly overlay;
    private triggerEl;
    private panelEl;
    protected updated(changedProperties: PropertyValues): void;
    private readonly handleTriggerSlotChange;
    private readonly handleTriggerClick;
    private readonly handleTriggerKeyDown;
    private selectItem;
    private readonly handleItemKeyDown;
    protected render(): import("lit").TemplateResult<1>;
}
//# sourceMappingURL=qv-menu.d.ts.map