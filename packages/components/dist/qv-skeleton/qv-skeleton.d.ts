/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-skeleton
 * ----------------------------------------------------------
 * Purely visual loading placeholder. No slots, no interaction,
 * no render() override needed — the host element itself IS the
 * placeholder box; sizing is left entirely to the consumer via
 * inline style (width/height), same as any block element.
 *
 * @packageDocumentation
 */
import { QvElement } from "@quevy/core";
import type { QvSkeletonShape, QvSkeletonAnimation } from "./qv-skeleton.types.js";
export declare class QvSkeleton extends QvElement {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    shape: QvSkeletonShape;
    animation: QvSkeletonAnimation;
    onConnected(): void;
}
//# sourceMappingURL=qv-skeleton.d.ts.map