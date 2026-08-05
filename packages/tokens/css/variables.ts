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

import { primitiveColors, semanticColors } from '../colors';
import { motion } from '../motion';
import { radius } from '../radius';
import { shadows } from '../shadows';
import { sizing } from '../sizing';
import { spacing } from '../spacing';
import { typography } from '../typography';
import { zIndex } from '../z-index';

type TokenValue = string | number;

type TokenRecord = {
  [key: string]: TokenValue | TokenRecord;
};

function flattenTokens(
  tokens: TokenRecord,
  prefix: string,
): Record<string, string> {
  const variables: Record<string, string> = {};

  for (const [key, value] of Object.entries(tokens)) {
    const variableName = `${prefix}-${key}`;

    if (typeof value === 'object' && value !== null) {
      Object.assign(
        variables,
        flattenTokens(value as TokenRecord, variableName),
      );
    } else {
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
} as const;