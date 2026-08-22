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

import { html, nothing, type PropertyValues } from "lit";
import { property, state, customElement } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import { QvElement, createComponentMetadata, createTagName, queryDecorator as query } from "@quevy/core";

import { OverlayController } from "../_internal/overlay/overlay-controller.js";

import { qvMenuStyles } from "./qv-menu.styles.js";
import type { QvMenuItem, QvMenuSelectEventDetail } from "./qv-menu.types.js";

const KEBAB_ICON = html`
    <svg class="kebab-icon" viewBox="0 0 20 20" fill="currentColor">
        <circle cx="10" cy="4" r="1.6" />
        <circle cx="10" cy="10" r="1.6" />
        <circle cx="10" cy="16" r="1.6" />
    </svg>
`;

@customElement('qv-menu')
export class QvMenu extends QvElement {
    static override styles = qvMenuStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvMenu',
        tagName: createTagName('menu'),
        version: '0.1.2',
    });

    @property({ attribute: false})
    public items: QvMenuItem[] = [];

    @property({ reflect: true, attribute: 'aria-label' })
    public label = 'Open menu';

    @state() private hasCustomTrigger = false;

    private readonly overlay: OverlayController = new OverlayController(this, {
        placement: 'bottom-end',
        onOpenChange: () => this.requestUpdate(),
    })

    @query('.trigger', false) private triggerEl!: HTMLButtonElement | null;
    @query('.panel', false) private panelEl!: HTMLUListElement | null;

    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        this.overlay.trigger = this.triggerEl;
        this.overlay.panel = this.panelEl;
    }

    private readonly handleTriggerSlotChange = (): void => {
        this.hasCustomTrigger = this.hasSlot('trigger');
    }

    private readonly handleTriggerClick = (): void => {
        this.overlay.toggle();
    }

    private readonly handleTriggerKeyDown = (event: KeyboardEvent) : void => {
        if (!this.overlay.isOpen && ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
            event.preventDefault();
            this.overlay.open();
        }
    };
    
    private selectItem(item: QvMenuItem, index: number, event: Event): void {
        if (item.disabled) return;

        if(item.href) {
            this.overlay.close();
            return; // real <a> handles navigation natively, no preventDefault
        }

        event.preventDefault();
        this.emit<QvMenuSelectEventDetail>('select', { id: item.id, label:item.label, index});
        this.overlay.close();
    }

    private readonly handleItemKeyDown = (event: KeyboardEvent, index: number): void => {
        const options = Array.from(this.panelEl?.querySelectorAll<HTMLElement>('item') ?? []);

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            options[index + 1]?.focus();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            options[index - 1]?.focus();
        }
    };

    protected override render() {
        return html`
            <button
                type="button"
                class=${classMap({ trigger: true, 'has-custom-trigger': this.hasCustomTrigger})}
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
                ? html`
                    <ul class="panel" part="panel" role="menu">
                        ${this.items.map(
                            (item, index) => html`
                                <li role="none">
                                    ${item.href
                                        ? html`
                                            <a
                                                class="item"
                                                part="item"
                                                role="menuitem"
                                                tabindex="-1"
                                                href=${item.href}
                                                aria-disabled=${item.disabled ? 'ture' : 'false'}
                                                @click=${(e: Event) => this.selectItem(item, index, e)}
                                                @keydown=${(e: KeyboardEvent) => this.handleItemKeyDown(e, index)}
                                            >${item.icon ? html`<span class="item-icon" part="item-icon" aria-hidden="true">${item.icon}</span>` : nothing}
                                                <span part="item-label">${item.label}</span>
                                            </a>
                                        `
                                        : html`
                                            <button 
                                                type="button"
                                                class="item"
                                                part="item"
                                                role="menuitem"
                                                tabindex="-1"
                                                aria-disabled=${item.disabled ? 'true' : 'false'}
                                                @click=${(e: Event) => this.selectItem(item, index, e)}
                                                @keydown=${(e: KeyboardEvent) => this.handleItemKeyDown(e, index)}
                                            >${item.icon ? html`<span class="item-icon" part="item-icon" aria-hidden="true"><${item.icon}</span>` : nothing}
                                                </span>${item.label}</span>
                                            </button>
                                        `}
                                </li>    
                            `,       
                        )}
                    </ul>
                `
            : nothing }
        `;
    }
}