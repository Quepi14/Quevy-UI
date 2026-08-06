/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-button
 * ----------------------------------------------------------
 * Standalone interactive button. The host element itself is
 * the focusable, form-associated control (Pola 1) — there is
 * no native <button> inside the shadow root. Keyboard
 * activation (Enter/Space) and tab order are implemented
 * manually here for that reason.
 *
 * @packageDocumentation
 */
import { type PropertyValues } from 'lit';
import { QvElement, type ComponentMetadata } from '@quevy/core';
import type { QvButtonVariant, QvButtonSize, QvButtonType } from './qv-button.types.js';
declare const QvButtonBase: typeof QvElement & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/focusable.js").FocusableInterface> & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/disabled.js").DisabledInterface> & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/form-associated.js").FormAssociatedInterface>;
export declare class QvButton extends QvButtonBase {
    static styles: CSSStyleSheet;
    readonly metadata: ComponentMetadata;
    variant: QvButtonVariant;
    size: QvButtonSize;
    loading: boolean;
    type: QvButtonType;
    /**
     * Whether the button currently rejects all interaction.
     *
     * `disabled` (native attribute) additionally removes the
     * button  from the tab  order - see syncAccessibility().
     * `loading` keeps it focusable/annouceable (aria-busy)
     * but eqully inert to activation.
     */
    private get isInert();
    onConnected(): void;
    onDisconnected(): void;
    protected update(changedProperties: PropertyValues): void;
    private syncAccessibility;
    private readonly handleClick;
    private readonly handleKeyDown;
    private readonly handleKeyUp;
    /**
     * Runs the button's `type` behavior. Only reached for real
     * (non-inert) activations - are handleClick().
     */
    private activate;
    protected render(): import("lit").TemplateResult<1>;
}
export {};
//# sourceMappingURL=qv-button.d.ts.map