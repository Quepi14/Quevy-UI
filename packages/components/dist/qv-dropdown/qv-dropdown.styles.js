import { css, host, hostAttribute, createStyles } from '@quevy/core';
export const qvDropdownStyles = createStyles(css(`
${host()} {
    display: inline-block;
    position: relative;
    font-size: var(--qv-font-size-sm, 14px);
}    

.trigger {
    all: unset;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--qv-spacing-xs, 4px);
    min-width: 180px;
    height: var(--qv-sizing-sm, 32px);
    padding-inline: var(--qv-spacing-md, 12px);
    border: 1px solid var(--qv-color-border-default, #e5e5e5);
    border-radius: var(--qv-radius-md, 8px);
    color: var(--qv-color-foreground-default, #171717);
    cursor: pointer;
    background-color: var(--qv-color-background-surface, #fff);
    transition: border-color var(--qv-motion-duration-fast, 100ms) ease,
                box-shadow var(--qv-motion-duration-fast, 100ms) ease;
}

.trigger:hover:not(:disabled) {
    border-color: vr(--qv-color-foreground-muted, #3a3a3a);
}

.trigger:disabled {
    background-color: var(--qv-color-background-muted, #f5f5f5);
    cursor: not-allowed;
    opacity: 0.6;
}

.trigger:focus-visible {
    outline: none;
    border-color: var(--qv-color-brand-primary, #3157c7);
    box-shadow: 0 0 0 3px rgba(49, 87, 199, 0.15);
}

${hostAttribute('open')} .trigger {
    border-color: var(--qv-color-brand-primary, #3157c7);
}

.trigger .placeholder {
    color: var(--qv-color-foreground-muted, #737373);
}

.chevron {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    color: var(--qv-color-foreground-muted, #737373);
    transition: transform var(--qv-motion-duration-fast, 100ms) var(--qv-motion-easing-standard, ease); 
}

${hostAttribute('open')}  .chevron {
    transform: rotate(180deg);
    color: var(--qv-color-brand-primary, #3157c7);
}

.panel {
    position: absolute;
    display: flex;
    flex-direction: column;
    min-width: 220px;
    margin-top: var(--qv-spacing-xs, 4px);
    overflow: hidden;
    background-color: var(--qv-color-background-surface, #fff);
    border: 1px solid var(--qv-color-border-default, #e5e5e5);
    border-radius: var(--qv-radius-md, 8px);
    box-shadow: var(--qv-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1));
    z-index: var(--qv-z-index-dropdown, 1000);
}

.search-wrap {
    position: relative;
    flex-shrink: 0;
    padding: var(--qv-spacing-xs, 4px);
    border-bottom: 1px solid var(--qv-color-border-default, #e5e5e5);
}

.search-icon {
    position: absolute;
    top: 50%;
    left: cal(var(--qv-spacing-xs, 4px) + var(--qv-spacing-sm, 8px));
    transform: translateY(-50%);
    width: 14px;
    height: 14px;
    color: var(--qv-color-foreground-muted, #737373);
    pointer-events: none;
}

.search-input {
    box-sizing: border-box;
    width: 100%;
    height: var(--qv-sizing-sm, 32px);
    padding-inline-start: cal(var(--qv-spacing-sm, 8px) * 2 + 14px);
    padding-inline-end: var(--qv-spacing-sm, 8px);
    border: 1px solid transparent;
    border-radius: var(--qv-radius-sm, 4px);
    background-color: var(--qv-color-backgroudn-muted, #f5f5f5);
    font-family: inherit;
    font-size: var(--qv-font-size-sm, 14px);
    color: var(--qv-color-foreground-default, #171717);
}

.search-input:focus-visible {
    outline: none;
    border-color: var(--qv-color-brand-primary, #3157c7);
    background-color: var(--qv-color-background-surface, #fff);
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
    border-radius: var(--qv-radius-sm, 4px);
    cursor: pointer;
    color: var(--qv-color-foreground-default, #171717);
    transition: background-color var(--qv-motion-duration-fast, 100ms) ease;
}

.option:hover:not([aria-disabled="true"]) {
    background-color: var(--qv-color-background-muted, #f5f5f5);
}

.option:focus-visible {
    outline: 2px solid var(--qv-color-brand-primary, #3157c7);
    outline-offset: -2px;
}

.option[aria-selected="true"] {
    background-color: var(--qv-color-blue-50, #eff6ff);
    color: var(--qv-color-brand-primary, #3157c7);
    font-weight: var(--qv-font-weight-medium, 500);
}

.option[aria-disabled="true"] {
    opacity: 0.4;
    cursor: not-allowed;
}

input.trigger {
    curosr: text;
    font-family: inherit;
}

input.trigger::placeholder {
    color: var(--qv-color-foreground-muted, #737373);
}

.option-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.check {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    color: var(--qv-color-brand-primary, #3157c7);
}

.empty {
    padding: var(--qv-spacing-md, 12px) var(--qv-spacing-sm, 8px);
    color: var(--qv-color-foreground-muted, #737373);
    text-align: center;
    font-size: var(--qv-font-size-sm, 14px);
}
`));
//# sourceMappingURL=qv-dropdown.styles.js.map