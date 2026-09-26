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
    transition: border-color var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
}

.dot-inner {
    width: 8px;
    height: 8px;
    border-radius: var(--qv-radius-full, 9999px);
    background-color: var(--qv-color-brand-primary, #0027C4);
    opacity: 0;
    transform: scale(0);
    transition: opacity var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1)), transform var(--qv-motion-duration-moderate, 240ms) var(--qv-motion-easing-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
}

.check-badge {
    display: none;
}

${host()}:focus-visible .dot-outer {
    outline: 2px solid var(--qv-color-brand-primary, #0027C4);
    outline-offset: 2px;
}


${hostAttribute('checked')} .dot-outer { border-color: var(--qv-color-brand-primary, #0027C4); }
${hostAttribute('checked')} .dot-inner { opacity: 1; transform: scale(1); }

${hostAttribute('disabled')} { opacity: 0.5; cursor: not-allowed; }

/* variant="card" - selectable option card (title/description slotted freely), */
/* checkmark badge replaces the dot, background flips to a brand gradient when checked. */
${hostAttribute('variant="card"')} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    gap: 2px;
    padding: var(--qv-spacing-md, 16px) var(--qv-spacing-lg, 24px);
    border: 1.5px solid var(--qv-color-border-default, #E5E7EB);
    border-radius: var(--qv-radius-lg, 12px);
    background-color: var(--qv-color-background-surface, #FFF);
    transition: background-color var(--qv-motion-duration-normal, 180ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1)), border-color var(--qv-motion-duration-normal, 180ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1)), color var(--qv-motion-duration-normal, 180ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
}

${hostAttribute('variant="card"')} .dot-outer {
    display: none;
}

${hostAttribute('variant="card"')} .check-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 12px;
    right: 12px;
    width: 22px;
    height: 22px;
    border-radius: var(--qv-radius-full, 9999px);
    background-color: rgba(255, 255, 255, 0.22);
    color: var(--qv-color-foreground-inverse, #FFF);;
    opacity: 0;
    transform: scale(0.6);
    transition: opacity var(--qv-motion-duration-normal, 180ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1)), transform var(--qv-motion-duraiton-moderate, 240ms) var(--qv-motion-easing-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
}

${hostAttribute('variant="card"')} .check-badge svg {
    width: 13px;
    height: 13px;
}

:host([variant="card"]:not([checked]):not([disabled])):hover {
    border-color: var(--qv-color-border-strong, #D1D5DB);
}

${hostAttribute('variant="card"')}${hostAttribute('checked')} {
    background: linear-gradient(135deg, var(--qv-color-brand-primary, #0027C4), var(--qv-color-brand-primary-strong, #0B4FE0));
    border-color: transparent;
    color: var(--qv-color-foreground-inverse, #FFF);
}

${hostAttribute('variant="card"')}${hostAttribute('checked')} .check-badge {
    opacity: 1;
    transform: scale(1);
}

${hostAttribute('variant="card"')}:focus-visible {
    outline: 2px solid var(--qv-color-brand-primary, #0027C4);
    outline-offset: 2px;
}
`);