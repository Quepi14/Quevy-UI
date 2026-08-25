/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-card
 * ----------------------------------------------------------
 * Pola 1 (host is the interactive element when `interactive`
 * or `href` is set). Guards against nested-interactive
 * descendants (e.g. a qv-button in the footer slot, or a
 * qv-menu in the actions slot) triggering the card's own
 * click/keyboard handling.
 *
 * @packageDocumentation
 */
import { type PropertyValues } from 'lit';
import { QvElement } from '@quevy/core';
import type { QvCardVariant, QvCardTarget } from './qv-card.types.js';
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
    private hasActions;
    private get isInteractive();
    onConnected(): void;
    onDisconnected(): void;
    protected updated(changedProperties: PropertyValues): void;
    private syncAccessibility;
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
    private readonly handleActionsSlotChange;
    protected render(): import("lit").TemplateResult<1>;
}
export {};
//# sourceMappingURL=qv-card.d.ts.map