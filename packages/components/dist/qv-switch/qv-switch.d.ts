/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-switch
 * ----------------------------------------------------------
 * Structurally identical to qv-checkbox (same mixins, same
 * controlled/uncontrolled + keyboard pattern) — only role
 * ("switch" vs "checkbox") and rendering differ. Deliberately
 * NOT sharing an abstract base with qv-checkbox yet: the
 * duplication is small (a handful of lines), and forcing a
 * shared base now would be premature — revisit only if a third
 * toggle-like component needs the same shape.
 *
 * @packageDocumentation
 */
import { type PropertyValues } from "lit";
import { QvElement } from "@quevy/core";
declare const QvSwitchBase: typeof QvElement & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/focusable.js").FocusableInterface> & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/disabled.js").DisabledInterface> & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/form-associated.js").FormAssociatedInterface>;
export declare class QvSwitch extends QvSwitchBase {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    checked?: boolean;
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
//# sourceMappingURL=qv-switch.d.ts.map