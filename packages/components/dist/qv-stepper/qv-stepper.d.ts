/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-stepper
 * ----------------------------------------------------------
 * Composite widget (decrement button, editable input, increment
 * button) — unlike qv-button/qv-card, the HOST is not itself
 * the interactive element (Pola 1 doesn't apply here); the real
 * interactive elements are native <button>/<input> inside the
 * shadow root, each with their own focus/keyboard handling for
 * free from the browser.
 *
 * canIncrement/canDecrement are plain getters, not
 * @quevy/state Computed — see surrounding discussion for why.
 *
 * @packageDocumentation
 */
import { type PropertyValues } from 'lit';
import { QvElement } from '@quevy/core';
import type { QvStepperShape, QvStepperVariant, QvStepperSize } from './qv-stepper.types.js';
export interface QvStepperChangeEventDetail {
    value: number;
}
declare const QvStepperBase: typeof QvElement & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/disabled.js").DisabledInterface> & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/form-associated.js").FormAssociatedInterface>;
export declare class QvStepper extends QvStepperBase {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    min: number;
    max: number;
    step: number;
    /**Controlled value prop, Leave unset for uncontrolled usage. */
    value?: number;
    name?: string;
    variant: QvStepperVariant;
    shape: QvStepperShape;
    size: QvStepperSize;
    private readonly controllableValue;
    private get currentValue();
    private get canDecrement();
    private get canIncrement();
    private clamp;
    protected updated(changedProperties: PropertyValues): void;
    private commit;
    private readonly handleDecrement;
    private readonly handleIncrement;
    private readonly handleInputChange;
    private readonly handleKeyDown;
    protected render(): import("lit").TemplateResult<1>;
}
export {};
//# sourceMappingURL=qv-stepper.d.ts.map