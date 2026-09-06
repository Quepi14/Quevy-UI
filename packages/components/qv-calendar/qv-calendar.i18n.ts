import type { QvLocale } from "../i18n/index.js";

export interface QvCalendarMessages {
    weekdays: string[];
    prevYear: string;
    nextYear: string;
    prevMonth: string;
    nextMonth: string;
    chooseMonth: string;
}

export const CALENDAR_MESSAGES: Record<QvLocale, QvCalendarMessages> = {
    id: {
        weekdays: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        prevYear: 'Tahun sebelumnya',
        nextYear: 'Tahun berikutnya',
        prevMonth: 'Bulan sebelumnya',
        nextMonth: 'Bulan berikutnya',
        chooseMonth: 'Pilih bulan',
    },
    en: {
        weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        prevYear: 'Previous year',
        nextYear: 'Next year',
        prevMonth: 'Previous month',
        nextMonth: 'Next month',
        chooseMonth: 'Choose month'
    },
};

export const INTL_LOCALE: Record<QvLocale, string> = {
    id: 'id-ID',
    en: 'en-US',
} 