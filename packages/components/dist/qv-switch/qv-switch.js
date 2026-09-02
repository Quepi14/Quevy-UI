var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-switch
 * ----------------------------------------------------------
 * Structurally identical to qv-checkbox (same mixins, same
 * controlled/uncontrolled + keyboard pattern) — only role
 * ("switch" vs "checkbox") and rendering differ. Deliberately
 * NOT sharing an abstract base with qv-checkbox yet: the
 * duplication is small (a handful of lines), and forcing a
 * shared base now would be premature — revisit only if a third
 * toggle-like component needs the same shape.
 *
 * @packageDocumentation
 */
import { html } from "lit";
import { property, customElement } from "lit/decorators.js";
import { QvElement, createComponentMetadata, createTagName, FocusableMixin, DisabledMixin, FormAssociatedMixin } from "@quevy/core";
import { qvSwitchStyles } from "./qv-switch.styles.js";
import { createControllableValue } from "@quevy/state";
const QvSwitchBase = FormAssociatedMixin(DisabledMixin(FocusableMixin(QvElement)));
let QvSwitch = class QvSwitch extends QvSwitchBase {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvSwitch',
            tagName: createTagName('switch'),
            version: '0.1.1',
        });
        this.value = 'on';
        this.controllableChecked = createControllableValue(false);
        this.handleClick = () => this.toggle();
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
    static { this.styles = qvSwitchStyles; }
    get isChecked() {
        return this.controllableChecked.value(this.checked);
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
        this.setAttribute('role', 'switch');
        this.tabIndex = this.disabled ? -1 : 0;
        this.setAttribute('aria-checked', String(this.isChecked));
        this.internals?.setFormValue(this.isChecked ? this.value : null);
    }
    toggle() {
        if (this.disabled)
            return;
        const next = this.controllableChecked.request(this.checked, !this.isChecked);
        this.emit('change', { checked: next });
        this.invalidate();
    }
    render() {
        return html `
            <span class="track" part="track"><span class="thumb" part="thumb"></span></span>
            <slot></slot>
        `;
    }
};
__decorate([
    property({ type: Boolean, reflect: true })
], QvSwitch.prototype, "checked", void 0);
__decorate([
    property()
], QvSwitch.prototype, "name", void 0);
__decorate([
    property()
], QvSwitch.prototype, "value", void 0);
QvSwitch = __decorate([
    customElement('qv-switch')
], QvSwitch);
export { QvSwitch };
//# sourceMappingURL=qv-switch.js.map