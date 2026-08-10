/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-state
 * ----------------------------------------------------------
 * Result-state placeholder (loading/error/success/empty) for a
 * container after data fetching resolves. Distinct from
 * qv-skeleton, which is shown WHILE waiting, not as the
 * resolved outcome.
 *
 * Default icons are hardcoded SVG for the same reason noted in
 * qv-banner — no shared icon system exists yet. Revisit both
 * together when one does.
 *
 * @packageDocumentation
 */
import { type PropertyValues } from 'lit';
import { QvElement } from '@quevy/core';
import type { QvStateStatus } from './qv-state.types.js';
export declare class QvState extends QvElement {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    status: QvStateStatus;
    private hasIcon;
    private hasTitle;
    private hasDescription;
    private hasAction;
    protected updated(changeProperties: PropertyValues): void;
    private readonly handleIconSlotChange;
    private readonly handleTitleSlotChange;
    private readonly handleDescriptionSlotChange;
    private readonly handleActionSlotChange;
    protected render(): import("lit").TemplateResult<1>;
}
//# sourceMappingURL=qv-state.d.ts.map