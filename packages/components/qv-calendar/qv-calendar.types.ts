export type QvCalendarMode = 'single' | 'range';
export type QvCalendarVariant = 'default' | 'detached';

export interface QvCalendarChangeEventDetail {
    value?: Date;
    valueStart?: Date;
    valueEnd?: Date;
}