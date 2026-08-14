/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-toast-region
 * ----------------------------------------------------------
 * Singleton, mounted automatically by ensure-region.ts. Purely
 * presentational — subscribes to toastStore and renders. All
 * writes (push/dismiss) go through toast.ts, never directly
 * through this component.
 *
 * KNOWN LIMITATION: dismissal is instant removal, no exit
 * animation (only qv-toast-in exists, no matching out-animation
 * with a delay before actual DOM removal). Acceptable for v1;
 * revisit if this becomes a real complaint, since it needs
 * either a fixed delay before store removal or a Web Animations
 * API-driven remove — not something to build speculatively now.
 *
 * @packageDocumentation
 */
import { QvElement } from "@quevy/core";
export declare class QvToastRegion extends QvElement {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    private toasts;
    private unsubscribe?;
    onConnected(): void;
    onDisconnected(): void;
    private groupByPosition;
    protected render(): import("lit").TemplateResult<1>;
}
//# sourceMappingURL=qv-toast-region.d.ts.map