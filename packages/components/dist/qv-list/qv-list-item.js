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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { property, state, customElement } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { QvElement, createComponentMetadata, createTagName, FocusableMixin } from "@quevy/core";
import { qvListItemStyles } from "./qv-list-item.styles.js";
const QvListItemBase = FocusableMixin(QvElement);
let QvListItem = class QvListItem extends QvListItemBase {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvListItem',
            tagName: createTagName('list-item'),
            version: '0.1.0',
        });
        this.clickable = false;
        this.hasLeading = false;
        this.hasTrailing = false;
        this.handleClick = () => { };
        this.handleKeyDown = (event) => {
            if (!this.clickable)
                return;
            if (event.key === ' ')
                event.preventDefault();
            if (event.key === 'Enter') {
                event.preventDefault();
                this.click();
            }
        };
        this.handleKeyUp = (event) => {
            if (!this.clickable)
                return;
            if (event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        };
        this.handleLeadingSlotChange = () => { this.hasLeading = this.hasSlot('leadding'); };
        this.handleTrailingSlotChange = () => { this.hasTrailing = this.hasSlot('trailing'); };
    }
    static { this.styles = qvListItemStyles; }
    onConnected() {
        this.addEventListener('click', this.handleClick);
        this.addEventListener('keydown', this.handleKeyDown);
        this.addEventListener('keyup', this.handleKeyUp);
    }
    onDisconnected() {
        this.removeEventListener('click', this.handleClick);
        this.removeEventListener('keydown', this.handleKeyDown);
        this.removeEventListener('keyup', this.handleKeyUp);
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        this.setAttribute('role', 'listItem');
        this.tabIndex = this.clickable ? 0 : -1;
    }
    render() {
        return html `
            <span class=${classMap({ leading: true, empty: !this.hasLeading })} part="leading>
                <slot name="leading" @slotchange=${this.handleLeadingSlotChange}></slot>
            </span>

            <span class="content" part="content">
                ${this.label ? html `<span class="label">${this.label}</span>` : html `</slot></slot>`}
                <span class=${classMap({ description: true, empty: !this.description })}>${this.description ?? ''}</span>
            </span>

            <span class=${classMap({ trailing: true, empty: !this.hasTrailing })} part="trailing">
                <slot name="trailing" @slotchange=${this.handleTrailingSlotChange}></slot>
            </span>
        `;
    }
};
__decorate([
    property()
], QvListItem.prototype, "label", void 0);
__decorate([
    property()
], QvListItem.prototype, "description", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], QvListItem.prototype, "clickable", void 0);
__decorate([
    state()
], QvListItem.prototype, "hasLeading", void 0);
__decorate([
    state()
], QvListItem.prototype, "hasTrailing", void 0);
QvListItem = __decorate([
    customElement('qv-list-item')
], QvListItem);
export { QvListItem };
//# sourceMappingURL=qv-list-item.js.map