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
import { property, state, customElement } from "lit/decorators.js";

import { QvElement, createComponentMetadata, createTagName, queryDecorator as query, DisabledMixin } from "@quevy/core";
import { createControllableValue } from "@quevy/state";

import { OverlayController } from "../_internal/overlay/overlay-controller.js";

import { qvDropdownStyles } from './qv-dropdown.styles.js'
import type { QvDropdownVariant, QvDropdownItem, QvDropdownChangeEventDetail } from "./qv-dropdown.types.js";

const QvDropdownBase = DisabledMixin(QvElement);

@customElement('qv-dropdown')
export class QvDropdown extends QvDropdownBase {
    static override styles = qvDropdownStyles;

    public override readonly metadata = createComponentMetadata ({
        name: 'QvDropdown',
        tagName: createTagName('dropdown'),
        version: '0.2.0',
    });

    @property({ attribute: false})
    public items: QvDropdownItem[]=[];

    /** Controlled value prop. Leave unset for uncontrolled usage. */
    @property()
    public value?: string;

    @property()
    public placeholder = 'Select an option';

    @property({reflect: true})
    public variant: QvDropdownVariant = 'normal';
    
    @property()
    public searchPlaceholder = 'Search.....';

    @state() private searchTerm = '';

    private readonly controllableValue = createControllableValue<string | undefined>(undefined);

    private readonly overlay: OverlayController = new OverlayController(this, {
        placement: 'bottom-start',
        onOpenChange: () => this.requestUpdate(),
        autoFocusPanel: () => this.variant !== 'combobox',
    })

    @query('.trigger', false) private triggerEl!: HTMLButtonElement | HTMLInputElement | null;
    @query('.panel', false) private panelEl!: HTMLDivElement | null;
    @query('.search-input', false) private searchInputEl!: HTMLInputElement | null;
    private wasOpen = false;

    private get currentValue(): string | undefined {
        return this.controllableValue.value(this.value);
    }

    private get selectedItem(): QvDropdownItem | undefined {
        return this.items.find((item) => item.value === this.currentValue);
    }

    private get displayLabel(): string {
        const selected = this.selectedItem;
        if (selected) return selected.label;
        if (this.variant === 'combobox' && this.currentValue) return this.currentValue;
        return '';
    }

    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        this.overlay.trigger = this.triggerEl;
        this.overlay.panel = this.panelEl;

        this.toggleAttribute('open', this.overlay.isOpen);

        if (this.overlay.isOpen && !this.wasOpen && this.variant === 'normal') {
            this.triggerEl?.focus();
        }
        this.wasOpen = this.overlay.isOpen;
    }

    private readonly handleTriggerFocus = (event: FocusEvent): void => {
        if(this.disabled) return;
        if(!this.overlay.isOpen) {
            this.searchTerm = this.displayLabel;
            this.overlay.open();
        }
        (event.target as HTMLInputElement).select();
    };

    private readonly handleTriggerInputKeyDown = (event: KeyboardEvent): void => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            this.panelEl?.querySelector<HTMLButtonElement>('.option')?.focus();
        } else if (event.key === 'Escape') {
            this.overlay.close();
        } else if (event.key === 'Enter') {
             if (this.visibleItems.length === 1) {
                this.selectItem(this.visibleItems[0]);
            } else if (this.variant === 'combobox' && this.visibleItems.length === 0) {
                this.commitCustomvalue(this.searchTerm);
            }
        }
    };

    private readonly handleTriggerBlur = (): void => {
        if (this.variant === 'combobox' && this.searchTerm.trim() && this.visibleItems.length === 0) {
            this.commitCustomvalue(this.searchTerm);
        }
    };

    private readonly handleTriggerClick = (): void => {
        if (this.disabled) return;
        this.overlay.toggle();
        if (this.variant === 'search') {
            this.searchTerm = '';
        }
    }

    private readonly handleTriggerKeyDown = (event: KeyboardEvent): void => {
        if (this.disabled) return;

        if (!this.overlay.isOpen && (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            this.overlay.open();
        }
    };

    private readonly handleSearchInput = (event: Event): void => {
        this.searchTerm = (event.target as HTMLInputElement).value;
    }

    private readonly handleSearchKeyDown = (event: KeyboardEvent): void => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            this.panelEl?.querySelector<HTMLButtonElement>('.option')?.focus();
        }else if (event.key === 'Escape') {
            this.overlay.close();
        } 
    }

    private selectItem(item: QvDropdownItem): void {
        if (item.disabled) return;

        const resolved = this.controllableValue.request(this.value, item.value);
        this.emit<QvDropdownChangeEventDetail>('change', { value: resolved as string });
        this.invalidate();
        this.overlay.close();
    }

    private commitCustomvalue(text: string): void {
        const trimmed = text.trim();
        if (!trimmed) return;

        const resolved = this.controllableValue.request(this.value, trimmed);
        this.emit<QvDropdownChangeEventDetail>('change', { value: resolved as string});
        this.invalidate();
        this.overlay.close();
    }

    private get visibleItems(): QvDropdownItem[] {
        if (this.variant === 'normal' || !this.searchTerm.trim()) return this.items;
        const query = this.searchTerm.trim().toLowerCase();
        return this.items.filter((item) => item.label.toLocaleLowerCase().includes(query));
    }

    private readonly handleOptionKeyDown = (event: KeyboardEvent, item: QvDropdownItem, index: number): void => {
        const options = Array.from(
            this.panelEl?.querySelectorAll<HTMLButtonElement>('.option') ?? [],
        );

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            options[index + 1]?.focus();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (index === 0 && this.variant !== 'combobox') {
                this.triggerEl?.focus();
            } else if (index === 0 && this.variant === 'search') {
                this.searchInputEl?.focus();
            } else{
                options[index - 1]?.focus();
            }
        } else if (event.key === 'Enter' || event.key === ' '  ) {
            event.preventDefault()
            this.selectItem(item);
        }
    };

    private readonly handleTriggerInput = (event: Event): void => {
        this.searchTerm = (event.target as HTMLInputElement).value;
    }

    protected override render(): TemplateResult {
        const selected = this.selectedItem;
        const visible = this.visibleItems;

        return html`
            ${this.variant === 'combobox'
                ? html`
                    <input
                        type="text"
                        class="trigger"
                        role="combobox"
                        aria-haspopup="listbox"
                        aria-expanded=${this.overlay.isOpen}
                        ?disabled=${this.disabled}
                        placeholder=${this.placeholder}
                        .value=${this.overlay.isOpen ? this.searchTerm : this.displayLabel}
                        @focus=${this.handleTriggerFocus}
                        @input=${this.handleTriggerInput}
                        @keydown=${this.handleTriggerInputKeyDown}
                        @blur=${this.handleTriggerBlur}
                    />
                    <svg class="chevron" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5.2 7.2a1 1 0 011.4 0L10 10.6l3.4-3.4a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z"/>
                    </svg>
                `
                : html`
                    <button
                        type="button"
                        class="trigger"
                        aria-haspopup="listbox"
                        aria-expanded=${this.overlay.isOpen}
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
                `}

            ${this.overlay.isOpen
                ? html`
                    <div class="panel" part="panel">
                        ${this.variant === 'search'
                            ? html`
                                <div class="search-wrap">
                                    <svg class="search-icon" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M9 3a6 6 0 104.472 10.03l4.25 4.25a1 1 0 001.415-1.414l-4.25-4.25A6 6 0 009 3zm-4 6a4 4 0 118 0 4 4 0 01-8 0z" clip-rule="evenodd"/>
                                    </svg>
                                    <input
                                        type="text"
                                        class="search-input"
                                        placeholder=${this.searchPlaceholder}
                                        .value=${this.searchTerm}
                                        @input=${this.handleSearchInput}
                                        @keydown=${this.handleSearchKeyDown}
                                    />
                                </div>
                            `
                        : nothing}

                        <ul class="options" part="options" role="listbox">
                            ${visible.length === 0
                                ? html`<li class="empty">Tidak ada hasil</li>`
                                : visible.map(
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
                                                @keydown=${(e: KeyboardEvent) => this.handleOptionKeyDown(e, item, index)}
                                            >
                                                <span class="option-label">${item.label}</span>
                                                ${item.value === this.currentValue
                                                    ? html`<svg class="check" viewBox="0 0 20 20" fill="currentColor"><path d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z"/></svg>`
                                                    : nothing}
                                            </button>
                                        </li>
                                    `,
                                )}
                        </ul>
                    </div>
                `
            : nothing}
        `;
    }
}