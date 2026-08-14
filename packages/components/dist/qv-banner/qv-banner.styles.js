import { css, host, hostAttribute, createStyles } from '@quevy/core';
const layout = css(`
${host()} {
    display: flex;
    align-items: flex-start;
    gap: var(--qv-spacing-sm, 8px);
    padding: var(--qv-spacing-md, 12px) var (--qv-spacing-lg, 16px);
    border: 1px solid transparent;
    font-size: var(--qv-font-size-md, 14px);
    line-height: var(--qv-line-height-normal, 1.5);
}    

${hostAttribute('hidden')} {
    display: none;
}

.icon {
    display: inline-flex;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin-top: 1px;
}

.icon.empty {
    display: none;
}

.icon ::slotted(*) {
    width: 100%;
    height: 100%;
}

.content {
    flex: 1;
    min-width: 0;
}

.close {
    all: unset;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: var(--qv-radius-sm, 4px);
    cursor: pointer;
    color: inherit;
    opacity: 0.6;
}

.close:hover {
    opacity: 1;
}

.close:focus-visible {
    outline:  2px solid currentColor;
    outline-offset: 2px;
}
`);
const variants = css(`
${hostAttribute('variant="info"')} {
    background-color: var(--qv-color-blue-50, #eff6ff);
    border-color: var(--qv-color-blue-200, #bfdbfe);
    color: var(--qv-color-blue-900, #1e3a8a);
}    

${hostAttribute('variant="success"')} {
    background-color: var(--qv-color-green-50, #f0fdf4);
    border-color: var(--qv-color-green-200, #bbf7d0);
    color: var(--qv-color-green-900, #14532d);
}   

${hostAttribute('variant="warning"')} {
    background-color: var(--qv-color-yellow-50, #fefce8);
    border-color: var(--qv-color-yellow-200, #fef08a);
    color: var(--qv-color-yellow-900, #713f12);
}   

${hostAttribute('variant="error"')} {
    background-color: var(--qv-color-red-50, #fef2f2);
    border-color: var(--qv-color-red-200, #fecaca);
    color: var(--qv-color-red-900, #7f1d1d)
}    
${hostAttribute('variant="neutral"')} {
    background-color: var(--qv-color-background-muted, #f5f5f5);
    border-color: var(--qv-color-border-default, #e5e5e5);
    color: var(--qv-color-foreground-default, #171717);
}    
`);
export const qvBannerStyles = createStyles(css(layout, variants));
//# sourceMappingURL=qv-banner.styles.js.map