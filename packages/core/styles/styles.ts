/**
 * --------------------------------------------------
 * QUEVY UI
 * --------------------------------------------------
 * Core style definition utilities for Quevy UI.
 *
 * This module provides a small abstraction for creating
 * reusable CSSStyleSheet instances without coupling the
 * style layer to a specific component.
 *
 * @packageDocumentation
 */

/**
 * Creates a reusable CSSStyleSheet from a CSS string.
 *
 * Constructable stylesheets allow the same stylesheet
 * instance to be adopted by multiple components without
 * duplicating the stylesheet definition.
 *
 * @param cssText - CSS source used to create the stylesheet.
 *
 * @returns A constructed CSSStyleSheet.
 */
export function createStyles(cssText: string): CSSStyleSheet {
    const styleSheet = new CSSStyleSheet();

    styleSheet.replaceSync(cssText);

    return styleSheet;
}