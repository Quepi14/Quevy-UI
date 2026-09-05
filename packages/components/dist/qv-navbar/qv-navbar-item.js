var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-navbar-item
 * ----------------------------------------------------------
 * Deliberately NOT self-managing `active` - same reasoning as
 * qv-radio: it's pushed down imperatively by the enclosing
 * qv-navbar, this component only reports intent (click/keyboard)
 * via a plain DOM event the navbar listens for.
 *
 * Icon is the default slot; `label` only becomes visible while
 * `active` (grid-template-columns 0fr -> 1fr, no JS measurement -
 * same technique as qv-collapsible's panel).
 *
 * @packageDocumentation
 */
import { html, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { QvElement, createComponentMetadata, createTagName, FocusableMixin, DisabledMixin } from '@quevy/core';
import { qvNavbarItemStyles } from './qv-navbar-item.styles.js';
const QvNavbarItemBase = DisabledMixin(FocusableMixin(QvElement));
let QvNavbarItem = class QvNavbarItem extends QvNavbarItemBase {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvNavbarItem',
            tagName: createTagName('navbar-item'),
            version: '0.1.0',
        });
        this.value = '';
        this.label = '';
        /** Set imperatively by the parent qv-navbar - do not bind this from outside. */
        this.active = false;
        this.handleActivate = (event) => {
            if (this.disabled)
                return;
            // href handles its own navigation via the native <a> - only
            // suppress it when there's none to fall back on.
            if (!this.href)
                event.preventDefault();
            this.dispatchEvent(new CustomEvent('qv-navbar-item-activate', { bubbles: true, composed: true }));
        };
        this.handleKeyDown = (event) => {
            if (this.disabled)
                return;
            if (event.key === ' ')
                event.preventDefault();
        };
        this.handleKeyUp = (event) => {
            if (this.disabled)
                return;
            if (event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        };
    }
    static { this.styles = qvNavbarItemStyles; }
    onConnected() {
        this.addEventListener('click', this.handleActivate);
        this.addEventListener('keydown', this.handleKeyDown);
        this.addEventListener('keyup', this.handleKeyUp);
    }
    onDisconnected() {
        this.removeEventListener('click', this.handleActivate);
        this.removeEventListener('keydown', this.handleKeyDown);
        this.removeEventListener('keyup', this.handleKeyUp);
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        this.setAttribute('aria-current', this.active ? 'page' : 'false');
    }
    render() {
        const content = html `
            <span class="icon" part="icon"><slot></slot></span>
            <span class="label-outer" part="label-outer">
                <span class="label-inner">
                    <span class="label" part="label">${this.label}</span>
                </span>
            </span>
        `;
        return this.href
            ? html `
                <a class="item" part="item" href=${this.href} tabIndex=${this.disabled ? -1 : 0} aria-label=${this.label || nothing}></a>
            `
            : html `
                <button type="button" class="item" part="item" ?disabled=${this.disabled} aria-label=${this.label || nothing}>
                    ${content}
                </button>
            `;
    }
};
__decorate([
    property()
], QvNavbarItem.prototype, "value", void 0);
__decorate([
    property()
], QvNavbarItem.prototype, "label", void 0);
__decorate([
    property()
], QvNavbarItem.prototype, "href", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], QvNavbarItem.prototype, "active", void 0);
QvNavbarItem = __decorate([
    customElement('qv-navbar-item')
], QvNavbarItem);
export { QvNavbarItem };
//# sourceMappingURL=qv-navbar-item.js.map