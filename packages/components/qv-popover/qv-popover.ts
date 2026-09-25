/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-popover
 * ----------------------------------------------------------
 * Generic floating panel anchored to a trigger, built on the
 * same shared OverlayController as qv-dropdown/qv-menu — but
 * unlike those, the panel content is a fully free default slot
 * (nav mega-menus, info panels, anything), not a structured
 * list of options.
 *
 * `trigger="click"` (default) behaves like qv-menu: click to
 * toggle, outside-click/Escape to close. `trigger="hover"`
 * opens on pointerenter/focus and closes after a short delay on
 * pointerleave/focusout — the delay (and re-arming it when the
 * pointer moves from the trigger into the panel) is what lets
 * the mouse travel from trigger to panel without the popover
 * closing underneath it. autoFocusPanel is suppressed for hover
 * opens specifically, since stealing focus on a bare mouse
 * hover is a known accessibility anti-pattern.
 *
 * @packageDocumentation
 */
import {html, nothing, type PropertyValues} from 'lit';
import { property, state, customElement } from 'lit/decorators.js';

import { QvElement, createComponentMetadata, createTagName, queryDecorator as query, DisabledMixin } from '@quevy/core';

import { OverlayController } from '../_internal/overlay/overlay-controller.js';
import type { OverlayPlacement } from '../_internal/overlay/overlay-position.js';

import { qvPopoverStyles } from './qv-popover.styles.js';
import type { QvPopoverTrigger } from './qv-popover.types.js';

abstract class QvPopoverBase extends DisabledMixin(QvElement) {}

const HOVER_CLOSE_DELAY = 150;

/**
 * @event {CustomEvent<void>} open - Fired when the popover finished opening.
 * @event {CustomEvent<void>} close - Fired when the popover starts closing.
 */
@customElement('qv-popover')
export class QvPopover extends QvPopoverBase {
    static override styles = qvPopoverStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvPopover',
        tagName: createTagName('popover'),
        version: '0.1.1',
    });

    @property({ reflect: true }) public trigger: QvPopoverTrigger = 'click';
    @property({ reflect: true }) public placement: OverlayPlacement = 'bottom-start';
    @property({ reflect: true, attribute: 'aria-label' }) public label = 'Open popover';

    @state() private hasCustomTrigger = false;

    private readonly overlay: OverlayController = new OverlayController(this, {
        placement: this.placement,
        autoFocusPanel: () => this.trigger === 'click',
        onOpenChange: (open) => {
            this.requestUpdate();
            this.emit(open ? 'open' : 'close');
        },
    });

    @query('.trigger', false) private triggerEl!: HTMLElement | null;
    @query('.panel', false) private panelEl!: HTMLDivElement | null;

    private hoverCloseTimer: ReturnType<typeof setTimeout> | null = null;

    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        this.overlay.setPlacement(this.placement);
        this.overlay.trigger = this.triggerEl;
        this.overlay.panel = this.panelEl;
    }

    public override onDisconnected(): void {
        this.clearHoverCloseTimer();
    }

    private readonly handleTriggerSlotChange = (): void => {
        this.hasCustomTrigger = this.hasSlot('trigger');
    }

    private clearHoverCloseTimer(): void {
        if (this.hoverCloseTimer) {
            clearTimeout(this.hoverCloseTimer);
            this.hoverCloseTimer = null;    
        }
    }

    private readonly handleTriggerClick = (): void => {
        if (this.disabled || this.trigger !== 'click') return;
        this.overlay.toggle();
    }

    private readonly handleHoverOpen = (): void => {
        if (this.disabled || this.trigger !== 'hover') return;
        this.clearHoverCloseTimer();
        this.overlay.open();
    };

    private readonly handleHoverClose = (event: FocusEvent | PointerEvent): void => {
        if (this.trigger !== 'hover') return;

        const next = 'relatedTarget' in event ? (event.relatedTarget as Node | null) : null;
        if(next && (this.triggerEl?.contains(next) || this.panelEl?.contains(next))) return;

        this.clearHoverCloseTimer();
        this.hoverCloseTimer = setTimeout(() => this.overlay.close(), HOVER_CLOSE_DELAY);
    }

        protected override render() {
        const triggerSlot = html`<slot name="trigger" @slotchange=${this.handleTriggerSlotChange}></slot>`;

        return html`
            ${this.trigger === 'hover'
                ? html`
                    <div
                        class="trigger"
                        ?inert=${this.disabled}
                        @pointerenter=${this.handleHoverOpen}
                        @pointerleave=${this.handleHoverClose}
                        @focusin=${this.handleHoverOpen}
                        @focusout=${this.handleHoverClose}
                    >
                        ${triggerSlot}
                    </div>
                `
                : html`
                    <button
                        type="button"
                        class="trigger"
                        aria-haspopup="dialog"
                        aria-expanded=${this.overlay.isOpen}
                        aria-label=${this.hasCustomTrigger ? nothing : this.label}
                        ?disabled=${this.disabled}
                        @click=${this.handleTriggerClick}
                    >
                        ${triggerSlot}
                    </button>
                `}

            ${this.overlay.isOpen || this.overlay.isClosing
                ? html`
                    <div
                        class="panel"
                        part="panel"
                        role="dialog"
                        ?closing=${this.overlay.isClosing}
                        @pointerenter=${this.handleHoverOpen}
                        @pointerleave=${this.handleHoverClose}
                        @focusout=${this.handleHoverClose}
                    >
                        <slot></slot>
                    </div>
                `
                : nothing}
        `;
    }
}