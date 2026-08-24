/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-menu
 * ----------------------------------------------------------
 * Built on the shared OverlayController, same as qv-dropdown.
 * Unlike qv-dropdown, this holds no "selected value" — every
 * item click is a one-shot action (navigate via href, or emit
 * `select` for the consumer to handle).
 *
 * Trigger is slotted: defaults to a kebab icon (⋮) when empty,
 * but accepts any custom content — this is what makes it also
 * fit the navbar "Products ▾" use case, not just card kebab
 * menus.
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
import { QvElement, createComponentMetadata, createTagName, queryDecorator as query } from "@quevy/core";
import { OverlayController } from "../_internal/overlay/overlay-controller.js";
import { qvMenuStyles } from "./qv-menu.styles.js";
const KEBAB_ICON = html `
    <svg class="kebab-icon" viewBox="0 0 20 20" fill="currentColor">
        <circle cx="10" cy="4" r="1.6" />
        <circle cx="10" cy="10" r="1.6" />
        <circle cx="10" cy="16" r="1.6" />
    </svg>
`;
let QvMenu = class QvMenu extends QvElement {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvMenu',
            tagName: createTagName('menu'),
            version: '0.1.2',
        });
        this.items = [];
        this.placement = 'bottom-end';
        this.label = 'Open menu';
        this.hasCustomTrigger = false;
        this.overlay = new OverlayController(this, {
            placement: this.placement,
            onOpenChange: () => this.requestUpdate(),
        });
        this.handleTriggerSlotChange = () => {
            this.hasCustomTrigger = this.hasSlot('trigger');
        };
        this.handleTriggerClick = () => {
            this.overlay.toggle();
        };
        this.handleTriggerKeyDown = (event) => {
            if (!this.overlay.isOpen && ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
                event.preventDefault();
                this.overlay.open();
            }
        };
        this.handleItemKeyDown = (event, index) => {
            const options = Array.from(this.panelEl?.querySelectorAll('item') ?? []);
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                options[index + 1]?.focus();
            }
            else if (event.key === 'ArrowUp') {
                event.preventDefault();
                options[index - 1]?.focus();
            }
        };
    }
    static { this.styles = qvMenuStyles; }
    updated(changedProperties) {
        super.updated(changedProperties);
        this.overlay.setPlacement(this.placement);
        this.overlay.trigger = this.triggerEl;
        this.overlay.panel = this.panelEl;
    }
    selectItem(item, index, event) {
        if (item.disabled)
            return;
        if (item.href) {
            this.overlay.close();
            return; // real <a> handles navigation natively, no preventDefault
        }
        event.preventDefault();
        this.emit('select', { id: item.id, label: item.label, index });
        this.overlay.close();
    }
    render() {
        return html `
            <button
                type="button"
                class=${classMap({ trigger: true, 'has-custom-trigger': this.hasCustomTrigger })}
                aria-haspopup="menu"
                aria-expanded=${this.overlay.isOpen}
                aria-label=${this.hasCustomTrigger ? nothing : this.label}
                @click=${this.handleTriggerClick}
                @keydown=${this.handleTriggerKeyDown}
            >
                <slot name="trigger" @slotchange=${this.handleTriggerSlotChange}>
                    ${KEBAB_ICON}
                </slot>
            </button>

            ${this.overlay.isOpen
            ? html `
                    <ul class="panel" part="panel" role="menu">
                        ${this.items.map((item, index) => html `
                                <li role="none">
                                    ${item.href
                ? html `
                                            <a
                                                class="item"
                                                part="item"
                                                role="menuitem"
                                                tabindex="-1"
                                                href=${item.href}
                                                aria-disabled=${item.disabled ? 'ture' : 'false'}
                                                @click=${(e) => this.selectItem(item, index, e)}
                                                @keydown=${(e) => this.handleItemKeyDown(e, index)}
                                            >${item.icon ? html `<span class="item-icon" part="item-icon" aria-hidden="true">${item.icon}</span>` : nothing}
                                                <span part="item-label">${item.label}</span>
                                            </a>
                                        `
                : html `
                                            <button 
                                                type="button"
                                                class="item"
                                                part="item"
                                                role="menuitem"
                                                tabindex="-1"
                                                aria-disabled=${item.disabled ? 'true' : 'false'}
                                                @click=${(e) => this.selectItem(item, index, e)}
                                                @keydown=${(e) => this.handleItemKeyDown(e, index)}
                                            >${item.icon ? html `<span class="item-icon" part="item-icon" aria-hidden="true">${item.icon}</span>` : nothing}
                                                </span>${item.label}</span>
                                            </button>
                                        `}
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
], QvMenu.prototype, "items", void 0);
__decorate([
    property({ reflect: true })
], QvMenu.prototype, "placement", void 0);
__decorate([
    property({ reflect: true, attribute: 'aria-label' })
], QvMenu.prototype, "label", void 0);
__decorate([
    state()
], QvMenu.prototype, "hasCustomTrigger", void 0);
__decorate([
    query('.trigger', false)
], QvMenu.prototype, "triggerEl", void 0);
__decorate([
    query('.panel', false)
], QvMenu.prototype, "panelEl", void 0);
QvMenu = __decorate([
    customElement('qv-menu')
], QvMenu);
export { QvMenu };
//# sourceMappingURL=qv-menu.js.map