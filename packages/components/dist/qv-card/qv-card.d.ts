/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-card
 * ----------------------------------------------------------
 * Same interaction pattern as qv-button (Pola 1: host is the
 * interactive element). The click/keydown/keyup trio here is
 * structurally identical to qv-button's — if a third component
 * ends up needing the same "clickable host" behavior, that's
 * the signal to extract a shared internal controller. Two
 * occurrences isn't (rule of three); not extracted yet.
 *
 * @packageDocumentation
 */
import { type PropertyValues } from "lit";
import { QvElement } from '@quevy/core';
import type { QvCardVariant, QvCardTarget } from "./qv-card.types.js";
declare const QvCardBase: typeof QvElement & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/focusable.js").FocusableInterface>;
export declare class QvCard extends QvCardBase {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    variant: QvCardVariant;
    interactive: boolean;
    href?: string;
    target?: QvCardTarget;
    private hasMedia;
    private hasTitle;
    private hasDescription;
    private hasFooter;
    private get isInteractive();
    onConnected(): void;
    onDisconnected(): void;
    protected updated(changedProperties: PropertyValues): void;
    private syncAccessibility;
    /**
     * True if the event originated form a genuinely interactive
     * descendant (e.g. a <qv-button> in the footer slot), so  the
     * card can avoid firing its own action on top of whatever
     * that inner element already did.
     */
    private originatesFromInteractiveDescendant;
    private readonly handleClick;
    private readonly handleKeyDown;
    private readonly handleKeyUp;
    private activate;
    private navigate;
    private readonly handleMediaSlotChange;
    private readonly handleTitleSlotChange;
    private readonly handleDescriptionSlotChange;
    private readonly handleFooterSlotChange;
    protected render(): unknown;
}
export {};
//# sourceMappingURL=qv-card.d.ts.map