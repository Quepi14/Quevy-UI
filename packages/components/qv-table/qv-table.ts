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

import { html, nothing, type PropertyValues } from "lit";
import { property, state, customElement } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";

import { qvTableStyles } from "./qv-table.styles.js";
import type { QvTableColumns, QvTableSelectEventDetail } from "./qv-table.types.js";

@customElement('qv-table')
export class QvTable extends QvElement {
    static override styles = qvTableStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvTable',
        tagName: createTagName('table'),
        version: '0.2.2',
    });

    @property({ attribute: false})
    public columns: QvTableColumns[] = [];

    @property({ attribute: false})
    public rows: Record<string, unknown>[] = [];

    @property()
    public title = '';

    @property({ attribute: 'row-key' })
    public rowKey = 'id';

    @property()
    public variant: 'bordered' | 'plain' = 'bordered';

    @property({ type: Boolean, reflect: true })
    public selectable = false;

    @property({ attribute: 'empty-message'})
    public emptyMessage = 'No data available';

    @state() private hasFooter = false;
    @state() private selectedKeys = new Set<string>();

    private keyOf(row: Record<string, unknown>, index: number): string {
        const value = row[this.rowKey];
        return value !== undefined ? String(value) : String(index);
    }

    private toggleRow(key: string): void {
        const next = new Set(this.selectedKeys);
        next.has(key) ? next.delete(key) : next.add(key);
        this.selectedKeys = next;
        this.emit<QvTableSelectEventDetail>('select', { selectedKeys: [...next]});
    }

    private toggleAll(): void {
        const allKeys = this.rows.map((row, i) => this.keyOf(row, i));
        const allSelected = allKeys.every((k) => this.selectedKeys.has(k));

        this.selectedKeys = allSelected ? new Set() : new Set(allKeys);
        this.emit<QvTableSelectEventDetail>('select', { selectedKeys: [...this.selectedKeys] });
    }

    private readonly handleFooterSlotChange = (): void => {
        this.hasFooter = this.hasSlot('footer');
    }

    private renderCell(column: QvTableColumns, row: Record<string, unknown>) {
        return column.render ? column.render(row) : row[column.key];
    }

    protected override render() {
        const allKeys = this.rows.map((row, i) => this.keyOf(row, i));
        const allSelected = allKeys.length > 0 && allKeys.every((k) => this.selectedKeys.has(k))

        return html`
            <div class=${classMap({ 'title-bar': true, empty: !this.title})} part="title-bar">
                ${this.title ?? ''}
            </div>

            <table part="table">
                <thead>
                    <tr>
                        ${this.selectable
                            ? html `
                                <th class="checkbox-cell">
                                    <input
                                        type="checkbox"
                                        .checked=${allSelected}
                                        aria-label="select all rows"
                                        @change=${() => this.toggleAll()}
                                    />
                                </th>
                            `
                        : nothing}
                    ${this.columns.map(
                        (col) => html`
                            <th style=${col.width ? `width:${col.width}` : ''} align=${col.align ?? 'left'}>
                                ${col.label}
                            </th>
                        `,
                    )}
                </tr>
                </thead>

                <tbody>
                    ${this.rows.length === 0
                        ? html`
                            <tr>
                                <td
                                    class="empty-state"
                                    colspan=${this.columns.length + (this.selectable ? 1 : 0)}
                                >${this.emptyMessage}</td>
                            </tr>
                        `
                        : this.rows.map((row, index) => {
                            const key = this.keyOf(row, index);
                            return html`
                                <tr>
                                    ${this.selectable
                                        ? html `
                                            <td class="checkbox-cell">
                                                <input
                                                    type="checkbox"
                                                    .checked=${this.selectedKeys.has(key)}
                                                    aria-label=${`Select row ${key}`}
                                                    @change=${() => this.toggleRow(key)}
                                                />
                                            </td>
                                        `
                                        : nothing}
                                    ${this.columns.map(
                                        (col) => html`<td align=${col.align ?? 'left'}>${this.renderCell(col, row)}</td>`,
                                    )}
                                </tr>
                            `;
                        })}
                </tbody>

                <tfoot class=${this.hasFooter ? '' : 'empty'}>
                    <tr>
                        <td colspan=${this.columns.length + (this.selectable ? 1: 0)}>
                            <slot name="footer" @slotchange=${this.handleFooterSlotChange}></slot>
                        </td>
                    </tr>
                </tfoot>
            </table>
        `;
    }
}