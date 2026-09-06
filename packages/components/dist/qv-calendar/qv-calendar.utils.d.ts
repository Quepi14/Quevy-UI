/**
 * Pure date helpers - unit-testable in isolation, no DOM/Lit
 * dependency, same rationale as qv-pagination.utils.ts.
 */
import type { QvLocale } from "../i18n/index.js";
export declare function isSameDay(a: Date, b: Date): boolean;
export declare function isBefore(a: Date, b: Date): boolean;
export declare function isAfter(a: Date, b: Date): boolean;
export declare function isWithinRange(date: Date, min?: Date, max?: Date): boolean;
/** 6 weeks x 7 days = 42 cells, including leading/trailing days from adjacent month.*/
export declare function buildMonthGrid(year: number, month: number): Date[];
export declare function formatMonthLabel(year: number, month: number, locale: QvLocale): string;
export declare function monthLabels(locale: QvLocale): string[];
export declare function formatDate(date: Date, locale: QvLocale): string;
//# sourceMappingURL=qv-calendar.utils.d.ts.map