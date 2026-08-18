/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-carousel
 * ----------------------------------------------------------
 * Slides are direct light-DOM children (default slot) — each
 * top-level slotted element is one slide. Autoplay pauses on
 * pointerenter/leaves via host events, and is fully torn down
 * in onDisconnected() to avoid a leaked interval outliving the
 * element.
 *
 * @packageDocumentation
 */
import { QvElement } from "@quevy/core";
export declare class QvCarousel extends QvElement {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    autoplay: boolean;
    interval: number;
    private index;
    private slideCount;
    private timer;
    onConnected(): void;
    onDisconnected(): void;
    private readonly pauseAutoplay;
    private readonly resumeAutoplay;
    private startAutoPlay;
    private stopAutoplay;
    private handleSlotChange;
    next(): void;
    prev(): void;
    goTo(i: number): void;
    protected render(): import("lit").TemplateResult<1>;
}
//# sourceMappingURL=qv-carousel.d.ts.map