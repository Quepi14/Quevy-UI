/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-breadcrumbs
 * ----------------------------------------------------------
 * Data-driven (items array), supporting two usage modes based
 * on whether each item has an `href`:
 *   - Navigation mode: href present → real <a>, browser navigates.
 *   - Filter mode: href absent → <button>, emits `select` with
 *     the item's id/label/index; consumer decides what happens
 *     (e.g. drop filters below this level).
 *
 * Custom separators use a single hidden <slot name="separator">
 * as a template source, cloned per gap — see file-level note in
 * the surrounding discussion for why a literal repeated named
 * slot doesn't work here.
 *
 * @packageDocumentation
 */
import { type PropertyValues } from "lit";
import { QvElement, type ComponentMetadata } from "@quevy/core";
import type { QvBreadcrumbItem } from "./qv-bradcrumbs.types.js";
export declare class QvBreadcrumbs extends QvElement {
    static styles: CSSStyleSheet;
    readonly metadata: ComponentMetadata;
    items: QvBreadcrumbItem[];
    maxVisible: number;
    private expanded;
    private customSeparator;
    onConnected(): void;
    willUpdate(changedProperties: PropertyValues): void;
    private get visibleEntries();
    private readonly handleSeparatorSlotChange;
    private readonly handleExpand;
    private handleSelect;
    private renderSeparator;
    private renderItem;
    protected render(): import("lit").TemplateResult<1>;
}
//# sourceMappingURL=qv-bradcrumbs.d.ts.map