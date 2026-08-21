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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, nothing } from "lit";
import { property, customElement } from "lit/decorators.js";
import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";
import { createControllableValue } from "@quevy/state";
import { qvPaginationStyles } from "./qv-pagination.styles.js";
import { buildPageItems } from "./qv-pagination.utils.js";
let QvPagination = class QvPagination extends QvElement {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvPagination',
            tagName: createTagName('pagination'),
            version: '0.1.2',
        });
        this.siblingCount = 1;
        this.controllablePage = createControllableValue(1);
        this.jumpValue = '';
        this.handlePageClick = (page) => {
            this.goTo(page);
        };
        this.handlePrev = () => {
            this.goTo(this.currentPage - 1);
        };
        this.handleNext = () => {
            this.goTo(this.currentPage + 1);
        };
        this.handleJumpInput = (event) => {
            this.jumpValue = event.target.value;
        };
        this.handleJumpKeyDown = (event) => {
            if (event.key !== 'Enter') {
                return;
            }
            const parsed = Number(this.jumpValue);
            if (!Number.isNaN(parsed)) {
                this.goTo(parsed);
            }
            this.jumpValue = '';
            event.target.value = '';
        };
    }
    static { this.styles = qvPaginationStyles; }
    onConnected() {
        this.setAttribute('role', 'navigation');
        this.setAttribute('aria-label', 'Pagination');
    }
    get currentPage() {
        const value = this.controllablePage.value(this.page);
        return Math.min(Math.max(value, 1), this.totalPages);
    }
    goTo(page) {
        const clamped = Math.min(Math.max(page, 1), this.totalPages);
        if (clamped === this.currentPage) {
            return;
        }
        const resolved = this.controllablePage.request(this.page, clamped);
        this.emit('change', { page: resolved });
        this.invalidate();
    }
    render() {
        const current = this.currentPage;
        const items = buildPageItems(current, this.totalPages, this.siblingCount);
        return html `
            <button
                type="button"
                aria-label="Previous page"
                ?disabled=${current <= 1}
                @click=${this.handlePrev}
            >&lsaquo;</button>

            ${items.map((item) => typeof item === 'number'
            ? html `
                        <button
                            type="butotn"
                            aria-current=${item === current ? 'page' : nothing}
                            aria-label=${`Page ${item}`}
                            @click=${() => this.handlePageClick(item)}
                        >${item}</button>
                    `
            : html `<span class="ellipsis" aria-hidden="true">&hellip;</span>`)}

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
};
__decorate([
    property({ type: Number })
], QvPagination.prototype, "totalPages", void 0);
__decorate([
    property({ type: Number })
], QvPagination.prototype, "page", void 0);
__decorate([
    property({ type: Number, attribute: 'sibling-count' })
], QvPagination.prototype, "siblingCount", void 0);
QvPagination = __decorate([
    customElement('qv-pagination')
], QvPagination);
export { QvPagination };
//# sourceMappingURL=qv-pagination.js.map