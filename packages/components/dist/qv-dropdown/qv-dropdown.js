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
import { property, state, customElement } from "lit/decorators.js";
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
            version: '0.2.0',
        });
        this.items = [];
        this.placeholder = 'Select an option';
        this.variant = 'normal';
        this.searchPlaceholder = 'Search.....';
        this.searchTerm = '';
        this.controllableValue = createControllableValue(undefined);
        this.overlay = new OverlayController(this, {
            placement: 'bottom-start',
            onOpenChange: () => this.requestUpdate(),
            autoFocusPanel: () => this.variant !== 'combobox',
        });
        this.wasOpen = false;
        this.handleTriggerFocus = (event) => {
            if (this.disabled)
                return;
            if (!this.overlay.isOpen) {
                this.searchTerm = this.displayLabel;
                this.overlay.open();
            }
            event.target.select();
        };
        this.handleTriggerInputKeyDown = (event) => {
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                this.panelEl?.querySelector('.option')?.focus();
            }
            else if (event.key === 'Escape') {
                this.overlay.close();
            }
            else if (event.key === 'Enter') {
                if (this.visibleItems.length === 1) {
                    this.selectItem(this.visibleItems[0]);
                }
                else if (this.variant === 'combobox' && this.visibleItems.length === 0) {
                    this.commitCustomvalue(this.searchTerm);
                }
            }
        };
        this.handleTriggerBlur = () => {
            if (this.variant === 'combobox' && this.searchTerm.trim() && this.visibleItems.length === 0) {
                this.commitCustomvalue(this.searchTerm);
            }
        };
        this.handleTriggerClick = () => {
            if (this.disabled)
                return;
            this.overlay.toggle();
            if (this.variant === 'search') {
                this.searchTerm = '';
            }
        };
        this.handleTriggerKeyDown = (event) => {
            if (this.disabled)
                return;
            if (!this.overlay.isOpen && (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ')) {
                event.preventDefault();
                this.overlay.open();
            }
        };
        this.handleSearchInput = (event) => {
            this.searchTerm = event.target.value;
        };
        this.handleSearchKeyDown = (event) => {
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                this.panelEl?.querySelector('.option')?.focus();
            }
            else if (event.key === 'Escape') {
                this.overlay.close();
            }
        };
        this.handleOptionKeyDown = (event, item, index) => {
            const options = Array.from(this.panelEl?.querySelectorAll('.option') ?? []);
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                options[index + 1]?.focus();
            }
            else if (event.key === 'ArrowUp') {
                event.preventDefault();
                if (index === 0 && this.variant !== 'combobox') {
                    this.triggerEl?.focus();
                }
                else if (index === 0 && this.variant === 'search') {
                    this.searchInputEl?.focus();
                }
                else {
                    options[index - 1]?.focus();
                }
            }
            else if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.selectItem(item);
            }
        };
        this.handleTriggerInput = (event) => {
            this.searchTerm = event.target.value;
        };
    }
    static { this.styles = qvDropdownStyles; }
    get currentValue() {
        return this.controllableValue.value(this.value);
    }
    get selectedItem() {
        return this.items.find((item) => item.value === this.currentValue);
    }
    get displayLabel() {
        const selected = this.selectedItem;
        if (selected)
            return selected.label;
        if (this.variant === 'combobox' && this.currentValue)
            return this.currentValue;
        return '';
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        this.overlay.trigger = this.triggerEl;
        this.overlay.panel = this.panelEl;
        this.toggleAttribute('open', this.overlay.isOpen);
        if (this.overlay.isOpen && !this.wasOpen && this.variant === 'normal') {
            this.triggerEl?.focus();
        }
        this.wasOpen = this.overlay.isOpen;
    }
    selectItem(item) {
        if (item.disabled)
            return;
        const resolved = this.controllableValue.request(this.value, item.value);
        this.emit('change', { value: resolved });
        this.invalidate();
        this.overlay.close();
    }
    commitCustomvalue(text) {
        const trimmed = text.trim();
        if (!trimmed)
            return;
        const resolved = this.controllableValue.request(this.value, trimmed);
        this.emit('change', { value: resolved });
        this.invalidate();
        this.overlay.close();
    }
    get visibleItems() {
        if (this.variant === 'normal' || !this.searchTerm.trim())
            return this.items;
        const query = this.searchTerm.trim().toLowerCase();
        return this.items.filter((item) => item.label.toLocaleLowerCase().includes(query));
    }
    render() {
        const selected = this.selectedItem;
        const visible = this.visibleItems;
        return html `
            ${this.variant === 'combobox'
            ? html `
                    <input
                        type="text"
                        class="trigger"
                        role="combobox"
                        aria-haspopup="listbox"
                        aria-expanded=${this.overlay.isOpen}
                        ?disabled=${this.disabled}
                        placeholder=${this.placeholder}
                        .value=${this.overlay.isOpen ? this.searchTerm : this.displayLabel}
                        @focus=${this.handleTriggerFocus}
                        @input=${this.handleTriggerInput}
                        @keydown=${this.handleTriggerInputKeyDown}
                        @blur=${this.handleTriggerBlur}
                    />
                    <svg class="chevron" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5.2 7.2a1 1 0 011.4 0L10 10.6l3.4-3.4a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z"/>
                    </svg>
                `
            : html `
                    <button
                        type="button"
                        class="trigger"
                        aria-haspopup="listbox"
                        aria-expanded=${this.overlay.isOpen}
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
                `}

            ${this.overlay.isOpen
            ? html `
                    <div class="panel" part="panel">
                        ${this.variant === 'search'
                ? html `
                                <div class="search-wrap">
                                    <svg class="search-icon" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M9 3a6 6 0 104.472 10.03l4.25 4.25a1 1 0 001.415-1.414l-4.25-4.25A6 6 0 009 3zm-4 6a4 4 0 118 0 4 4 0 01-8 0z" clip-rule="evenodd"/>
                                    </svg>
                                    <input
                                        type="text"
                                        class="search-input"
                                        placeholder=${this.searchPlaceholder}
                                        .value=${this.searchTerm}
                                        @input=${this.handleSearchInput}
                                        @keydown=${this.handleSearchKeyDown}
                                    />
                                </div>
                            `
                : nothing}

                        <ul class="options" part="options" role="listbox">
                            ${visible.length === 0
                ? html `<li class="empty">Tidak ada hasil</li>`
                : visible.map((item, index) => html `
                                        <li>
                                            <button
                                                type="button"
                                                class="option"
                                                role="option"
                                                tabindex="-1"
                                                aria-selected=${item.value === this.currentValue}
                                                aria-disabled=${item.disabled ? 'true' : 'false'}
                                                @click=${() => this.selectItem(item)}
                                                @keydown=${(e) => this.handleOptionKeyDown(e, item, index)}
                                            >
                                                <span class="option-label">${item.label}</span>
                                                ${item.value === this.currentValue
                    ? html `<svg class="check" viewBox="0 0 20 20" fill="currentColor"><path d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z"/></svg>`
                    : nothing}
                                            </button>
                                        </li>
                                    `)}
                        </ul>
                    </div>
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
    property({ reflect: true })
], QvDropdown.prototype, "variant", void 0);
__decorate([
    property()
], QvDropdown.prototype, "searchPlaceholder", void 0);
__decorate([
    state()
], QvDropdown.prototype, "searchTerm", void 0);
__decorate([
    query('.trigger', false)
], QvDropdown.prototype, "triggerEl", void 0);
__decorate([
    query('.panel', false)
], QvDropdown.prototype, "panelEl", void 0);
__decorate([
    query('.search-input', false)
], QvDropdown.prototype, "searchInputEl", void 0);
QvDropdown = __decorate([
    customElement('qv-dropdown')
], QvDropdown);
export { QvDropdown };
//# sourceMappingURL=qv-dropdown.js.map