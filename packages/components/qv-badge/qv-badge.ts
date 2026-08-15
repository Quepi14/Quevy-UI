/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-badge
 * ----------------------------------------------------------
 * Static, non-interactive indicator. Two modes, auto-detected
 * via slot content:
 *   - Standalone: no wrapped element → renders inline (status pill).
 *   - Overlap: wraps a slotted element → floats at its corner
 *     (notification count / status dot on an icon or avatar).
 *
 * Unlike qv-chip, this is purely presentational — no click
 * handler, no selected/dismissible state.
 *
 * @packageDocumentation
 */

import { html, type PropertyValues } from "lit";
import { property, state, customElement } from "lit/decorators.js";

import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";

import { qvBadgeStyles } from "./qv-badge.styles.js";
import type { QvBadgeVariant } from "./qv-badge.types.js";

@customElement('qv-badge')
export class QvBadge extends QvElement {
    static override styles = qvBadgeStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvBadge',
        tagName: createTagName('badge'),
        version: '0.1.0',
    });

    @property({ type: Number })
    public count?: number;

    @property({ type: Number })
    public max = 99;

    @property({ type: Boolean, reflect: true})
    public dot = false;

    @property({ reflect: true })
    public variant: QvBadgeVariant = 'default';

    @state() private hasWrappedContent = false;

    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        this.toggleAttribute('standalone', !this.hasWrappedContent);
    }

    private readonly handleSlotChange = (): void => {
        this.hasWrappedContent = this.hasSlot();
    }

    private get displayValue(): string {
        if (this.dot || this.count === undefined) return '';
        return this.count > this.max ? `${this.max}+` : String(this.count);
    }

    protected override render() {
        return html`
            <slot @slotchange=${this.handleSlotChange}></slot>
            <span class="indicator" part="indicator" aria-hidden=${this.dot ? 'true' : 'false'}>
                ${this.displayValue}
            </span>
        `;
    }
}