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

import { customElement, property } from "lit/decorators.js";
import { html, type CSSResultGroup } from "lit";

import { QvElement, createComponentMetadata, createTagName, host, createStyles } from "@quevy/core";

import { QvCollapsible } from "../qv-collapsible/qv-collapsible.js";

const qvAccordionStyles = createStyles(`
${host()} {
    display: flex;
    flex-direction: column;
    gap: var(--qv-spacing-sm, 8px);
}    
`);

@customElement('qv-accordion')
export class QvAccordion extends QvElement {
    static override styles = qvAccordionStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvAccordion',
        tagName: createTagName('accordion'),
        version: '0.1.0',
    });

    @property({ type: Boolean, reflect: true })
    public exclusive = false;

    public override onConnected(): void {
        this.addEventListener('qv-collapsible-toggle', this.handleChildToggle as EventListener);
    }

    public override onDisconnected(): void {
        this.removeEventListener('qv-collapsible-toggle', this.handleChildToggle as EventListener);
    }

    private get items(): QvCollapsible[] {
        return Array.from(this.querySelectorAll('qv-collapsible')) as unknown as QvCollapsible[];
    }

    private readonly handleChildToggle = (event: Event): void => {
        if (!this.exclusive) return;

        const detail = (event as CustomEvent<{ open: boolean}>).detail;
        if (!detail.open) return;

        const source = event.target as QvCollapsible;
        for (const item of this.items) {
            if (item !== source) item.open = false;
        }
    };

    protected override render() {
        return html`<slot></slo>`;
    }
}