import { host, hostAttribute, createStyles } from "@quevy/core";

export const qvRadioStyles = createStyles(`
${host()} {
    display: inline-flex;
    align-items: center;
    gap: var(--qv-spacing-sm, 8px);
    cursor: pointer;
    font-size: var(--qv-font-size-sm, 11px);
    color: var(--qv-color-foreground-default, #111827);
    outline: none;
}

.dot-outer {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    border: 1.5px solid var(--qv-color-border-strong, #D1D5DB);
    border-radius: var(--qv-radius-full, 9999px);
    background-color: var(--qv-color-background-surface, #F9FAFB);
}

.dot-inner {
    width: 8px;
    height: 8px;
    border-radius: var(--qv-radius-full, 9999px);
    background-color: var(--qv-color-brand-primary, #0027C4);
    opacity: 0;
}

${host()}:focus-visible .dot-outer {
    outline: 2px solid var(--qv-color-brand-primary, #0027C4);
    outline-offset: 2px;
}


${hostAttribute('checked')} .dot-outer { border-color: var(--qv-color-brand-primary, #0027C4); }
${hostAttribute('checked')} .dot-inner { opacity: 1; }

${hostAttribute('disabled')} { opacity: 0.5; cursor: not-allowed; }
`)