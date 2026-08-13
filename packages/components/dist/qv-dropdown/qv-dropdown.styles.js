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
    gap: var(--qv-spacing-sm, 8px);
    min-width: 180px;
    height: var(--qv-sizing-sm, 32px);
    padding-inline: var(--qv-spacing-md, 32px);
    border: 1px solid var(--qv-color-border-default, #e5e5e5);
    border-radius: var(--qv-radius-md, 8px);
    color: var(--qv-color-foreground-default, #171717);
    cursor: pointer;
}

.trigger:focus-visible {
    outline: 2px solid var(--qv-color-brand-primary, #2563eb);
    outline-offset: 2px;
}

.trigger:focus-visible{
    outline: 2px solid var(--qv-color-brand-primary, #2563eb);
    outline-offset: 2px;
}

.trigger .placeholder {
    color: var(--qv-color-foreground-muted, #737373);
}

.chevron {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    transition: transform var(--qv-motion-duration-fast, 100ms) var(--qv-motion-easing-standard, ease); 
}

${hostAttribute('open')}  .chevron {
    transform: rotate(180deg);
}

.panel {
    margin: 0;
    padding: var(--qv-spacing-xs, 4px);
    list-style: none;
    min-widht: 180px;
    max-height: 260px;
    overflow-y: auto;
    background-color: var(--qv-color-background-surface, #fff);
    border: 1px solid var(--qv-color-border-default, #e5e5e5);
    border-radius: var(0--qv-radius-md, 8px);
    box-shadow: var(--qv-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1));
    z-index: var(--qv-z-index-dropdown, 1000);
}

.option {
    all: unset;
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: var(--qv-spacing-xs, 4px) var(--qv-spacing-sm, 8px);
    border-radius: var(--qv-radius-sm, 4px);
    cursor: pointer;
    color: var(--qv-color-foreground-default, #171717);
}

.option:hover:not([aria-disabled="true"]) {
    background-color: var(--qv-color-background-muted, #f5f5f5);
}

.option:focus-visible {
    outline: 2px solid var(--qv-color-brand-primary, #2563eb);
    outline-offset: -2px;
}

.option[aria-selected="true"] {
    background-color: var(--qv-color-blue-50, #eff6ff);
    color: var(--qv-color-brand-primary, #2563eb);
    font-weight: var(--qv-font-weight-medium, 500);
}

.option[aria-disabled="true"] {
    opacity: 0.4;
    cursor: not-allowed;
}
`));
//# sourceMappingURL=qv-dropdown.styles.js.map