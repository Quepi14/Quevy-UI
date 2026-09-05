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
import { html, type PropertyValues } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import { QvElement, createComponentMetadata, createTagName } from '@quevy/core';
import { createControllableValue } from '@quevy/state';

import { qvNavbarStyles } from './qv-navbar.styles.js';
import type { QvNavbarItem } from './qv-navbar-item.js';

@customElement('qv-navbar')
export class QvNavbar extends QvElement {
    static override styles = qvNavbarStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvNavbar',
        tagName: createTagName('navbar'),
        version: '0.1.1',
    });

    /** Controlled prop. Leave unset for uncontrolled usage. */
    @property() public value?: string;

    private readonly controllableValue = createControllableValue<string | undefined>(undefined);

    private get currentValue(): string | undefined {
        return this.controllableValue.value(this.value);
    }

    public override onConnected(): void {
        this.setAttribute('role', 'navigation');
        this.addEventListener('qv-navbar-item-activate', this.handleActivate as EventListener);
    }

    public override onDisconnected(): void {
        this.removeEventListener('qv-navbar-item-activate', this.handleActivate as EventListener);
    }

    private get items(): QvNavbarItem[] {
        return Array.from(this.querySelectorAll('qv-navbar-item')) as unknown as QvNavbarItem[];
    }

    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        this.syncChildren();
    }

    /** 
     * Pushes `active` down to every qv-navbar-item child. Called
     * on every update, not just once, so it stays correct if items
     * are added/removed dynamically.
     */
    private syncChildren(): void {
        const current = this.currentValue;
        for (const item of this.items) {
            item.active = item.value === current;
        }
    }

    private readonly handleActivate = (event: Event): void => {
        const item = event.target as QvNavbarItem;
        if (item.value === this.currentValue) return;

        const resolved = this.controllableValue.request(this.value, item.value);
        this.emit('change', { value: resolved });
        this.invalidate();
    };

    protected override render() {
        return html`<slot></slot>`;
    }
}
