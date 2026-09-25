import { host, hostAttribute, createStyles } from "@quevy/core";

export const qvCheckboxStyles = createStyles(`
${host()} {
    display: inline-flex;
    align-items: center;
    gap: var(--qv-spacing-sm, 8px);
    cursor: pointer;
    font-size: var(--qv-font-size-sm, 11px);
    color: var(--qv-color-foreground-default, #111827);
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
    position: relative;
    overflow: hidden;
    border: 1.5px solid var(--qv-color-border-strong, #D1D5DB);
    border-radius: var(--qv-radius-sm, 5px);
    background-color: var(--qv-color-background-surface, #F9FAFB);
    transition: border-color var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1)), transform var(--qv-motion-duration-moderate, 240ms) var(--qv-motion-easing-spring, cubic-bezier(0.34, 1.56, 0.64, 1)), box-shadow var(--qv-motion-duration-slow, 320ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
}

.box svg path {
    stroke-dasharray: 20;
    stroke-dashoffset: 20;
    transition:
        stroke-dashoffset var(--qv-motion-duration-slow, 320ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1)),
        opacity var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1))
}

${host()}:focus-visible .box {
    outline: 2px solid var(--qv-color-brand-primary, #0027C4);
    outline-offset: 2px;
}

/* "Ink fill" - a small brand-color dot grows from center and
    fills the box, clipped by its own border-radius via 
    overflow: hidden. This is the signature moment for qv-checkbox
    specifically - geometry stays plain,so the distinctive detail 
    lives in the motion instead.*/
.box::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: var(--qv-color-brand-primary, #0027C4);
    border-radius: 50%;
    transform: scale(0);
    transform-origin: center;
    transition: transform var(--qv-motion-duration-slow, 320ms) var(--qv-motion-easing-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
}

:host([aria-checked="true"]) .box::before,
:host([aria-checked="mixed"]) .box::before {
    transform: scale(2);
}

:host([aria-checked="true"]) .box,
:host([aria-checked="mixed"]) .box {
    border-color: var(--qv-color-brand-primary, #0027C4);
    box-shadow: 0 0 0 4px rgba(49, 87, 199, 0.15);
    transform: scale(1.08);
}

.box svg {
    position: relative;
    z-index: 1;
    width: 12px;
    height: 12px;
    color: var(--qv-color-foreground-inverse, #FFFFFF);
    opacity: 0;
}

${hostAttribute('disabled')} {
    opacity: 0.5;
    cursor: not-allowed;
}
`)