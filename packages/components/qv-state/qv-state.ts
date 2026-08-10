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

import { html, nothing, type CSSResultGroup, type PropertyValues } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { QvElement, createComponentMetadata, createTagName } from '@quevy/core';

import { qvStateStyles } from './qv-state.style.js';
import type { QvStateStatus } from './qv-state.types.js';

const DEFAULT_ICONS: Record<Exclude<QvStateStatus, 'loading'>, ReturnType<typeof html>> = {
    error: html`<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 2L1 17h18L10 2zm0 5l6 10H4l6-10zm-1 4v3h2V11H9zm0 4v2h2v-2H9z"/></svg>`,
    success: html`<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3l-4.2 4.2-1.9-1.9-1.1 1.1 3 3 5.3-5.3-1.1-1.1z"/></svg>`,
    empty: html`<svg viewBox="0 0 20 20" fill="currentColor"><path d="M3 7l2-4h10l2 4v9a1 1 0 01-1 1H4a1 1 0 01-1-1V7zm2 1v7h10V8H5zm-.4-2h10.8l-1-2H5.6l-1 2zM8 10h4v2H8v-2z"/></svg>`,
};

/**
 * error uses role="alert" (assertive - interrupts). loading and
 * success are role="status" (polite - announced without interrupting).
 * empty is a resting state, not an event, so it carries no live-region
 * role at all.
 */
function roleFor(status: QvStateStatus): string | null {
    if (status === 'error') return 'alert';
    if (status === 'loading' || status === 'success') return 'status';
    return null;
}

@customElement('qv-status')
export class QvState extends QvElement {
    static override styles = qvStateStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvState',
        tagName: createTagName('state'),
        version: '0.1.0',
    });

    @property({ reflect: true})
    public status: QvStateStatus = 'loading';

    @state() private hasIcon = false;
    @state() private hasTitle = false;
    @state() private hasDescription = false;
    @state() private hasAction = false;

    protected override updated(changeProperties: PropertyValues): void {
        super.updated(changeProperties);

        if(changeProperties.has('status')) {
            const role = roleFor(this.status);

            if(role) {
                this.setAttribute('role', role);
            }else {
                this.removeAttribute('role');
            }

            if(this.status === 'loading') {
                this.setAttribute('aria-busy', 'true');
            }else {
                this.removeAttribute('aria-busy');
            }
        }
    }

    private readonly handleIconSlotChange = (): void => {
        this.hasIcon = this.hasSlot('icon');
    };

    private readonly handleTitleSlotChange = (): void => {
        this.hasTitle = this.hasSlot('title');
    };

    private readonly handleDescriptionSlotChange = (): void => {
        this.hasDescription = this.hasSlot('description');
    };

    private readonly handleActionSlotChange = (): void => {
        this.hasAction = this.hasSlot('action');
    };

    protected override render() {
        return html`
            <div>
                <slot name="icon" part="icon">
                    ${this.hasIcon
                        ? nothing
                        : this.status === 'loading'
                            ? html`<span class="spinner" part="spinner"></span>`
                            : DEFAULT_ICONS[this.status]}
                </slot>
            </div>

            <div class=${classMap({ title: true, empty: !this.hasTitle})} part="title">
                <slot name="title" @slotchange=${this.handleTitleSlotChange}></slot>
            </div>

            <div
                class=${classMap({ description: true, empty: !this.hasDescription})}
                part="description"
            >
                <slot name="description" @slotchange=${this.handleDescriptionSlotChange}></slot>
            </div>

            <div class=${classMap({ action: true, empty: !this.hasAction})} part="action">
                <slot name="action" @slotchange=${this.handleActionSlotChange}></slot>
            </div>
        `;
    }
}