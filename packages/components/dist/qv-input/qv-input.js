var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-input
 * ----------------------------------------------------------
 * Two variants:
 *   - "default": static label above, native placeholder inside.
 *   - "floating": label sits inside the box like a placeholder,
 *     animates up to overlap the top border on focus/when
 *     filled — pure CSS (:placeholder-shown trick), see
 *     qv-input.styles.ts for why.
 *
 * Same non-Pola-1 pattern as qv-textarea/qv-stepper — a native
 * <input> inside the shadow root does the real work, host is
 * just the form-associated wrapper.
 *
 * @packageDocumentation
 */
import { html, nothing } from "lit";
import { property, state, customElement } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { QvElement, createComponentMetadata, createTagName, DisabledMixin, FormAssociatedMixin } from "@quevy/core";
import { qvInputStyles } from "./qv-input.styles.js";
const QvInputBase = FormAssociatedMixin(DisabledMixin(QvElement));
let QvInput = class QvInput extends QvInputBase {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvInput',
            tagName: createTagName('input'),
            version: '0.1.0',
        });
        this.variant = 'default';
        this.type = 'text';
        this.placeholder = '';
        this.value = '';
        this.invalid = false;
        this.hasLeading = false;
        this.hasTrailing = false;
        this.handleInput = (event) => {
            this.value = event.target.value;
            this.emit('input', { value: this.value });
        };
        this.handleChange = () => {
            this.emit('change', { value: this.value });
        };
        this.handleLeadingSlotChange = () => {
            this.hasLeading = this.hasSlot('leading');
        };
        this.handleTrailingSlotChange = () => {
            this.hasTrailing = this.hasSlot('trailing');
        };
    }
    static { this.styles = qvInputStyles; }
    updated(changedProperties) {
        super.updated(changedProperties);
        this.internals?.setFormValue(this.value);
    }
    get counterText() {
        return this.maxLength ? `${this.value.length}/${this.maxLength}` : null;
    }
    render() {
        const hasFooter = Boolean(this.helperText || this.counterText);
        // Floating variant deliberately uses a single space (not
        // empty string) as the real placeholder — that's what
        // keeps :placeholder-shown meaningful while the visible
        // "placeholder-looking" text is actually the label.
        const nativePlaceholder = this.variant === 'floating' ? ' ' : this.placeholder;
        return html `
            <label class=${classMap({ label: true, empty: this.variant === 'floating' || !this.label })}>
                ${this.label ?? ''}
            </label>

            <div class="field">
                <span class=${classMap({ icon: true, leading: true, emppty: !this.hasLeading })}>
                    <slot name="leading" @slotchange=${this.handleLeadingSlotChange}></slot>
                </span>

                <input 
                    type=${this.type}
                    .value=${this.value}
                    placeholder=${nativePlaceholder}
                    maxlength=${this.maxLength ?? nothing}
                    name=${this.name ?? nothing}
                    ?disabled=${this.disabled}
                    aria-invalid=${this.invalid ? 'true' : 'false'}
                    aria-label=${this.variant === 'floating' && this.label ? this.label : nothing}
                    @input=${this.handleInput}
                    @change=${this.handleChange}
                />

                ${this.variant === 'floating' && this.label
            ? html `<label class="floating-label" part="floating-label">${this.label}</label>`
            : nothing}

                <span class=${classMap({ icon: true, trailing: true, empty: !this.hasTrailing })}>
                    <slot name="trailing" @slotchange=${this.handleTrailingSlotChange}></slot>
                </span>
            </div>

            ${hasFooter
            ? html `
                    <div class="footer">
                        <span class=${this.invalid ? 'helper error' : 'helper'}>${this.helperText ?? ''}</span>
                        ${this.counterText
                ? html `<span class=${this.maxLength && this.value.length > this.maxLength ? 'counter exceeded' : 'counter'}>${this.counterText}</span>`
                : nothing}
                    </div>
                `
            : nothing}
        `;
    }
};
__decorate([
    property({ reflect: true })
], QvInput.prototype, "variant", void 0);
__decorate([
    property({ reflect: true })
], QvInput.prototype, "type", void 0);
__decorate([
    property()
], QvInput.prototype, "label", void 0);
__decorate([
    property()
], QvInput.prototype, "placeholder", void 0);
__decorate([
    property()
], QvInput.prototype, "value", void 0);
__decorate([
    property()
], QvInput.prototype, "name", void 0);
__decorate([
    property()
], QvInput.prototype, "helperText", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], QvInput.prototype, "invalid", void 0);
__decorate([
    property({ type: Number })
], QvInput.prototype, "maxLength", void 0);
__decorate([
    state()
], QvInput.prototype, "hasLeading", void 0);
__decorate([
    state()
], QvInput.prototype, "hasTrailing", void 0);
QvInput = __decorate([
    customElement('qv-input')
], QvInput);
export { QvInput };
//# sourceMappingURL=qv-input.js.map