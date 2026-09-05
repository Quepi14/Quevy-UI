/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-navbar-item
 * ----------------------------------------------------------
 * Deliberately NOT self-managing `active` - same reasoning as
 * qv-radio: it's pushed down imperatively by the enclosing
 * qv-navbar, this component only reports intent (click/keyboard)
 * via a plain DOM event the navbar listens for.
 *
 * Icon is the default slot; `label` only becomes visible while
 * `active` (grid-template-columns 0fr -> 1fr, no JS measurement -
 * same technique as qv-collapsible's panel).
 *
 * @packageDocumentation
 */
import { html, nothing, type PropertyValues } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import { QvElement, createComponentMetadata, createTagName, FocusableMixin, DisabledMixin } from '@quevy/core';

import { qvNavbarItemStyles } from './qv-navbar-item.styles.js';

const QvNavbarItemBase = DisabledMixin(FocusableMixin(QvElement));

@customElement('qv-navbar-item')
export class QvNavbarItem extends QvNavbarItemBase {
    static override styles = qvNavbarItemStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvNavbarItem',
        tagName: createTagName('navbar-item'),
        version: '0.1.1',
    });

    @property() public value = '';
    @property() public label = '';
    @property() public href?: string;

    /** Set imperatively by the parent qv-navbar - do not bind this from outside. */
    @property({ type: Boolean, reflect: true})
    public active = false;

    public override onConnected(): void {
        this.addEventListener('click', this.handleActivate);
        this.addEventListener('keydown', this.handleKeyDown);
        this.addEventListener('keyup', this.handleKeyUp);
    }

    public override onDisconnected(): void {
        this.removeEventListener('click', this.handleActivate);
        this.removeEventListener('keydown', this.handleKeyDown);
        this.removeEventListener('keyup', this.handleKeyUp);
    }

    public override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        this.setAttribute('aria-current', this.active ? 'page' : 'false');
    }

    private readonly handleActivate = (event: Event): void => {
        if (this.disabled) return;
        // href handles its own navigation via the native <a> - only
        // suppress it when there's none to fall back on.
        if (!this.href) event.preventDefault();
        this.dispatchEvent(new CustomEvent('qv-navbar-item-activate', { bubbles: true, composed: true}));
    };

    private readonly handleKeyDown = (event: KeyboardEvent): void => {
        if (this.disabled) return;
        if (event.key === ' ') event.preventDefault();
    };

    private readonly handleKeyUp = (event: KeyboardEvent): void => {
        if (this.disabled) return;
        if (event.key === ' ') {event.preventDefault(); this.click(); }
    };

    protected override render() {
        const content = html `
            <span class="icon" part="icon"><slot></slot></span>
            <span class="label-outer" part="label-outer">
                <span class="label-inner">
                    <span class="label" part="label">${this.label}</span>
                </span>
            </span>
        `;

        return this.href
            ? html`
                <a class="item" part="item" href=${this.href} tabindex=${this.disabled ? -1 : 0} aria-label=${this.label || nothing}>
                    ${content}
                </a>
            `
            : html `
                <button type="button" class="item" part="item" ?disabled=${this.disabled} aria-label=${this.label || nothing}>
                    ${content}
                </button>
            `;
    }
}