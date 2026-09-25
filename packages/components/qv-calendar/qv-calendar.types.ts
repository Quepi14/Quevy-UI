export type QvCalendarMode = 'single' | 'range';
export type QvCalendarVariant = 'default' | 'detached';

export interface QvCalendarChangeEventDetail {
    value?: Date;
    valueStart?: Date;
    valueEnd?: Date;
    startTime?: string;
    endTime?: string;
    /** What triggered this change - lets comsumers (like qv-datepicker) tell
     * a real date pick apart from a time-field tweak on the same range.
     */
    source?: 'date' | 'time';
}