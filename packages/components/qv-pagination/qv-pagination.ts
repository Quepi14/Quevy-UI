/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-pagination
 * ----------------------------------------------------------
 * Same "host contains native <button>/<input>, host itself is
 * not the interactive element" pattern as qv-stepper. Ellipsis
 * entries are purely visual — jumping to a hidden page is done
 * via the jump-to-page input, not by clicking the ellipsis.
 *
 * @packageDocumentation
 */

import { html, nothing, type PropertyValues } from "lit";
import { property, customElement } from "lit/decorators.js";

import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";
import { createControllableValue } from "@quevy/state";

import { qvPaginationStyles } from "./qv-pagination.styles.js";
import { buildPageItems } from "./qv-pagination.utils.js";
import type { QvPaginationChangeEventDetail } from "./qv-pagination.types.js";

@customElement('qv-pagination')
export class QvPagination extends  QvElement {
    static override styles = qvPaginationStyles;

    public override readonly metadata = createComponentMetadata ({
        name: 'QvPagination',
        tagName: createTagName('pagination'),
        version: '0.1.0',
    });

    @property({ type: Number})
    public totalPages!: number;

    /** Controled current-page prop. Leave unset for uncontrolled usage. */
    @property({ type: Number})
    public page?: number;

    @property({ type: Number, attribute: 'sibling-count'})
    public siblingCount = 1;

    private readonly controllablePage = createControllableValue<number>(1);

    private jumpValue = '';

    public override onConnected(): void {
        this.setAttribute('role', 'navigation');
        this.setAttribute('aria-label', 'Pagination');
    }

    private get currentPage(): number {
        const value = this.controllablePage.value(this.page);
        return Math.min(Math.max(value, 1), this.totalPages);
    }

    private goTo (page: number): void {
        const clamped = Math.min(Math.max(page, 1), this.totalPages);

        if (clamped === this.currentPage) {
            return;
        }

        const resolved = this.controllablePage.request(this.page, clamped);
        this.emit<QvPaginationChangeEventDetail>('change', { page: resolved});
        this.invalidate();
    }

    private readonly handlePageClick = (page: number): void => {
        this.goTo(page);
    }

    private readonly handlePrev = (): void => {
        this.goTo(this.currentPage - 1);
    };

    private readonly handleNext = (): void => {
        this.goTo(this.currentPage + 1);
    };

    private readonly handleJumpInput = (event: Event): void => {
        this.jumpValue = (event.target as HTMLInputElement).value;
    };

    private readonly handleJumpKeyDown = (event: KeyboardEvent): void => {
        if (event.key !== 'Enter') {
            return;
        }

        const parsed = Number(this.jumpValue);
        if (!Number.isNaN(parsed)) {
            this.goTo(parsed);
        }
        this.jumpValue ='';
        (event.target as HTMLInputElement).value = '';
    }

    protected override render() {
        const current = this.currentPage;
        const items = buildPageItems(current, this.totalPages, this.siblingCount);

        return html`
            <button
                type="button"
                aria-label="Previous page"
                ?disabled=${current <= 1}
                @click=${this.handlePrev}
            >&lsaquo;</button>

            ${items.map((item) =>
                typeof item === 'number'
                    ? html`
                        <button
                            type="butotn"
                            aria-current=${item === current ? 'page' : nothing}
                            aria-label=${`Page ${item}`}
                            @click=${() => this.handlePageClick(item)}
                        >{item}</button>
                    `
                    : html`<span class="ellipsis" aria-hidden="true">&hellip;</span>`,
            )}

            <button
                type="button"
                aria-label="Next page"
                ?disabled=${current >= this.totalPages}
                @click=${this.handleNext}
            >&rsaquo;</button>

            <span class="jump" part="jump">
                <label for="jump-input" style="font-size; inherit;">Go to</label>
                <input
                    id="jump-input"
                    type="text"
                    inputmode="numeric"
                    aria-label="Jump to page"
                    @input=${this.handleJumpInput}
                    @keydown=${this.handleJumpKeyDown}
                />
            </span>
        `;
    }
}