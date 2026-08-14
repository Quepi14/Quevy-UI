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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { QvElement, queryDecorator as query } from '@quevy/core';
import { createControllableValue } from '@quevy/state';
import { OverlayController } from '../overlay/overlay-controller.js';
import { DragToDismiss } from './drag-to-dismiss.js';
import { bottomSheetStyles } from './bottom-sheet.styles.js';
export class QvBottomSheetBase extends QvElement {
    static { this.styles = bottomSheetStyles; }
    constructor() {
        super();
        this.size = 'md';
        this.closable = true;
        this.controllableOpen = createControllableValue(false);
        this.drag = new DragToDismiss({ onDismiss: () => this.overlay.close() });
        this.hasHeaderTitle = false;
        this.hasFooter = false;
        this.handleTitleSlotChange = () => {
            this.hasHeaderTitle = this.hasSlot('title');
        };
        this.handleFooterSlotChange = () => {
            this.hasFooter = this.hasSlot('footer');
        };
        this.overlay = new OverlayController(this, this.overlayOptions());
    }
    get isOpen() {
        return this.controllableOpen.value(this.open);
    }
    willUpdate(changedProperties) {
        super.willUpdate(changedProperties);
        if (changedProperties.has('open')) {
            this.isOpen ? this.overlay.open() : this.overlay.close();
        }
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        this.overlay.panel = this.panelEl;
        if (this.overlay.isOpen && this.handleEl && this.panelEl) {
            this.drag.attach(this.handleEl, this.panelEl);
        }
        else {
            this.drag.detach();
        }
    }
    show() {
        const resolved = this.controllableOpen.request(this.open, true);
        this.emit('open', { open: resolved });
        this.overlay.open();
        this.requestUpdate();
    }
    close() {
        const resolved = this.controllableOpen.request(this.open, false);
        this.emit('close', { open: resolved });
        this.overlay.close();
    }
    render() {
        if (!this.overlay.isOpen) {
            return nothing;
        }
        return html `
            ${this.hasBackdrop ? html `<div class="backdrop" part="backdrop"></div>` : nothing}

            <div class="panel" part="panel" role="dialog" aria-model=${String(this.hasBackdrop)} tabindex="-1">
                <div class="handle-row"><div class="handle" part="handle"></div></div>

                <div class=${classMap({ header: true, empty: !this.hasHeaderTitle && !this.closable })} part="header">
                    <div class="title" part="title">
                        <slot name="title" @slotchanges=${this.handleTitleSlotChange}></slot>
                </div>
                ${this.closable
            ? html `
                        <button class="close" part="close" aria-label="Close" @click=${() => this.close()}>
                            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                                <path d="M4.3 4.3a1 1 0 011.4 0L10 8.6l4.3-4.3a1 1 0 111.4 1.4L11.4 10l4.3 4.3a1 1 0 01-1.4 1.4L10 11.4l-4.3 4.3a1 1 0 01-1.4-1.4L8.6 10 4.3 5.7a1 1 0 010-1.4z"/>
                            </svg>
                        </button>
                    `
            : nothing}
            </div>

            <div class="body" part="body"<slot></slot></div>

                <div class=${classMap({ footer: true, empty: !this.hasFooter })} part="footer">
                    <slot name="footer" @slotchange=${this.handleFooterSlotChange}></slot>
                </div>
            </div>
        `;
    }
}
__decorate([
    property({ reflect: true })
], QvBottomSheetBase.prototype, "size", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], QvBottomSheetBase.prototype, "open", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], QvBottomSheetBase.prototype, "closable", void 0);
__decorate([
    query('.panel', false)
], QvBottomSheetBase.prototype, "panelEl", void 0);
__decorate([
    query('.handle', false)
], QvBottomSheetBase.prototype, "handleEl", void 0);
__decorate([
    state()
], QvBottomSheetBase.prototype, "hasHeaderTitle", void 0);
__decorate([
    state()
], QvBottomSheetBase.prototype, "hasFooter", void 0);
//# sourceMappingURL=bottom-sheet-base.js.map