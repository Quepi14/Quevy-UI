/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-chip
 * ----------------------------------------------------------
 * Standalone (no qv-chip-group) — multi-select-by-nature: each
 * chip's `selected` state is independent, consumer aggregates
 * as needed. `dismissible` deliberately holds no visibility
 * state of its own — see file-level discussion; the consumer
 * owns the source-of-truth array and removes the item, which
 * naturally removes this element from the DOM on re-render.
 *
 * `selectable` is the second real consumer of
 * @quevy/state's synchronization primitives (after qv-banner),
 * validating the earlier decision that simple boolean toggles
 * don't need signal/computed.
 *
 * @packageDocumentation
 */

import { html, nothing, type PropertyValues }  from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { QvElement, createComponentMetadata, createTagName, FocusableMixin, DisabledMixin, type ComponentMetadata } from '@quevy/core';
import { createControllableValue } from '@quevy/state';

import { qvChipStyles } from './qv-chip.styles.js';

const QvChipBase = DisabledMixin(FocusableMixin(QvElement));

@customElement('qv-chip')
export class QvChip extends QvChipBase {
    static override styles = qvChipStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvChip',
        tagName: createTagName('chip'),
        version: '0.1.0',
    });

    @property({ type: Boolean, reflect: true })
    public selectable = false;

    @property({ type: Boolean, reflect: true })
    public dismissible = false;

    @property({ type: Boolean, reflect: true })
    public selected?: boolean;

    @property()
    public value?: string;

    @state() private hasIcon = false;

    private readonly controllableSelected = createControllableValue<boolean>(false);

    private get isSelected(): boolean {
        return this.selectable && this.controllableSelected.value(this.selected);
    }

    public override onConnected(): void {
        this.addEventListener('click', this.handleClick);
        this.addEventListener('keydown', this.handleKeyDown);
        this.addEventListener('keyup', this.handleKeyUp);
    }

    public override onDisconnected(): void {
        this.addEventListener('click', this.handleClick);
        this.addEventListener('keydown', this.handleKeyDown);
        this.addEventListener('keyup', this.handleKeyUp);
    }

    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        this.syncAccessibility();
    }

    private syncAccessibility(): void {
        if (!this.selectable) {
            this.removeAttribute('role');
            this.removeAttribute('aria-pressed');
            this.tabIndex = -1;
            return;
        }

        this.setAttribute('role', 'button');
        this.setAttribute('aria-pressed', String(this.isSelected));
        this.tabIndex = this.disabled ? -1 : 0;
    }

    private toggle(): void {
        if (!this.selectable || this.disabled) {
            return;
        }

        const next = this.controllableSelected.request(this.selected, !this.isSelected);
        this.emit('toggle', { value: this.value, selected: next});
    }

    private readonly handleClick = (event: MouseEvent): void => {
        event.stopPropagation();
        this.toggle();
    };

    private readonly handleKeyDown = (event: KeyboardEvent): void => {
        if(!this.selectable || this.disabled) {
            return;
        }

        if(event.key === ' ') {
            event.preventDefault();
        }

        if(event.key === 'Enter') {
            event.preventDefault();
            this.click();
        }
    };

    private readonly handleKeyUp = (event: KeyboardEvent): void => {
        if (!this.selectable || this.disabled) {
            return;
        }

        if (event.key === ' ') {
            event.preventDefault();
            this.click();
        }
    };

    private readonly handleDismiss = (event: Event): void => {
        // Stops the dismiss click from also bubbling  into
        // handleClick() and toggling `selected` at the same time.
        event.stopPropagation();

        if (this.disabled) {
            return;
        }

        this.emit('dismiss', { value: this.value});
    };

    private readonly handleIconSlotChange = (): void => {
        this.hasIcon = this.hasSlot('icon');
    };

    protected override render() {
        return html`
            <span class=${classMap({ icon: true, empty: !this.hasIcon})} part="icon>
                <slot name="icon" @slotchange=${this.handleIconSlotChange}></slot>
            </span>

            <span part="label"><slot></slot></span>

            ${this.dismissible
                ? html `
                    <button
                        class="dismiss"
                        part="dismiss"
                        type="button"
                        aria-label="Remove"
                        ?disbaled=${this.disabled}
                        @click=${this.handleDismiss}
                    >
                        <svg viewBox="0 0 20 20" fill="curremtColor" width="10" height="10">
                            <path d="M4.3 4.3a1 1 0 011.4 0L10 8.6l4.3-4.3a1 1 0 111.4 1.4L11.4 10l4.3 4.3a1 1 0 01-1.4 1.4L10 11.4l-4.3 4.3a1 1 0 01-1.4-1.4L8.6 10 4.3 5.7a1 1 0 010-1.4z"/>
                        </svg>
                    </button>
                `
                : nothing}
        `;
    }
}