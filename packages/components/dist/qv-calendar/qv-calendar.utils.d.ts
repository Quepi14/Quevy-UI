/**
 * Pure date helpers - unit-testable in isolation, no DOM/Lit
 * dependency, same rationale as qv-pagination.utils.ts.
 */
export declare function isSameDay(a: Date, b: Date): boolean;
export declare function isBefore(a: Date, b: Date): boolean;
export declare function isAfter(a: Date, b: Date): boolean;
export declare function isWithinRange(date: Date, min?: Date, max?: Date): boolean;
/** 6 weeks x 7 days = 42 cells, including leading/trailing days from adjacent month.*/
export declare function buildMonthGrid(year: number, month: number): Date[];
export declare function formatMonthLabel(year: number, month: number): string;
export declare const MONTH_LABEL: string[];
export declare function formatDate(date: Date): string;
export declare const WEEKDAY_LABELS: string[];
export declare const MONTH_LABELS: string[];
//# sourceMappingURL=qv-calendar.utils.d.ts.map