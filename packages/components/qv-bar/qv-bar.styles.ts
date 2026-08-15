import { host, hostAttribute, createStyles } from "@quevy/core";

export const qvBarStyles = createStyles(`
${host()} {
    display: flex;
    align-items: center;
    gap: var(--qv-spacing-md, 12px);
    padding: var(--qv-spacing-sm, 8px) var(--qv-spacing-lg, 16px);
    background-color: var(--qv-color-background-surface, #fff);
    box-sizing: border-box;
    z-index: var(--qv-z-index-sticky, 1100);
}    

/* Horizontal bars: topbar / navbar / footbar */
${hostAttribute('position="top"')},
${hostAttribute('position="bottom"')} {
    flex-direction: row;
    width: 100%;
}

${hostAttribute('position="top"')} { border-bottom: 1px solid var(--qv-color-border-default, #e5e5e5); }
${hostAttribute('position="bottom"')} { border-top: 1px solid var(--qv-color-border-default, #e5e5e5); }

/* Vertical bars: sidebar */
${hostAttribute('positoin:"left"')},
${hostAttribute('positoin:"right"')} {
    flex-direction: column;
    align-items: stretch;
    height: 100%;
    width: 240px;
}

${hostAttribute('position="left"')} { border-right: 1px solid var(--qv-color-border-default, #e5e5e5); }
${hostAttribute('position="right"')} { border-left: 1px solid var(--qv-color-border-default, #e5e5e5); }

/* Sticky, per edge */
${hostAttribute('sticky')}[position="top"]    { position: sticky; top: 0; }
${hostAttribute('sticky')}[position="bottom"] { position: sticky; bottom: 0; }
${hostAttribute('sticky')}[position="left"]   { position: sticky; top: 0; }
${hostAttribute('sticky')}[position="right"]  { position: sticky; top: 0; }

/* Slot regions — flex children directly, orientation follows host's own flex-direction */
::slotted([slot="start"]) { flex: 0 0 auto; }
::slotted([slot="end"]) { flex: 0 0 auto; }
::slotted([slot="center"]) {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    min-width: 0;
    min-height: 0;
}

${hostAttribute('position="top"')} ::slotted([slot="end"]),
${hostAttribute('position="bottom"')} ::slotted([slot="end"]) {
    margin-inline-start: auto;
}
${hostAttribute('position="left"')} ::slotted([slot="end"]),
${hostAttribute('position="right"')} ::slotted([slot="end"]) {
    margin-block-start: auto;
}
`);