/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-progress
 * ----------------------------------------------------------
 * Horizontal loading bar. Indeterminate when `value` is unset
 * (default), determinate once a numeric `value` is provided.
 *
 * @packageDocumentation
 */

import { html, type PropertyValues } from "lit";
import { property, customElement } from "lit/decorators.js";

import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";

import { qvProgressStyles } from "./qv-progress.styles.js";
import type { QvProgressVariant } from "./qv-progress.types.js";

@customElement('qv-progress')
export class QvProgress extends QvElement {
    static override styles = qvProgressStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvProgress',
        tagName: createTagName('progress'),
        version: '0.1.0',
    });

    /** Leave unset for indeterminate mode. */
    @property({ type: Number })
    public value?: number;

    @property({ type: Number })
    public max = 100;

    @property({ reflect: true })
    public variant: QvProgressVariant = 'default';

    private get isIndeterminate(): boolean {
        return this.value === undefined;
    }

    private get percentage(): number {
        if(this.value === undefined) return 0;
        return Math.min(100, Math.max(0, (this.value / this.max) * 100));
    }

    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        this.setAttribute('role', 'progressbar');
        this.toggleAttribute('indeterminate', this.isIndeterminate);

        if (this.isIndeterminate) {
            this.removeAttribute('aria-valuenow');
            this.removeAttribute('aria-valuemin');
            this.removeAttribute('aria-valuemax');
        } else {
            this.setAttribute('aria-valuenow', String(this.value));
            this.setAttribute('aria-valuemin', '0');
            this.setAttribute('aria-valuemax', String(this.max));
        }
    }

    protected override render() {
        return html`
            <div class="track" part="track">
                <div
                    class="bar"
                    part="bar"
                    style=${this.isIndeterminate ? '' : `width: ${this.percentage}%`}
                ></div>
            </div>
        `;
    }
}