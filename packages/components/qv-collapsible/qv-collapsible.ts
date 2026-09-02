/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-collapsible
 * ----------------------------------------------------------
 * Header is conditional: built-in (title + chevron) when
 * `label` is set and slot="trigger" is empty; fully custom via
 * slot="trigger" otherwise (same fallback pattern as qv-menu's
 * trigger slot).
 *
 * Expand/collapse animation uses grid-template-rows 0fr→1fr —
 * animates to intrinsic content height without any JS
 * measurement (no ResizeObserver, no getBoundingClientRect).
 *
 * @packageDocumentation
 */
import { html, nothing, type CSSResultGroup, type PropertyValues } from "lit";
import { property, state, customElement } from "lit/decorators.js";

import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";
import { createControllableValue } from "@quevy/state";

import { qvCollapsibleStyles } from "./qv-collapsible.styles.js";

@customElement('qv-collapsible')
export class QvCollapsible extends QvElement {
    static override styles = qvCollapsibleStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvCollapsible',
        tagName: createTagName('collapsible'),
        version: '0.1.0',
    });

    @property() public label?: string;

    /** Controlled prop. Leave unset for uncontrolled usage. */
    @property({ type: Boolean, reflect: true })
    public open?: boolean;

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    private readonly controllableOpen = createControllableValue<boolean>(false);

    @state() private hasCustomTrigger = false;

    private get isOpen(): boolean {
        return this.controllableOpen.value(this.open);
    }

    public override onConnected(): void {
        this.setAttribute('role', 'group');
    }

    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        this.classList.toggle('is-open', this.isOpen);
    }

    private toggle(): void {
        if (this.disabled) return;

        const next = this.controllableOpen.request(this.open, !this.isOpen);
        // Bubbles + composed so an enclosing qv-accordian can hear
        // it across shadow boundaries and enforce exclusive mode.
        this.dispatch(new CustomEvent('qv-collapsible-toggle', { bubbles: true, composed: true, detail: {open: next}}));
        this.emit('toggle', { open: next });
        this.invalidate();
    }

    private readonly handleTriggerSlotChange =(): void => {
        this.hasCustomTrigger = this.hasSlot('trigger');
    };

    protected override render() {
        return html`
            <button class="header" part="header" aria-expanded=${this.isOpen} ?disabled=${this.disabled} @click=${() => this.toggle()}>
                <slot name="trigger" @slotchange=${this.handleTriggerSlotChange}>
                    ${this.hasCustomTrigger ? nothing : html`<span>${this.label ?? ''}</span>`}
                </sot>
                ${this.hasCustomTrigger
                    ? nothing
                    : html`
                        <svg class="chevron" part="chevron" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5.2 7.2a1 1 0 011.4 0L10 10.6l3.4-3.4a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z"/>
                        </svg>
                    `}
            </button>

            <div class="panel" part="panel">
                <div class="panel-inner">
                    <div class="content" part="content"><slot></slot></div>
                </div>
            </div>
        `;
    }
}