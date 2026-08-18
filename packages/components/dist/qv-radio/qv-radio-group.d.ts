/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-radio-group
 * ----------------------------------------------------------
 * Coordinates single-select among light-DOM qv-radio children —
 * plain DOM query + direct property assignment, no Context API,
 * per the "Compound Components" decision from core's audit
 * (DOM hierarchy + events is enough; don't build a
 * ContextManager without a concrete need). This is that
 * concrete need, resolved the simple way.
 *
 * The ONLY form-associated element here is the group itself —
 * individual qv-radio children are not (matches how a native
 * radio group submits exactly one value under one shared name).
 *
 * @packageDocumentation
 */
import { type PropertyValues } from "lit";
import { QvElement } from "@quevy/core";
declare const QvRadioGroupBase: typeof QvElement & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/form-associated.js").FormAssociatedInterface>;
export declare class QvRadioGroup extends QvRadioGroupBase {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    /** Controlled prop. Leave unset for uncontrolled usage. */
    value?: string;
    name?: string;
    private readonly controllableValue;
    private get currentValue();
    onConnected(): void;
    onDisconnected(): void;
    private get radios();
    protected updated(changedProperties: PropertyValues): void;
    /** Pushes checked/roving-tabindex state down
     * to every qv-radio child. Called on every
     * update, not just once, so it stays correct
     * if children are added/removed dynamically.
     */
    private syncChildren;
    private readonly handleActivate;
    private readonly handleArrowNav;
    protected render(): import("lit").TemplateResult<1>;
}
export {};
//# sourceMappingURL=qv-radio-group.d.ts.map