/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-state styles
 * ----------------------------------------------------------
 * Spinner animation duration is literal (same rationale as
 * qv-skeleton — ambient/loop animation, not a token-covered
 * micro-interaction).
 *
 * @packageDocumentation
 */

import { css, host, hostAttribute, createStyles } from '@quevy/core';

const layout = css(`
${host()} {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--qv-spacing-xs, 4px);
    padding: var(--qv-spacing-2xl, 24px) var(--qv-spacing-lg, 16px);
}    
    
.icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3em;
    height: 3em;
    border-radius: var(--qv-radius-full, 9999px);
    margin-bottom: var(--qv-spacing-sm, 8px);
}

.icon ::slotted(*) {
    width: 2em;
    height: 2em;
}

.title {
    font-size: var(--qv-font-size-md, 16px);
    font-weight: var(--qv-font-weight-semibold, 600);
    color: var(--qv-color-foreground-default, #111827);
}

.description {
    font-size: var(--qv-font-size-sm, 11px);
    line-height: var(--qv-line-height-normal, 1.5);
    color: var(--qv-color-foreground-muted, #6B7280);
    max-width: 320px;
}

.action {
    margin-top: var(--qv-spacing-sm, 8px)
}

.title.empty,
.description.empty,
.action.empty {
    display: none;
}
`);

const statusColors = css(`
${hostAttribute('status="loading"')} .icon,
${hostAttribute('status="empty"')} .icon {
    background-color: var(--qv-color-background-muted, #F3F4F6);
    color: var(--qv-color-foreground-muted, #6B7280);
}    

${hostAttribute('status="error"')} .icon {
    background-color: var(--qv-color-status-subtle-error, #fef2f2);
    color: var(--qv-color-status-error, #dc2626);
}

${hostAttribute('status="success"')} .icon {
    background-color: var(--qv-color-status-subtle-success, #f0fdf4);
    color: var(--qv-color-status-success, #16a34a);
}
`);

const spinner = css(`
.spinner {
    display: block;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: var(--qv-radius-full, 9999px);
    animation: qv-state-spin 0.8s linear infinite;
}    

@media (prefers-reduced-motion: reduce) {
    .spinner {
        animation-duration: 1600ms;
    }
}

@keyframes qv-state-spin {
    to { transform: rotate(360deg); }
}
`);

export const qvStateStyles = createStyles(css(layout, statusColors, spinner));