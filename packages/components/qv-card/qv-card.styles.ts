import { css, host, hostAttribute, createStyles } from '@quevy/core';

const layout = css(`
${host()} {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: var(--qv-radius-lg, 13px);
    background-color: var(--qv-color-background-surface, #ffffff);
    color: var(--qv-color-foreground-default, #111827);
    box-sizing: border-box;
    outline: none;
    position: relative;
    border: 1px solid transparent;
    transition: border-color var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1)), box-shadow var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
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
    height: 100%; 
    object-fit: cover;
}

.header {
    display: flex;
    flex-direction: column;
    gap: var(--qv-spacing-xs, 4px);
    padding: var(--qv-spacing-lg, 24px) var(--qv-spacing-lg, 24px) var(--qv-spacing-sm, 8px);
}

.title {
    font-size: var(--qv-font-size-lg, 26px);
    font-weight: var(--qv-font-weight-semibold, 600);
    line-height: var(--qv-line-height-tight, 1.25);
}
.title.empty { display: none; }

.description {
    font-size: var(--qv-font-size-sm, 11px);
    color: var(--qv-color-foreground-muted, #6B7280);
    line-height: var(--qv-line-height-normal, 1.5);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
}
.description.empty { display: none; }

.body {
    padding: var(--qv-spacing-lg, 24px);
    flex: 1;
    font-size: var(--qv-font-size-md, 16px);
    line-height: var(--qv-line-height-normal, 1.5);
}

.body.empty {
    display: none;
}

.footer {
    display: flex;
    align-items: center;
    gap: var(--qv-spacing-sm, 8px);
    padding: 0 var(--qv-spacing-lg, 24px) var(--qv-spacing-lg, 24px);
}
.footer.empty { display: none; }
`);

const variants = css(`
${hostAttribute('variant="elevated"')} {
    box-shadow: var(--qv-shadow-md, 0 4px 6px -1px rgb(0 0 0 / 0.1));
}
${hostAttribute('variant="outlined"')} {
    border-color: var(--qv-color-border-default, #E5E7EB);
}
${hostAttribute('variant="flat"')} {
    background-color: var(--qv-color-background-muted, #F3F4F6);
}

${hostAttribute('variant="glass"')} {
    border-color: rgba(255, 255, 255, 0.35);
    box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        var(--qv-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1));
    background:
        linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.16),
            rgba(255, 255, 255, 0) 45%
        ),
        linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.35),
            rgba(0, 0, 0, 0.15)
        );
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
}
${hostAttribute('variant="glass"')} .title {
    color: var(--qv-color-foreground-inverse, #FFFFFF);
}
${hostAttribute('variant="glass"')} .description {
    color: rgba(255, 255, 255, 0.75);
}

${hostAttribute('variant="overlay"')} {
    display: grid;
    grid-template-columns: 1fr;
}

${hostAttribute('variant="overlay"')} .media,
${hostAttribute('variant="overlay"')} .header {
    grid-column: 1;
    grid-row: 1;
}

${hostAttribute('variant="overlay"')} .media {
    z-index: 0;
}

${hostAttribute('variant="overlay"')} .header {
    z-index: 1;
    justify-content: flex-end;
    padding: var(--qv-spacing-md, 16px);
    background: linear-gradient(to top, rgba(30, 58, 138, 0.95) 0%, rgba(30, 58, 138, 0.7) 45%, rgba(30, 58, 138, 0.5) 85%);
}

${hostAttribute('variant="overlay"')} .title {
    color: var(--qv-color-foreground-inverse, #FFF);
}

${hostAttribute('variant="overlay"')} .description {
    color: rgba(255, 255, 255, 0.9);
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
    border-color: var(--qv-color-brand-primary, #0027C4);
}

${hostAttribute('interactive')}:active,
${hostAttribute('href')}:active {
    box-shadow: inset 0 0 0 1px var(--qv-color-brand-primary, #0027C4);
}

${host()}:focus-visible {
    box-shadow:
        0 0 0 2px var(--qv-color-background-default, #ffffff),
        0 0 0 4px var(--qv-color-brand-primary, #0027C4);
}
`);

export const qvCardStyles = createStyles(css(layout, variants, interactive));