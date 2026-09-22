import { css,  host, hostAttribute, createStyles } from '@quevy/core';

export const qvStepperStyles = createStyles(css(`
${host()} {
    display: inline-flex;
    align-items: stretch;
    overflow: hidden;
}    

${hostAttribute('variant="default"')} {
    border: 1px solid var(--qv-color-border-default, #E5E7EB);
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
    width: 2.3em;
    height: 2.3em;
    font-size: var(--qv-font-size-sm, 11px);
    cursor: pointer;
    color: var(--qv-color-foreground-default, #111827);
    background-color: var(--qv-color-background-surface,  #fff);
}

${hostAttribute('variant="outline"')} button {
    background-color: transparent;
    border: 1.5px solid var(--qv-color-border-strong, #D1D5DB);
}

${hostAttribute('variant="outline"')} ${hostAttribute('shape="circle"')} button {
    border-radius: var(--qv-radius-full, 9999px);
}

${hostAttribute('variant="outline"')} ${hostAttribute('shape="rectangle"')} button {
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
    outline-offset: -2px;
}

${hostAttribute('size="lg"')} button {
   font-size: var(--qv-sizing-xl, 42px);
}
${hostAttribute('size="lg"')} input {
    width: 64px;
    font-size: var(--qv-font-size-xl, 42px);
}

input {
    all: unset;
    width: 48px;
    text-align: center;
    line-height: 1.4;
    padding-block: 0.4em;
    font-size: var(--qv-font-size-sm, 11px);
    color: var(--qv-color-foreground-default, #111827);
}

${hostAttribute('variant="default"')} {
    border-inline: 1px solid var(--qv-color-border-default, #E5E7EB);
}

${hostAttribute('disabled')} {
    opacity: 0.5;
}
`));