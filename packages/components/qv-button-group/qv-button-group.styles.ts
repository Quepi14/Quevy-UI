import { host, createStyles } from "@quevy/core";

export const qvButtonGroupStyles = createStyles(`
${host()} {
    display: inline-flex;
    width: 100%;
}    

::slotted(qv-button) {
    flex: 1 1 0;
    min-width: 0;
    border-radius: 0 !important;
}

::slotted(qv-button:not(:last-child)) {
    border-inline-end: none;
}

::slotted(qv-button:first-child) {
    border-start-start-radius: var(--qv-radius-sm, 4px) !important;
    border-end-start-radius: var(--qv-radius-sm, 4px) !important;
}

::slotted(qv-button:last-child) {
    border-start-end-radius: var(--qv-radius-sm, 4px) !important;
    border-end-end-radius: var(--qv-radius-sm, 4px) !important;
}
`);