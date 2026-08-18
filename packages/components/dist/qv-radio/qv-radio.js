var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-radio
 * ----------------------------------------------------------
 * Deliberately NOT self-managing `checked` — that's pushed down
 * imperatively by the enclosing qv-radio-group. This component
 * only reports intent (click/keyboard) via a plain DOM event
 * the group listens for; it never decides its own checked state.
 *
 * @packageDocumentation
 */
import { html } from "lit";
import { property, customElement } from "lit/decorators.js";
import { QvElement, createComponentMetadata, createTagName, FocusableMixin, DisabledMixin } from "@quevy/core";
import { qvRadioStyles } from "./qv-radio.styles.js";
const QvRadioBase = DisabledMixin(FocusableMixin(QvElement));
let QvRadio = class QvRadio extends QvRadioBase {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvRadio',
            tagName: createTagName('radio'),
            version: '0.1.0',
        });
        this.value = '';
        /** Set imperatively by the parent qv-radio-group - do not bind this from outside. */
        this.checked = false;
        this.handleActivate = () => {
            if (this.disabled)
                return;
            this.dispatchEvent(new CustomEvent('qv-radio-activate', { bubbles: true, composed: true }));
        };
        this.handleKeyDown = (event) => {
            if (this.disabled)
                return;
            if (event.key === ' ')
                event.preventDefault();
        };
        this.handleKeyUp = (event) => {
            if (this.disabled)
                return;
            if (event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        };
    }
    static { this.styles = qvRadioStyles; }
    onConnected() {
        this.addEventListener('click', this.handleActivate);
        this.addEventListener('keydown', this.handleKeyDown);
        this.addEventListener('keyup', this.handleKeyUp);
    }
    onDisconnected() {
        this.removeEventListener('click', this.handleActivate);
        this.removeEventListener('keydown', this.handleKeyDown);
        this.removeEventListener('keyup', this.handleKeyUp);
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        this.setAttribute('role', 'radio');
        this.setAttribute('aria-checked', String(this.checked));
        // Roving tabindex: only the checked radio (or the first,
        // if none checked yet) is tab-reachable - matches native
        // radio-group keyboard behavior. Group finalizes this;
        // see qv-radio-group's syncRovingTabindex(.)
    }
    render() {
        return html `
            <span class="dot-outer" part="dot-outer"><span class="dot-inner" part="dot-inner"></span></span>
            <slot></slot>
        `;
    }
};
__decorate([
    property()
], QvRadio.prototype, "value", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], QvRadio.prototype, "checked", void 0);
QvRadio = __decorate([
    customElement('qv-radio')
], QvRadio);
export { QvRadio };
//# sourceMappingURL=qv-radio.js.map