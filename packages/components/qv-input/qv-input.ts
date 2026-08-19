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
import { html, nothing, type PropertyValues} from "lit";
import { property, state, customElement } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import { QvElement, createComponentMetadata, createTagName, DisabledMixin, FormAssociatedMixin } from "@quevy/core";

import { qvInputStyles } from "./qv-input.styles.js";
import type { QvInputVariant, QvInputType, QvInputChangeEventDetail } from "./qv-input.types.js";

const QvInputBase = FormAssociatedMixin(DisabledMixin(QvElement));

@customElement('qv-input')
export class QvInput extends QvInputBase {
    static override styles = qvInputStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvInput',
        tagName: createTagName('input'),
        version: '0.1.0',
    });

    @property({ reflect: true }) public variant: QvInputVariant = 'default';
    @property({ reflect: true }) public type: QvInputType = 'text';
    @property() public label?: string;
    @property() public placeholder = '';
    @property() public value = ''; 
    @property() public name?: string;
    @property() public helperText?: string;
    @property({ type: Boolean, reflect: true}) public invalid = false; 
    @property({ type: Number }) public maxLength?: number;

    @state() private hasLeading = false;
    @state() private hasTrailing = false;

    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        this.internals?.setFormValue(this.value);
    }

    private readonly handleInput = (event: Event): void => {
        this.value = (event.target as HTMLInputElement).value;
        this.emit<QvInputChangeEventDetail>('input', { value: this.value});
    };
    private readonly handleChange = (): void => {
        this.emit<QvInputChangeEventDetail>('change', { value: this.value});
    };

    private readonly handleLeadingSlotChange = (): void => {
        this.hasLeading = this.hasSlot('leading');
    }
    private readonly handleTrailingSlotChange = (): void => {
        this.hasTrailing = this.hasSlot('trailing');
    }

    private get counterText(): string | null {
        return this.maxLength ? `${this.value.length}/${this.maxLength}` : null;
    }
    protected override render() {
        const hasFooter = Boolean(this.helperText || this.counterText);

        // Floating variant deliberately uses a single space (not
        // empty string) as the real placeholder — that's what
        // keeps :placeholder-shown meaningful while the visible
        // "placeholder-looking" text is actually the label.
        const nativePlaceholder = this.variant === 'floating' ? ' ' : this.placeholder;

        return html`
            <label class=${classMap({ label: true, empty: this.variant === 'floating' || !this.label })}>
                ${this.label ?? ''}
            </label>

            <div class="field">
                <span class=${classMap({ icon: true, leading: true, emppty: !this.hasLeading})}>
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

                <span class=${classMap({ icon: true, trailing: true, empty: !this.hasTrailing})}>
                    <slot name="trailing" @slotchange=${this.handleTrailingSlotChange}></slot>
                </span>
            </div>

            ${hasFooter
                ? html`
                    <div class="footer">
                        <span class=${this.invalid ? 'helper error' : 'helper'}>${this.helperText ?? ''}</span>
                        ${this.counterText
                            ? html`<span class=${this.maxLength && this.value.length > this.maxLength ? 'counter exceeded' : 'counter'}>${this.counterText}</span>`
                            : nothing}
                    </div>
                `
                :nothing}
        `;
    }
}