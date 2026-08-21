import { host, hostAttribute, createStyles } from "@quevy/core";

export const qvCheckboxStyles = createStyles(`
${host()} {
    display: inline-flex;
    align-items: center;
    gap: var(--qv-spacing-sm, 8px);
    cursor: pointer;
    font-size: var(--qv-font-size-sm, 14px);
    color: var(--qv-color-foreground-default, #171717);
    outline: none;
}

.box {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    border: 1.5px solid var(--qv-color-border-strong, #3a3a3a);
    border-radius: var(--qv-radius-signature, 2px) var(--qv-radius-sm, 4px) var(--qv-radius-sm, 4px) var(--qv-radius-sm, 4px);
    background-color: var(--qv-color-background-surface, #fff);
    transition: background-color var(--qv-motion-duration-fast, 100ms) ease border-color var(--qv-motion-duration-fast, 100ms) ease;
}

.box svg { width: 12px; height: 12px; color: var(--qv-color-foreground-inverse, #ffffff); opacity: 0; }

${host()}:focus-visible .box {
    outline: 2px solid var(--qv-color-brand-primary, #3157c7);
    outline-offset: 2px;
}

${hostAttribute('checked')} .box,
${hostAttribute('indeterminate')} .box {
    background-color: var(--qv-color-brand-primary, #3157c7);
    border-color: var(--qv-color-brand-primary, #3157c7);
}

${hostAttribute('checked')} .box svg,
${hostAttribute('indeterminate')} .box svg { opacity: 1; }

${hostAttribute('disabled')} {
    opacity: 0.5;
    cursor: not-allowed;
}
`)