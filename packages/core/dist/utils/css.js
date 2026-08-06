/**
 * package/core/utils/css.ts
 */
/**
 * Convert a number into a CSS Value
 *
 * Example: 12 ->  "12px" or 2rem -> "2rem"
 */
export function toCssUnit(value, unit = "px") {
    return typeof value === "number"
        ? `${value}${unit}`
        : value;
}
/**
 * Reads a CSS Custom Property.
 */
export function getCSSVariable(element, name) {
    return getComputedStyle(element)
        .getPropertyValue(name)
        .trim();
}
/**
 * Sets a CSS Custom Property.
 */
export function setCSSVariable(element, name, value) {
    element.style.setProperty(name, String(value));
}
/**
 * Removes a CSS Custom Property
 */
export function removeCSSVariable(element, name) {
    element.style.removeProperty(name);
}
/**
 * Applies inline styles from an object
 */
export function applyStyles(element, styles) {
    for (const [key, value] of Object.entries(styles)) {
        if (value === undefined || value === null) {
            element.style.removeProperty(key);
            continue;
        }
        element.style.setProperty(key, String(value));
    }
}
/**
 * Removes multiple inline styles.
 */
export function removeStyles(element, properties) {
    for (const property of properties) {
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
export function styleObjectToString(styles) {
    return Object.entries(styles)
        .filter(([, value]) => value !== undefined &&
        value !== null)
        .map(([key, value]) => `${key}:${String(value)}`)
        .join("");
}
//# sourceMappingURL=css.js.map