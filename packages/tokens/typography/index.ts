/**
 * ----------------------------------------------------------
 * QUEVY UI
 * ----------------------------------------------------------
 * Typography tokens.
 *
 * Defines the typography scale used throughout Quevy UI.
 * The scale is designed to provide consistent and readable
 * text across components.
 * ----------------------------------------------------------
 */

export const typography = {
    fontFamily: {
        sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },

    fontSize: {
        xs: '10px',
        sm: '11px',
        md: '16px',
        lg: '26px',
        xl: '42px',
        '2xl': '68px',
        '3xl': '96px',
        '4xl': '128px',
    },

    fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
    },

    lineHeight: {
        tight: '1.25',
        normal: '1.5',
        relaxed: '1.75',
    },
} as const;