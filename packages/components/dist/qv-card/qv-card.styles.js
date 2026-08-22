/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-card styles
 * ----------------------------------------------------------
 * NOTE: the "glass" variant's translucency/blur values are
 * hardcoded — @quevy/tokens has no blur/opacity token
 * category yet. Revisit once a real design decision exists
 * for that (this is a placeholder, not a final value).
 *
 * @packageDocumentation
 */
import { css, host, hostAttribute, createStyles } from '@quevy/core';
const layout = css(`
${host()} {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: var(--qv-radius-lg, 12px);
    background-color: var(--qv-color-background-surface, #fff);
    color: var(--qv-color-foreground-default, #171717);
    box-sizing: border-box;
    outline: none;
    position: relative;
}    

.actions {
    position: absolute;
    top: var(--qv-spacing-sm, 8px);
    right: var(--qv-spacing-sm, 8px);
    z-index: 1;
}

.actions.empty {
    display: none;
}

.media.empty,
.header.empty,
.title.empty,
.description.empty,
.footer.empty{
    display: none;
}

.media ::slotted(*) {
    display: block;
    width: 100%;
    max-height: 240px;
    object-fit: cover;
}

.header {
    display: flex;
    flex-direction: column;
    gap: var(--qv-spacing-xs, 4px);
    padding: var(--qv-spacing-lg, 16px) var(--qv-spacing-lg, 16px) var(--qv-spacing-sm, 8px);
}

.title {
    font-size: var(--qv-font-size-lg, 18px);
    font-weight: var(qv-font-weight-semibold, 600);
    line-height: var(--qv-line-height-tight,  1.25);
}

.description {
    font-size: var(--qv-font-size-sm, 14px);
    color: var(--qv-color-foreground-muted, #737373);
    line-height: var(--qv-line-height-normal, 1.5);
}

.body {
    padding: var(--qv-spacing-lg, 16px);
    flex: 1;
    font-size: var(--qv-font-size-md, 16px);
    line-height: var(--qv-line-height-normal, 1.5);
}

.footer {
    display: flex;
    align-items: center;
    gap: var(--qv-spacing-sm, 8px);
    padding: 0 var(--qv-spacing-lg, 16px) var(--qv-spacing-lg, 16px);
}
`);
const variants = css(`
${hostAttribute('variant="elevated"')} {
    border: 1px solid transparent;
    box-shadow: var(--qv-shadow-md, 0 4px 6px -1px rgb(0 0 0 / 0.1));
}
    
${hostAttribute('variant="outlined"')} {
    border: 1px solid var(--qv-color-border-default, #e5e5e5);
    box-shadow: none;
}

${hostAttribute('variant="flat"')} {
    border: 1px solid transparent;
    box-shadow: none;
    background-color: var(--qv-color-background-muted,  #f5f5f5);
}

${hostAttribute('variant="glass"')} {
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow: var(--qv-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1));
    background-color: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
}
`);
const interactive = css(`
${hostAttribute('interactive')},
${hostAttribute('href')} {
    cursor: pointer;
    transition-property: transform, box-shadow, filter;
    transition-duration: var(--qv-motion-duration-fast, 100ms);
    transition-timing-function: var(--qv-motion-easing-standard, cubic-bazier(0.2, 0, 0, 1));  
}

${hostAttribute('interactive')}:hover,
${hostAttribute('href')}:hover {
    filter: brightness(0.98);
}

${hostAttribute('interactive')}:active,
${hostAttribute('href')}:active {
    transform: scale(0.99);
}

${host()}:focus-visible {
    box-shadow:
        0 0 0 2px var(--qv-color-background-default, #fff),
        0 0 0 4px var(--qv-color-brand-primary, #3157c7);
}
`);
export const qvCardStyles = createStyles(css(layout, variants, interactive));
//# sourceMappingURL=qv-card.styles.js.map