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

import { html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { property,  customElement } from "lit/decorators.js";

import { QvElement, createComponentMetadata, createTagName, queryDecorator as query, DisabledMixin } from "@quevy/core";
import { createControllableValue } from "@quevy/state";

import { OverlayController } from "../_internal/overlay/overlay-controller.js";

import { qvDropdownStyles } from './qv-dropdown.styles.js'
import type { QvDropdownItem, QvDropdownChangeEventDetail } from "./qv-dropdown.types.js";

const QvDropdownBase = DisabledMixin(QvElement);

@customElement('qv-dropdown')
export class QvDropdown extends QvDropdownBase {
    static override styles = qvDropdownStyles;

    public override readonly metadata = createComponentMetadata ({
        name: 'QvDropdown',
        tagName: createTagName('dropdown'),
        version: '0.1.2',
    });

    @property({ attribute: false})
    public items: QvDropdownItem[]=[];

    /** Controlled value prop. Leave unset for uncontrolled usage. */
    @property()
    public value?: string;

    @property()
    public placeholder = 'Select an option';

    private readonly controllableValue = createControllableValue<string | undefined>(undefined);

    private readonly overlay: OverlayController = new OverlayController(this, {
        placement: 'bottom-start',
        onOpenChange: () => this.requestUpdate(),
    })

    @query('.trigger', false) private triggerEl!: HTMLButtonElement | null;
    @query('.panel', false) private panelEl!: HTMLUListElement | null;

    private get currentValue(): string | undefined {
        return this.controllableValue.value(this.value);
    }

    private get selectedItem(): QvDropdownItem | undefined {
        return this.items.find((item) => item.value === this.currentValue);
    }

    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        this.overlay.trigger = this.triggerEl;
        this.overlay.panel = this.panelEl;

        this.toggleAttribute('open', this.overlay.isOpen);
    }

    private readonly handleTriggerClick = (): void => {
        if(this.disabled) return;
        this.overlay.toggle();
    };

    private readonly handleTriggerKeyDown = (event: KeyboardEvent): void => {
        if (this.disabled) return;

        if (!this.overlay.isOpen && (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            this.overlay.open();
        }
    };

    private selectItem(item: QvDropdownItem): void {
        if (item.disabled) return;

        const resolved = this.controllableValue.request(this.value, item.value);
        this.emit<QvDropdownChangeEventDetail>('change', { value: resolved as string });
        this.invalidate();
        this.overlay.close();
    }

    private readonly handleOptionKeyDown = (event: KeyboardEvent, index: number): void => {
        const options = Array.from(
            this.panelEl?.querySelectorAll<HTMLButtonElement>('.option') ?? [],
        );

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            options[index + 1]?.focus();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            options[index - 1]?.focus();
        } else if (event.key === 'Enter' || event.key === ' '  ) {
            event.preventDefault()
            this.selectItem(this.items[index]);
        }
    };

    protected override render(): TemplateResult {
        const selected = this.selectedItem;

        return html`
        <button
            type="button"
            class="trigger"
            aria-haspopup="listbox"
            aria-expended=${this.overlay.isOpen}
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

        ${this.overlay.isOpen
            ? html`
                <ul class="panel" part="panel" role="listbox">
                    ${this.items.map(
                        (item, index) => html`
                            <li>
                                <button
                                    type="button"
                                    class="option"
                                    role="option"
                                    tabindex="-1"
                                    aria-selected=${item.value === this.currentValue}
                                    aria-disabled=${item.disabled ? 'true' : 'false'}
                                    @click=${() => this.selectItem(item)}
                                    @keydown=${(e: KeyboardEvent) => this.handleOptionKeyDown(e, index)}
                                >${item.label}></button>
                            </li>
                        `,
                    )}
                </ul>
            `
        : nothing}
        `
    }
}