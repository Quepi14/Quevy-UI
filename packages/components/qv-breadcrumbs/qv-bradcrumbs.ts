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

import { html, nothing, type CSSResultGroup, type PropertyValues } from "lit";
import { property, state, customElement } from "lit/decorators.js";

import { QvElement, createComponentMetadata, createTagName, type ComponentMetadata } from "@quevy/core";

import { qvBreadcrumbsStyles } from "./qv-bradcrumbs.styles.js";
import type { QvBreadcrumbItem } from "./qv-bradcrumbs.types.js";

type Entry =
    | { kind: 'item'; item: QvBreadcrumbItem; index: number; isLast: boolean }
    | { kind: 'ellipsis' };

const DEFAULT_SEPARATOR = html `
    <svg viewBox="0 0 20 20" fill="currentColor">
        <path d="M7.3 4.3a1 1 0 011.4 0l5 5a1 1 0 010 1.4l-5 5a1 1 0 01-1.4-1.4L11.6 10 7.3 5.7a1 1 0 010-1.4z" />
    </svg>
`;

@customElement('qv-breadcrumbs')
export class QvBreadcrumbs extends QvElement {
    static override styles = qvBreadcrumbsStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvBreadcrumbs',
        tagName: createTagName('breadcrumbs'),
        version: '0.1.0',
    });

    @property({  attribute: false })
    public items: QvBreadcrumbItem[] = [];

    @property({ type: Number, attribute: 'max-visible'})
    public maxVisible = 5;

    @state() private expanded = false;
    @state() private customSeparator: Element | null = null;

    public override onConnected(): void {
        this.setAttribute('role', 'navigation');
        this.setAttribute('aria-label', 'Breadcrumb')
    }

    public override willUpdate(changedProperties: PropertyValues): void {
        super.willUpdate(changedProperties);

        if (changedProperties.has('items')) {
            // A shorter/changed item list may make the previous
            // expand choice meaningless; reset it.
            this.expanded = false;
        }
    }

    private get visibleEntries(): Entry[] {
        const { items,  maxVisible } = this;
        const lastIndex = items.length - 1;

        if (this.expanded || items.length <=  maxVisible) {
            return items.map((item, index) => ({
                kind: 'item',
                item,
                index,
                isLast: index === lastIndex,
            }));
        }

        const tailCount = Math.max(maxVisible - 1, 1);
        const tailStart = items.length - tailCount;

        const entries: Entry[] = [
            { kind: 'item', item: items[0], index: 0, isLast: lastIndex === 0 },
            { kind: 'ellipsis' },
        ];

        for (let i = tailStart;  i <items.length; i += 1)  {
            entries.push({ kind: 'item', item: items[i], index: i, isLast: i ===  lastIndex});
        }

        return entries;
    }

    private readonly handleSeparatorSlotChange = (event: Event): void => {
        const slot = event.target as HTMLSlotElement;
        this.customSeparator  = slot.assignedElements()[0] ?? null;
    };

    private readonly handleExpand = (): void => {
        this.expanded = true;
    };

    private handleSelect(entry: Extract<Entry, { kind: 'item'}>, event: Event): void {
        event.preventDefault();
        this.emit('select', {
            id: entry.item.id,
            label: entry.item.label,
            index: entry.index,
        });
    }

    private renderSeparator() {
        return this.customSeparator ? this.customSeparator.cloneNode(true) : DEFAULT_SEPARATOR;
    }

    private renderItem(entry: Extract<Entry, { kind: 'item'}>) {
        const { item, isLast } = entry;
        const ariaCurrent = isLast ? 'page' : nothing;

        if (item.href) {
            return html`<a href=${item.href} aria-current=${ariaCurrent} part="item">${item.label}</a>`;
        }

        return html`
            <button
                type="button"
                aria-current=${ariaCurrent}
                part="item"
                @click=${(event: Event) => this.handleSelect(entry, event)}
            >${item.label}</button>
        `;
    }

    protected override render() {
        const entries = this.visibleEntries;

        return html`
            <slot name="separator" hidden @slotchange=${this.handleSeparatorSlotChange}></slot>
            <ol>
                ${entries.map(
                    (entry, i) => html`
                        <li part="list-item">
                            ${entry.kind === 'item'
                                ? this.renderItem(entry)
                                : html`
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
                    `,
                )}
            </ol>
        `;
    }
}