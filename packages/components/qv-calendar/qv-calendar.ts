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

import { html, type PropertyValues } from "lit";
import { property, state, customElement } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";

import { qvCalendarStyles } from "./qv-calendar.styles.js";
import { buildMonthGrip, formatMonthLabel, isSameDay, isWithinRange, isBefore, isAfter, WEEKDAY_LABELS } from "./qv-calendar.utils.js";
import type { QvCalendarMode, QvCalendarChangeEventDetail } from "./qv-calendar.types.js";

@customElement('qv-calendar')
export class QvCalendar extends QvElement {
    static override styles = qvCalendarStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvCalendar',
        tagName: createTagName('calendar'),
        version: '0.1.0',
    });

    @property({ reflect: true}) public mode: QvCalendarMode = 'single';
    @property({ attribute: false }) public min?: Date;
    @property({ attribute: false }) public max?: Date;
    @property({ attribute: false }) public value?: Date;
    @property({ attribute: false }) public valueStart?: Date;
    @property({ attribute: false }) public valueEnd?: Date;

    @state() private viewYear = new Date().getFullYear();
    @state() private viewMonth = new Date().getMonth();
    @state() private rangeAnchor: Date | null = null;
    @state() private hoverDate: Date | null = null;

    public override willUpdate(changedProperties: PropertyValues): void {
        super.willUpdate(changedProperties);
        const anchor = this.value ?? this.valueStart ?? new Date();
        if (changedProperties.has('value') || changedProperties.has('valueStart')) {
            if (anchor) {
                this.viewYear = anchor.getFullYear();
                this.viewMonth = anchor.getMonth();
            }
        }
    }

    private goToPrevMonth(): void {
        const d = new Date(this.viewYear, this.viewMonth -1, 1);
        this.viewYear = d.getFullYear();
        this.viewMonth = d.getMonth();
    }
    private goToNextMonth(): void {
        const d = new Date(this.viewYear, this.viewMonth + 1, 1);
        this.viewYear = d.getFullYear();
        this.viewMonth = d.getMonth();
    }

    private isDisabled(date: Date): boolean {
        return !isWithinRange(date, this.min, this.max);
    }

    private selectDate(date: Date): void {
        if (this.isDisabled(date)) return;

        if (this.mode === 'single') {
            this.emit<QvCalendarChangeEventDetail>('change', { value: date });
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
        this.emit<QvCalendarChangeEventDetail>('change', { valueStart: start, ValueEnd: end});
    }

    private dayClasses(date: Date) {
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

        const inRange = Boolean(rangeStart && rangeEnd && isAfter(date, rangeStart))

        return classMap({
            day: true, outside, today, inRange, 'in-range': inRange,
            selected: Boolean((rangeStart && isSameDay(date, rangeStart)) || (rangeEnd && isSameDay(date, rangeEnd))),
            'range-start': Boolean(rangeStart && isSameDay(date, rangeStart)),
            'range-end': Boolean(rangeEnd && isSameDay(date, rangeEnd)),
        });
    }

    protected override render() {
        const grid = buildMonthGrip(this.viewYear, this.viewMonth);

        return html`
            <div class="header">
                <button aria-label="Previous month" @click=${() => this.goToPrevMonth()}>&lsaqueo;</button>
                <span class="label">${formatMonthLabel(this.viewYear, this.viewMonth)}</span>
                <button aria-label="Next month" @click=${() => this.goToNextMonth}>&rsauo;</button>
            </div>

            <div class="grid" role="grid">
                ${WEEKDAY_LABELS.map((w) => html`<div class="weekdays">${w}</div>`)}
                ${grid.map(
                    (date) => html`
                        <button
                            class=${this.dayClasses(date)}
                            aria-disabled=${this.isDisabled(date) ? 'true' : 'false'}
                            aria-current=${isSameDay(date, new Date()) ? 'date' : 'false'}
                            @click=${() => this.selectDate(date)}
                            @pointerenter=${() => (this.hoverDate = date)}
                        >${date.getDate()}</button>
                    `,
                )}
            </div>
        `;
    }
}