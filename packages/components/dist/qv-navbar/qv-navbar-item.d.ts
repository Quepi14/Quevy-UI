/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-navbar-item
 * ----------------------------------------------------------
 * Deliberately NOT self-managing `active` - same reasoning as
 * qv-radio: it's pushed down imperatively by the enclosing
 * qv-navbar, this component only reports intent (click/keyboard)
 * via a plain DOM event the navbar listens for.
 *
 * Icon is the default slot; `label` only becomes visible while
 * `active` (grid-template-columns 0fr -> 1fr, no JS measurement -
 * same technique as qv-collapsible's panel).
 *
 * @packageDocumentation
 */
import { type PropertyValues } from 'lit';
import { QvElement } from '@quevy/core';
declare const QvNavbarItemBase: typeof QvElement & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/focusable.js").FocusableInterface> & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/disabled.js").DisabledInterface>;
export declare class QvNavbarItem extends QvNavbarItemBase {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    value: string;
    label: string;
    href?: string;
    /** Set imperatively by the parent qv-navbar - do not bind this from outside. */
    active: boolean;
    onConnected(): void;
    onDisconnected(): void;
    updated(changedProperties: PropertyValues): void;
    private readonly handleActivate;
    private readonly handleKeyDown;
    private readonly handleKeyUp;
    protected render(): import("lit").TemplateResult<1>;
}
export {};
//# sourceMappingURL=qv-navbar-item.d.ts.map