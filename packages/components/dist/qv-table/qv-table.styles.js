import { host, hostAttribute, createStyles } from '@quevy/core';
export const qvTableStyles = createStyles(`
${host()} {
    display: block;
    border: 1px solid var(--qv-color-border-default, #e5e5e5);
    border-radius: var(--qv-radius-lg, 12px);
    overflow: hidden;
    background-color: var(--qv-color-background-surface, #fff);
}    

${hostAttribute('variant="plain"')} {
    border: none;
    border-radius: 0;
}

.title-bar {
    padding: var(--qv-spacing-sm, 8px) var(--qv-spacing-lg, 16px);
    background-color: var(--qv-color-brand-primary, #3157c7);
    color: var(--qv-color-foreground-inverse, #fff);
    font-size: var(--qv-font-size-sm, 14px);
    font-weight: var(--qv-font-weight-semibold, 600);
}

.title-bar.empty { display: none; }

${hostAttribute('variant="plain"')} .title-bar { display: none; }

table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--qv-font-size-sm, 14px);
}

${hostAttribute('variant="plain"')} table {
    border-bottom: 2px solid var(--qv-color-border-default, #e5e5e5);
}

thead th {
    padding: var(--qv-spacing-sm, 8px) var(--qv-spacing-md, 12px);
    background-color: var(--qv-color-neutral-200, #E5E7EB);
    color: var(--qv-color-foreground-muted, #737373);
    font-weight: var(--qv-font-weight-medium, 500);
    border-bottom: 1px solid var(--qv-color-border-default, #e5e5e5);
    white-space: nowrap;
}

${hostAttribute('variant="plain"')} thead th {
    background-color: transparent;
    border-bottom: 2px solid var(--qv-color-border-default, #e5e5e5);
    text-transform: uppercase;
    font-size: var(--qv-font-size-xs, 12px);
    letter-spacing: 0.02em;
}

tbody td {
    padding: var(--qv-spacing-sm, 8px) var(--qv-spacing-md, 12px);
    color: var(--qv-color-foreground-default, #171717);
    border-bottom: 1px solid var(--qv-color-border-default, #e5e5e5);
}

${hostAttribute('variant="plain"')} tbody td {
    padding-block: var(--qv-spacing-lg, 16px);
    border-bottom-color: var(--qv-color-background-muted, #f5f5f5);
}

tbody tr:nth-child(even) {
    background-color: var(--qv-color-neutral-200, #E5E7EB);
}

${hostAttribute('variant="plain"')} tbody tr:nth-child(even) {
    background-color: transparent;
} 

${hostAttribute('variant="plain"')} tbody tr:hover {
    background-color: var(--qv-color-background-muted, #f5f5f5);
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
    padding: var(--qv-spacing-sm, 8px) var(--qv-spacing-md, 12px);
    background-color: var(--qv-color-blue-50, #eff6ff);
    font-weight: var(--qv-font-weight-semibold, 600);
    border-top: 1px solid var(--qv-color-border-default, #e5e5e5);
}

.empty-state {
    padding: var(--qv-spacing-2xl, 24px);
    text-align: center;
    color: var(--qv-color-foreground-muted, #737373);
}

${hostAttribute('align=center')} { text-align: center; }
${hostAttribute('align=right')} { text-align: right; }
`);
//# sourceMappingURL=qv-table.styles.js.map