/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-modal
 * ----------------------------------------------------------
 * Built on OverlayController with `trigger` intentionally left
 * null (no anchor positioning — centered via CSS) and
 * `lockScroll: true` (new capability added to the controller
 * for this component and the upcoming bottom sheets).
 *
 * @packageDocumentation
 */
import { html, nothing, type PropertyValues } from "lit";
import { property, state, customElement } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import { QvElement, createComponentMetadata, createTagName, queryDecorator as query } from "@quevy/core";
import { createControllableValue } from "@quevy/state";

import { OverlayController } from "../_internal/overlay/overlay-controller.js";

import { qvModalStyles } from "./qv-modal.styles.js";
import type { QvModalSize } from "./qv-modal.types.js";

@customElement('qv-modal')
export class QvModal extends QvElement {
    static override styles = qvModalStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvModal',
        tagName: createTagName('modal'),
        version: '0.1.2',
    });

    @property({ reflect: true })
    public size: QvModalSize = 'md';

    /** Controlled open prop. Leave unset for uncontrolled usage. */
    @property({ type: Boolean, reflect: true })
    public open?: boolean;

    @property({ type: Boolean, reflect: true })
    public dismissible = true;

    @property({ type: Boolean, reflect: true })
    public closable = true;

    private readonly controllableOpen = createControllableValue<boolean>(false);

    private readonly overlay =  new OverlayController(this, {
        lockScroll: true,
        closeOnOutsideClick: () => this.dismissible,
        onOpenChange: (open) => {
            this.requestUpdate();
            if (!open) {
                const resolved = this.controllableOpen.request(this.open, false);
                this.emit('close', { open: resolved });
            }
        },
    })

    @query('.panel', false) private panelEl!: HTMLElement | null;
    @state() private hasHeaderTitle = false;
    @state() private hasFooter = false;

    private get isOpen(): boolean {
        return this.controllableOpen.value(this.open);
    }

    public override willUpdate(changedProperties: PropertyValues): void {
        super.willUpdate(changedProperties);

        if (changedProperties.has('open')) {
            this.isOpen ? this.overlay.open() : this.overlay.close();
        }
    }

    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        this.overlay.panel = this.panelEl;
    }

    /** Public method - consumers can call modelEl.show() directly (uncontrolled usage)*/
    public show(): void {
        const resolved = this.controllableOpen.request(this.open, true);
        this.emit('open', { open: resolved });
        this.overlay.open();
        this.requestUpdate();
    }

    public close(): void {
        this.overlay.close();
    }

    public readonly handleTitleSlotChange = (): void => {
        this.hasHeaderTitle = this.hasSlot('title');
    };

    private readonly handleFooterSlotChange = (): void => {
        this.hasFooter = this.hasSlot('footer');
    }

    protected override render() {
        if (!this.overlay.isOpen) {
            return nothing;
        }

        return html `
            <div class="backdrop" part="backdrop"></div>

            <div
                class="panel"
                part="panel"
                role="dialog"
                aria-model="true"
                tabindex="-1"
            >
                <div class=${classMap({ header: true, empty: !this.hasHeaderTitle && !this.closable })} part="header">
                    <slot name="title" @slotchange=${this.handleTitleSlotChange}></slot>
                </div>
                ${this.closable
                    ? html`
                        <button class="close" part="close" aria-label="Close" @click=${() => this.close}>
                            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                                <path d="M4.3 4.3a1 1 0 011.4 0L10 8.6l4.3-4.3a1 1 0 111.4 1.4L11.4 10l4.3 4.3a1 1 0 01-1.4 1.4L10 11.4l-4.3 4.3a1 1 0 01-1.4-1.4L8.6 10 4.3 5.7a1 1 0 010-1.4z"/>
                            </svg>
                        </button>
                    `
                    : nothing}
                </div>

                <div class="body" part="body">
                    <slot></slot>
                </div>

                <div class=${classMap({ footer: true, empty: !this.hasFooter})} part="footer:>
                    <slot name="footer" @slotchange=${this.handleFooterSlotChange}></slot>
                </div>
            </div>
        `;
    }
}
