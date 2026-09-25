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

import { html, nothing, type PropertyValues } from "lit";
import { property, state, customElement } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";

import { qvCalendarStyles } from "./qv-calendar.styles.js";
import { buildMonthGrid, formatMonthLabel, monthLabels, isSameDay, isWithinRange, isBefore, isAfter, addDays } from "./qv-calendar.utils.js";
import { CALENDAR_MESSAGES } from "./qv-calendar.i18n.js";
import type { QvCalendarMode, QvCalendarVariant, QvCalendarChangeEventDetail } from "./qv-calendar.types.js";
import { LocalizedMixin } from "../_internal/i18n/localized-mixin.js";


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

const QvCalendarBase = LocalizedMixin(QvElement);

/**
 * @event {CustomEvent<QvCalendarChangeEventDetail>} change - Fired when a date (or range) is picked.
 */
@customElement('qv-calendar')
export class QvCalendar extends QvCalendarBase {
    static override styles = qvCalendarStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvCalendar',
        tagName: createTagName('calendar'),
        version: '0.2.0',
    });

    @property({ reflect: true}) public mode: QvCalendarMode = 'single';
    @property({ reflect: true}) public variant: QvCalendarVariant = 'default';

    @property({ attribute: false }) public min?: Date;
    @property({ attribute: false }) public max?: Date;
    @property({ attribute: false }) public value?: Date;
    @property({ attribute: false }) public valueStart?: Date;
    @property({ attribute: false }) public valueEnd?: Date;
    @property({ type: Boolean, reflect: true}) public shortcuts = false;
    @property({ type: Number, reflect: true}) public months: 1 | 2 = 1;

    @state() private viewYear = new Date().getFullYear();
    @state() private viewMonth = new Date().getMonth();
    @state() private rangeAnchor: Date | null = null;
    @state() private hoverDate: Date | null = null;

    @state() private viewLevel: 'days' | 'months' | 'years' = 'days';
    @state() private yearRangeStart = new Date().getFullYear() - 5;

    private goToPrevYear(): void {
        this.viewYear -=1;
    }

    private goToNextYear(): void {
        this.viewYear +=1;
    }

    private openMonthPicker(): void {
        this.viewLevel = 'months';
    }

    private openYearPicker(): void {
        this.yearRangeStart = this.viewYear - 5;
        this.viewLevel = 'years'
    }

    private pickMonth(month: number): void {
        this.viewMonth = month;
        this.viewLevel = 'days';
    }

    private pickYear(year: number): void {
        this.viewYear = year;
        this.viewLevel = 'months';
    }

    private goToPrevYearRange(): void {
        this.yearRangeStart -= 12;
    }

    private goToNextYearRange(): void {
        this.yearRangeStart += 12;
    }

    private selectShortcut(daysFromToday: number): void {
        const date = addDays(new Date(), daysFromToday);
        this.viewYear = date.getFullYear();
        this.viewMonth = date.getMonth();
        this.selectDate(date);
    }

    
    private renderMonthHeader() {
        const messages = CALENDAR_MESSAGES[this.locale];
        
        return html`
            <div class="header">
                <button class="nav" aria-label=${messages.prevYear} @click=${() => this.goToPrevYear()}>${CHEVRON_LEFT}</button>
                <button class="label" aria-label=${messages.chooseYear} @click=${() => this.openYearPicker()}>${this.viewYear}</button>
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

    private renderYearHeader() {
        const messages = CALENDAR_MESSAGES[this.locale];
        const rangeLabel = `${this.yearRangeStart}–${this.yearRangeStart + 11}`;

        return html`
            <div class="header">
                <button class="nav" aria-label=${messages.prevYearRange} @click=${() => this.goToPrevYearRange()}>${CHEVRON_LEFT}</button>
                <span class="label static">${rangeLabel}</span>
                <button class="nav" aria-label=${messages.nextYearRange} @click=${() => this.goToNextYearRange()}>${CHEVRON_RIGHT}</button>
            </div>
        `;
    }

    private renderYearGrid() {
        const years = Array.from({ length: 12}, (_, i) => this.yearRangeStart + i);
        
        return html`
        <div class="year-grid">
        ${years.map(
            (year) => html`
            <button 
            class=${classMap({ year: true, active: year === this.viewYear})}
            @click=${() => this.pickYear(year)}
            >${year}</button>
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
    
    private renderShortcuts() {
        if (!this.shortcuts || this.mode !== 'single' || this.viewLevel !== 'days') return nothing;

        const messages = CALENDAR_MESSAGES[this.locale];

        return html`
            <div class="shortcuts" part="shortcuts">
                <button class="shortcut" @click=${() => this.selectShortcut(0)}>${messages.shortcutToday}</button>
                <button class="shortcut" @click=${() => this.selectShortcut(1)}>${messages.shortcutTomorrow}</button>
                <button class="shortcut" @click=${() => this.selectShortcut(2)}>${messages.shortcutIn2Days}</button>
                <button class="shortcut" @click=${() => this.selectShortcut(7)}>${messages.shortcutInAWeek}</button>
                <button class="shortcut" @click=${() => this.selectShortcut(14)}>${messages.shortcutInTwoWeeks}</button>
            </div>
        `;
    }

    private dayClasses(date: Date, referenceMonth: number) {
        const outside = date.getMonth() !== referenceMonth;
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

    private renderDaysHeader(year = this.viewYear, month = this.viewMonth, showPrev = true, showNext = true) {
        const messages = CALENDAR_MESSAGES[this.locale];
        const isSinglePane = this.months === 1;

        return html`
            <div class="header">
                ${showPrev
                    ? html`<button class="nav" aria-label=${messages.prevMonth} @click=${() => this.goToPrevMonth()}>${CHEVRON_LEFT}</button>`
                    : html`<span class="nav-spacer"></span>`}
                ${isSinglePane
                    ? html ` <button class="label" aria-label=${messages.chooseMonth} @click=${() => this.openMonthPicker()}> ${formatMonthLabel(year, month, this.locale)} ${CHEVRON_DOWN} </button>`
                    : html`<span class="label static">${formatMonthLabel(year, month, this.locale)}</span>`}
                ${showNext
                    ? html`<button class="nav" aria-label=${messages.nextMonth} @click=${() => this.goToNextMonth()}>${CHEVRON_RIGHT}</button>`
                    : html`<span class="nav-spacer"></span>`}
                }
            </div>
        `;
    }

    private renderDaysGrid(year = this.viewYear, month = this.viewMonth) {
        const grid = buildMonthGrid(year, month);
        const messages = CALENDAR_MESSAGES[this.locale];

        return html`
            <div class="grid" role="grid">
                ${messages.weekdays.map((weekday) => html`<div class="weekday">${weekday}</div>`)}
                ${grid.map(
                    (date) => html`
                        <button
                            class=${this.dayClasses(date, month)}
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

    private get secondPane(): {year: number; month: number} {
        const d = new Date(this.viewYear, this.viewMonth + 1, 1);
        return {year: d.getFullYear(), month: d.getMonth()};
    }

    private renderDualDaysView() {
        const second = this.secondPane;

        return html`
            <div class="dual-pane">
                <div class="pane">
                    ${this.renderDaysHeader(this.viewYear, this.viewMonth, true, false)}
                    <div class="body" part="body">${this.renderDaysGrid(this.viewYear, this.viewMonth)}</div>
                </div>
                <div class="pane">
                    ${this.renderDaysHeader(this.secondPane.year, second.month, false, true)}
                    <div class="body" part="body">${this.renderDaysGrid(second.year, second.month)}</div>
                </div>
            </div>
        `;
    }

    private renderHeader() {
        if (this.viewLevel === 'days') return this.renderDaysHeader();
        if (this.viewLevel === 'months') return this.renderMonthHeader();
        return this.renderYearHeader();
    }

    private renderGridContent() {
        if (this.viewLevel === 'days') return this.renderDaysGrid();
        if (this.viewLevel === 'months') return this.renderMonthGrid();
        return this.renderYearGrid();
    }

    private get isDualPane(): boolean {
        return this.months == 2 && this.mode === 'range' && this.viewLevel === 'days';
    }

    protected override render() {
        if (this.isDualPane) {
            return html`${this.renderDualDaysView()}`
        }
        
        return html`
            ${this.renderHeader()}
            <div class="body" part="body">${this.renderGridContent()}</div>
            ${this.renderShortcuts}
        `;
    }
}