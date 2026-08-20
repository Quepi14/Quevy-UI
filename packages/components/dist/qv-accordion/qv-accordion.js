/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-accordion
 * ----------------------------------------------------------
 * Same DOM-query-based coordination pattern as qv-radio-group —
 * plain query of light-DOM qv-collapsible children, no Context
 * API. Listens for the qv-collapsible-toggle event; in exclusive
 * mode, opening one child imperatively closes the rest.
 *
 * @packageDocumentation
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property } from "lit/decorators.js";
import { html } from "lit";
import { QvElement, createComponentMetadata, createTagName, host, createStyles } from "@quevy/core";
import { QvCollapsible } from "../qv-collapsible/qv-collapsible.js";
const qvAccordionStyles = createStyles(`
${host()} {
    display: flex;
    flex-direction: column;
    gap: var(--qv-spacing-sm, 8px);
}    
`);
let QvAccordion = class QvAccordion extends QvElement {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvAccordion',
            tagName: createTagName('accordion'),
            version: '0.1.0',
        });
        this.exclusive = false;
        this.handleChildToggle = (event) => {
            if (!this.exclusive)
                return;
            const detail = event.detail;
            if (!detail.open)
                return;
            const source = event.target;
            for (const item of this.items) {
                if (item !== source)
                    item.open = false;
            }
        };
    }
    static { this.styles = qvAccordionStyles; }
    onConnected() {
        this.addEventListener('qv-collapsible-toggle', this.handleChildToggle);
    }
    onDisconnected() {
        this.removeEventListener('qv-collapsible-toggle', this.handleChildToggle);
    }
    get items() {
        return Array.from(this.querySelectorAll('qv-collapsible'));
    }
    render() {
        return html `<slot></slo>`;
    }
};
__decorate([
    property({ type: Boolean, reflect: true })
], QvAccordion.prototype, "exclusive", void 0);
QvAccordion = __decorate([
    customElement('qv-accordion')
], QvAccordion);
export { QvAccordion };
//# sourceMappingURL=qv-accordion.js.map