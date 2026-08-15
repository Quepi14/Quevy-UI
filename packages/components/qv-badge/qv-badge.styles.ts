import { host, hostAttribute, createStyles } from "@quevy/core";

export const qvBadgeStyles = createStyles(`
${host()} {
    position: relative;
    display: inline-flex;
}    

.indicator {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 10px;
    height: 18px;
    padding: 0 var(--qv-spacing-xs, 4px);
    border-radius: var(--qv-radius-full, 9999px);
    background-color: var(--qv-color-brand-primary, #3157c7);
    color: var(--qv-color-foreground-inverse, #fff);
    font-size: 11px;
    line-weight: var(--qv-font-weight-semibold, 600);
    line-height: 1;
    box-sizing: border-box;
}

${hostAttribute('variant="success"')} .indicator { background-color: var(--qv-color-status-success, #16a34a); }
${hostAttribute('variant="warning"')} .indicator { background-color: var(--qv-color-yellow-600, #ca8a04); }
${hostAttribute('variant="error"')} .indicator { background-color: var(--qv-color-status-error, #dc2626); }

${hostAttribute('dot')} .indicator {
    mind-width: 8px;
    width: 8px;
    height: 8px;
    padding: 0;
}

/* Standalone mode: no wrapped content, indicator sits inline normally */
${hostAttribute('standalone')} .indicator {
    position: static;
}

/* Overlap mode: wraps slotted content, indicator floats at corner */
.indicator:not([data-standalone]) {
    position: absolute;
    top: -4px;
    right: -4px;
    border: 2px solid var(--qv-color-background-surface, #fff);
    transform: translate(0, 0);
}
`);