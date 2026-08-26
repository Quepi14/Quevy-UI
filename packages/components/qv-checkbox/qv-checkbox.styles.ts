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
    position: relative;
    overflow: hidden;
    border: 1.5px solid var(--qv-color-border-strong, #3a3a3a);
    border-radius: var(--qv-radius-sm, 4px);
    background-color: var(--qv-color-background-surface, #fff);
    transition: border-color var(--qv-motion-duration-fast, 100ms) ease, border-color var(--qv-motion-duration-fast, 100ms) ease, transform var(--qv-motion-duration-fast, 100ms) cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow var(--qv-motion-duration-slow, 200ms) ease-out;
}

.box svg {
    width: 12px;
    height: 12px;
    color: var(--qv-color-foreground-inverse, #fff);
    opacity: 0;
}

.box svg path {
    stroke-dasharray: 20;
    stroke-dashoffset: 20;
    transition: 
        stroke-dashoffset var(--qv-motion-duration-slow, 200ms) ease-out,
        opacity var(--qv-motion-duration-fast, 100ms) ease-out;
}

${host()}:focus-visible .box {
    outline: 2px solid var(--qv-color-brand-primary, #3157c7);
    outline-offset: 2px;
}

/* "Ink fill" - a small brand-color dot grows from center and
    fills the box, clipped by its own border-radius via 
    overflow: hidden. This is the signature moment for qv-checkbox
    specifically - geometry stays plain (raidus-sm, per decision),
    so the distinctive detail lives in the motion instead.*/
.box::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: var(--qv-color-brand-primary, #3157c7);
    border-radius: 50%;
    transform: scale(0);
    transform-origin: center;
    transition: tranform var(--qv-motion-duration-slow, 220ms) cubic-bezier(0.34, 1.56, 0.64, 1);
}

:host([aria-checked="true"]) .box::before,
:host([aria-checked="mixed"]) .box::before {
    transform: scale(2);
}

:host([aria-checked="true"]) .box,
:host([aria-checked="mixed"]) .box {
    border-color: var(--qv-color-brand-primary, #3157c7);
    box-shdow: 0 0 0 4px rgba(49, 87, 199, 0.15);
    transform: scale(1.08);
}

.box svg {
    position: relateive;
    z-index: 1;
    width: 12px;
    height: 12px;
    color: var(--qv-color-foreground-inverse, #fff);
    opacity: 0;
}

${hostAttribute('disabled')} {
    opacity: 0.5;
    cursor: not-allowed;
}
`)