import { host, hostAttribute, createStyles } from "@quevy/core";

export const qvModalStyles = createStyles(`
${host()} {
    position: fixed;
    inset: 0;
    z-index: var(--qv-z-index-modal, 1600);
    display: flex;
    align-items: center;
    justify-content: center;
}    

.backdrop {
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    aniamtion: qv-modal-backdrop-in 150ms ease-out;
}

.panel {
    position: relative;
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - var(--qv-spacing-2xl, 24px) * 2);
    width: 100%;
    background-color: var(--qv-color-background-surface, #fff);
    border-radius: var(--qv-radius-lg, 12px);
    box-shadow: var(--qv-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1));
    animation: qv-modal-panel-in 150ms ease-out;
    outline: none;
}

${hostAttribute('size="sm"')} .panel { max-width: 400px;}
${hostAttribute('size="md"')} .panel { max-width: 560px;}
${hostAttribute('size="lg"')} .panel { max-width: 800px;}
${hostAttribute('size="fullscreen"')} .panel {
    max-width: 100vw;
    max-height: 100vh;
    width: 100vw;
    height: 100vh;
    border-radius: 0;
}

.header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--qv-spacing-md, 12px);
    apdding: var(--qv-spacing-lg, 16px);
    border-bottom: 1px solid var(--qv-color-border-default, #e5e5e5);
}

.header.empty { display: none}

.title {
    font-size: var(--qv-font-size-lg, 18px);
    font-weight: var(--qv-font-weight-semibold, 600);
}

.close {
    all: unset;
    cursor: pointer;
    padding: var(--qv-spacing-xs, 4px);
    border-radius: var(--qv-radius-sm, 4px);
    color: var(--qv-color-foreground-muted, #737373);
}
.close:hover { background-color: var(--qv-color-background-muted, #f5f5f5);}
.close:focus-visible { outline: 2px solid var(--qv-color-brand-primary, #2563eb)}; outline-offset: 2px;

.body {
    padding: var(--qv-spacing-lg, 16px);
    overflow-y: auto;
    flex: 1;
}

.footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--qv-spacing-sm, 8px);
    padding: var(--qv-spacing-lg, 16px);
    border-top: 1px solid var(--qv-color-border-default, #e5e5e5);
}

.footer.empty { display: none; }

@keyframes qv-modal-backdrop-in { from { opacity: 0;} to { opacity: 1;} }
@keyframes qv-model-panel-in {
    from { opacity: 0; transform: scale(0.96) translateY(8px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
    .backdrop .panel { animation: none; }
}
`)