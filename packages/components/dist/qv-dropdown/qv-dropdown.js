/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-dropdown
 * ----------------------------------------------------------
 * Built on top of the shared OverlayController (open/close,
 * positioning, outside-click, Escape, focus trap, focus
 * restoration). This file owns only dropdown-specific
 * semantics: single-value selection and the listbox roving
 * keyboard pattern.
 *
 * First real consumer of @quevy/core's `query` decorator.
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
import { property, customElement } from "lit/decorators.js";
import { QvElement, createComponentMetadata, createTagName, queryDecorator as query, DisabledMixin } from "@quevy/core";
import { createControllableValue } from "@quevy/state";
import { OverlayController } from "../_internal/overlay/overlay-controller.js";
import { qvDropdownStyles } from './qv-dropdown.styles.js';
const QvDropdownBase = DisabledMixin(QvElement);
let QvDropdown = class QvDropdown extends QvDropdownBase {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvDropdown',
            tagName: createTagName('dropdown'),
            version: '0.1.2',
        });
        this.items = [];
        this.placeholder = 'Select an option';
        this.controllableValue = createControllableValue(undefined);
        this.overlay = new OverlayController(this, {
            placement: 'bottom-start',
            onOpenChange: () => this.requestUpdate(),
        });
        this.handleTriggerClick = () => {
            if (this.disabled)
                return;
            this.overlay.toggle();
        };
        this.handleTriggerKeyDown = (event) => {
            if (this.disabled)
                return;
            if (!this.overlay.isOpen && (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ')) {
                event.preventDefault();
                this.overlay.open();
            }
        };
        this.handleOptionKeyDown = (event, index) => {
            const options = Array.from(this.panelEl?.querySelectorAll('.option') ?? []);
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                options[index + 1]?.focus();
            }
            else if (event.key === 'ArrowUp') {
                event.preventDefault();
                options[index - 1]?.focus();
            }
            else if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.selectItem(this.items[index]);
            }
        };
    }
    static { this.styles = qvDropdownStyles; }
    get currentValue() {
        return this.controllableValue.value(this.value);
    }
    get selectedItem() {
        return this.items.find((item) => item.value === this.currentValue);
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        this.overlay.trigger = this.triggerEl;
        this.overlay.panel = this.panelEl;
        this.toggleAttribute('open', this.overlay.isOpen);
    }
    selectItem(item) {
        if (item.disabled)
            return;
        const resolved = this.controllableValue.request(this.value, item.value);
        this.emit('change', { value: resolved });
        this.invalidate();
        this.overlay.close();
    }
    render() {
        const selected = this.selectedItem;
        return html `
        <button
            type="button"
            class="trigger"
            aria-haspopup="listbox"
            aria-expended=${this.overlay.isOpen}
            ?disabled=${this.disabled}
            @click=${this.handleTriggerClick}
            @keydown=${this.handleTriggerKeyDown}
        >
            <span class=${selected ? '' : 'placeholder'}>
                ${selected ? selected.label : this.placeholder}
            </span>
            <svg class="chevron" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5.2 7.2a1 1 0 011.4 0L10 10.6l3.4-3.4a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z"/>
                </svg>
        </button>

        ${this.overlay.isOpen
            ? html `
                <ul class="panel" part="panel" role="listbox">
                    ${this.items.map((item, index) => html `
                            <li>
                                <button
                                    type="button"
                                    class="option"
                                    role="option"
                                    tabindex="-1"
                                    aria-selected=${item.value === this.currentValue}
                                    aria-disabled=${item.disabled ? 'true' : 'false'}
                                    @click=${() => this.selectItem(item)}
                                    @keydown=${(e) => this.handleOptionKeyDown(e, index)}
                                >${item.label}></button>
                            </li>
                        `)}
                </ul>
            `
            : nothing}
        `;
    }
};
__decorate([
    property({ attribute: false })
], QvDropdown.prototype, "items", void 0);
__decorate([
    property()
], QvDropdown.prototype, "value", void 0);
__decorate([
    property()
], QvDropdown.prototype, "placeholder", void 0);
__decorate([
    query('.trigger', false)
], QvDropdown.prototype, "triggerEl", void 0);
__decorate([
    query('.panel', false)
], QvDropdown.prototype, "panelEl", void 0);
QvDropdown = __decorate([
    customElement('qv-dropdown')
], QvDropdown);
export { QvDropdown };
//# sourceMappingURL=qv-dropdown.js.map