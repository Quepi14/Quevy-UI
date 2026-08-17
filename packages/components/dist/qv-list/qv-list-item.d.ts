/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-list-item
 * ----------------------------------------------------------
 * "Cuma teks" case: <qv-list-item>Text</qv-list-item>, no leading/
 * trailing/description needed — default slot alone covers it.
 * Rich case adds slot="leading"/"trailing" + label/description.
 * `clickable` reuses the same click+keyboard trio pattern as
 * qv-button/qv-card (Pola 1).
 *
 * @packageDocumentation
 */
import { type PropertyValues } from "lit";
import { QvElement } from "@quevy/core";
declare const QvListItemBase: typeof QvElement & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/focusable.js").FocusableInterface>;
export declare class QvListItem extends QvListItemBase {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    label?: string;
    description?: string;
    clickable: boolean;
    private hasLeading;
    private hasTrailing;
    onConnected(): void;
    onDisconnected(): void;
    protected updated(changedProperties: PropertyValues): void;
    private readonly handleClick;
    private readonly handleKeyDown;
    private readonly handleKeyUp;
    private readonly handleLeadingSlotChange;
    private readonly handleTrailingSlotChange;
    protected render(): import("lit").TemplateResult<1>;
}
export {};
//# sourceMappingURL=qv-list-item.d.ts.map