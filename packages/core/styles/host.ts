/**
 * --------------------------------------------------
 * QUEVY UI
 * --------------------------------------------------
 * Shadow host selector utilities for Quevy UI styles.
 *
 * @packageDocumentation
 */

/**
 * Returns the CSS `:host` selector.
 *
 * When a selector is provided, it is placed inside
 * the `:host()` functional pseudo-class.
 *
 * @param selector - Optional host selector.
 *
 * @returns A CSS `:host` selector.
 *
 * @example
 * ```ts
 * host();
 * // ':host'
 *
 * host('[disabled]');
 * // ':host([disabled])'
 * ```
 */
export function host(selector = ''): string {
    if(selector.length ===  0) {
        return ':host';
    }

    return `:host(${selector})`
}

/**
 * Returns a CSS `:host` selector for an  attribute.
 * 
 * The generated selector targets the host whenever the
 * specified attribute is present.
 * 
 * @param attribute - Attribute name to match.
 * 
 * @returns A CSS `:host` attribute selector.
 * 
 * @example
 * ```ts
 * hostAttribute('disabled');
 * // ':host([disabled])'
 * ```
 */
export function hostAttribute(attribute: string): string {
    return host(`[${attribute}]`)
}