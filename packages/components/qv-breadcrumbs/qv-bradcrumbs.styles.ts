import { css, host, createStyles } from '@quevy/core';

export const qvBreadcrumbsStyles = createStyles(css(`
${host()} {
    display: block;
}

ol {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--qv-spacing-xs, 4px);
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: var(--qv-font-size-sm, 11px);
    line-height: var(--qv-line-height-tight, 1.25);
}

li {
    display: flex;
    align-items: center;
}

a, button.ellipsis, button[part="item"] {
    all: unset;
    cursor: pointer;
    color: var(--qv-color-foreground-muted,  #737373);
    border-radius: var(--qv-radius-sm, 5px);
} 

a:hover, button[part="item"]:hover {
    color: var(--qv-color-foreground-default, #111827);
    text-decoration: underline;
}

a:focus-visible, button.ellipsis:focus-visible, butotn[part="item"]:focus-visible {
    outline: 2px solid var(--qv-color-brand-primary, #0027C4);
    outline-offset: 2px;
}

[aria-current="page"] {
    color: var(--qv-color-foreground-default, #111827);
    font-weight: var(--qv-font-weight-medium, 500);
    cursor: default;
}

.separator {
    display: flex;
    align-items: center;
    color: var(--qv-color-border-strong, #D1D5DB);
}

.separator svg {
    width: calc(1em * var(--qv-line-height-tight, 1.25));
    height: calc(1em * var(--qv-line-height-tight, 1.25));
}

.ellipsis {
    padding: 0 2px;
}
`))