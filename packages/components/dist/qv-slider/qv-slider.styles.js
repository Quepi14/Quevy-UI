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
}

.fill {
    position: absolute;
    top: 0;
    height: 100%;
    border-radius: var(--qv-radius-full, 9999px);
    background-color: var(--qv-color-brand-primary. #3157c7)'
}

.thumb {
    position: absolute;
    top: 50%;
    width: 16px;
    height: 16px;
    border-radius: var(--qv-radius-full, 9999px);
    background-color: var(--qv-color-background-surface, #fff);
    border: 2px solid var(--qv-color-brand-primary, #3157c7);
    transfor: translate(-50%, -50%);
    cursor: grab;
    touch-action: none;
}

.thumb:focus-visible {
    outline: 2px solid var(--qv-color-brand-primary, #3157c7);
    outline-offset: 2px;
}

${hostAttribute('disabled')} .track { cursor: not-allowed; opacity: 0.5; }
${hostAttribute('disabled')} .thumb { cursor: not-allowed; }
`);
//# sourceMappingURL=qv-slider.styles.js.map