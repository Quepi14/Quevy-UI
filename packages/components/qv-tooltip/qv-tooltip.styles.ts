import { host, createStyles } from "@quevy/core";

export const qvTootltipStyles = createStyles(`
${host()} {
    display: inline-block;
    position: relative;
}    

.bubble {
    position: fixed;
    z-index: var(--qv-z-index-tooltip, 1600);
    max-width: 240px;
    padding: var(--qv-spacing-xs, 4px) var(--qv-spacing-sm, 8px);
    border-radius: var(--qv-radius-sm, 4px);
    background-color: var(--qv-color-neutral-800, #262626);
    color: var(--qv-color-foreground-inverse, #fff);
    font-size: var(--qv-font-size-xs, 12px);
    line-height: var(--qv-line-height-normal, 1.5);
    pointer-events: none;
    opacity: 0;
    transform: translateY(2px);
    transition: opacity var(--qv-motion-duration-fast, 100ms) ease, transform var(--qv-motion-duration-fast, 100ms) ease;
}

.bubble.visible {
    opacity: 1;
    transform: translateY(0);
}
`)