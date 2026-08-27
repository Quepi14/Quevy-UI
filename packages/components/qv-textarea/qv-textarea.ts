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
import { html, nothing, type PropertyValues } from "lit";
import { property, customElement } from "lit/decorators.js";

import { QvElement, createComponentMetadata, createTagName, DisabledMixin, FormAssociatedMixin, queryDecorator as query } from "@quevy/core";

import { qvTextareaStyles } from "./qv-textarea.styles.js";
import type { QvTextareaChangeEventDetail } from "./qv-textarea.types.js";

const QvTextAreaBase = FormAssociatedMixin(DisabledMixin(QvElement));

@customElement('qv-textarea')
export class QvTextarea extends QvTextAreaBase {
    static override styles = qvTextareaStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvTextarea',
        tagName: createTagName('textarea'),
        version: '0.1.0',
    });

    @property() public label?: string;
    @property() public placeholder = '';
    @property() public value = '';
    @property() public name?: string;
    @property() public helperText?: string;
    @property({ type: Boolean, reflect: true}) public invalid = false;
    @property({ type: Number }) public maxlength?: number;
    @property({ type: Number }) public rows = 4;
    @property({ reflect: true }) public resize: 'vertical' | 'none' = 'vertical';
    
    @property({ type: Boolean, reflect: true, attribute: 'auto-resize' })
    public autoResize = false;
    
    @query('textarea', false) private textareaEl!: HTMLTextAreaElement | null;
    
    private resizeToFit(): void {
        if (!this.autoResize || !this.textareaEl) return;
        this.textareaEl.style.height = 'auto';
        this.textareaEl.style.height = `${this.textareaEl.scrollHeight}px`;
    }
    protected override updated(changeProperties: PropertyValues): void {
        super.updated(changeProperties);
        this.internals?.setFormValue(this.value);
        this.resizeToFit();
    }

    private readonly handleInput = (event: Event): void => {
        this.value = (event.target as HTMLTextAreaElement).value;
        this.emit<QvTextareaChangeEventDetail>('input', { value: this.value });
        this.resizeToFit();
    };

    private readonly handleChange = (): void => {
        this.emit<QvTextareaChangeEventDetail>('change', { value: this.value });
    };

    private get counterText(): string | null{
        return this.maxlength ? `${this.value.length}/${this.maxlength}` : null;
    }


    protected override render() {
        const hasFooter = Boolean(this.helperText || this.counterText);

        return html`
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
                ? html`
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
}