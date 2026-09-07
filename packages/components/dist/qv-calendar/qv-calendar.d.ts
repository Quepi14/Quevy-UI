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
import { type PropertyValues } from "lit";
import { QvElement } from "@quevy/core";
import type { QvCalendarMode } from "./qv-calendar.types.js";
declare const QvCalendarBase: typeof QvElement & import("@quevy/core").MixinConstructor<import("../_internal/i18n/localized-mixin.js").LocalizedElement>;
/**
 * @event {CustomEvent<QvCalendarChangeEventDetail>} change - Fired when a date (or range) is picked.
 */
export declare class QvCalendar extends QvCalendarBase {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    mode: QvCalendarMode;
    min?: Date;
    max?: Date;
    value?: Date;
    valueStart?: Date;
    valueEnd?: Date;
    private viewYear;
    private viewMonth;
    private rangeAnchor;
    private hoverDate;
    private viewLevel;
    private goToPrevYear;
    private goToNextYear;
    private openMonthPicker;
    private pickMonth;
    private renderMonthHeader;
    private renderMonthGrid;
    willUpdate(changedProperties: PropertyValues): void;
    private goToPrevMonth;
    private goToNextMonth;
    private isDisabled;
    private selectDate;
    private dayClasses;
    private renderDaysHeader;
    private renderDaysGrid;
    protected render(): import("lit").TemplateResult<1>;
}
export {};
//# sourceMappingURL=qv-calendar.d.ts.map