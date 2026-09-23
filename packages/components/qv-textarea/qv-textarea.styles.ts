import { css, host, hostAttribute, createStyles } from "@quevy/core";

export const qvTextareaStyles = createStyles(css(`
${host()} {
    display: flex;
    flex-direction: column;
    gap: var(--qv-spacing-xs, 4px);
    font-size: var(--qv-font-size-sm, 11px);
}    

.label {
    font-weight: var(--qv-font-weight-medium, 500);
    color: var(--qv-color-foreground-default, #111827);
    transition: color var(--qv-motion-duration-fast, 100ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
}

:host(:focus-within) .label {
    color: var(--qv-color-brand-primary, #0027C4);
}

.label.empty { display: none; }

textarea {
    box-sizing: border-box;
    width: 100%;
    padding: var(--qv-spacing-sm, 8px) var(--qv-spacing-md, 16px);
    border: 1px solid var(--qv-color-border-default, #E5E7EB);
    border-radius: var(--qv-radius-md, 8px);
    font-family: inherit;
    font-size: var(--qv-font-size-sm, 11px);
    color: var(--qv-color-foreground-default, #111827);
    resize: vertical;
    min-height: 80px;
    transition: border-color var(--qv-motion-duration-fast, 100ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1)),
                box-shadow var(--qv-motion-duration-fast, 100ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));}

textarea:placeholder {
    color: var(--qv-color-foreground-muted, #6B7280);
}

textarea:hover:not(:disabled) {
    border-color: var(--qv-color-foreground-muted, #6B7280);
}

textarea:focus-visible {
    outline: none;
    border-color: var(--qv-color-brand-primary, #0027C4);
    box-shadow: 0 0 0 3px rgba(49, 87, 199, 0.15);
}

${hostAttribute('resize="none"')} textarea { resize: none; }

${hostAttribute('disabled')} textarea {
    background-color: var(--qv-color-background-muted, #F3F4F6);
    cursor: not-allowed;
    opacity: 0.6;
}

${hostAttribute('invalid')} textarea {
    border-color: var(--qv-color-status-error, #dc2626);
}

${hostAttribute('invalid')} textarea:focus-visible {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
}

.footer {
    display: flex;
    justify-content: space-between;
    gap: var(--qv-spacing-sm, 8px);
    font-size: var(--qv-font-size-xs, 10px);
    color: var(--qv-color-foreground-muted, #6B7280);
}

.helper.error { color: var(--qv-color-status-error, #dc2626); }

:host([auto-resize]) textarea {
    resize: none;
    overflow: hidden;
}

.counter {
    padding: 2px 6px;
    border-radius: var(--qv-radius-full, 9999px);
    background-color: var(--qv-color-background-muted, #f5f5f5);
}

.counter.exceed {
    background-color: rgba(220, 38, 38, 0.1);
}
`));