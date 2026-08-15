import { host, hostAttribute, createStyles } from '@quevy/core';
export const qvTableStyles = createStyles(`
${host()} {
    display: block;
    border: 1px solid var(--qv-color-border-default, #e5e5e5);
    border-radius: var(--qv-radius-signature, 2px) var(--qv-radius-lg, 12px) var(--qv-radius-lg, 12px) var(--qv-radius-lg, 12px);
    overflow: hidden;
    background-color: var(--qv-color-background-surface, #fff);
}    

.title-bar {
    padding: var(--qv-spacing-sm, 8px) var(--qv-spacing-lg, 16px);
    background-color: var(--qv-color-brand-primary, #3157c7);
    color: var(--qv-color-foreground-inverse, #fff);
    font-size: var(--qv-font-size-sm, 14px);
    font-weight: var(--qv-font-weight-semibold, 600);
}

.title-bar.empty { display: none; }

table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--qv-font-size-sm, 14px);
}

thead th {
    text-align: left;
    padding: var(--qv-spacing-sm, 8px), var(--qv-spacing-md, 12px);
    backgorund-color: var(--qv-color-background-muted, #f5f5f5);
    color: var(--qv-color-foreground-muted, #737373);
    font-weight: var(--qv-font-weight-medium, 500);
    border-bottom: 1px solid var(--qv-color-border-default, #e5e5e5);
    white-space: nowrap;
}

tbody td {
    padding: var(--qv-spacing-sm, 8px) var(--qv-spacing-md, 12px);
    color: var(--qv-color-foreground-default, #171717);
    border-bottom: 1px solid var(--qv-color-border-default, #e5e5e5);
}

tbody tr:nth-child(even) {
    background-color: var(--qv-color-background-muted, #f5f5f5);
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