import { host, hostAttribute, createStyles } from "@quevy/core";

export const qvCollapsibleStyles = createStyles(`
${host()} {
    display: block;
    border: 1px solid var(--qv-color-border-default, #e5e5e5);
    border-radius: var(--qv-radius-lg, 12px);
    overflow: hidden;
}    

.header {
    all: unset;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--qv-spacing-sm, 8px) var(--qv-spacing-lg, 16px);
    cursor: pointer;
    font-size: var(---qv-font-size-sm, 14px);
    font-weight: var(--qv-font-weight-medium, 500);
    color: var(--qv-color-foreground-default, #171717);
}

.header:hover { background-color: var(--qv-color-background-muted, #f5f5f5); }
.header:focus-visible { outline: 2px solid var(--qv-color-brand-primary, #3157C7); outline-offset: -2px; }

.chevron {
    width: 16px;
    height: 16px;
    transition: transform var(--qv-motion-duration-fast, 100ms) ease;
    flex-shrink: 0;
}

${hostAttribute('open')} .chevron {
    transform: rotate(180deg);
}

.panel {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--qv-motion-duration-slow, 300ms) var(--qv-motion-easing-standard, ease);
}

${hostAttribute('open')} .panel { 
    grid-template-rows: 1fr;
}

.panel-inner {
    overflow: hidden;
    min-height: 0;
}

.content {
    padding: 0 var(--qv-spacing-lg, 16px) var(--spacing-lg, 16px);
}

@media (prefers-reduced-motion: reduce) {
    .panel { transition: none; }
}
`);