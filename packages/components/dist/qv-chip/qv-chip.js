/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-chip
 * ----------------------------------------------------------
 * Standalone (no qv-chip-group) — multi-select-by-nature: each
 * chip's `selected` state is independent, consumer aggregates
 * as needed. `dismissible` deliberately holds no visibility
 * state of its own — see file-level discussion; the consumer
 * owns the source-of-truth array and removes the item, which
 * naturally removes this element from the DOM on re-render.
 *
 * `selectable` is the second real consumer of
 * @quevy/state's synchronization primitives (after qv-banner),
 * validating the earlier decision that simple boolean toggles
 * don't need signal/computed.
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
import { property, state, customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { QvElement, createComponentMetadata, createTagName, FocusableMixin, DisabledMixin } from '@quevy/core';
import { createControllableValue } from '@quevy/state';
import { qvChipStyles } from './qv-chip.styles.js';
const QvChipBase = DisabledMixin(FocusableMixin(QvElement));
let QvChip = class QvChip extends QvChipBase {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvChip',
            tagName: createTagName('chip'),
            version: '0.1.2',
        });
        this.selectable = false;
        this.dismissible = false;
        this.hasIcon = false;
        this.controllableSelected = createControllableValue(false);
        this.handleClick = (event) => {
            event.stopPropagation();
            this.toggle();
        };
        this.handleKeyDown = (event) => {
            if (!this.selectable || this.disabled) {
                return;
            }
            if (event.key === ' ') {
                event.preventDefault();
            }
            if (event.key === 'Enter') {
                event.preventDefault();
                this.click();
            }
        };
        this.handleKeyUp = (event) => {
            if (!this.selectable || this.disabled) {
                return;
            }
            if (event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        };
        this.handleDismiss = (event) => {
            // Stops the dismiss click from also bubbling  into
            // handleClick() and toggling `selected` at the same time.
            event.stopPropagation();
            if (this.disabled) {
                return;
            }
            this.emit('dismiss', { value: this.value });
        };
        this.handleIconSlotChange = () => {
            this.hasIcon = this.hasSlot('icon');
        };
    }
    static { this.styles = qvChipStyles; }
    get isSelected() {
        return this.selectable && this.controllableSelected.value(this.selected);
    }
    onConnected() {
        this.addEventListener('click', this.handleClick);
        this.addEventListener('keydown', this.handleKeyDown);
        this.addEventListener('keyup', this.handleKeyUp);
    }
    onDisconnected() {
        this.addEventListener('click', this.handleClick);
        this.addEventListener('keydown', this.handleKeyDown);
        this.addEventListener('keyup', this.handleKeyUp);
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        this.syncAccessibility();
    }
    syncAccessibility() {
        if (!this.selectable) {
            this.removeAttribute('role');
            this.removeAttribute('aria-pressed');
            this.tabIndex = -1;
            return;
        }
        this.setAttribute('role', 'button');
        this.setAttribute('aria-pressed', String(this.isSelected));
        this.tabIndex = this.disabled ? -1 : 0;
    }
    toggle() {
        if (!this.selectable || this.disabled) {
            return;
        }
        const next = this.controllableSelected.request(this.selected, !this.isSelected);
        this.emit('toggle', { value: this.value, selected: next });
    }
    render() {
        return html `
            <span class=${classMap({ icon: true, empty: !this.hasIcon })} part="icon>
                <slot name="icon" @slotchange=${this.handleIconSlotChange}></slot>
            </span>

            <span part="label"><slot></slot></span>

            ${this.dismissible
            ? html `
                    <button
                        class="dismiss"
                        part="dismiss"
                        type="button"
                        aria-label="Remove"
                        ?disbaled=${this.disabled}
                        @click=${this.handleDismiss}
                    >
                        <svg viewBox="0 0 20 20" fill="curremtColor" width="10" height="10">
                            <path d="M4.3 4.3a1 1 0 011.4 0L10 8.6l4.3-4.3a1 1 0 111.4 1.4L11.4 10l4.3 4.3a1 1 0 01-1.4 1.4L10 11.4l-4.3 4.3a1 1 0 01-1.4-1.4L8.6 10 4.3 5.7a1 1 0 010-1.4z"/>
                        </svg>
                    </button>
                `
            : nothing}
        `;
    }
};
__decorate([
    property({ type: Boolean, reflect: true })
], QvChip.prototype, "selectable", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], QvChip.prototype, "dismissible", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], QvChip.prototype, "selected", void 0);
__decorate([
    property()
], QvChip.prototype, "value", void 0);
__decorate([
    state()
], QvChip.prototype, "hasIcon", void 0);
QvChip = __decorate([
    customElement('qv-chip')
], QvChip);
export { QvChip };
//# sourceMappingURL=qv-chip.js.map