import { host, hostAttribute, createStyles } from "@quevy/core";

export const qvNavbarItemStyles = createStyles(`
${host()} {
    display: inline-flex;
}    

.item {
    all: unset;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    gap: var(--qv-spacing-xs, 4px);
    padding: var(--qv-spacing-sm, 8px) var(--qv-spacing-md, 16px);
    border-radius: var(--qv-radius-md, 8px);
    cursor: pointer;
    color: var(--qv-color-foreground-muted, #6B7280);
    font-size: var(--qv-font-size-xs, 10px);
    line-height: var(--qv-line-height-tight, 1.25);
}

.item:hover { background-color: var(--qv-color-background-muted, #F3F4F6); }
.item:focus-visible { outline: 2px solid var(--qv-color-brand-primary, #0027C4); outline-offset: -2px; }

${hostAttribute('disabled')} .item {
    cursor: not-allowed;
    opacity: 0.4;
}

${hostAttribute('active')} .item {
    color: var(--qv-color-brand-primary, #0027C4);
}

.icon {
    display: inline-flex;
    box-sizing: content-box;
    width: calc(1em * var(--qv-line-height-tight, 1.25));
    height: calc(1em * var(--qv-line-height-tight, 1.25));
    padding-block: var(--qv-spacing-xs, 4px);
    flex-shrink: 0;
}

.icon ::slotted(*) {
    width: 100%;
    height: 100%;
}

/* label reveal without JS measurement - same 0fr/1fr trick as
    qv-collapsible's panel, just horizontal instead of vertical.*/
.label-outer {
    display: grid;
    grid-template-columns: 0fr;
    transition: grid-template-columns var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
}

${hostAttribute('active')} .label-outer {
    grid-template-columns: 1fr;
}

.label-inner {
    display: flex;
    align-items: center;
    overflow: hidden;
    min-width: 0;
    white-space: nowrap;
}

.label {
    font-size: var(--qv-font-size-xs, 10px);
    font-weight: var(--qv-font-weight-medium, 500);
}

@media (prefers-reduced-motion: reduce) {
    .label-outer { transition: none; }
}
`);