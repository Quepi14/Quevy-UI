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
    border-radius: var(--qv-radius-md, 8px);
    border: 1px solid transparent;
    font-family: var(--qv-font-family-sans, system-ui, sans-serif);
    font-weight: var(--qv-font-weight-medium, 500);
    line-height: var(--qv-line-height-tight, 1.25);
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    outline: none;
    transition-property: background-color, border-color, color, box-shadow, opacity;
    transition-duration: var(--qv-motion-duration-fast, 120ms);
    transition-timing-function: var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
}
    
.icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding-block: var(--qv-spacing-xs, 4px);
}

.icon:empty {
    display: none;
}
    
.label {
    display: inline-flex;
    align-items: center;
 }

::slotted(*) {
    width: calc(1em * var(--qv-line-height-tight, 1.25));
    height: calc(1em * var(--qv-line-height-tight, 1.25));
}
`);

const sizes = css(`
${hostAttribute('size="sm"')}{
    padding-block: 0.55em;
    padding-inline: calc(2 * 0.55em);
    font-size: var(--qv-font-size-sm, 11px);
}
    
${hostAttribute('size="sm"')}${hostAttribute('icon-only')}{
    width: 2.3em;
    height: 2.3em;
    padding: 0;
}

${hostAttribute('size="md"')}{
    padding-block: 0.6em;
    padding-inline: calc(2 * 0.6em);
    font-size: var(--qv-font-size-md, 16px);
}

${hostAttribute('size="md"')}${hostAttribute('icon-only')}{
    width: 2.3em;
    height: 2.3em;
    padding: 0;
}

${hostAttribute('size="lg"')}{
    padding-block: 0.5em;
    padding-inline: calc(2 * 0.5em);
    font-size: var(--qv-font-size-lg, 26px);
}

${hostAttribute('size="lg"')}${hostAttribute('icon-only')}{
    width: 2.3em;
    height: 2.3em;
    padding: 0;
}
`)

const variant = css(`
${hostAttribute('variant="primary"')}{
    background-color: var(--qv-color-brand-primary, #0027C4);
    color: var(--qv-color-foreground-inverse, #ffffff);
}


${hostAttribute('variant="secondary"')}{
    background-color: var(--qv-color-background-muted, #f3f4f6);
    color: var(--qv-color-foreground-default, #111827);
}

${hostAttribute('variant="outline"')}{
    background-color: transparent;
    border: 2px solid;
    border-color: var(--qv-color-border-brand, #0027C4);
    color: var(--qv-color-foreground-default, #111827);
}

${hostAttribute('variant="text"')}{
    background-color: transparent;
    color: var(--qv-color-brand-primary, #0027C4);
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
        0 0 0 4px var(--qv-color-brand-primary, #0027C4);
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
    width: calc(1em * var(--qv-line-height-tight, 1.25));
    height: calc(1em * var(--qv-line-height-tight, 1.25));
    border-radius: var(--qv-radius-full, 9999px);
    border: 2px solid currentColor;
    border-top-color: transparent;
    opacity: 0.85;
    animation: qv-button-spin var(--qv-motion-duration-slow, 320ms) linear infinite; 
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