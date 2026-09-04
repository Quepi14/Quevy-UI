/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-spinner
 * ----------------------------------------------------------
 * Standalone indeterminate loading indicator. Deliberately NOT
 * yet reused by qv-button/qv-state's own inline spinners (3
 * separate implementations now exist) — consumer decided to
 * defer that consolidation. Revisit if a 4th spinner need shows
 * up, or whenever convenient.
 *
 * @packageDocumentation
 */
import { html, type PropertyValues } from "lit";
import { property, customElement } from "lit/decorators.js";

import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";

import { qvSpinnerStyles } from "./qv-spinner.styles.js";
import type { QvSpinnerSize, QvSpinnerVariant } from "./qv-spinner.types.js";

@customElement('qv-spinner')
export class QvSpinner extends QvElement {
    static override styles = qvSpinnerStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvSpinner',
        tagName: createTagName('spinner'),
        version: '0.3.0',
    });

    @property({ reflect: true })
    public size: QvSpinnerSize = 'md';

    @property({ reflect: true })
    public variant: QvSpinnerVariant = 'circle';

    /** Accessible label. If unset, the spinner is treated 
     *  as decorative (aria-hidden).
     */
    @property()
    public label?: string;

    public override onConnected(): void {
        this.setAttribute('role', 'status');
    }

    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        if (this.label) {
            this.setAttribute('aria-label', this.label)
            this.removeAttribute('aria-hidden')
        } else {
            this.removeAttribute('aria-label');
            this.setAttribute('aria-hidden', 'true');
        }
    }

    protected override render() {
        if (this.variant === 'fold') {
            return html`
            <span class="fold" part="spinner">
                    <span class="fold-piece fold-piece-1"></span>
                    <span class="fold-piece fold-piece-2"></span>
                    <span class="fold-piece fold-piece-4"></span>
                    <span class="fold-piece fold-piece-3"></span>
                </span>
            `;
        }

        if (this.variant === 'logo') {
            return html`
                <span class="logo" part="spinner">
                    <slot>
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 7.1-1.01L12 2z" />
                        </svg>
                    </slot>
                </span>
            `;
        }

        if (this.variant === 'dots') {
            return html `
                <span class="dots" part="spinner">
                    <span class="dot dot-1"></span>
                    <span class="dot dot-2"></span>
                    <span class="dot dot-3"></span>
                    <span class="dot dot-4"></span>
                </span>
            `;
        }

        if (this.variant === 'pendulum') {
            return html`
                <span class="pendulum" part="spinner">
                    <span class="pendulum-rail"></span>
                    <span class="pendulum-arm pendulum-arm-1"><span class="pendulum-ball"></span></span>
                    <span class="pendulum-arm pendulum-arm-2"><span class="pendulum-ball"></span></span>
                    <span class="pendulum-arm pendulum-arm-3"><span class="pendulum-ball"></span></span>
                    <span class="pendulum-arm pendulum-arm-4"><span class="pendulum-ball"></span></span>
                </span>
            `;
        }

        return html `<span class="spinner" part="spinner"></span>`;
    }
}