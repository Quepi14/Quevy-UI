/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-slider
 * ----------------------------------------------------------
 * Single-thumb or range (2-thumb) slider, decided by `range`.
 * Track pointerdown determines which thumb is nearest (range
 * mode) and drags that one — consistent with native OS slider
 * behavior of "click near a thumb moves that thumb".
 *
 * @packageDocumentation
 */
import { QvElement } from "@quevy/core";
declare const QvSliderBase: typeof QvElement & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/disabled.js").DisabledInterface>;
export declare class QvSlider extends QvSliderBase {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    min: number;
    max: number;
    step: number;
    range: boolean;
    /** Single mode. Leave unset for uncontrolled usage. */
    value?: number;
    /** Range mode. */
    valueStart?: number;
    valueEnd?: number;
    private readonly controllableValue;
    private readonly controllableStart;
    private readonly controllableEnd;
    private trackEl;
    private activeThumb;
    private get currentValue();
    private get currentStart();
    private get currentEnd();
    private clamp;
    private percentOf;
    private valueFromClientX;
    private commitSingle;
    private commitRange;
    private readonly handleTrackPointerDown;
    private readonly handlePointerMove;
    private readonly handlePointerUp;
    private applyDrag;
    private handleThumbKeyDown;
    protected render(): import("lit").TemplateResult<1>;
}
export {};
//# sourceMappingURL=qv-slider.d.ts.map