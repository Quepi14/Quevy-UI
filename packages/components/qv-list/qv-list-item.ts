/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-list-item
 * ----------------------------------------------------------
 * "Cuma teks" case: <qv-list-item>Text</qv-list-item>, no leading/
 * trailing/description needed — default slot alone covers it.
 * Rich case adds slot="leading"/"trailing" + label/description.
 * `clickable` reuses the same click+keyboard trio pattern as
 * qv-button/qv-card (Pola 1).
 *
 * @packageDocumentation
 */

import { html, type PropertyValues } from "lit";
import { property, state, customElement } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import { QvElement, createComponentMetadata, createTagName, FocusableMixin } from "@quevy/core";

import { qvListItemStyles } from "./qv-list-item.styles.js";

const QvListItemBase = FocusableMixin(QvElement);

@customElement('qv-list-item')
export class QvListItem extends QvListItemBase {
    static override styles = qvListItemStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvListItem',
        tagName: createTagName('list-item'),
        version: '0.1.0',
    });

    @property() public label?: string;
    @property() public description?: string;
    @property({ type: Boolean, reflect: true }) public clickable = false;

    @state() private hasLeading = false;   
    @state() private hasTrailing = false;

    public override onConnected(): void {
        this.addEventListener('click', this.handleClick);
        this.addEventListener('keydown', this.handleKeyDown);
        this.addEventListener('keyup', this.handleKeyUp);
    }

    public override onDisconnected(): void {
        this.removeEventListener('click', this.handleClick);
        this.removeEventListener('keydown', this.handleKeyDown);
        this.removeEventListener('keyup', this.handleKeyUp);
    }

    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        this.setAttribute('role', 'listItem');
        this.tabIndex = this.clickable ? 0 : -1;
    }

    private readonly handleClick = (): void => {};

    private readonly handleKeyDown = (event: KeyboardEvent): void => {
        if (!this.clickable) return;
        if (event.key === ' ') event.preventDefault();
        if (event.key === 'Enter') { event.preventDefault(); this.click(); }
    };

    private readonly handleKeyUp = (event: KeyboardEvent): void => {
        if (!this.clickable) return;
        if (event.key === ' ') { event.preventDefault(); this.click(); }
    };

    private readonly handleLeadingSlotChange = (): void => { this.hasLeading = this.hasSlot('leadding'); };
    private readonly handleTrailingSlotChange = (): void => { this.hasTrailing = this.hasSlot('trailing'); }

    protected override render() {
        return html`
            <span class=${classMap({ leading: true, empty: !this.hasLeading})} part="leading>
                <slot name="leading" @slotchange=${this.handleLeadingSlotChange}></slot>
            </span>

            <span class="content" part="content">
                ${this.label ? html`<span class="label">${this.label}</span>` : html`</slot></slot>`}
                <span class=${classMap({ description: true, empty: !this.description})}>${this.description ?? ''}</span>
            </span>

            <span class=${classMap({ trailing: true, empty: !this.hasTrailing})} part="trailing">
                <slot name="trailing" @slotchange=${this.handleTrailingSlotChange}></slot>
            </span>
        `;
    } 
}