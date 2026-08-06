/**
 * ----------------------------------------------------------
 * QUEVY UI
 * ----------------------------------------------------------
 * CSS Custom Properties.
 *
 * Exposes Quevy UI design tokens as CSS variables so they
 * can be consumed by Web Components, Shadow DOM styles,
 * and external application styles.
 * ----------------------------------------------------------
 */
import { primitiveColors, semanticColors } from '../colors/index.js';
import { motion } from '../motion/index.js';
import { radius } from '../radius/index.js';
import { shadows } from '../shadows/index.js';
import { sizing } from '../sizing/index.js';
import { spacing } from '../spacing/index.js';
import { typography } from '../typography/index.js';
import { zIndex } from '../z-index/index.js';
function flattenTokens(tokens, prefix) {
    const variables = {};
    for (const [key, value] of Object.entries(tokens)) {
        const variableName = `${prefix}-${key}`;
        if (typeof value === 'object' && value !== null) {
            Object.assign(variables, flattenTokens(value, variableName));
        }
        else {
            variables[variableName] = String(value);
        }
    }
    return variables;
}
export const cssVariables = {
    ...flattenTokens(primitiveColors, '--qv-color'),
    ...flattenTokens(semanticColors, '--qv-color'),
    ...flattenTokens(spacing, '--qv-spacing'),
    ...flattenTokens(sizing, '--qv-sizing'),
    ...flattenTokens(radius, '--qv-radius'),
    ...flattenTokens(shadows, '--qv-shadow'),
    ...flattenTokens(zIndex, '--qv-z-index'),
    ...flattenTokens(motion.duration, '--qv-motion-duration'),
    ...flattenTokens(motion.easing, '--qv-motion-easing'),
    ...flattenTokens(typography.fontFamily, '--qv-font-family'),
    ...flattenTokens(typography.fontSize, '--qv-font-size'),
    ...flattenTokens(typography.fontWeight, '--qv-font-weight'),
    ...flattenTokens(typography.lineHeight, '--qv-line-height'),
};
//# sourceMappingURL=variables.js.map