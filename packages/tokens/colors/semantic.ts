/**
 * ----------------------------------------------------------
 * QUEVY UI
 * ----------------------------------------------------------
 * Semantic color tokens.
 *
 * Semantic tokens describe the purpose of a color rather
 * than its concrete color value.
 * ----------------------------------------------------------
 */

import { primitiveColors } from './primitive.js';

export const semanticColors = {
    brand: {
        primary: '#3157c7',
        secondary: primitiveColors.neutral[700],
    },

    background: {
        default: primitiveColors.white,
        surface: primitiveColors.neutral[50],
        muted: primitiveColors.neutral[100], 
    },

    foreground : {
        default: primitiveColors.neutral[900],
        muted: primitiveColors.neutral[500],
        inverse: primitiveColors.white,
    },

    border: {
        default: primitiveColors.neutral[200],
        strong: primitiveColors.neutral[300],
    },

    status: {
        success: primitiveColors.green[600],
        warning: primitiveColors.yellow[600],
        error: primitiveColors.red[600],
        info: primitiveColors.blue[600],
    },
} as const;