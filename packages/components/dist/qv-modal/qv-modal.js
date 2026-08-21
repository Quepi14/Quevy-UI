var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import { html, nothing } from "lit";
import { property, state, customElement } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { QvElement, createComponentMetadata, createTagName, queryDecorator as query } from "@quevy/core";
import { createControllableValue } from "@quevy/state";
import { OverlayController } from "../_internal/overlay/overlay-controller.js";
import { qvModalStyles } from "./qv-modal.styles.js";
let QvModal = class QvModal extends QvElement {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvModal',
            tagName: createTagName('modal'),
            version: '0.1.3',
        });
        this.size = 'md';
        this.dismissible = true;
        this.closable = true;
        this.controllableOpen = createControllableValue(false);
        this.overlay = new OverlayController(this, {
            lockScroll: true,
            closeOnOutsideClick: () => this.dismissible,
            onOpenChange: (open) => {
                this.requestUpdate();
                if (!open) {
                    const resolved = this.controllableOpen.request(this.open, false);
                    this.emit('close', { open: resolved });
                }
            },
        });
        this.hasHeaderTitle = false;
        this.hasFooter = false;
        this.handleTitleSlotChange = () => {
            this.hasHeaderTitle = this.hasSlot('title');
        };
        this.handleFooterSlotChange = () => {
            this.hasFooter = this.hasSlot('footer');
        };
    }
    static { this.styles = qvModalStyles; }
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
    }
    /** Public method - consumers can call modelEl.show() directly (uncontrolled usage)*/
    show() {
        const resolved = this.controllableOpen.request(this.open, true);
        this.emit('open', { open: resolved });
        this.overlay.open();
        this.requestUpdate();
    }
    close() {
        this.overlay.close();
    }
    render() {
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
            ? html `
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

                <div class=${classMap({ footer: true, empty: !this.hasFooter })} part="footer:>
                    <slot name="footer" @slotchange=${this.handleFooterSlotChange}></slot>
                </div>
            </div>
        `;
    }
};
__decorate([
    property({ reflect: true })
], QvModal.prototype, "size", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], QvModal.prototype, "open", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], QvModal.prototype, "dismissible", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], QvModal.prototype, "closable", void 0);
__decorate([
    query('.panel', false)
], QvModal.prototype, "panelEl", void 0);
__decorate([
    state()
], QvModal.prototype, "hasHeaderTitle", void 0);
__decorate([
    state()
], QvModal.prototype, "hasFooter", void 0);
QvModal = __decorate([
    customElement('qv-modal')
], QvModal);
export { QvModal };
//# sourceMappingURL=qv-modal.js.map