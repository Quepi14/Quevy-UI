/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-chip
 * ----------------------------------------------------------
 * Standalone (no qv-chip-group) — multi-select-by-nature: each
 * chip's `selected` state is independent, consumer aggregates
 * as needed. `dismissible` deliberately holds no visibility
 * state of its own — see file-level discussion; the consumer
 * owns the source-of-truth array and removes the item, which
 * naturally removes this element from the DOM on re-render.
 *
 * `selectable` is the second real consumer of
 * @quevy/state's synchronization primitives (after qv-banner),
 * validating the earlier decision that simple boolean toggles
 * don't need signal/computed.
 *
 * @packageDocumentation
 */
import { type PropertyValues } from 'lit';
import { QvElement, type ComponentMetadata } from '@quevy/core';
declare const QvChipBase: typeof QvElement & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/focusable.js").FocusableInterface> & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/disabled.js").DisabledInterface>;
export declare class QvChip extends QvChipBase {
    static styles: CSSStyleSheet;
    readonly metadata: ComponentMetadata;
    selectable: boolean;
    dismissible: boolean;
    selected?: boolean;
    value?: string;
    private hasIcon;
    private readonly controllableSelected;
    private get isSelected();
    onConnected(): void;
    onDisconnected(): void;
    protected updated(changedProperties: PropertyValues): void;
    private syncAccessibility;
    private toggle;
    private readonly handleClick;
    private readonly handleKeyDown;
    private readonly handleKeyUp;
    private readonly handleDismiss;
    private readonly handleIconSlotChange;
    protected render(): import("lit").TemplateResult<1>;
}
export {};
//# sourceMappingURL=qv-chip.d.ts.map