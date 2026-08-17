import { host, hostAttribute, createStyles } from "@quevy/core";

export const qvListItemStyles = createStyles(`
${host()} {
    display: flex;
    align-items: center;
    gap: var(--qv-spacing-sm, 8px);
    padding: var(--qv-spacing-sm, 8px) var(--qv-spacing-md, 12px);
    border-bottom: 1px solid var(--qv-color-border-default, #e5e5e5);
}    

${host()}:last-child{
    border-bottom: none;
}

.loading .trailing {
    display: flex;
    align-items: center;
    flex-shrink: 0;
}

.loading.empty,
.trailing.empty {
    display: none;
}

.content { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.label { font-size: var(--qv-font-size-sm, 14px); color: var(--qv-color-foreground-default, #171717); }
.description { font-size: var(--qv-font-size-xs, 12px); color: var(--qv-color-foreground-muted, #737373); }
.description.empty { display: none; }

${hostAttribute('clickable')} {
    cursor: pointer;
}

${hostAttribute('clickable')}:hover {
    background-color: var(--qv-color-background-muted, #f5f5f5);
}

${host()}:focus-visible {
    outline: 2px solid var(--qv-color-brand-primary, #3157c7);
    outline-offset: -2px;
}
`);