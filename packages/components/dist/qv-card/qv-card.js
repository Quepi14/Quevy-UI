/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-card
 * ----------------------------------------------------------
 * Pola 1 (host is the interactive element when `interactive`
 * or `href` is set). Guards against nested-interactive
 * descendants (e.g. a qv-button in the footer slot, or a
 * qv-menu in the actions slot) triggering the card's own
 * click/keyboard handling.
 *
 * @packageDocumentation
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { QvElement, createComponentMetadata, createTagName, FocusableMixin, } from '@quevy/core';
import { qvCardStyles } from './qv-card.styles.js';
const QvCardBase = FocusableMixin(QvElement);
const INTERACTIVE_SELECTOR = 'a,button,input,select,textarea,summary,[tabindex],[role="button"],[role="link"]';
let QvCard = class QvCard extends QvCardBase {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvCard',
            tagName: createTagName('card'),
            version: '0.1.1',
        });
        this.variant = 'elevated';
        this.interactive = false;
        this.hasMedia = false;
        this.hasTitle = false;
        this.hasDescription = false;
        this.hasFooter = false;
        this.hasActions = false;
        this.handleClick = (event) => {
            if (!this.isInteractive || this.originatesFromInteractiveDescendant(event))
                return;
            this.activate();
        };
        this.handleKeyDown = (event) => {
            if (!this.isInteractive || this.originatesFromInteractiveDescendant(event))
                return;
            if (event.key === ' ')
                event.preventDefault();
            if (event.key === 'Enter') {
                event.preventDefault();
                this.click();
            }
        };
        this.handleKeyUp = (event) => {
            if (!this.isInteractive || this.originatesFromInteractiveDescendant(event))
                return;
            if (event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        };
        this.handleMediaSlotChange = () => { this.hasMedia = this.hasSlot('media'); };
        this.handleTitleSlotChange = () => { this.hasTitle = this.hasSlot('title'); };
        this.handleDescriptionSlotChange = () => { this.hasDescription = this.hasSlot('description'); };
        this.handleFooterSlotChange = () => { this.hasFooter = this.hasSlot('footer'); };
        this.handleActionsSlotChange = () => { this.hasActions = this.hasSlot('actions'); };
    }
    static { this.styles = qvCardStyles; }
    get isInteractive() {
        return this.interactive || Boolean(this.href);
    }
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
        this.syncAccessibility();
    }
    syncAccessibility() {
        if (!this.isInteractive) {
            this.removeAttribute('role');
            this.removeAttribute('tabindex');
            return;
        }
        this.setAttribute('role', this.href ? 'link' : 'button');
        this.tabIndex = 0;
    }
    originatesFromInteractiveDescendant(event) {
        for (const node of event.composedPath()) {
            if (node === this)
                return false;
            if (node instanceof Element && node.matches(INTERACTIVE_SELECTOR))
                return true;
        }
        return false;
    }
    activate() {
        if (this.href)
            this.navigate();
    }
    navigate() {
        if (!this.href)
            return;
        if (this.target && this.target !== '_self') {
            window.open(this.href, this.target, 'noopener,noreferrer');
            return;
        }
        window.location.assign(this.href);
    }
    render() {
        return html `
            <div class=${classMap({ actions: true, empty: !this.hasActions })} part="actions">
                <slot name="actions" @slotchange=${this.handleActionsSlotChange}></slot>
            </div>

            <div class=${classMap({ media: true, empty: !this.hasMedia })} part="media">
                <slot name="media" @slotchange=${this.handleMediaSlotChange}></slot>
            </div>

            <div
                class=${classMap({ header: true, empty: !this.hasTitle && !this.hasDescription })}
                part="header"
            >
                <div class=${classMap({ title: true, empty: !this.hasTitle })} part="title">
                    <slot name="title" @slotchange=${this.handleTitleSlotChange}></slot>
                </div>
                <div class=${classMap({ description: true, empty: !this.hasDescription })} part="description">
                    <slot name="description" @slotchange=${this.handleDescriptionSlotChange}></slot>
                </div>
            </div>

            <div class="body" part="body">
                <slot></slot>
            </div>

            <div class=${classMap({ footer: true, empty: !this.hasFooter })} part="footer">
                <slot name="footer" @slotchange=${this.handleFooterSlotChange}></slot>
            </div>
        `;
    }
};
__decorate([
    property({ reflect: true })
], QvCard.prototype, "variant", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], QvCard.prototype, "interactive", void 0);
__decorate([
    property({ reflect: true })
], QvCard.prototype, "href", void 0);
__decorate([
    property()
], QvCard.prototype, "target", void 0);
__decorate([
    state()
], QvCard.prototype, "hasMedia", void 0);
__decorate([
    state()
], QvCard.prototype, "hasTitle", void 0);
__decorate([
    state()
], QvCard.prototype, "hasDescription", void 0);
__decorate([
    state()
], QvCard.prototype, "hasFooter", void 0);
__decorate([
    state()
], QvCard.prototype, "hasActions", void 0);
QvCard = __decorate([
    customElement('qv-card')
], QvCard);
export { QvCard };
//# sourceMappingURL=qv-card.js.map