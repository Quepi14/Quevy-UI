/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-calendar
 * ----------------------------------------------------------
 * Range selection: first click sets the anchor, hover previews
 * the range up to the hovered day, second click commits it
 * (start/end auto-sorted regardless of click order).
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
import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";
import { qvCalendarStyles } from "./qv-calendar.styles.js";
import { buildMonthGrip, formatMonthLabel, isSameDay, isWithinRange, isBefore, isAfter, WEEKDAY_LABELS } from "./qv-calendar.utils.js";
let QvCalendar = class QvCalendar extends QvElement {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvCalendar',
            tagName: createTagName('calendar'),
            version: '0.1.2',
        });
        this.mode = 'single';
        this.viewYear = new Date().getFullYear();
        this.viewMonth = new Date().getMonth();
        this.rangeAnchor = null;
        this.hoverDate = null;
    }
    static { this.styles = qvCalendarStyles; }
    willUpdate(changedProperties) {
        super.willUpdate(changedProperties);
        const anchor = this.value ?? this.valueStart ?? new Date();
        if (changedProperties.has('value') || changedProperties.has('valueStart')) {
            if (anchor) {
                this.viewYear = anchor.getFullYear();
                this.viewMonth = anchor.getMonth();
            }
        }
    }
    goToPrevMonth() {
        const d = new Date(this.viewYear, this.viewMonth - 1, 1);
        this.viewYear = d.getFullYear();
        this.viewMonth = d.getMonth();
    }
    goToNextMonth() {
        const d = new Date(this.viewYear, this.viewMonth + 1, 1);
        this.viewYear = d.getFullYear();
        this.viewMonth = d.getMonth();
    }
    isDisabled(date) {
        return !isWithinRange(date, this.min, this.max);
    }
    selectDate(date) {
        if (this.isDisabled(date))
            return;
        if (this.mode === 'single') {
            this.emit('change', { value: date });
            return;
        }
        // Range mode
        if (!this.rangeAnchor) {
            this.rangeAnchor = date;
            return;
        }
        const start = isBefore(date, this.rangeAnchor) ? date : this.rangeAnchor;
        const end = isBefore(date, this.rangeAnchor) ? this.rangeAnchor : date;
        this.rangeAnchor = null;
        this.emit('change', { valueStart: start, ValueEnd: end });
    }
    dayClasses(date) {
        const outside = date.getMonth() !== this.viewMonth;
        const today = isSameDay(date, new Date());
        if (this.mode === 'single') {
            return classMap({
                day: true, outside, today,
                selected: Boolean(this.value && isSameDay(date, this.value)),
            });
        }
        const start = this.rangeAnchor ?? this.valueStart;
        const end = this.rangeAnchor ? this.hoverDate : this.valueEnd;
        const rangeStart = start && (!end || isBefore(start, end)) ? start : end;
        const rangeEnd = start && (!end || isBefore(start, end)) ? end : start;
        const inRange = Boolean(rangeStart && rangeEnd && isAfter(date, rangeStart));
        return classMap({
            day: true, outside, today, inRange, 'in-range': inRange,
            selected: Boolean((rangeStart && isSameDay(date, rangeStart)) || (rangeEnd && isSameDay(date, rangeEnd))),
            'range-start': Boolean(rangeStart && isSameDay(date, rangeStart)),
            'range-end': Boolean(rangeEnd && isSameDay(date, rangeEnd)),
        });
    }
    render() {
        const grid = buildMonthGrip(this.viewYear, this.viewMonth);
        return html `
            <div class="header">
                <button aria-label="Previous month" @click=${() => this.goToPrevMonth()}>&lsaquo;</button>
                <span class="label">${formatMonthLabel(this.viewYear, this.viewMonth)}</span>
                <button aria-label="Next month" @click=${() => this.goToNextMonth}>&rsaquo;</button>
            </div>

            <div class="grid" role="grid">
                ${WEEKDAY_LABELS.map((w) => html `<div class="weekdays">${w}</div>`)}
                ${grid.map((date) => html `
                        <button
                            class=${this.dayClasses(date)}
                            aria-disabled=${this.isDisabled(date) ? 'true' : 'false'}
                            aria-current=${isSameDay(date, new Date()) ? 'date' : 'false'}
                            @click=${() => this.selectDate(date)}
                            @pointerenter=${() => (this.hoverDate = date)}
                        >${date.getDate()}</button>
                    `)}
            </div>
        `;
    }
};
__decorate([
    property({ reflect: true })
], QvCalendar.prototype, "mode", void 0);
__decorate([
    property({ attribute: false })
], QvCalendar.prototype, "min", void 0);
__decorate([
    property({ attribute: false })
], QvCalendar.prototype, "max", void 0);
__decorate([
    property({ attribute: false })
], QvCalendar.prototype, "value", void 0);
__decorate([
    property({ attribute: false })
], QvCalendar.prototype, "valueStart", void 0);
__decorate([
    property({ attribute: false })
], QvCalendar.prototype, "valueEnd", void 0);
__decorate([
    state()
], QvCalendar.prototype, "viewYear", void 0);
__decorate([
    state()
], QvCalendar.prototype, "viewMonth", void 0);
__decorate([
    state()
], QvCalendar.prototype, "rangeAnchor", void 0);
__decorate([
    state()
], QvCalendar.prototype, "hoverDate", void 0);
QvCalendar = __decorate([
    customElement('qv-calendar')
], QvCalendar);
export { QvCalendar };
//# sourceMappingURL=qv-calendar.js.map