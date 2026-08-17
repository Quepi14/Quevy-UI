/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-textarea
 * ----------------------------------------------------------
 * Form-associated (participates in <form> submission via
 * ElementInternals, same pattern as qv-stepper). Native
 * <textarea> inside shadow root — host is NOT the interactive
 * element here (unlike qv-button's Pola 1), so no manual
 * keyboard handling needed; the browser handles it for free.
 *
 * @packageDocumentation
 */
import { type PropertyValues } from "lit";
import { QvElement } from "@quevy/core";
declare const QvTextAreaBase: typeof QvElement & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/disabled.js").DisabledInterface> & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/form-associated.js").FormAssociatedInterface>;
export declare class QvTextarea extends QvTextAreaBase {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    label?: string;
    placeholder: string;
    value: string;
    name?: string;
    helperText?: string;
    invalid: boolean;
    maxlength?: number;
    rows: number;
    resize: 'vertical' | 'none';
    protected updated(changeProperties: PropertyValues): void;
    private readonly handleInput;
    private readonly handleChange;
    private get counterText();
    protected render(): import("lit").TemplateResult<1>;
}
export {};
//# sourceMappingURL=qv-textarea.d.ts.map