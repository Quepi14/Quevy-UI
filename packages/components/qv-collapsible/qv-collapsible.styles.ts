import { host, createStyles } from "@quevy/core";

export const qvCollapsibleStyles = createStyles(`
${host()} {
    display: block;
    border: 1px solid var(--qv-color-border-default, #E5E7EB);
    border-radius: var(--qv-radius-lg, 13px);
    overflow: hidden;
}    

.header {
    all: unset;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--qv-spacing-sm, 8px) var(--qv-spacing-lg, 24px);
    cursor: pointer;
    font-size: var(--qv-font-size-sm, 11px);
    line-height: var(--qv-line-height-tigth, 1.25);
    font-weight: var(--qv-font-weight-medium, 500);
    color: var(--qv-color-foreground-default, #111827);
}

.header:hover { background-color: var(--qv-color-background-muted, #F3F4F6); }
.header:focus-visible { outline: 2px solid var(--qv-color-brand-primary, #0027C4); outline-offset: -2px; }

.chevron {
    width: calc(1em * var(--qv-line-height-tight, 1.25));
    height: calc(1em * var(--qv-line-height-tight, 1.25));
    transition: transform var(--qv-motion-duration-fast, 100ms) ease;
    flex-shrink: 0;
}

${host('.is-open')} .chevron {
    transform: rotate(180deg);
}

.panel {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--qv-motion-duration-slow, 300ms) var(--qv-motion-easing-standard, ease);
}

${host('.is-open')} .panel { 
    grid-template-rows: 1fr;
}

.panel-inner {
    overflow: hidden;
    min-height: 0;
}

.content {
    padding: 0 var(--qv-spacing-lg, 24px) var(--qv-spacing-lg, 24px);
}

@media (prefers-reduced-motion: reduce) {
    .panel { transition: none; }
}
`);