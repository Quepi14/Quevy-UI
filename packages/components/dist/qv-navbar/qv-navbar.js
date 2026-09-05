var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-navbar
 * ----------------------------------------------------------
 * Coordinates single-select among light-DOM qv-navbar-item
 * children - same plain DOM-query + direct property assignment
 * pattern as qv-radio-group, no Context API.
 *
 * @packageDocumentation
 */
import { html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { QvElement, createComponentMetadata, createTagName } from '@quevy/core';
import { createControllableValue } from '@quevy/state';
import { qvNavbarStyles } from './qv-navbar.styles.js';
let QvNavbar = class QvNavbar extends QvElement {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvNavbar',
            tagName: createTagName('navbar'),
            version: '0.1.0',
        });
        this.controllableValue = createControllableValue(undefined);
        this.handleActivate = (event) => {
            const item = event.target;
            if (item.value === this.currentValue)
                return;
            const resolved = this.controllableValue.request(this.value, item.value);
            this.emit('change', { value: resolved });
            this.invalidate();
        };
    }
    static { this.styles = qvNavbarStyles; }
    get currentValue() {
        return this.controllableValue.value(this.value);
    }
    onConnected() {
        this.setAttribute('role', 'navigation');
        this.addEventListener('qv-navbar-item-activate', this.handleActivate);
    }
    onDisconnected() {
        this.removeEventListener('qv-navbar-item-activate', this.handleActivate);
    }
    get items() {
        return Array.from(this.querySelectorAll('qv-navbar-item'));
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        this.syncChildren();
    }
    /**
     * Pushes `active` down to every qv-navbar-item child. Called
     * on every update, not just once, so it stays correct if items
     * are added/removed dynamically.
     */
    syncChildren() {
        const current = this.currentValue;
        for (const item of this.items) {
            item.active = item.value === current;
        }
    }
    render() {
        return html `<slot></slot>`;
    }
};
__decorate([
    property()
], QvNavbar.prototype, "value", void 0);
QvNavbar = __decorate([
    customElement('qv-navbar')
], QvNavbar);
export { QvNavbar };
//# sourceMappingURL=qv-navbar.js.map