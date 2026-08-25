import { css, host, createStyles } from '@quevy/core';
export const qvButtonGroupStyles = createStyles(`
${host()} {
    display: block;
    width: 100%;
}

.group {
    display: flex;
    width: 100%;
    align-items: stretch;
}

::slotted(qv-button) {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
    min-width: 0;
    align-self: stretch;
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
//# sourceMappingURL=qv-button-group.styles.js.map