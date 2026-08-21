/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-button styles
 * ----------------------------------------------------------
 * Consumes @quevy/tokens CSS variables (--qv-*). Every var()
 * call includes a literal fallback matching the token's
 * current value, so the button renders correctly even if the
 * app hasn't (yet) applied @quevy/tokens' generated
 * :root stylesheet anywhere in the document — that stylesheet
 * doesn't exist yet (open item, see project notes), so
 * fallbacks aren't optional right now, they're load-bearing.
 *
 * @packageDocumentation
 */

import { css, host, hostAttribute, createStyles } from '@quevy/core';

const layout = css (`
${host()}{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    gap: var(--qv-spacing-xs, 4px);
    border-radius: var(--qv-radius-signature, 2px) var(--qv-radius-md, 8px) var(--qv-radius-md, 8px) var(--qv-radius-md, 8px);
    border: 1px solid transparent;
    font-family: var(--qv-font-family-sans, system-ui, sans-serif);
    font-weight: var(--qv-font-weight-medium, 500);
    line-height: var(--qv-line-height-tight, 1.25);
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    outline: none;
    transition-property: background-color, border-color, color, box-shadow, opacity;
    transition-duration: var(--qv-motion-duration-fast, 100ms);
    transition-timing-function: var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
}
    
.icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.icon:empty {
    display: none;
}
    
.label {
    display: inline-flex;
    align-items: center;
 }

::slotted(*) {
    width: 1em;
    height: 1em;
}
`);

const sizes = css(`
${hostAttribute('size="sm"')}{
    height: var(--qv-sizing-sm, 32px);
    padding-inline: var(--qv-spacing-md, 12px);
    font-size: var(--qv-font-size-sm, 14px);
}
)
${hostAttribute('size="md"')}{
    height: var(--qv-sizing-md, 40px);
    padding-inline: var(--qv-spacing-lg, 16px);
    font-size: var(--qv-font-size-md, 16px);
}

${hostAttribute('size="lg"')}{
    height: var(--qv-sizing-lg, 48px);
    padding-inline: var(--qv-spacing-xl, 20px);
    font-size: var(--qv-font-size-lg, 18px);
}
`)

const variant = css(`
${hostAttribute('variant="primary"')}{
    background-color: var(--qv-color-brand-primary, #3157c7);
    color: var(--qv-color-foreground-inverse, #ffffff);
}

${hostAttribute('variant="secondary"')}{
    background-color: var(--qv-color-brand-muted, #f3f4f6);
    color: var(--qv-color-foreground-default, #171717);
}

${hostAttribute('variant="outline"')}{
    background-color: transparent;
    border-color: var(--qv-color-border-strong, #d4d4d4);
    color: var(--qv-color-foreground-default, #171717);
}

${hostAttribute('variant="text"')}{
    background-color: transparent;
    color: var(--qv-color-brand-primary, #3157c7);
}

${hostAttribute('variant="danger"')}{
    background-color: var(--qv-color-status-error, #dc2626);
    color: var(--qv-color-foreground-inverse, #ffffff);
}

${host()}:not([disabled]):not([loading]):hover {
    filter: brightness(0.94);
}

${host()}:not([disabled]):not([loading]):active {
    filter: brightness(0.88);
}
`);

const states = css(`
${host()}:focus-visible {
    box-shadow: 0 0 0 2px var(--qv-color-background-default, #ffffff),
        0 0 0 4px var(--qv-color-brand-primary, #3157c7);
}    

${hostAttribute('disabled')}{
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
}

${hostAttribute('loading')} {
    cursor: progress;
    pointer-events: none;
}

${hostAttribute('loading')} .icon[part="prefix"] ::slotted(*) {
    display: none;
}
`);


const spinner = css(`
.spinner {
    width: 1em;
    height: 1em;
    border-radius: var(--qv-radius-full, 9999px);
    border: 2px solid currentColor;
    border-top-color: transparent;
    opacity: 0.85;
    animation: qv-button-spin var(--qv-motion-duration-slow, 300ms) linear infinite; 
} 

@keyframes qv-button-spin {
    to {
        transform: rotate(360deg);
    }
}
`);

export const qvButtonStyles = createStyles(
    css(layout, sizes, variant, states, spinner),
);