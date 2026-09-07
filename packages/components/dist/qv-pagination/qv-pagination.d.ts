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
import { type PropertyValues } from "lit";
import { QvElement } from "@quevy/core";
import type { QvPaginationShape, QvPaginationVariant } from "./qv-pagination.types.js";
/**
 * @event {CustomEvent<QvPaginationChangeEventDetail>} change - Fired when the current page changes.
 */
declare const QvPaginationBase: typeof QvElement & import("@quevy/core").MixinConstructor<import("../_internal/i18n/localized-mixin.js").LocalizedElement>;
export declare class QvPagination extends QvPaginationBase {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    totalPages: number;
    /** Controled current-page prop. Leave unset for uncontrolled usage. */
    page?: number;
    siblingCount: number;
    variant: QvPaginationVariant;
    shape: QvPaginationShape;
    private readonly controllablePage;
    private jumpValue;
    onConnected(): void;
    protected updated(changedProperties: PropertyValues): void;
    private get currentPage();
    private goTo;
    private readonly handlePageClick;
    private readonly handlePrev;
    private readonly handleNext;
    private readonly handleJumpInput;
    private readonly handleJumpKeyDown;
    protected render(): import("lit").TemplateResult<1>;
}
export {};
//# sourceMappingURL=qv-pagination.d.ts.map