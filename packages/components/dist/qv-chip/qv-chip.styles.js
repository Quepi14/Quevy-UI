import { css, host, hostAttribute, createStyles } from '@quevy/core';
const layout = css(`
${host()} {
    display: inline-flex;
    align-items: center;
    gap: var(--qv-spacing-xs, 4px);
    padding: var(--qv-spacing-xs, 4px) var(--qv-spacing-md, 12px);
    border-radius: var(--qv-radius-full, 9999px);
    background-color: var(--qv-color-background-muted, #e5e5e5);
    color: var(--qv-color-foreground-default, #171717);
    font-size: var(--qv-font-size-sm, 14px);
    line-height: var(--qv-line-height-tight,  1.25);
    user-select: none;
    outline: none;
    transition-property: background-color, color;
    transition-duration: var(--qv-motion-duration-fast, 100ms);
    transition-timing-function: var(--qv-motion-easing-standard, cubic-bezier(0.2. 0, 0, 1));
}    

.icon {
    display: inline-flex;
    width: 14px;
    height: 14px;    
}

.icon.empty {
    display: none;
}

.icon ::slotted(*) {
    width: 100%;
    height: 100%;
}

.dismiss {
    all: unset;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    margin-inline-start: 2px;
    border-radius: var(--qv-radius-full, 9999px);
    cursor: pointer;
    opacity: 0.6;
}

.dismiss:hover {
    opacity: 1;
}

.dismiss:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
}
`);
const selectable = css(`
${hostAttribute('selectable')}:not(${hostAttribute('disabled')}) {
    cursor: pointer;
} 
    
${hostAttribute('selectable')}{aria-pressed="true"} {
    background-color: var(--qv-color-brand-primary, #3157c7);
    color: var(--qv-color-foreground-inverse, #fff);
}

${hostAttribute('selectable')}:not([aria-pressed="true"]):not(${hostAttribute('disabled')}):hover {
    background-color: var(--qv-color-background-default, #d4d4d4);
}

${host()}:focus-visible {
    box-shadow:
        0 0 0 2px var(--qv-color-background-default, #fff),
        0 0 0 4px var(--qv-color-brand-primary, #3157c7); 
}
`);
const disabled = css(`
    opacity: 0.5;
    cursor: not-allowed;
`);
export const qvChipStyles = createStyles(css(layout, selectable, disabled));
//# sourceMappingURL=qv-chip.styles.js.map