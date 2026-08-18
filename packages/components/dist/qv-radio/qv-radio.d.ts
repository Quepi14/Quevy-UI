/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-radio
 * ----------------------------------------------------------
 * Deliberately NOT self-managing `checked` — that's pushed down
 * imperatively by the enclosing qv-radio-group. This component
 * only reports intent (click/keyboard) via a plain DOM event
 * the group listens for; it never decides its own checked state.
 *
 * @packageDocumentation
 */
import { type PropertyValues } from "lit";
import { QvElement } from "@quevy/core";
declare const QvRadioBase: typeof QvElement & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/focusable.js").FocusableInterface> & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/disabled.js").DisabledInterface>;
export declare class QvRadio extends QvRadioBase {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    value: string;
    /** Set imperatively by the parent qv-radio-group - do not bind this from outside. */
    checked: boolean;
    onConnected(): void;
    onDisconnected(): void;
    protected updated(changedProperties: PropertyValues): void;
    private readonly handleActivate;
    private readonly handleKeyDown;
    private readonly handleKeyUp;
    protected render(): import("lit").TemplateResult<1>;
}
export {};
//# sourceMappingURL=qv-radio.d.ts.map