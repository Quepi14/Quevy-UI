/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-list
 * ----------------------------------------------------------
 * Compound with qv-list-item (light-DOM children), not
 * data-driven — chosen because consumer needs range from
 * plain-text-only items up to rich leading/trailing items, and
 * a fixed columns[]/rows[]-style API (like qv-table) would force
 * one shape on both cases. Communication is plain DOM: no
 * shared context/state manager, consistent with the
 * "Compound Components" decision made back during core's audit
 * (DOM hierarchy + slots is enough here — no consumer for
 * anything more).
 *
 * @packageDocumentation
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement } from "lit/decorators.js";
import { html } from "lit";
import { QvElement, createComponentMetadata, createTagName, host, createStyles } from "@quevy/core";
const qvListStyles = createStyles(`
${host()} { display: block; }    
`);
let QvList = class QvList extends QvElement {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvList',
            tagName: createTagName('list'),
            version: '0.1.1',
        });
    }
    static { this.styles = qvListStyles; }
    onConnected() {
        this.setAttribute('role', 'list');
    }
    render() {
        return html `<slot></slot>`;
    }
};
QvList = __decorate([
    customElement('qv-list')
], QvList);
export { QvList };
//# sourceMappingURL=qv-list.js.map