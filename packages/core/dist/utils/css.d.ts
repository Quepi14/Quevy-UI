/**
 * package/core/utils/css.ts
 */
export type CSSValue = string | number;
export interface CSSStyleObject {
    [property: string]: CSSValue | undefined | null;
}
/**
 * Convert a number into a CSS Value
 *
 * Example: 12 ->  "12px" or 2rem -> "2rem"
 */
export declare function toCssUnit(value: CSSValue, unit?: string): string;
/**
 * Reads a CSS Custom Property.
 */
export declare function getCSSVariable(element: HTMLElement, name: string): string;
/**
 * Sets a CSS Custom Property.
 */
export declare function setCSSVariable(element: HTMLElement, name: string, value: CSSValue): void;
/**
 * Removes a CSS Custom Property
 */
export declare function removeCSSVariable(element: HTMLElement, name: string): void;
/**
 * Applies inline styles from an object
 */
export declare function applyStyles(element: HTMLElement, styles: CSSStyleObject): void;
/**
 * Removes multiple inline styles.
 */
export declare function removeStyles(element: HTMLElement, properties: readonly string[]): void;
/**
 * Converts a style object into CSS text
 *
 * example:
 * {
 *  color: "red",
 *  padding: "12px"
 * }
 *
 * =>
 *
 * "color:red;padding:12px;"
 */
export declare function styleObjectToString(styles: CSSStyleObject): string;
//# sourceMappingURL=css.d.ts.map