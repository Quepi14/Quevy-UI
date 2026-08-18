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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, nothing } from "lit";
import { property, customElement } from "lit/decorators.js";
import { QvElement, createComponentMetadata, createTagName, queryDecorator as query, DisabledMixin } from "@quevy/core";
import { OverlayController } from "../_internal/overlay/overlay-controller.js";
import '../qv-calendar/index.js';
import { formateDate } from "../qv-calendar/qv-calendar.utils.js";
import { qvDatePickerStyles } from "./qv-datepicker.styles.js";
const QvDatepickerBase = DisabledMixin(QvElement);
let QvDatepicker = class QvDatepicker extends QvDatepickerBase {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvDatepicker',
            tagName: createTagName('datepicker'),
            version: '0.1.0',
        });
        this.mode = 'single';
        this.placeholder = 'Pilih tanggal';
        this.overlay = new OverlayController(this, {
            placement: 'bottom-start',
            onOpenChange: () => this.requestUpdate(),
        });
        this.handleCalendarChange = (event) => {
            const detail = event.detail;
            this.emit('change', detail);
            this.overlay.close();
        };
    }
    static { this.styles = qvDatePickerStyles; }
    updated(changedProperties) {
        super.updated(changedProperties);
        this.overlay.trigger = this.triggerEl;
        this.overlay.panel = this.calendarEl;
    }
    get displayText() {
        if (this.mode === 'single')
            return this.value ? formateDate(this.value) : null;
        if (this.valueStart && this.valueEnd)
            return `${formateDate(this.valueStart)} - ${formateDate(this.valueEnd)}`;
        return null;
    }
    render() {
        const text = this.displayText;
        return html `
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
};
__decorate([
    property({ reflect: true })
], QvDatepicker.prototype, "mode", void 0);
__decorate([
    property({ attribute: false })
], QvDatepicker.prototype, "min", void 0);
__decorate([
    property({ attribute: false })
], QvDatepicker.prototype, "max", void 0);
__decorate([
    property({ attribute: false })
], QvDatepicker.prototype, "value", void 0);
__decorate([
    property({ attribute: false })
], QvDatepicker.prototype, "valueStart", void 0);
__decorate([
    property({ attribute: false })
], QvDatepicker.prototype, "valueEnd", void 0);
__decorate([
    property()
], QvDatepicker.prototype, "placeholder", void 0);
__decorate([
    query('.trigger', false)
], QvDatepicker.prototype, "triggerEl", void 0);
__decorate([
    query('qv-calendar', false)
], QvDatepicker.prototype, "calendarEl", void 0);
QvDatepicker = __decorate([
    customElement('qv-datepicker')
], QvDatepicker);
export { QvDatepicker };
//# sourceMappingURL=qv-datepicker.js.map