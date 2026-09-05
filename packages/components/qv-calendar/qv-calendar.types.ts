export type QvCalendarMode = 'single' | 'range';

export interface QvCalendarChangeEventDetail {
    value?: Date;
    valueStart?: Date;
    valueEnd?: Date;
}