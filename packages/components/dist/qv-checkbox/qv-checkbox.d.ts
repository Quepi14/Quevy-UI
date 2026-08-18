/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-checkbox
 * ----------------------------------------------------------
 * Pola 1 (host is the interactive element), same trio of mixins
 * as qv-button. Keyboard activation is Space only — Enter is
 * intentionally NOT wired, matching native <input
 * type="checkbox"> behavior (Enter submits the enclosing form
 * instead, it doesn't toggle the checkbox).
 *
 * `indeterminate` is presentation-only (no separate value it
 * resolves to) — same convention as the native checkbox's
 * .indeterminate property: purely visual, doesn't change what
 * `checked` reports.
 *
 * @packageDocumentation
 */
import { type PropertyValues } from "lit";
import { QvElement } from "@quevy/core";
declare const QvCheckboxBase: typeof QvElement & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/focusable.js").FocusableInterface> & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/disabled.js").DisabledInterface> & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/form-associated.js").FormAssociatedInterface>;
export declare class QvCheckbox extends QvCheckboxBase {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    /** Controlled prop. Leave unset for uncontrolled usage. */
    checked?: boolean;
    indeterminate: boolean;
    name?: string;
    value: string;
    private readonly controllableChecked;
    private get isChecked();
    onConnected(): void;
    onDisconnected(): void;
    protected updated(changedProperties: PropertyValues): void;
    private toggle;
    private readonly handleClick;
    private readonly handleKeyDown;
    private readonly handleKeyUp;
    protected render(): import("lit").TemplateResult<1>;
}
export {};
//# sourceMappingURL=qv-checkbox.d.ts.map