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
export function toCssUnit(
    value: CSSValue, unit = "px",
): string {
    return typeof value === "number"
    ? `${value}${unit}`
    : value
}

/**
 * Reads a CSS Custom Property.
 */
export function getCSSVariable(
    element: HTMLElement, name: string
):string {
    return getComputedStyle(element)
    .getPropertyValue(name)
    .trim();
}

/**
 * Sets a CSS Custom Property.
 */
export function setCSSVariable(
    element  : HTMLElement, name: string, value: CSSValue
): void {
    element.style.setProperty(name, String(value))
}

/**
 * Removes a CSS Custom Property
 */
export function removeCSSVariable(
    element: HTMLElement, name:string,
): void {
    element.style.removeProperty(name);
}

/**
 * Applies inline styles from an object
 */
export function applyStyles(
    element: HTMLElement, styles: CSSStyleObject,
): void{
    for (const [key, value] of Object.entries(styles)){
        if (value === undefined ||  value === null){
            element.style.removeProperty(key)
            continue;
        }

        element.style.setProperty(
            key,
            String(value),
        );
    }
}

/**
 * Removes multiple inline styles.
 */
export function removeStyles(
    element: HTMLElement, properties: readonly string [],
): void {
    for (const property of properties){
        element.style.removeProperty(property);
    }
}

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
export function styleObjectToString(
    styles: CSSStyleObject,
): string {
    return Object.entries(styles) 
    .filter(
        ([, value]) =>
            value !== undefined &&
            value !== null,
        )
        .map(
            ([key, value]) => 
                `${key}:${String(value)}`
        )
        .join("")
}