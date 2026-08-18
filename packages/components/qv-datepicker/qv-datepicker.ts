/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-datepicker
 * ----------------------------------------------------------
 * Same OverlayController pattern as qv-dropdown. Single mode
 * closes on selection; range mode stays open until both start
 * and end are picked (qv-calendar only emits `change` once the
 * range is complete, so this component just listens and closes
 * then).
 *
 * @packageDocumentation
 */

import { html, nothing, type PropertyValues } from "lit";
import { property, customElement } from "lit/decorators.js";

import { QvElement, createComponentMetadata, createTagName, queryDecorator as query, DisabledMixin } from "@quevy/core";

import { OverlayController } from "../_internal/overlay/overlay-controller.js";
import '../qv-calendar/index.js';
import { formateDate } from "../qv-calendar/qv-calendar.utils.js";

import { qvDatePickerStyles } from "./qv-datepicker.styles.js";
import type { QvCalendarMode, QvCalendarChangeEventDetail } from "../qv-calendar/index.js";

const QvDatepickerBase = DisabledMixin(QvElement);

@customElement('qv-datepicker')
export class QvDatepicker extends QvDatepickerBase {
    static override styles = qvDatePickerStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvDatepicker',
        tagName: createTagName('datepicker'),
        version: '0.1.0',
    });

    @property({ reflect: true}) public mode: QvCalendarMode = 'single';
    @property({ attribute: false}) public min?: Date;
    @property({ attribute: false}) public max?: Date;
    @property({ attribute: false}) public value?: Date;
    @property({ attribute: false}) public valueStart?: Date;
    @property({ attribute: false}) public valueEnd?: Date;
    @property() public placeholder = 'Pilih tanggal';

    private readonly overlay = new OverlayController(this, {
        placement: 'bottom-start',
        onOpenChange: () => this.requestUpdate(),
    });

    @query('.trigger', false) private triggerEl!: HTMLButtonElement | null;
    @query('qv-calendar', false) private calendarEl!: HTMLElement| null;

    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        this.overlay.trigger = this.triggerEl;
        this.overlay.panel = this.calendarEl;
    }

    private readonly handleCalendarChange = (event: Event): void => {
        const detail = (event as CustomEvent<QvCalendarChangeEventDetail>).detail;
        this.emit('change', detail);
        this.overlay.close();
    };

    private get displayText(): string | null {
        if (this.mode === 'single') return this.value ? formateDate(this.value) : null;
        if (this.valueStart && this.valueEnd) return `${formateDate(this.valueStart)} - ${formateDate(this.valueEnd)}`;
        return null;
    }

    public override render(): any {
        const text = this.displayText;

        return html`
            <button
                type="button"
                class="trigger"
                ?disabled=${this.disabled}
                @click=${() => this.overlay.toggle()}
            >
                <span class=${text ? '' : 'placeholder'}>${text ?? this.placeholder}</span>
            </button>

            ${this.overlay.isOpen
                ? html `
                    <qv-calendar
                        .mode=${this.mode}
                        .min=${this.min}
                        .max=${this.max}
                        .value=${this.value}
                        .valueStart=${this.valueStart}
                        .valueEnd=${this.valueEnd}
                        @change=${this.handleCalendarChange}
                    ></qv-calendar>
                `
            : nothing}
        `;
    }
}