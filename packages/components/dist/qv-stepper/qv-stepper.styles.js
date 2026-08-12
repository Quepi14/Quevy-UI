import { css, host, hostAttribute, createStyles } from '@quevy/core';
export const qvStepperStyles = createStyles(css(`
${host()} {
    display: inline-flex;
    align-items: strect;
    border: 1px solid var(--qv-color-border-default, #e5e5e5);
    border-radius: var(--qv-radius-md,  8px);
    overflow: hidden;
    height: var(--qv-sizing-sm, 32px);
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

button:hover:not(:disabled) {
    background-color; var(--qv-color-background-muted, #f5f5f5);
}

button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

button:focus-visible {
    outline: 2px solid var(--qv-color-brand-primary, #2563eb);
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
//# sourceMappingURL=qv-stepper.styles.js.map