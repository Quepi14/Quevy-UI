import { host, createStyles } from '@quevy/core';

export const qvNavbarStyles = createStyles(`
${host()} {
    display: flex;
    align-items: center;
    gap: var(--qv-spacing-xs, 4px);
    padding: var(--qv-spacing-xs, 4px);
    background-color: var(--qv-color-background-surface, #fff);
    border-top: 1px solid var(--qv-color-border-default, #e5e5e5);
}    
`);