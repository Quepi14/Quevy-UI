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
    padding: var(--qv-spacing-sm, 8px) var(--qv-spacing-md, 12px);
    border-radius: var(--qv-radius-md, 8px);
    cursor: pointer;
    color: var(--qv-color-foreground-muted, #737373);
}

.item:hover { background-color: var(--qv-color-background-muted, #f5f5f5); }
.item:focus-visible { outline: 2px solid var(--qv-color-brand-primary, #3157c7); outline-offset: -2px; }

${hostAttribute('disabled')} .item {
    cursor: not-allowed;
    opacity: 0.4;
}

${hostAttribute('active')} .item {
    color: var(--qv-color-brand-primary, #3157c7);
}

.icon {
    display: inline-flex;
    width: 16px;
    height: 16px;
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
    transition: grid-template-columns var(--qv-motion-duration-fast, 150ms) var(--qv-motion-easing-standard, ease);
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
    font-size: var(--qv-font-size-xs, 12px);
    font-weight: var(--qv-font-weight-medium, 500);
}

@media (prefers-reduced-motion: reduce) {
    .label-outer { transition: none; }
}
`);
//# sourceMappingURL=qv-navbar-item.styles.js.map