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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, nothing } from "lit";
import { property, state, customElement } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";
import { qvTableStyles } from "./qv-table.styles.js";
let QvTable = class QvTable extends QvElement {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvTable',
            tagName: createTagName('table'),
            version: '0.2.0',
        });
        this.colums = [];
        this.rows = [];
        this.title = '';
        this.rowKey = 'id';
        this.variant = 'bordered';
        this.selectable = false;
        this.emptyMessage = 'No data available';
        this.hasFooter = false;
        this.selectedKeys = new Set();
        this.handleFooterSlotChange = () => {
            this.hasFooter = this.hasSlot('footer');
        };
    }
    static { this.styles = qvTableStyles; }
    keyOf(row, index) {
        const value = row[this.rowKey];
        return value !== undefined ? String(value) : String(index);
    }
    toggleRow(key) {
        const next = new Set(this.selectedKeys);
        next.has(key) ? next.delete(key) : next.add(key);
        this.selectedKeys = next;
        this.emit('select', { selectedKeys: [...next] });
    }
    toggleAll() {
        const allKeys = this.rows.map((row, i) => this.keyOf(row, i));
        const allSelected = allKeys.every((k) => this.selectedKeys.has(k));
        this.selectedKeys = allSelected ? new Set() : new Set(allKeys);
        this.emit('select', { selectedKeys: [...this.selectedKeys] });
    }
    renderCell(column, row) {
        return column.render ? column.render(row) : row[column.key];
    }
    render() {
        const allKeys = this.rows.map((row, i) => this.keyOf(row, i));
        const allSelected = allKeys.length > 0 && allKeys.every((k) => this.selectedKeys.has(k));
        return html `
            <div class=${classMap({ 'title-bar': true, empty: !this.title })} part="title-bar">
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
                    ${this.colums.map((col) => html `
                            <th style=${col.width ? `width:${col.width}` : ''} align=${col.align ?? 'left'}>
                                ${col.label}
                            </th>
                        `)}
                </tr>
                </thead>

                <tbody>
                    ${this.rows.length === 0
            ? html `
                            <tr>
                                <td
                                    class="empty-state"
                                    colspan=${this.colums.length + (this.selectable ? 1 : 0)}
                                >${this.emptyMessage}</td>
                            </tr>
                        `
            : this.rows.map((row, index) => {
                const key = this.keyOf(row, index);
                return html `
                                <tr>
                                    ${this.selectable
                    ? html `
                                            <td class="checlbox-cell">
                                                <input
                                                    type="checkbox"
                                                    .checked=${this.selectedKeys.has(key)}
                                                    aria-label=${`Select row ${key}`}
                                                    @change=${() => this.toggleRow(key)}
                                                />
                                            </td>
                                        `
                    : nothing}
                                    ${this.colums.map((col) => html `<td align=${col.align ?? 'left'}>${this.renderCell(col, row)}</td>`)}
                                </tr>
                            `;
            })}
                </tbody>

                <tfoot class=${this.hasFooter ? '' : 'empty'}>
                    <tr>
                        <td colspan=${this.colums.length + (this.selectable ? 1 : 0)}>
                            <slot name="footer" @slotchange=${this.handleFooterSlotChange}></slot>
                        </td>
                    </tr>
                </tfoot>
            </table>
        `;
    }
};
__decorate([
    property({ attribute: false })
], QvTable.prototype, "colums", void 0);
__decorate([
    property({ attribute: false })
], QvTable.prototype, "rows", void 0);
__decorate([
    property()
], QvTable.prototype, "title", void 0);
__decorate([
    property()
], QvTable.prototype, "rowKey", void 0);
__decorate([
    property()
], QvTable.prototype, "variant", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], QvTable.prototype, "selectable", void 0);
__decorate([
    property()
], QvTable.prototype, "emptyMessage", void 0);
__decorate([
    state()
], QvTable.prototype, "hasFooter", void 0);
__decorate([
    state()
], QvTable.prototype, "selectedKeys", void 0);
QvTable = __decorate([
    customElement('qv-table')
], QvTable);
export { QvTable };
//# sourceMappingURL=qv-table.js.map