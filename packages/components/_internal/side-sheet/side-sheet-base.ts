/**
 * ----------------------------------------------------------
 * QUEVY UI (internal) — shared side sheet base
 * ----------------------------------------------------------
 * Not itself a custom element (no @customElement) — abstract
 * base for qv-side-sheet (modal) and qv-side-sheet-inline
 * (non-modal). Subclasses differ only in overlayOptions() and
 * hasBackdrop; everything else (slots, size, side, controlled/
 * uncontrolled open) is shared here. Mirrors QvBottomSheetBase,
 * minus the drag handle — a side sheet slides in from a screen
 * edge rather than the bottom, so swipe-to-dismiss isn't the
 * expected gesture here.
 *
 * IMPLEMENTATION CONSTRAINT: overlayOptions() is called from
 * this base class's constructor (to build the OverlayController
 * early). At that point, subclass field initializers have NOT
 * run yet — a classic JS superclass-constructor-calls-overridden-
 * method hazard. Subclasses MUST only read their own fields
 * lazily inside closures (e.g. `() => this.dismissible`), never
 * synchronously in the returned options object itself.
 *
 * @packageDocumentation
 */
import { html, nothing, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { QvElement, queryDecorator as query } from '@quevy/core';
import { createControllableValue } from '@quevy/state';
import { LocalizedMixin } from '../i18n/localized-mixin.js';
import { OverlayController, type OverlayControllerOptions } from '../overlay/overlay-controller.js';
import { sideSheetStyles } from './side-sheet.style.js';
import type { QvSideSheetSide, QvSideSheetSize, QvSideSheetToggleEventDetail } from './side-sheet.types.js';
import { COMMON_MESSAGES } from '../../i18n/common-messages.js';

export abstract class QvSideSheetBase extends LocalizedMixin(QvElement) {
    static override styles = sideSheetStyles;

    @property({ reflect: true })
    public side: QvSideSheetSide = 'right';

    @property({ reflect: true })
    public size: QvSideSheetSize = 'md';

    @property({ type: Boolean, reflect: true })
    public open?: boolean;

    @property({ type: Boolean, reflect: true}) 
    public closable = true;

    protected readonly controllableOpen = createControllableValue<boolean>(false);
    protected readonly overlay!: OverlayController;

    @query('.panel', false) protected panelEl!: HTMLElement | null;
    @state() protected hasHeaderTitle = false;
    @state() protected hasFooter = false;

    constructor() {
        super();
        this.overlay = new OverlayController(this, this.overlayOptions())
    }

    protected abstract overlayOptions(): OverlayControllerOptions;
    protected abstract get hasBackdrop(): boolean;

    protected get isOpen(): boolean {
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

    public show(): void {
        const resolved = this.controllableOpen.request(this.open, true);
        this.emit<QvSideSheetToggleEventDetail>('open', { open: resolved });
        this.overlay.open();
        this.requestUpdate();
    }

    public close(): void {
        const resolved = this.controllableOpen.request(this.open, false);
        this.emit<QvSideSheetToggleEventDetail>('close', { open: resolved });
        this.overlay.close();
    }

    private readonly handleTitleSlotChange = (): void => {
        this.hasHeaderTitle = this.hasSlot('title');
    }

    private readonly handleFooterSlotChange = (): void => {
        this.hasFooter = this.hasSlot('footer');
    }

     protected override render(): any {
        if (!this.overlay.isOpen && !this.overlay.isClosing) {
            return nothing;
        }

        const messages = COMMON_MESSAGES[this.locale];

        return html`
            ${this.hasBackdrop ? html`<div class="backdrop" part="backdrop" ?closing=${this.overlay.isClosing}></div>` : nothing}

            <div class="panel" part="panel" role="dialog" aria-modal=${String(this.hasBackdrop)} tabindex="-1" ?closing=${this.overlay.isClosing}>
                <div class=${classMap({ header: true, empty: !this.hasHeaderTitle && !this.closable })} part="header">
                    <div class="title" part="title">
                        <slot name="title" @slotchange=${this.handleTitleSlotChange}></slot>
                    </div>
                    ${this.closable
                        ? html`
                            <button class="close" part="close" aria-label=${messages.close} @click=${() => this.close()}>
                                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                                    <path d="M4.3 4.3a1 1 0 011.4 0L10 8.6l4.3-4.3a1 1 0 111.4 1.4L11.4 10l4.3 4.3a1 1 0 01-1.4 1.4L10 11.4l-4.3 4.3a1 1 0 01-1.4-1.4L8.6 10 4.3 5.7a1 1 0 010-1.4z"/>
                                </svg>
                            </button>
                        `
                        : nothing}
                </div>

                <div class="body" part="body"><slot></slot></div>

                <div class=${classMap({ footer: true, empty: !this.hasFooter })} part="footer">
                    <slot name="footer" @slotchange=${this.handleFooterSlotChange}></slot>
                </div>
            </div>
        `;
    }
}