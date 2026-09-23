import { host, hostAttribute, createStyles } from "@quevy/core";

export const qvSwitchStyles = createStyles(`
${host()} {
    display: inline-flex;
    align-items: center;
    gap: var(--qv-spacing-sm, 8px);
    cursor: pointer;
    font-size: var(--qv-font-size-sm, 11px);
    color: var(--qv-color-foreground-default, #111827);
    outline: none;
}    

.track {
    box-sizing: border-box;
    position: relative;
    width: 36px;
    height: 20px;
    flex-shrink: 0;
    border-radius: var(--qv-radius-full, 9999px);
    background-color: var(--qv-color-background-muted, #F3F4F6);
    transition: background-color var(--qv-motion-duration-fast, 100ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
}

.thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: var(--qv-radius-full, 9999px);
    background-color: var(--qv-color-background-surface, #F9FAFB);
    transition: transform var(--qv-motion-duration-fast, 100ms) var(--qv-motion-easing-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
}

${host()}:focus-visible .track {
    outline: 2px solid var(--qv-color-brand-primary, #0027C4);
    outline-offset: 2px;
}

${hostAttribute('checked')} .track { background-color: var(--qv-color-brand-primary, #0027C4); }
${hostAttribute('checked')} .thumb { transform: translateX(16px); }

${hostAttribute('disabled')} { opacity: 0.5; cursor: not-allowed; }
`);