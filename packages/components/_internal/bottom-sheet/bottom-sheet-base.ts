/**
 * ----------------------------------------------------------
 * QUEVY UI (internal) — shared bottom sheet base
 * ----------------------------------------------------------
 * Not itself a custom element (no @customElement) — abstract
 * base for qv-bottom-sheet (modal) and qv-bottom-sheet-inline
 * (non-modal). Subclasses differ only in overlayOptions() and
 * hasBackdrop; everything else (slots, size, drag, controlled/
 * uncontrolled open) is shared here.
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

import { html, nothing, type CSSResultGroup, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { QvElement, queryDecorator as query } from '@quevy/core';
import { createControllableValue } from '@quevy/state';

import { OverlayController, type OverlayControllerOptions } from '../overlay/overlay-controller.js';
import { DragToDismiss } from './drag-to-dismiss.js';
import { bottomSheetStyles } from './bottom-sheet.styles.js';

export type QvBottomSheetSize = 'sm' | 'md' | 'lg' | 'fullscreen';

export abstract class QvBottomSheetBase extends QvElement {
    static override styles = bottomSheetStyles;

    @property({ reflect: true})
    public size: QvBottomSheetSize = 'md'

    @property({ type: Boolean, reflect: true})
    public open?: boolean;

    @property({ type: Boolean, reflect: true })
    public closable = true;

    protected readonly controllableOpen = createControllableValue<boolean>(false);
    protected readonly overlay!: OverlayController;

    private readonly drag = new DragToDismiss({ onDismiss: () => this.overlay.close() });

    @query('.panel', false) protected panelEl!: HTMLElement | null;
    @query('.handle', false) private handleEl!: HTMLElement | null;
    @state() protected hasHeaderTitle = false;
    @state() protected hasFooter = false;

    protected constructor() {
        super();
        this.overlay = new OverlayController(this, this.overlayOptions());
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

        if (this.overlay.isOpen && this.handleEl && this.panelEl) {
            this.drag.attach(this.handleEl, this.panelEl);
        } else {
            this.drag.detach();
        }
    }

    public show(): void {
        const resolved = this.controllableOpen.request(this.open, true);
        this.emit('open', { open: resolved });
        this.overlay.open();
        this.requestUpdate();
    }

    public close(): void {
        const resolved = this.controllableOpen.request(this.open, false);
        this.emit('close', { open: resolved });
        this.overlay.close();
    }

    private readonly handleTitleSlotChange = (): void => {
        this.hasHeaderTitle = this.hasSlot('title');
    }

    private readonly handleFooterSlotChange = (): void => {
        this.hasFooter = this.hasSlot('footer');
    }

    protected override render() {
        if (!this.overlay.isOpen) {
            return nothing
        }

        return html`
            ${this.hasBackdrop ? html`<div class="backdrop" part="backdrop"></div>` : nothing}

            <div class="panel" part="panel" role="dialog" aria-model=${String(this.hasBackdrop)} tabindex="-1">
                <div class="handle-row"><div class="handle" part="handle"></div></div>

                <div class=${classMap({ header: true, empty: !this.hasHeaderTitle && !this.closable})} part="header">
                    <div class="title" part="title">
                        <slot name="title" @slotchanges=${this.handleTitleSlotChange}></slot>
                </div>
                ${this.closable
                    ? html`
                        <button class="close" part="close" aria-label="Close" @click=${() => this.close()}>
                            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                                <path d="M4.3 4.3a1 1 0 011.4 0L10 8.6l4.3-4.3a1 1 0 111.4 1.4L11.4 10l4.3 4.3a1 1 0 01-1.4 1.4L10 11.4l-4.3 4.3a1 1 0 01-1.4-1.4L8.6 10 4.3 5.7a1 1 0 010-1.4z"/>
                            </svg>
                        </button>
                    `
                    : nothing}
            </div>

            <div class="body" part="body"<slot></slot></div>

                <div class=${classMap({ footer: true, empty: !this.hasFooter})} part="footer">
                    <slot name="footer" @slotchange=${this.handleFooterSlotChange}></slot>
                </div>
            </div>
        `;
    }
}