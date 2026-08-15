import { css, host, hostAttribute, createStyles } from "@quevy/core";

export const qvTextareaStyles = createStyles(css(`
${host()} {
    display: flex;
    flex-direction: column;
    gap: var(--qv-spacing-xs, 4px);
    font-size: var(--qv-font-size-sm, 14px);
}    

.label {
    font-weight: var(--qv-font-weight-medium, 500);
    color: var(--qv-color-foreground-default, #171717);
}

.label.empty { display: none; }

textarea {
    box-sizing: border-box;
    width: 100%;
    padding: var(--qv-spacing-sm, 8px) var(--qv-spacing-md, 12px);
    border: 1px solid var(--qv-color-border-default, #e5e5e5);
    border-radius: var(--qv-radius-signature, 2px) var(--qv-radius-md, 8px) var(--qv-radius-md, 8px) var(--qv-radius-md, 8px);
    font-family: inherit;
    font-size: var(--qv-font-size-sm, 14px);
    color: var(--qv-color-foreground-default, #171717);
    resize: vertical;
    min-height: 80px;
}

textarea:focus-visible {
    outline: none;
    border-color: var(--qv-color-brand-primary, #3157c7);
    box-shadow: 0 0 0 3px rgba(49, 87, 199, 0.15);
}

${hostAttribute('resize="none"')} textarea { resize: none; }

${hostAttribute('disabled')} textarea {
    background-color: var(--qv-color-background-muted, #f5f5f5);
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
    font-size: var(--qv-font-size-xs, 12px);
    color: var(--qv-color-foreground-muted, #737373);
}

.helper.error { color: var(--qv-color-staus-error, #dc2626); }

.counter.exceed { color: var(--qv-color-status-error, #dc2626); }
`));