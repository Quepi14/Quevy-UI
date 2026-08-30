import { css, host, hostAttribute, createStyles } from '@quevy/core';
const layout = css(`
${host()} {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: var(--qv-radius-lg, 12px);
    background-color: var(--qv-color-background-surface, #ffffff);
    color: var(--qv-color-foreground-default, #171717);
    box-sizing: border-box;
    outline: none;
    position: relative;
    border: 1px solid transparent;
}

.actions {
    position: absolute;
    top: var(--qv-spacing-sm, 8px);
    right: var(--qv-spacing-sm, 8px);
    z-index: 2;
}
.actions.empty { display: none; }

.media { 
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
}
.media.empty { display: none; }
.media ::slotted(*) {
    display: block;
    width: 100%; 
    max-height: 100%; 
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
    font-weight: var(--qv-font-weight-semibold, 600);
    line-height: var(--qv-line-height-tight, 1.25);
}
.title.empty { display: none; }

.description {
    font-size: var(--qv-font-size-sm, 14px);
    color: var(--qv-color-foreground-muted, #737373);
    line-height: var(--qv-line-height-normal, 1.5);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
}
.description.empty { display: none; }

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
.footer.empty { display: none; }
`);
const variants = css(`
${hostAttribute('variant="elevated"')} {
    box-shadow: var(--qv-shadow-md, 0 4px 6px -1px rgb(0 0 0 / 0.1));
}
${hostAttribute('variant="outlined"')} {
    border-color: var(--qv-color-border-default, #e5e5e5);
}
${hostAttribute('variant="flat"')} {
    background-color: var(--qv-color-background-muted, #f5f5f5);
}
${hostAttribute('variant="glass"')} {
    border-color: rgba(255, 255, 255, 0.35);
    box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        var(--qv-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1));
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.18),
        rgba(255, 255, 255, 0.06)
    );
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
}
`);
// Interactive hover/active feedback uses ONLY border-color and
// box-shadow — deliberately never filter/transform. Both of
// those create a new CSS containing block for any
// position:fixed descendant (e.g. an open qv-menu/qv-dropdown
// panel nested via the actions slot), which silently breaks
// its fixed positioning relative to the viewport. Ruling this
// out structurally, not just patching one symptom of it.
const interactive = css(`
${hostAttribute('interactive')},
${hostAttribute('href')} {
    cursor: pointer;
}

${hostAttribute('interactive')}:hover,
${hostAttribute('href')}:hover {
    border-color: var(--qv-color-brand-primary, #3157C7);
}

${hostAttribute('interactive')}:active,
${hostAttribute('href')}:active {
    box-shadow: inset 0 0 0 1px var(--qv-color-brand-primary, #3157C7);
}

${host()}:focus-visible {
    box-shadow:
        0 0 0 2px var(--qv-color-background-default, #ffffff),
        0 0 0 4px var(--qv-color-brand-primary, #3157C7);
}
`);
export const qvCardStyles = createStyles(css(layout, variants, interactive));
//# sourceMappingURL=qv-card.styles.js.map