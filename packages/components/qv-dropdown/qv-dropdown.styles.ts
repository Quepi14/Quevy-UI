import { css, host, hostAttribute, createStyles } from '@quevy/core';

export const qvDropdownStyles = createStyles(css(`
${host()} {
    display: inline-block;
    position: relative;
    font-size: var(--qv-font-size-sm, 11px);
}    

.trigger {
    all: unset;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--qv-spacing-xs, 4px);
    min-width: 180px;
    line-height: 1.4;
    padding-block: 0.7em;
    padding-inline: var(--qv-spacing-md, 16px);
    border: 1px solid var(--qv-color-border-default, #E5E7EB);
    border-radius: var(--qv-radius-md, 8px);
    color: var(--qv-color-foreground-default, #111827);
    cursor: pointer;
    background-color: var(--qv-color-background-surface, #F9FAFB);
    transition: border-color var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1)),
                box-shadow var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
}

.trigger:hover:not(:disabled) {
    border-color: var(--qv-color-foreground-muted, #6B7280);
}

.trigger:disabled {
    background-color: var(--qv-color-background-muted, #f5f5f5);
    cursor: not-allowed;
    opacity: 0.6;
}

.trigger:focus-visible {
    outline: none;
    border-color: var(--qv-color-brand-primary, #0027C4);
    box-shadow: 0 0 0 3px rgba(49, 87, 199, 0.15);
}

${hostAttribute('open')} .trigger {
    border-color: var(--qv-color-brand-primary, #0027C4);
}

.trigger .placeholder {
    color: var(--qv-color-foreground-muted, #6B7280);
}

.chevron {
    width: calc(1em * 1.4);
    height: calc(1em * 1.4);
    flex-shrink: 0;
    color: var(--qv-color-foreground-muted, #6B7280);
        transition: transform var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1)); 
}

${hostAttribute('open')}  .chevron {
    transform: rotate(180deg);
    color: var(--qv-color-brand-primary, #0027C4);
}

.panel {
    position: absolute;
    display: flex;
    flex-direction: column;
    min-width: 220px;
    margin-top: var(--qv-spacing-xs, 4px);
    overflow: hidden;
    background-color: var(--qv-color-background-surface, #F9FAFB);
    border: 1px solid var(--qv-color-border-default, #E5E7EB);
    border-radius: var(--qv-radius-md, 8px);
    box-shadow: var(--qv-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1));
    z-index: var(--qv-z-index-dropdown, 1000);
    transform-origin: top center;
    aniamtion: qv-dropdown-panel-in var(--qv-motion-duration-normal, 180ms) var(--qv-motion-easing-enter, cubic-bezier(0.16, 1, 0.3, 1));
}

.panel[closing] {
    animation: qv-dropdown-panel-out var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-exit, cubic-bezier(0.7, 0, 0.84, 0)) forwards;
}

.search-wrap {
    position: relative;
    flex-shrink: 0;
    padding: var(--qv-spacing-xs, 4px);
    border-bottom: 1px solid var(--qv-color-border-default, #E5E7EB);
}

.search-icon {
    position: absolute;
    top: 50%;
    left: calc(var(--qv-spacing-xs, 4px) + var(--qv-spacing-sm, 8px));
    transform: translateY(-50%);
    width: calc(1em * 1.4);
    height: calc(1em * 1.4);
    color: var(--qv-color-foreground-muted, #6B7280);
    pointer-events: none;
}

.search-input {
    box-sizing: border-box;
    width: 100%;
    line-height: 1.4;
    padding-block: 0.7em;
    padding-inline-start: calc(var(--qv-spacing-sm, 8px) * 2 + 14px);
    padding-inline-end: var(--qv-spacing-sm, 8px);
    border: 1px solid transparent;
    border-radius: calc(var(--qv-radius-md, 8px) - var(--qv-spacing-xs, 4px));
    background-color: var(--qv-color-background-muted, #f5f5f5);
    font-family: inherit;
    font-size: var(--qv-font-size-sm, 11px);
    color: var(--qv-color-foreground-default, #111827);
}

.search-input:focus-visible {
    outline: none;
    border-color: var(--qv-color-brand-primary, #0027C4);
    background-color: var(--qv-color-background-surface, #F9FAFB);
}

.options {
    margin: 0;
    padding: var(--qv-spacing-xs, 4px);
    list-style: none;
    min-height: 240px;
    overflow-y: auto;
}

.option {
    all: unset;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--qv-spacing-sm, 8px);
    width: 100%;
    padding: var(--qv-spacing-xs, 4px) var(--qv-spacing-sm, 8px);
    line-height: var(--qv-line-height-tight, 1.25);
    border-radius: calc(var(--qv-radius-md, 8px) - var(--qv-spacing-xs, 4px));
    cursor: pointer;
    color: var(--qv-color-foreground-default, #111827);
       transition: background-color var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
}

.option:hover:not([aria-disabled="true"]) {
    background-color: var(--qv-color-background-muted, #F3F4F6);
}

.option:focus-visible {
    outline: 2px solid var(--qv-color-brand-primary, #0027C4);
    outline-offset: -2px;
}

.option[aria-selected="true"] {
    background-color: var(--qv-color-blue-50, #eff6ff);
    color: var(--qv-color-brand-primary, #0027C4);
    font-weight: var(--qv-font-weight-medium, 500);
}

.option[aria-disabled="true"] {
    opacity: 0.4;
    cursor: not-allowed;
}

input.trigger {
    cursor: text;
    font-family: inherit;
}

input.trigger::placeholder {
    color: var(--qv-color-foreground-muted, #6B7280);
}

.option-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.check {
    width: calc(1em * var(--qv-line-height-tight, 1.25));
    height: calc(1em * var(--qv-line-height-tight, 1.25));
    flex-shrink: 0;
    color: var(--qv-color-brand-primary, #0027C4);
}

.empty {
    padding: var(--qv-spacing-md, 16px) var(--qv-spacing-sm, 8px);
    color: var(--qv-color-foreground-muted, #6B7280);
    text-align: center;
    font-size: var(--qv-font-size-sm, 11px);
}

@keyframes qv-dropdown-panel-in {
    from { opacity: 0; transform: scale(0.96) translateY(-4px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes qv-dropdown-panel-out {
    from { opacity: 1; transform: scale(1) translateY(0); }
    to { opacity: 0; transform: scale(0.96) translateY(-4px); }
}

@media (prefers-reduced-motion: reduce) {
    .panel { animation: none; }
}
`));