import { host, hostAttribute, createStyles } from "@quevy/core";

export const qvListItemStyles = createStyles(`
${host()} {
    display: flex;
    align-items: center;
    gap: var(--qv-spacing-sm, 8px);
    padding: var(--qv-spacing-sm, 8px) var(--qv-spacing-md, 16px);
    border-bottom: 1px solid var(--qv-color-border-default, #E5E7EB);
    transition: background-color var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
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
    font-size: var(--qv-font-size-sm, 11px);
    font-weight: var(--qv-font-weight-medium, 500);
    line-height: 1.4;
    color: var(--qv-color-foreground-default, #111827);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.description {
    font-size: var(--qv-font-size-xs, 10px);
    line-height: 1.4;
    color: var(--qv-color-foreground-muted, #6B7280);
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
    background-color: var(--qv-color-background-muted, #F3F4F6);
}

${host('[clickable]:active')} {
    background-color: var(--qv-color-background-muted, #F3F4F6);
}

${host()}:focus-visible {
    outline: 2px solid var(--qv-color-brand-primary, #0027C4);
    outline-offset: -2px;
    border-radius: var(--qv-radius-sm, 5px);
}
`);