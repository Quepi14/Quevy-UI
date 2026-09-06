import { INTL_LOCALE } from "./qv-calendar.i18n.js";
function stripTime(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
export function isSameDay(a, b) {
    return stripTime(a).getTime() === stripTime(b).getTime();
}
export function isBefore(a, b) {
    return stripTime(a).getTime() < stripTime(b).getTime();
}
export function isAfter(a, b) {
    return stripTime(a).getTime() > stripTime(b).getTime();
}
export function isWithinRange(date, min, max) {
    if (min && isBefore(date, min))
        return false;
    if (max && isAfter(date, max))
        return false;
    return true;
}
/** 6 weeks x 7 days = 42 cells, including leading/trailing days from adjacent month.*/
export function buildMonthGrid(year, month) {
    const firstOfMonth = new Date(year, month, 1);
    const gridStart = new Date(year, month, 1 - firstOfMonth.getDay());
    return Array.from({ length: 42 }, (_, i) => new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i));
}
export function formatMonthLabel(year, month, locale) {
    return new Intl.DateTimeFormat(INTL_LOCALE[locale], { month: 'long', year: 'numeric' }).format(new Date(year, month, 1));
}
export function monthLabels(locale) {
    return Array.from({ length: 12 }, (_, month) => new Intl.DateTimeFormat(INTL_LOCALE[locale], { month: 'long' }).format(new Date(2020, month, 1)));
}
export function formatDate(date, locale) {
    return new Intl.DateTimeFormat(INTL_LOCALE[locale], { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
}
//# sourceMappingURL=qv-calendar.utils.js.map