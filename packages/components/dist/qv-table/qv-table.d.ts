/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-table
 * ----------------------------------------------------------
 * Data-driven (columns[] + rows[]), renders real <table>
 * markup for correct screen-reader semantics. Pagination is
 * deliberately NOT embedded — compose with the existing
 * <qv-pagination> externally (see usage example) to keep the
 * two decoupled, consistent with how qv-menu/qv-dropdown don't
 * embed qv-button internally either.
 *
 * @packageDocumentation
 */
import { QvElement } from "@quevy/core";
import type { QvTableColumns } from "./qv-table.types.js";
/**
 * @event {CustomEvent<QvTableSelectEventDetail>} select - Fired when the row selection changes.
 */
declare const QvTableBase: typeof QvElement & import("@quevy/core").MixinConstructor<import("../_internal/i18n/localized-mixin.js").LocalizedElement>;
export declare class QvTable extends QvTableBase {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    columns: QvTableColumns[];
    rows: Record<string, unknown>[];
    title: string;
    rowKey: string;
    variant: 'bordered' | 'plain';
    selectable: boolean;
    emptyMessage?: string;
    private hasFooter;
    private selectedKeys;
    private keyOf;
    private toggleRow;
    private toggleAll;
    private readonly handleFooterSlotChange;
    private renderCell;
    protected render(): import("lit").TemplateResult<1>;
}
export {};
//# sourceMappingURL=qv-table.d.ts.map