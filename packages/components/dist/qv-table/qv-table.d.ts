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
import type { QvTableColumn } from "./qv-table.types.js";
export declare class QvTable extends QvElement {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    colums: QvTableColumn[];
    rows: Record<string, unknown>[];
    title: string;
    rowKey: string;
    selectable: boolean;
    emptyMessage: string;
    private hasFooter;
    private selectedKeys;
    private keyOf;
    private toggleRow;
    private toggleAll;
    private readonly handleFooterSlotChange;
    private renderCell;
    protected render(): import("lit").TemplateResult<1>;
}
//# sourceMappingURL=qv-table.d.ts.map