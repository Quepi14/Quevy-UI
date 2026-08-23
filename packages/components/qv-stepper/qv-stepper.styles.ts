import { css,  host, hostAttribute, createStyles } from '@quevy/core';

export const qvStepperStyles = createStyles(css(`
${host()} {
    display: inline-flex;
    align-items: strect;
    overflow: hidden;
    height: var(--qv-sizing-sm, 32px);
}    

${hostAttribute('variant="default"')} {
    border: 1px solid var(--qv-color-border-default, #171717);
}
    
${hostAttribute('shape="rectangle"')} {
    border-radius: var(--qv-radius-md, 8px);
}

${hostAttribute('shape="circle"')} {
    border-radius: var(--qv-radius-full, 9999px);
}

button {
    all: unset;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--qv-sizing-sm,  32px);
    cursor: pointer;
    color: var(--qv-color-foreground-default,  #171717);
    background-color: var(--qv-color-background-surface,  #fff);
}

${hostAttribute('variant="outline"')} button {
    background-color: transparent;
    border: 1.5px solid var(--qv-color-border-strong, #e3e3e3);
}

${hostAttribute('variant="outline"')} ${hostAttribute('shape="circle"')} button {
    border-radius: var(--qv-radius-full, 9999px);
}

button:hover:not(:disabled) {
    background-color; var(--qv-color-background-muted, #f5f5f5);
}

button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

button:focus-visible {
    outline: 2px solid var(--qv-color-brand-primary, #3157c7);
    outline-offset: -2px;
}

input {
    all: unset;
    width: 48px;
    text-align: center;
    font-size: var(--qv-font-size-sm, 14px);
    color: var(--qv-color-foreground-default, #171717);
    border-inline: 1px solid var(--qv-color-border-default, #e5e5e5);
}

${hostAttribute('disabled')} {
    opacity: 0.5;
}
`));