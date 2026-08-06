/**
 * --------------------------------------------------
 * QUEVY UI
 * --------------------------------------------------
 * CSS composition utilities for Quevy UI styles.
 *
 * This module provides helpers for composing CSS
 * source before it is converted into a stylesheet.
 *
 * @packageDocumentation
 */
/**
 * Joins CSS source fragments into a single CSS string.
 *
 * Empty fragments are ignored so callers can compose
 * optional style definitions without producing unnecessary
 * whitespace.
 *
 * @param fragments - CSS source fragments to combine.
 *
 * @returns A combined CSS source string.
 */
export function css(...fragments) {
    return fragments
        .filter((fragment) => fragment.length > 0)
        .join('\n');
}
//# sourceMappingURL=css.js.map