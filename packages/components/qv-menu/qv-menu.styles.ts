import { css, host, createStyles } from '@quevy/core';

export const qvMenuStyles = createStyles(css(`
${host()} {
    display: inline-block;
    position: relative;
    font-size: var(--qv-font-size-sm, 14px);
}    

.trigger {
    all: unset;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--qv-sizing-sm, 32px);
    height: var(--qv-sizing-sm, 32px);
    border-radius: var(--qv-radius-sm, 4px);
    cursor: pointer;
    color: var(--qv-color-foreground-muted, #737373);
}

/* When a custom (non-default) trigger is slotted, e.g. navbar
    "product" text, let it size to its content instead of the fixed 
    square kebab-button dimensions. */
.trigger.has-custom-trigger {
    width: auto;
    height: auto;
    padding: var(--qv-spacing-xs, 4px) var(--qv-spacing-sm, 8px);
    color: var(--qv-color-foreground-default, #171717);
}

.trigger:hover {
    background-color: var(--qv-color-background-muted, #f5f5f5);
}

.trigger:focus-visible {
    outline: 2px solid var(--qv-color-brand-primary, #3157c7);
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
    background-color: var(--qv-color-background-surface, #fff);
    border: 1px solid var(--qv-color-border-default, #e5e5e5);
    border-radius: var(--qv-radius-md, 8px);
    box-shadow: var(--qv-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1));
    z-index: var(--qv-z-index-dropdown, 1000);
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
    border-radius: var(--qv-radius-sm, 4px);
    cursor: pointer;
    color: var(--qv-color-foreground-default, #171717);
}

.item-icon {
    display: inline-flex;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    color: var(--qv-color-foreground-muted, #737373);
}

.item:hover:not([aria-disabled="true"]) {
    background-color: var(--qv-color-background-muted, #f5f5f5);
}

.item:focus-visible {
    outline: 2px solid var(--qv-color-brand-primary, #3157c7);
    outline-offset: -2px;
}

.item[aria-disabled="true"] {
    opacity: 0.4;
    cursor: not-allowed;
}
`));