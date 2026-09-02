import { host, hostAttribute, createStyles } from "@quevy/core";

export const qvListItemStyles = createStyles(`
${host()} {
    display: flex;
    align-items: center;
    gap: var(--qv-spacing-sm, 8px);
    padding: var(--qv-spacing-sm, 8px) var(--qv-spacing-md, 12px);
    border-bottom: 1px solid var(--qv-color-border-default, #e5e5e5);
    transition: background-color var(--qv-color-motion-duration-fast, 100ms) ease;
}    

${host()}:last-child{
    border-bottom: none;
}

.leading {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    min-width: 20px;
}

.leading.empty,
.trailing.empty {
    display: none;
}

.content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 1px;
}

.label {
    font-size: var(--qv-font-size-sm, 14px);
    font-weight: var(--qv-font-weight-medium, 500);
    line-height: 1.4;
    color: var(--qv-color-foreground-default, #171717);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.description {
    font-size: var(--qv-font-size-xs, 12px);
    line-height: 1.4;
    color: var(--qv-color-foreground-muted, #737373);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.description.empty { display: none; }

.trailing {
    display: flex;
    align-items: center;
    flex-shrink: 0;
}

${hostAttribute('clickable')} {
    cursor: pointer;
}

${host('[clickable]:hover')} {
    background-color: var(--qv-color-background-muted, #f5f5f5);
}

${host('[clickable]:active')} {
    background-color: var(--qv-color-background-muted, #ebebeb);
}

${host()}:focus-visible {
    outline: 2px solid var(--qv-color-brand-primary, #3157c7);
    outline-offset: -2px;
    border-radius: var(--qv-radius-sm, 4px);
}
`);