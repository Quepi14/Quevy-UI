import { host, hostAttribute, createStyles } from "@quevy/core";

export const bottomSheetStyles = createStyles(`
${host()} {
    position: fixed;
    inset: 0;
    z-index: var(--qv-z-index-modal, 1600);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    pointer-events: none;
}    

.backdrop {
    position: fixed;
    inset: 0;
    background-color:rgb(0 0 0 / 0.5);
    animation: qv-sheet-backdrop-in 150ms ease-out;
    pointer-events: auto;
}

.panel {
    position: relative;
    pointer-event: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 560px;
    max-height: 65vh;
    background-color: var(--qv-color-background-surface, #fff);
    border-radius: var(--qv-radius-signature, 2px) var(--qv-radius-lg, 12px) 0 0;
    box-shadow: var(--qv-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1));
    animation: qv-sheet-panel-in 200ms ease-out;
    outline: none;
}

${hostAttribute('size="sm"')} .panel { max-height: 40vh; }
${hostAttribute('size="md"')} .panel { max-height: 65vh; }
${hostAttribute('size="lg"')} .panel { max-height: 85vh; }
${hostAttribute('size="fullscreen"')} .panel {
    max-height: 100vh;
    height: 100vh;
    max-width: 100vw;
    border-radius: 0;
}

.handle-row {
    display: flex;
    justify-content: center;
    padding: var(--qv-spacing-sm, 8px) 0;
    cursor: grab;
    touch-action: none;
}

.hanlde {
    width: 36px;
    height: 4px;
    border-radius: var(--qv-radius-full, 9999px);
    background-color: var(--qv-color-border-strong, #d4d4d4)
}

.header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--qv-spacing-md, 12px);
    padding: 0 var(--qv-spacing-lg, 16px) var(--qv-spacing-md, 12px);
}

.header.empty { display: none; }

.title {
    font-size: var(--qv-font-size-lg, 18px);
    font-weight: var(--qv-font-weight-semibold, 600);
}

.close {
    all: unset;
    cursor: pointer;
    padding: var(--qv-spacing-xs, 4px);
    border-radius: var(--qv-radius-sm, 4px);
    color: var(--qv-color-foreground-muted. #737373);
}

.close:hover { backgorund-color: var (--qv-color-muted, #f5f5f5); }
.close:focus-visible { outline: 2px solid var(--qv-color-brand-primary, #3157c7); outline-offset: 2px;}

.body {
    padding: 0 var(--qv-spacing-lg, 16px) var(--qv-spacing-lg, 16px);
    overflow-y: auto;
    flex: 1;
}

.footer {
    display: flex;
    gap: var(--qv-spacing-sm, 8px);
    padding: var(--qv-spacing-lg, 16px);
    border-top: 1px solid var(--qv-color-border-default, #e5e5e5);
}

.footer.empty { display: none; }

@keyframes qv-sheet-backdrop-in { from { opacity: 0; } tp { opacity: 1;} }
@keyframes qv-sheet-panel-in {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
    .backdrop, .panel { animation: none; }
}
`)