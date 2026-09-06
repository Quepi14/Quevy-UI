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
import { buildMonthGrid, formatMonthLabel, monthLabels, isSameDay, isWithinRange, isBefore, isAfter } from "./qv-calendar.utils.js";
import { CALENDAR_MESSAGES } from "./qv-calendar.i18n.js";
import { localeStore, resolveLocale, type QvLocale } from "../_internal/i18n/locale.js";
import type { QvCalendarMode, QvCalendarChangeEventDetail } from "./qv-calendar.types.js";

const CHEVRON_LEFT = html`
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M12.8 4.2a1 1 0 010 1.4L8.4 10l4.4 4.4a1 1 0 01-1.4 1.4l-5.1-5.1a1 1 0 010-1.4l5.1-5.1a1 1 0 011.4 0z" />
    </svg>
`;

const CHEVRON_RIGHT = html`
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M7.2 4.2a1 1 0 000 1.4l4.4 4.4-4.4 4.4a1 1 0 001.4 1.4l5.1-5.1a1 1 0 000-1.4L8.6 4.2a1 1 0 00-1.4 0z" />
    </svg>
`;

const CHEVRON_DOWN = html`
    <svg class="caret" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M4.2 7.2a1 1 0 011.4 0l4.4 4.4 4.4-4.4a1 1 0 011.4 1.4l-5.1 5.1a1 1 0 01-1.4 0L4.2 8.6a1 1 0 010-1.4z" />
    </svg>
`;

/**
 * @event {CustomEvent<QvCalendarChangeEventDetail>} change - Fired when a date (or range) is picked.
 */
@customElement('qv-calendar')
export class QvCalendar extends QvElement {
    static override styles = qvCalendarStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvCalendar',
        tagName: createTagName('calendar'),
        version: '0.1.3',
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

    @state() private viewLevel: 'days' | 'months' = 'days';

    @state() private locale: QvLocale = 'id';
    private unsubscribeLocale?: () => void;

    public override onConnected(): void {
        this.locale = resolveLocale(this);
        this.unsubscribeLocale = localeStore.subscribe(() => {
            this.locale = resolveLocale(this);
        });
    }

    public override onDisconnected(): void {
        this.unsubscribeLocale?.();
    }

    private goToPrevYear(): void {
        this.viewYear -=1;
    }

    private goToNextYear(): void {
        this.viewYear +=1;
    }

    private openMonthPicker(): void {
        this.viewLevel = 'months';
    }

    private pickMonth(month: number): void {
        this.viewMonth = month;
        this.viewLevel = 'days';
    }

    private renderMonthHeader() {
        const messages = CALENDAR_MESSAGES[this.locale];

        return html`
            <div class="header">
                <button class="nav" aria-label=${messages.prevYear} @click=${() => this.goToPrevYear()}>${CHEVRON_LEFT}</button>
                <span class="label static">${this.viewYear}</span>
                <button class="nav" aria-label=${messages.nextYear} @click=${() => this.goToNextYear()}>${CHEVRON_RIGHT}</button>
            </div>
        `;
    }

    private renderMonthGrid() {
        const labels = monthLabels(this.locale);

        return html`
            <div class="month-grid">
                ${labels.map(
                    (label, i) => html`
                        <button
                            class=${classMap({ month: true, active: i === this.viewMonth})}
                            @click=${() => this.pickMonth(i)}
                        >${label.slice(0, 3)}</button>   
                    `,
                )}
            </div>
        `;
    }

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
        this.emit<QvCalendarChangeEventDetail>('change', { valueStart: start, valueEnd: end});
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

        const inRange = Boolean(
            rangeStart && rangeEnd && isAfter(date, rangeStart) && isBefore(date, rangeEnd),
        );

        return classMap({
            day: true, outside, today, inRange, 'in-range': inRange,
            selected: Boolean((rangeStart && isSameDay(date, rangeStart)) || (rangeEnd && isSameDay(date, rangeEnd))),
            'range-start': Boolean(rangeStart && isSameDay(date, rangeStart)),
            'range-end': Boolean(rangeEnd && isSameDay(date, rangeEnd)),
        });
    }

    private renderDaysHeader() {
        const messages = CALENDAR_MESSAGES[this.locale];

        return html`
            <div class="header">
                <button class="nav" aria-label=${messages.prevMonth} @click=${() => this.goToPrevMonth()}>${CHEVRON_LEFT}</button>
                <button class="label" aria-label=${messages.chooseMonth} @click=${() => this.openMonthPicker()}>
                    ${formatMonthLabel(this.viewYear, this.viewMonth, this.locale)} ${CHEVRON_DOWN}
                </button>
                <button class="nav" aria-label=${messages.nextMonth} @click=${() => this.goToNextMonth()}>${CHEVRON_RIGHT}</button>
            </div>
        `;
    }

    private renderDaysGrid() {
        const grid = buildMonthGrid(this.viewYear, this.viewMonth);
        const messages = CALENDAR_MESSAGES[this.locale];

        return html`
            <div class="grid" role="grid">
                ${messages.weekdays.map((weekday) => html`<div class="weekday">${weekday}</div>`)}
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

    protected override render() {
        return html`
            ${this.viewLevel === 'days' ? this.renderDaysHeader() : this.renderMonthHeader()}
            ${this.viewLevel === 'days' ? this.renderDaysGrid() : this.renderMonthGrid()}
        `;
    }
}