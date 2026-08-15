/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-progress
 * ----------------------------------------------------------
 * Horizontal loading bar. Indeterminate when `value` is unset
 * (default), determinate once a numeric `value` is provided.
 *
 * @packageDocumentation
 */
import { type PropertyValues } from "lit";
import { QvElement } from "@quevy/core";
import type { QvProgressVariant } from "./qv-progress.types.js";
export declare class QvProgress extends QvElement {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    /** Leave unset for indeterminate mode. */
    value?: number;
    max: number;
    variant: QvProgressVariant;
    private get isIndeterminate();
    private get percentage();
    protected updated(changedProperties: PropertyValues): void;
    protected render(): import("lit").TemplateResult<1>;
}
//# sourceMappingURL=qv-progress.d.ts.map