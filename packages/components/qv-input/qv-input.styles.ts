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
    font-size: var(--qv-font-size-sm, 11px);
}

.field { position: relative; }

input {
    box-sizing: border-box;
    width: 100%;
    line-height: 1.4;
    padding-block: 0.75em;
    padding-inline: var(--qv-spacing-md, 12px);
    border: 1px solid var(--qv-color-border-default, #E5E7EB);
    border-radius: var(--qv-radius-md, 8px);
    font-family: inherit;
    font-size: var(--qv-font-size-sm, 11px);
    color: var(--qv-color-foreground-default, #111827);
    background-color: var(--qv-color-background-surface, #F9FAFB);
}

input:focus-visible {
    outline: none;
    border-color: var(--qv-color-brand-primary, #0027C4);
    box-shadow: 0 0 0 3px rgba(49, 87, 199, 0.15);
}

/* Default variant */
.label { font-weight: var(--qv-font-weight-medium, 500); color: var(--qv-color-foreground-default, #111827); }
.label.empty { display: none; }

/* Floating variant */
${hostAttribute('variant="floating"')} .field { 
    margin-top: var(--qv-spacing-sm, 8px); 
}
${hostAttribute('variant="floating"')} .label { 
    display: none;
}

${hostAttribute('variant="floating"')} .floating-label {
    display: block;
    position: absolute;
    left: var(--qv-spacing-md, 12px);
    top: 50%;
    transform: translateY(-50%) scale(1);
    transform-origin: left center;
    padding-inline: var(--qv-spacing-xs, 4px);
    background-color: var(--qv-color-background-surface, #F9FAFB);
    color: var(--qv-color-foreground-muted, #6B7280);
    font-size: var(--qv-font-size-sm, 11px);
    line-height: 1;
    pointer-events: none;
    transition: transform var(--qv-motion-duration-normal, 200ms) cubic-bezier(0.2, 0, 0, 1), color var(--qv-motion-duration-fast, 100ms) ease
}

${hostAttribute('variant="floating"')} .floating label { display: block; }

/* Floats up when focused, OR when the input already has a
   value (i.e. is NOT showing its placeholder). */
${hostAttribute('variant="floating"')}
input:focus ~ .floating-label,
${hostAttribute('variant="floating"')}
input:not(:placeholder-shown) ~ .floating-label {
    top: 0;
    transform: translateY(-50%) scale(0.85);
}

${hostAttribute('variant="floating"')}
input:focus ~ .floating-label { 
    color: var(--qv-color-brand-primary, #0027C4); 
}

/* Shared states */
${hostAttribute('disabled')} input { background-color: var(--qv-color-background-muted, #F3F4F6); cursor: not-allowed; opacity: 0.6; }
${hostAttribute('invalid')} input { border-color: var(--qv-color-status-error, #dc2626); }
${hostAttribute('invalid')} input:focus-visible { box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15); }
${hostAttribute('invalid')} .floating-label { color: var(--qv-color-status-error, #dc2626); }

.footer { display: flex; justify-content: space-between; gap: var(--qv-spacing-sm, 8px); font-size: var(--qv-font-size-xs, 10px); color: var(--qv-color-foreground-muted, #737373); }
.helper.error { color: var(--qv-color-status-error, #dc2626); }
.counter.exceeded { color: var(--qv-color-status-error, #dc2626); }

.icon { position: absolute; top: 50%; transform: translateY(-50%); display: flex; color: var(--qv-color-foreground-muted, #6B7280); }
.icon.leading { left: var(--qv-spacing-sm, 8px); }
.icon.trailing { right: var(--qv-spacing-sm, 8px); }
.icon.empty { display: none; }
`);