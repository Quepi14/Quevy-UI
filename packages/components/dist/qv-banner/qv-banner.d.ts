/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-banner
 * ----------------------------------------------------------
 * Static, page-level notice (NOT a floating/overlay component
 * — that's qv-toast, a separate future component). Visibility
 * is controlled/uncontrolled via @quevy/state's synchronization
 * primitives — the first real consumer of that module, as
 * planned back when packages/state was designed.
 *
 * @packageDocumentation
 */
import { type PropertyValues } from "lit";
import { QvElement, type ComponentMetadata } from "@quevy/core";
import type { QvBannerVariant } from "./qv-banner.types.js";
/**
 * @event {CustomEvent<QvBannerCloseEventDetail>} close - Fired when the banner is dismissed.
 */
declare const QvBannerBase: typeof QvElement & import("@quevy/core").MixinConstructor<import("../_internal/i18n/localized-mixin.js").LocalizedElement>;
export declare class QvBanner extends QvBannerBase {
    static styles: CSSStyleSheet;
    readonly metadata: ComponentMetadata;
    variant: QvBannerVariant;
    dismissible: boolean;
    /**
     * Controlled visibility prop. Leave  unset for uncontrolled
     * usage (banner manages its own open/closed state and closes
     * itself on dismiss).
     */
    open?: boolean;
    private readonly visibility;
    private hasIcon;
    private get isOpen();
    onConnected(): void;
    protected updated(changedProperties: PropertyValues): void;
    private readonly handleIconSlotChange;
    private readonly handleDismiss;
    protected render(): import("lit").TemplateResult<1>;
}
export {};
//# sourceMappingURL=qv-banner.d.ts.map