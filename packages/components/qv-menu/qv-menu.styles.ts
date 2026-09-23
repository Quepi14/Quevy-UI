import { css, host, createStyles } from '@quevy/core';

export const qvMenuStyles = createStyles(css(`
${host()} {
    display: inline-block;
    position: relative;
    font-size: var(--qv-font-size-sm, 11px);
}    

.trigger {
    all: unset;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.3em;
    height: 2.3em;
    border-radius: var(--qv-radius-sm, 5px);
    cursor: pointer;
    color: var(--qv-color-foreground-muted, #6B7280);
    transition: background-color var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
}

/* When a custom (non-default) trigger is slotted, e.g. navbar
    "product" text, let it size to its content instead of the fixed 
    square kebab-button dimensions. */
.trigger.has-custom-trigger {
    width: auto;
    height: auto;
    padding: var(--qv-spacing-xs, 4px) var(--qv-spacing-sm, 8px);
    color: var(--qv-color-foreground-default, #111827);
}

.trigger:hover {
    background-color: var(--qv-color-background-muted, #F3F4F6);
}

.trigger:focus-visible {
    outline: 2px solid var(--qv-color-brand-primary, #0027C4);
    outline-offset: 2px;
}

.kebab-icon {
    width: 18px;
    height: 18px;
}

.panel {
    margin: 0;
    padding: var(--qv-spacing-xs, 4px);
    list-style: none;
    min-width: 180px;
    background-color: var(--qv-color-background-surface, #F9FAFB);
    border: 1px solid var(--qv-color-border-default, #E5E7EB);
    border-radius: var(--qv-radius-md, 8px);
    box-shadow: var(--qv-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1));
    z-index: var(--qv-z-index-dropdown, 1000);
    animation: qv-menu-panel-in var(--qv-motion-duration-normal, 180ms) var(--qv-motion-easing-enter, cubic-bezier(0.16, 1, 0.3, 1));
}

.panel[closing] {
    animation: qv-menu-panel-out var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-exit, cubic-bezier(0.7, 0, 0.84, 0)) forwards;
}

.item {
    all: unset;
    display: block;
    display: flex;
    align-items: center;
    gap: var(--qv-spacing-sm, 8px);
    box-sizing: border-box;
    width: 100%;
    padding: var(--qv-spacing-xs, 4px) var(--qv-spacing-sm, 8px);
    line-height: var(--qv-line-height-tight, 1.25);
    border-radius: calc(var(--qv-radius-md, 8px) - var(--qv-spacing-xs, 4px));
    cursor: pointer;
    color: var(--qv-color-foreground-default, #111827);
    transition: background-color var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
}

.item-icon {
    display: inline-flex;
    flex-shrink: 0;
    box-sizing: content-box;
    width: calc(1em * var(--qv-line-height-tight, 1.25));
    height: calc(1em * var(--qv-line-height-tight, 1.25));
    padding-block: var(--qv-spacing-xs, 4px);
    color: var(--qv-color-foreground-muted, #6B7280);
}

.item:hover:not([aria-disabled="true"]) {
    background-color: var(--qv-color-background-muted, #f5f5f5);
}

.item:focus-visible {
    outline: 2px solid var(--qv-color-brand-primary, #0027C4);
    outline-offset: -2px;
}

.item[aria-disabled="true"] {
    opacity: 0.4;
    cursor: not-allowed;
}

@keyframes qv-menu-panel-in {
    from { opacity: 0; transform: scale(0.96) translateY(-4px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes qv-menu-panel-out {
    from { opacity: 1; transform: scale(1) translateY(0); }
    to { opacity: 0; transform: scale(0.96) translateY(-4px); }
}

@media (prefers-reduced-motion: reduce) {
    .panel { animation: none; }
}
`));