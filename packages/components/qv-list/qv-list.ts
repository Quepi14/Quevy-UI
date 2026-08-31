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

import { customElement } from "lit/decorators.js";
import { html } from "lit";

import { QvElement, createComponentMetadata, createTagName, host, createStyles } from "@quevy/core";

const qvListStyles = createStyles(`
${host()} { display: block; }    
`);

@customElement('qv-list')
export class QvList extends QvElement {
    static override styles = qvListStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvList',
        tagName: createTagName('list'),
        version: '0.1.1',
    });

    public override onConnected(): void {
        this.setAttribute('role', 'list');
    }

    protected override render() {
        return html`<slot></slot>`;
    }
}