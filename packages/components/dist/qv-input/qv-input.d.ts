/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-input
 * ----------------------------------------------------------
 * Two variants:
 *   - "default": static label above, native placeholder inside.
 *   - "floating": label sits inside the box like a placeholder,
 *     animates up to overlap the top border on focus/when
 *     filled — pure CSS (:placeholder-shown trick), see
 *     qv-input.styles.ts for why.
 *
 * Same non-Pola-1 pattern as qv-textarea/qv-stepper — a native
 * <input> inside the shadow root does the real work, host is
 * just the form-associated wrapper.
 *
 * @packageDocumentation
 */
import { type PropertyValues } from "lit";
import { QvElement } from "@quevy/core";
import type { QvInputVariant, QvInputType } from "./qv-input.types.js";
declare const QvInputBase: typeof QvElement & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/disabled.js").DisabledInterface> & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/form-associated.js").FormAssociatedInterface>;
export declare class QvInput extends QvInputBase {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    variant: QvInputVariant;
    type: QvInputType;
    label?: string;
    placeholder: string;
    value: string;
    name?: string;
    helperText?: string;
    invalid: boolean;
    maxLength?: number;
    private hasLeading;
    private hasTrailing;
    protected updated(changedProperties: PropertyValues): void;
    private readonly handleInput;
    private readonly handleChange;
    private readonly handleLeadingSlotChange;
    private readonly handleTrailingSlotChange;
    private get counterText();
    protected render(): import("lit").TemplateResult<1>;
}
export {};
//# sourceMappingURL=qv-input.d.ts.map