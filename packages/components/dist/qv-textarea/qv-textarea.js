var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-textarea
 * ----------------------------------------------------------
 * Form-associated (participates in <form> submission via
 * ElementInternals, same pattern as qv-stepper). Native
 * <textarea> inside shadow root — host is NOT the interactive
 * element here (unlike qv-button's Pola 1), so no manual
 * keyboard handling needed; the browser handles it for free.
 *
 * @packageDocumentation
 */
import { html, nothing } from "lit";
import { property, customElement } from "lit/decorators.js";
import { QvElement, createComponentMetadata, createTagName, DisabledMixin, FormAssociatedMixin, queryDecorator as query } from "@quevy/core";
import { qvTextareaStyles } from "./qv-textarea.styles.js";
const QvTextAreaBase = FormAssociatedMixin(DisabledMixin(QvElement));
let QvTextarea = class QvTextarea extends QvTextAreaBase {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvTextarea',
            tagName: createTagName('textarea'),
            version: '0.1.1',
        });
        this.placeholder = '';
        this.value = '';
        this.invalid = false;
        this.rows = 4;
        this.resize = 'vertical';
        this.autoResize = false;
        this.handleInput = (event) => {
            this.value = event.target.value;
            this.emit('input', { value: this.value });
            this.resizeToFit();
        };
        this.handleChange = () => {
            this.emit('change', { value: this.value });
        };
    }
    static { this.styles = qvTextareaStyles; }
    resizeToFit() {
        if (!this.autoResize || !this.textareaEl)
            return;
        this.textareaEl.style.height = 'auto';
        this.textareaEl.style.height = `${this.textareaEl.scrollHeight}px`;
    }
    updated(changeProperties) {
        super.updated(changeProperties);
        this.internals?.setFormValue(this.value);
        this.resizeToFit();
    }
    get counterText() {
        return this.maxlength ? `${this.value.length}/${this.maxlength}` : null;
    }
    render() {
        const hasFooter = Boolean(this.helperText || this.counterText);
        return html `
            <label class=${this.label ? 'label' : 'label empty'}>${this.label ?? ''}</label>

            <textarea
                .value=${this.value}
                placeholder=${this.placeholder}
                row=${this.rows}
                maxlength=${this.maxlength ?? nothing}
                name=${this.name ?? nothing}
                ?disabled=${this.disabled}
                aria-invalid=${this.invalid ? 'true' : 'false'}
                @input=${this.handleInput}
                @change=${this.handleChange}
            ></textarea>

            ${hasFooter
            ? html `
                    <div class="footer">
                        <span class=${this.invalid ? 'helper error' : 'helper'}>${this.helperText ?? ''}</span>
                        ${this.counterText
                ? html `
                                <span class=${this.maxlength && this.value.length > this.maxlength ? 'counter exceeded' : 'counter'}>
                                    ${this.counterText}
                                </span>
                            `
                : nothing}
                    </div>
                `
            : nothing}
        `;
    }
};
__decorate([
    property()
], QvTextarea.prototype, "label", void 0);
__decorate([
    property()
], QvTextarea.prototype, "placeholder", void 0);
__decorate([
    property()
], QvTextarea.prototype, "value", void 0);
__decorate([
    property()
], QvTextarea.prototype, "name", void 0);
__decorate([
    property()
], QvTextarea.prototype, "helperText", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], QvTextarea.prototype, "invalid", void 0);
__decorate([
    property({ type: Number })
], QvTextarea.prototype, "maxlength", void 0);
__decorate([
    property({ type: Number })
], QvTextarea.prototype, "rows", void 0);
__decorate([
    property({ reflect: true })
], QvTextarea.prototype, "resize", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'auto-resize' })
], QvTextarea.prototype, "autoResize", void 0);
__decorate([
    query('textarea', false)
], QvTextarea.prototype, "textareaEl", void 0);
QvTextarea = __decorate([
    customElement('qv-textarea')
], QvTextarea);
export { QvTextarea };
//# sourceMappingURL=qv-textarea.js.map