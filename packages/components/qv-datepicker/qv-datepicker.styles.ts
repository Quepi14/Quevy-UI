import { host, createStyles } from "@quevy/core";

export const qvDatePickerStyles = createStyles(`
${host()} {
    display: inline-block;
    position: relative;
    font-size: var(--qv-font-size-sm, 14px);
}    

.trigger {
    all: unset;
    display: inline-flex;
    align-items: center;
    gap: var(--qv-spacing-sm, 8px);
    min-width: 200px;
    height: var(--qv-sizing-sm, 32px);
    padding-inline: var(--qv-spacing-md, 12px);
    border: 1px solid var(--qv-color-border-default, #e5e5e5);
    border-radius: var(--qv-radius-md, 8px);
    cursor: pointer;
    color: var(--qv-color-foreground-default, #171717);
}

.trigger:hover { border-color: var(--qv-color-neutral-400, #3a3a3a); }

.trigger:focus-visible {
    outline: 2px solid var(--qv-color-brand-primary, #3157c7);
    outline-offset: 2px;
}

.trigger .icon {
    display: inline-flex;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    color: var(--qv-color-foreground-muted, #737373);
}

.trigger .placeholder{
    color: var(--qv-color-foreground-muted, #737373);
}

qv-calendar {
    position: fixed;
    z-index: var(--qv-z-index-dropdown, 1000);
}
`)