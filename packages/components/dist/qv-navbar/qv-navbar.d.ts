/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-navbar
 * ----------------------------------------------------------
 * Coordinates single-select among light-DOM qv-navbar-item
 * children - same plain DOM-query + direct property assignment
 * pattern as qv-radio-group, no Context API.
 *
 * @packageDocumentation
 */
import { type PropertyValues } from 'lit';
import { QvElement } from '@quevy/core';
export declare class QvNavbar extends QvElement {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    /** Controlled prop. Leave unset for uncontrolled usage. */
    value?: string;
    private readonly controllableValue;
    private get currentValue();
    onConnected(): void;
    onDisconnected(): void;
    private get items();
    protected updated(changedProperties: PropertyValues): void;
    /**
     * Pushes `active` down to every qv-navbar-item child. Called
     * on every update, not just once, so it stays correct if items
     * are added/removed dynamically.
     */
    private syncChildren;
    private readonly handleActivate;
    protected render(): import("lit").TemplateResult<1>;
}
//# sourceMappingURL=qv-navbar.d.ts.map