import { css, host, hostAttribute, createStyles } from '@quevy/core';

export const qvPaginationStyles = createStyles(css(`
${host()} {
    display: flex;
    align-items: center;
    gap: var(--qv-spacing-xs, 4px);
    font-size: var(--qv-font-size-sm, 11px);
}    

button {
    all: unset;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.3em;
    height: 2.3em;
    cursor: pointer;
    color: var(--qv-color-foreground-default, #111827);
}

${hostAttribute('shape="circle"')} button {
    border-radius: var(--qv-radius-full, 9999px);
}

${hostAttribute('shape="rectangle"')} button {
    border-radius: var(--qv-radius-md, 8px);
}

button:hover:not(:disabled) {
    background-color: var(--qv-color-background-muted, #F3F4F6);
}

button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

button:focus-visible {
    outline: 2px solid var(--qv-color-brand-primary, #0027C4);
    outline-offset: 2px;
}

button[aria-current="page"]  {
    background-color: var(--qv-color-brand-primary, #0027C4);
    color: var(--qv-color-foreground-inverse, #FFFFFF);
}

.ellipsis {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.3em;
    height: 2.3em;
    color: var(--qv-color-foreground-muted, #6B7280);
}

.jump {
    display: inline-flex;
    align-items: center;
    gap: var(--qv-spacing-xs, 4px);
    margin-inline-start: var(--qv-spacing-sm, 8px);
    padding-inline-start: var(--qv-spacing-sm, 8px);
    border-inline-start: 1px solid var(--qv-color-border-default, #E5E7EB);
}

.jump input {
    all: unset;
    width: 40px;
    text-align: center;
    border: 1px solid var(--qv-color-border-default, #E5E7EB);
    border-radius: var(--qv-radius-sm, 5px);
    line-height: 1.4;
    padding-block: 0.7em;
}

.jump input:focus-visible {
    outline: 2px solid var(--qv-color-brand-primary, #0027C4);
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