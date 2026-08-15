/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-banner
 * ----------------------------------------------------------
 * Static, page-level notice (NOT a floating/overlay component
 * — that's qv-toast, a separate future component). Visibility
 * is controlled/uncontrolled via @quevy/state's synchronization
 * primitives — the first real consumer of that module, as
 * planned back when packages/state was designed.
 *
 * @packageDocumentation
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, nothing } from "lit";
import { property, state, customElement } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";
import { createControllableValue } from '@quevy/state';
import { qvBannerStyles } from './qv-banner.styles.js';
/**
 * Inline default icons per vairant.
 *
 * TECH DEBT: hardcoded here because there is no shared icon
 * syste, in Quevy UI yet. Once one exist, these should be
 * replaced with references to it instead of in line SVG paths
 * duplicated across components.
 */
const DEFAULT_ICONS = {
    info: html `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9h2v5H9V9zm0-3h2v2H9V6z"/></svg>`,
    success: html `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3l-4.2 4.2-1.9-1.9-1.1 1.1 3 3 5.3-5.3-1.1-1.1z"/></svg>`,
    warning: html `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 2L1 17h18L10 2zm0 5l6 10H4l6-10zm-1 4v3h2V11H9zm0 4v2h2v-2H9z"/></svg>`,
    error: html `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2H9v-2zm0-7h2v5H9V6z"/></svg>`,
    neutral: null,
};
/**
 * Live-region urgency per variant: warning/error interrupt
 * assistive tech immediately (role="alert"), everything else
 * is announced politely (role="stasus")
 */
const ALERT_VARIANTS = ['warning', 'error'];
let QvBanner = class QvBanner extends QvElement {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvBanner',
            tagName: createTagName('banner'),
            version: '0.1.2',
        });
        this.variant = 'info';
        this.dismissible = false;
        this.visibility = createControllableValue(true);
        this.hasIcon = false;
        this.handleIconSlotChange = () => {
            this.hasIcon = this.hasSlot('icon');
        };
        this.handleDismiss = () => {
            const next = this.visibility.request(this.open, false);
            this.emit('close', { open: next });
            this.invalidate();
        };
    }
    static { this.styles = qvBannerStyles; }
    get isOpen() {
        return this.visibility.value(this.open);
    }
    onConnected() {
        this.setAttribute('role', ALERT_VARIANTS.includes(this.variant) ? 'alert' : 'status');
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        this.hidden = !this.isOpen;
        if (changedProperties.has('variant')) {
            this.setAttribute('role', ALERT_VARIANTS.includes(this.variant) ? 'alert' : 'status');
        }
    }
    render() {
        const defaultIcon = DEFAULT_ICONS[this.variant];
        return html `
            <span class=${classMap({ icon: true, empty: !this.hasIcon && !defaultIcon })} part="icon">
                <slot name="icon" @slotchange=${this.handleIconSlotChange}>
                    ${this.hasIcon ? nothing : defaultIcon}
                </slot>
            </span>

            <div class="content" part="content">
                <slot></slot>
            </div>

            ${this.dismissible
            ? html `
                    <button
                        class="close"
                        part="close"
                        type="button"
                        aria-label="Dismiss"
                        @click=${this.handleDismiss}
                    >
                        <svg viewBox=" 0 0 20 20" fill="currentColor" width="14 height="14">
                            <path d="M4.3 4.3a1 1 0 011.4 0L10 8.6l4.3-4.3a1 1 0 111.4 1.4L11.4 10l4.3 4.3a1 1 0 01-1.4 1.4L10 11.4l-4.3 4.3a1 1 0 01-1.4-1.4L8.6 10 4.3 5.7a1 1 0 010-1.4z"/>
                        </svg>
                    </button>
                `
            : nothing}
        `;
    }
};
__decorate([
    property({ reflect: true })
], QvBanner.prototype, "variant", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], QvBanner.prototype, "dismissible", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], QvBanner.prototype, "open", void 0);
__decorate([
    state()
], QvBanner.prototype, "hasIcon", void 0);
QvBanner = __decorate([
    customElement('qv-banner')
], QvBanner);
export { QvBanner };
//# sourceMappingURL=qv-banner.js.map