/**
 * Floating label uses the placeholder-shown CSS trick, not JS
 * state — the <input> always has a single-space placeholder
 * (invisible, but keeps :placeholder-shown truthy only when
 * genuinely empty). The label then reads its "float up" state
 * purely from :focus / :not(:placeholder-shown) on its input
 * sibling, so it can never desync from the actual DOM value —
 * even if value is set imperatively via JS without firing input
 * events.
 */
import { host, hostAttribute, createStyles } from "@quevy/core";

export const qvInputStyles = createStyles(`
${host()} {
    display: flex;
    flex-direction: column;
    gap: var(--qv-spacing-xs, 4px);
    font-size: var(--qv-font-size-sm, 14px);
}

.field { position: relative; }

input {
    box-sizing: border-box;
    width: 100%;
    height: var(--qv-siizng-md, 40px);
    padding-inline: var(--qv-spacing-md, 12px);
    border: 1px solid var(--qv-color-border-default, #e5e5e5);
    border-radius: var(--qv-radius-signature, 2px) var(--qv-radius-md, 8px) var(--qv-radius-md, 8px) var(--qv-radius-md, 8px)
    font-family: inherit;
    font-size: var(--qv-font-size-sm, 14px);
    color: var(--qv-color-foreground-default, #171717);
    background-color: var(--qv-color-background-surface, #fff);
}

input:focus-visible {
    outline: none;
    border-color: var(--qvcolor-brand-primary, #3157c7);
    box-shadow: 0 0 0 3px rgba(49, 87, 199, 0.15);
}

/* Default variant */
.label { font-weight: var(--qv-font-weight-medium, 500); color: var(--qv-color-foreground-default, #171717); }
.label.empty { display: none; }

/* Floating variant */
${hostAttribute('variant="floating"')} .field { margin-top: var(--qv-spacing-sm, 8px); }
${hostAttribute('variant="floating"')} .label { display: none; }

.floating-label {
    display: none;
    position: absolute;
    left: var(--qv-spacing-md, 12px);
    top: 50%;
    transform: translateY(-50%);
    padding-inline: 4px;
    background-color: var(--qv-color-background-surface, #fff);
    color: var(--qv-color-foreground-muted, #737373);
    pointer-events: none;
    transition: top var(--qv-motion-duration-fast, 100ms) ease, font-size var(--qv-motion-duration-fast, 100ms) ease, color var(--qv-motion-duration-fast, 100ms) ease;   
}

${hostAttribute('variant="floating"')} .floating label { display: block; }

/* Floats up when focused, OR when the input already has a
   value (i.e. is NOT showing its placeholder). */
input:focus ~ .floating-label,
input:not(:placeholder-shown) ~ .floating-label {
    top: 0;
    font-size: var(--qv-font-size-xs, 12px);
}

input:focus ~ .floating-label { color: var(--qv-color-brand-primary, #3157c7); }

/* Shared states */
${hostAttribute('disabled')} input { background-color: var(--qv-color-background-muted, #f5f5f5); cursor: not-allowed; opacity: 0.6; }
${hostAttribute('invalid')} input { border-color: var(--qv-color-status-error, #dc2626); }
${hostAttribute('invalid')} input:focus-visible { box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15); }
${hostAttribute('invalid')} .floating-label { color: var(--qv-color-status-error, #dc2626); }

.footer { display: flex; justify-content: space-between; gap: var(--qv-spacing-sm, 8px); font-size: var(--qv-font-size-xs, 12px); color: var(--qv-color-foreground-muted, #737373); }
.helper.error { color: var(--qv-color-status-error, #dc2626); }
.counter.exceeded { color: var(--qv-color-status-error, #dc2626); }

.icon { position: absolute; top: 50%; transform: translateY(-50%); display: flex; color: var(--qv-color-foreground-muted, #737373); }
.icon.leading { left: var(--qv-spacing-sm, 8px); }
.icon.trailing { right: var(--qv-spacing-sm, 8px); }
.icon.empty { display: none; }
`);