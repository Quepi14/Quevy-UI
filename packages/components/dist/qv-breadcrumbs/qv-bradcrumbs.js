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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, nothing } from "lit";
import { property, state, customElement } from "lit/decorators.js";
import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";
import { qvBreadcrumbsStyles } from "./qv-bradcrumbs.styles.js";
const DEFAULT_SEPARATOR = html `
    <svg viewBox="0 0 20 20" fill="currentColor">
        <path d="M7.3 4.3a1 1 0 011.4 0l5 5a1 1 0 010 1.4l-5 5a1 1 0 01-1.4-1.4L11.6 10 7.3 5.7a1 1 0 010-1.4z" />
    </svg>
`;
let QvBreadcrumbs = class QvBreadcrumbs extends QvElement {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvBreadcrumbs',
            tagName: createTagName('breadcrumbs'),
            version: '0.1.0',
        });
        this.items = [];
        this.maxVisible = 5;
        this.expanded = false;
        this.customSeparator = null;
        this.handleSeparatorSlotChange = (event) => {
            const slot = event.target;
            this.customSeparator = slot.assignedElements()[0] ?? null;
        };
        this.handleExpand = () => {
            this.expanded = true;
        };
    }
    static { this.styles = qvBreadcrumbsStyles; }
    onConnected() {
        this.setAttribute('role', 'navigation');
        this.setAttribute('aria-label', 'Breadcrumb');
    }
    willUpdate(changedProperties) {
        super.willUpdate(changedProperties);
        if (changedProperties.has('items')) {
            // A shorter/changed item list may make the previous
            // expand choice meaningless; reset it.
            this.expanded = false;
        }
    }
    get visibleEntries() {
        const { items, maxVisible } = this;
        const lastIndex = items.length - 1;
        if (this.expanded || items.length <= maxVisible) {
            return items.map((item, index) => ({
                kind: 'item',
                item,
                index,
                isLast: index === lastIndex,
            }));
        }
        const tailCount = Math.max(maxVisible - 1, 1);
        const tailStart = items.length - tailCount;
        const entries = [
            { kind: 'item', item: items[0], index: 0, isLast: lastIndex === 0 },
            { kind: 'ellipsis' },
        ];
        for (let i = tailStart; i < items.length; i += 1) {
            entries.push({ kind: 'item', item: items[i], index: i, isLast: i === lastIndex });
        }
        return entries;
    }
    handleSelect(entry, event) {
        event.preventDefault();
        this.emit('select', {
            id: entry.item.id,
            label: entry.item.label,
            index: entry.index,
        });
    }
    renderSeparator() {
        return this.customSeparator ? this.customSeparator.cloneNode(true) : DEFAULT_SEPARATOR;
    }
    renderItem(entry) {
        const { item, isLast } = entry;
        const ariaCurrent = isLast ? 'page' : nothing;
        if (item.href) {
            return html `<a href=${item.href} aria-current=${ariaCurrent} part="item">${item.label}</a>`;
        }
        return html `
            <button
                type="button"
                aria-current=${ariaCurrent}
                part="item"
                @click=${(event) => this.handleSelect(entry, event)}
            >${item.label}</button>
        `;
    }
    render() {
        const entries = this.visibleEntries;
        return html `
            <slot name="separator" hidden @slotchange=${this.handleSeparatorSlotChange}></slot>
            <ol>
                ${entries.map((entry, i) => html `
                        <li part="list-item">
                            ${entry.kind === 'item'
            ? this.renderItem(entry)
            : html `
                                    <button
                                        type="button"
                                        class="ellipsis"
                                        part="ellipsis"
                                        aria-label="Show hidden breadcrumb items"
                                        @click=${this.handleExpand}
                                    >&hellip;</button>
                                `}
                        </li>
                        ${i < entries.length - 1
            ? html `<li class="separator" part="separator" aria-hidden="true">${this.renderSeparator()}</li>`
            : nothing}
                    `)}
            </ol>
        `;
    }
};
__decorate([
    property({ attribute: false })
], QvBreadcrumbs.prototype, "items", void 0);
__decorate([
    property({ type: Number, attribute: 'max-visible' })
], QvBreadcrumbs.prototype, "maxVisible", void 0);
__decorate([
    state()
], QvBreadcrumbs.prototype, "expanded", void 0);
__decorate([
    state()
], QvBreadcrumbs.prototype, "customSeparator", void 0);
QvBreadcrumbs = __decorate([
    customElement('qv-breadcrumbs')
], QvBreadcrumbs);
export { QvBreadcrumbs };
//# sourceMappingURL=qv-bradcrumbs.js.map