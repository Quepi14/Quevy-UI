/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-spinner
 * ----------------------------------------------------------
 * Standalone indeterminate loading indicator. Deliberately NOT
 * yet reused by qv-button/qv-state's own inline spinners (3
 * separate implementations now exist) — consumer decided to
 * defer that consolidation. Revisit if a 4th spinner need shows
 * up, or whenever convenient.
 *
 * @packageDocumentation
 */
import { type PropertyValues } from "lit";
import { QvElement } from "@quevy/core";
import type { QvSpinnerSize, QvSpinnerVariant } from "./qv-spinner.types.js";
export declare class QvSpinner extends QvElement {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    size: QvSpinnerSize;
    variant: QvSpinnerVariant;
    /** Accessible label. If unset, the spinner is treated
     *  as decorative (aria-hidden).
     */
    label?: string;
    onConnected(): void;
    protected updated(changedProperties: PropertyValues): void;
    protected render(): import("lit").TemplateResult<1>;
}
//# sourceMappingURL=qv-spinner.d.ts.map