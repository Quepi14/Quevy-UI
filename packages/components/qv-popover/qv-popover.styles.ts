import { css, host, hostAttribute, createStyles} from '@quevy/core';

export const qvPopoverStyles = createStyles(css(`
${host()} {
    display: inline-block;
    position: relative;
    font-size: var(--qv-font-size-sm, 12px);
}    

.trigger {
    all: unset;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
}

.trigger:focus-visible {
    outline: 2px solid var(--qv-color-brand-primary, #0027C4);
    outline-offset: 2px;
    border-radius: var(--qv-radius-sm, 5px);
}

.trigger ::slotted(*) {
    all: unset;
    display: inline-flex;
    align-items: center;
    gap: var(--qv-spacing-xs, 4px);
    font: inherit;
    color: inherit;
    cursor: pointer;
}

${hostAttribute('disabled')} .trigger {
    cursor: not-allowed;
    opacity: 0.5;
}

.panel {
    min-width: 220px;
    max-width: 360px;
    padding: var(--qv-spacing-md, 16px);
    box-sizing: border-box;
    background-color: var(--qv-color-background-surface, #F9FAFB);
    border: 1px solid var(--qv-color-border-default, #E5E7EB);
    border-radius: var(--qv-radius-lg, 13px);
    box-shadow: var(--qv-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1));
    color: var(--qv-color-foreground-default, #111827);
    z-index: var(--qv-z-index-dropdown, 1000);
    animation: qv-popover-panel-in var(--qv-motion-duration-normal, 180ms) var(--qv-motion-easing-enter, cubic-bezier(0.16, 1, 0.3, 1));
}

.panel[closing] {
    animation: qv-popover-panel-out var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-exit, cubic-bezier(0.7, 0, 0.84, 0)) forwards;
}

@keyframes qv-popover-panel-in {
    from {opacity: 0; transform: scale(0.96) translateY(-4px); }
    to {opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes qv-popover-panel-out {
    from {opacity: 1; transform: scale(1) translateY(0); }
    to {opacity: 0; transform: scale(0.96) translateY(-4px); }
}

@media (prefers-reduced-motion: reduce) {
    .panel {animation: none; }
}
`));