import { css, host, hostAttribute, createStyles } from '@quevy/core';
export const qvPaginationStyles = createStyles(css(`
${host()} {
    display: flex;
    align-items: center;
    gap: var(--qv-spacing-xs, 4px);
    font-size: var(--qv-font-size-sm, 14px);
}    

button {
    all: unset;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: var(--qv-sizing-sm, 32px);
    height: var(--qv-sizing-sm, 32px);
    cursor: pointer;
    color: var(--qv-color-foreground-default, #171717);
}

${hostAttribute('shape="circle"')} button {
    border-radius: var(--qv-radius-full, 9999px);
}

${hostAttribute('shape="rectangle"')} button {
    border-radius: var(--qv-radius-md, 8px);
}

button:hover:not(:disabled) {
    background-color: var(--qv-color-background-muted, #f5f5f5);
}

button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

button:focus-visible {
    outline: 2px solid var(--qv-color-brand-primary, #3157c7);
    outline-offset: 2px;
}

button[aria-current="page"]  {
    background-color: var(--qv-color-brand-primary, #3157c7);
    color: var(--qv-color-foreground-inverse, #fff);
}

.ellipsis {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: var(--qv-sizing-sm, 32px);
    height: var(--qv-sizing-sm, 32px);
    color: var(--qv-color-foreground-muted, #737373);
}

.jump {
    display: inline-flex;
    align-items: center;
    gap: var(--qv-spacing-xs, 4px);
    margin-inline-start: var(--qv-spacing-sm, 8px);
    padding-inline-start: var(--qv-spacing-sm, 8px);
    border-inline-start: 1px solid var(--qv-color-border-default, #e5e5e5);
}

.jump input {
    all: unset;
    width: 40px;
    text-align: center;
    border: 1px solid var(--qv-color-border-default, #e5e5e5);
    border-radius: var(--qv-radius-sm, 4px);
    height: var(--qv-sizing-sm, 32px);
}

.jump input:focus-visible {
    outline: 2px solid var(--qv-color-brand-primary, #3157c7);
    outline-offset: -2px;
}

/* Variant="outline"*/
${hostAttribute('variant="outline"')} button {
    color: inherit;
    opacity: 0.6;
}

${hostAttribute('variant="outline"')} button:hover:not(:disabled) {
    opacity: 1;
    background-color: transparent;
}
${hostAttribute('variant="outline"')} button[aria-current="page"] {
    background-color: transparent;
    color: inherit;
    opacity: 1;
    border: 1.5px solid currentColor;
}
${hostAttribute('variant="outline"')} .ellipsis {
    color: inherit;
    opacity: 0.5;
} 
`));
//# sourceMappingURL=qv-pagination.styles.js.map