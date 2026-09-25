import type { QvLocale } from "../i18n/index.js";

export interface QvCalendarMessages {
    weekdays: string[];
    prevYear: string;
    nextYear: string;
    prevMonth: string;
    nextMonth: string;
    chooseMonth: string;
    chooseYear: string;
    prevYearRange: string;
    nextYearRange:string;
    shortcutToday: string;
    shortcutTomorrow: string;
    shortcutIn2Days: string;
    shortcutInAWeek: string;
    shortcutInTwoWeeks: string;
    startTime: string;
    endTime: string;
}

export const CALENDAR_MESSAGES: Record<QvLocale, QvCalendarMessages> = {
    id: {
        weekdays: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        prevYear: 'Tahun sebelumnya',
        nextYear: 'Tahun berikutnya',
        prevMonth: 'Bulan sebelumnya',
        nextMonth: 'Bulan berikutnya',
        chooseMonth: 'Pilih bulan',
        chooseYear: 'Pilih tahun',
        prevYearRange: '12 tahun sebelumnya',
        nextYearRange: '12 tahuns setelahnya',
        shortcutToday: 'Hari ini',
        shortcutTomorrow: 'Besok',
        shortcutIn2Days: 'Lusa',
        shortcutInAWeek: 'Seminggu lagi',
        shortcutInTwoWeeks: '2 minggu lagi',
        startTime: 'Waktu mulai',
        endTime: 'Waktu selesai',
    },
    en: {
        weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        prevYear: 'Previous year',
        nextYear: 'Next year',
        prevMonth: 'Previous month',
        nextMonth: 'Next month',
        chooseMonth: 'Choose month',
        chooseYear: 'Choose year',
        prevYearRange: 'Previous 12 years',
        nextYearRange: 'Next 12 years',
        shortcutToday: 'Today',
        shortcutTomorrow: 'Tomorrow',
        shortcutIn2Days: 'The day after tomorrow',
        shortcutInAWeek: 'In a week',
        shortcutInTwoWeeks: 'In 2 weeks',
        startTime: 'Start time',
        endTime: 'Ent Time',
    },
};

export const INTL_LOCALE: Record<QvLocale, string> = {
    id: 'id-ID',
    en: 'en-US',
} 