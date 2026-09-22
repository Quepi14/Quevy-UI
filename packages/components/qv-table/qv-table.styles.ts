import { host, hostAttribute, createStyles } from '@quevy/core';

export const qvTableStyles = createStyles(`
${host()} {
    display: block;
    border: 1px solid var(--qv-color-border-default, #E5E7EB);
    border-radius: var(--qv-radius-lg, 13px);
    overflow: hidden;
    background-color: var(--qv-color-background-surface, #F9FAFB);
}    

${hostAttribute('variant="plain"')} {
    border: none;
    border-radius: 0;
}

.title-bar {
    padding: var(--qv-spacing-sm, 8px) var(--qv-spacing-lg, 24px);
    background-color: var(--qv-color-brand-primary, #0027C4);
    color: var(--qv-color-foreground-inverse, #FFFFFF);
    font-size: var(--qv-font-size-sm, 11px);
    font-weight: var(--qv-font-weight-semibold, 600);
}

.title-bar.empty { display: none; }

${hostAttribute('variant="plain"')} .title-bar { display: none; }

table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--qv-font-size-sm, 11px);
}

${hostAttribute('variant="plain"')} table {
    border-bottom: 2px solid var(--qv-color-border-default, #E5E7EB);
}

thead th {
    padding: var(--qv-spacing-sm, 8px) var(--qv-spacing-md, 16px);
    background-color: var(--qv-color-neutral-200, #E5E7EB);
    color: var(--qv-color-foreground-muted, #6B7280);
    font-weight: var(--qv-font-weight-medium, 500);
    border-bottom: 1px solid var(--qv-color-border-default, #E5E7EB);
    white-space: nowrap;
}

${hostAttribute('variant="plain"')} thead th {
    background-color: transparent;
    border-bottom: 2px solid var(--qv-color-border-default, #E5E7EB);
    text-transform: uppercase;
    font-size: var(--qv-font-size-xs, 10px);
    letter-spacing: 0.02em;
}

tbody td {
    padding: var(--qv-spacing-sm, 8px) var(--qv-spacing-md, 16px);
    color: var(--qv-color-foreground-default, #111827);
    border-bottom: 1px solid var(--qv-color-border-default, #E5E7EB);
}

${hostAttribute('variant="plain"')} tbody td {
    padding-block: var(--qv-spacing-lg, 24px);
    border-bottom-color: var(--qv-color-background-muted, #F3F4F6);
}

tbody tr:nth-child(even) {
    background-color: var(--qv-color-neutral-200, #E5E7EB);
}

${hostAttribute('variant="plain"')} tbody tr:nth-child(even) {
    background-color: transparent;
} 

${hostAttribute('variant="plain"')} tbody tr:hover {
    background-color: var(--qv-color-background-muted, #F3F4F6);
}

.cell-user {
    display: flex; 
    align-items: center;
    gap: var(--qv-spacing-sm, 8px);
}

.cell-actions {
    display: flex;
    align-items: center;
    gap: var(--qv-spacing-xs, 4px);
    justify-content: flex-end;
}

tbody tr:last-child td {
    border-bottom: none;
}

.checkbox-cell {
    width: 40px;
    text-align: center;
}

tfoot td {
    padding: var(--qv-spacing-sm, 8px) var(--qv-spacing-md, 16px);
    background-color: var(--qv-color-blue-50, #eff6ff);
    font-weight: var(--qv-font-weight-semibold, 600);
    border-top: 1px solid var(--qv-color-border-default, #E5E7EB);
}

.empty-state {
    padding: var(--qv-spacing-2xl, 40px);
    text-align: center;
    color: var(--qv-color-foreground-muted, #6B7280);
}

${hostAttribute('align=center')} { text-align: center; }
${hostAttribute('align=right')} { text-align: right; }
`)