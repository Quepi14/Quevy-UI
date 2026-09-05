/**
 * Pure date helpers - unit-testable in isolation, no DOM/Lit
 * dependency, same rationale as qv-pagination.utils.ts.
 */

function stripTime(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function isSameDay(a: Date, b: Date): boolean {
    return stripTime(a).getTime() === stripTime(b).getTime();
}

export function isBefore(a: Date, b: Date): boolean {
    return stripTime(a).getTime() < stripTime(b).getTime();
}

export function isAfter(a: Date, b: Date): boolean {
    return stripTime(a).getTime() > stripTime(b).getTime();
}

export function isWithinRange(date: Date, min?: Date, max?: Date): boolean {
    if (min && isBefore(date, min)) return false;
    if (max && isAfter(date, max)) return false;
    return true;
}

/** 6 weeks x 7 days = 42 cells, including leading/trailing days from adjacent month.*/
export function buildMonthGrid(year: number, month: number): Date[] {
    const firstOfMonth = new Date(year, month, 1);
    const gridStart = new Date(year, month, 1 - firstOfMonth.getDay());
    return Array.from(
        { length: 42 },
        (_, i) => new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i),
    );
}

export function formatMonthLabel(year: number, month: number): string {
    return new Intl.DateTimeFormat('id-Id', { month: 'long', year: 'numeric'}).format(new Date(year, month, 1));
}

export const MONTH_LABEL = Array.from({ length: 12 }, (_, month) =>
    new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(new Date(2020, month, 1)),
);

export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric'}).format(date);
}

export const WEEKDAY_LABELS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

export const MONTH_LABELS = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];