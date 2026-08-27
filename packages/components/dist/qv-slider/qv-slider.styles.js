import { host, hostAttribute, createStyles } from "@quevy/core";
export const qvSliderStyles = createStyles(`
${host()} {
    display: block;
    padding: var(--qv-spacing-sm, 8px) 0;
}    

.track {
    position: relative;
    height: 4px;
    border-radius: var(--qv-radius-full, 9999px);
    background-color: var(--qv-color-background-muted, #e5e5e5);
    cursor: pointer;
    touch-action: none;
}

.fill {
    position: absolute;
    top: 0;
    height: 100%;
    border-radius: var(--qv-radius-full, 9999px);
    background-color: var(--qv-color-brand-primary, #3157c7);
}

.thumb {
    position: absolute;
    top: 50%;
    width: 16px;
    height: 16px;
    border-radius: var(--qv-radius-full, 9999px);
    background-color: var(--qv-color-background-surface, #fff);
    border: 2px solid var(--qv-color-brand-primary, #3157c7);
    transform: translate(-50%, -50%);
    cursor: grab;
    touch-action: none;
}

.thumb:focus-visible {
    outline: 2px solid var(--qv-color-brand-primary, #3157c7);
    outline-offset: 2px;
}

${hostAttribute('disabled')} .track { cursor: not-allowed; opacity: 0.5; }
${hostAttribute('disabled')} .thumb { cursor: not-allowed; }

.label-side {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    font-size: var(--qv-font-size-sm, 14px);
    color: var(--qv-color-foreground-default, #171717);
}

:host([label-position="side"]) {
    display: flex;
    align-items: center;
    gap: var(--qv-spacing-sm, 8px);
}

:host([label-position="side"]) .track {
    flex: 1;
}

.label-floating {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translate(-50%, -8px);
    padding: 2px 8px;
    border-radius: var(--qv-radius-sm, 4px);
    background-color: var(--qv-color-neutral-800, #262626);
    color: var(--qv-color-foreground-inverse, #fff);
    font-size: var(--qv-font-size-xs, 12px);
    white-space: nowrap;
    opacity: 0;
    transition: opacity var(--qv-motion-duration-fast, 100ms) ease;
    pointer-events: none;
}

.thumb:hover .label-floating,
.thumb:focus-visible .label-floating,
.thumb.dragging .label-floating {
    opacity: 1;
}
`);
//# sourceMappingURL=qv-slider.styles.js.map