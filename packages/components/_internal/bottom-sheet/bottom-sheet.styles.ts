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
    animation: qv-sheet-backdrop-in var(--qv-motion-duration-normal, 180ms) var(--qv-motion-easing-enter, cubic-bezier(0.16, 1, 0.3, 1));
    pointer-events: auto;
}

.backdrop[closing] {
    animation: qv-sheet-backdrop-out var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-exit, cubic-bezier(0.7, 0, 0.84, 0)) forwards;
}

.panel {
    position: relative;
    pointer-events: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 560px;
    max-height: 65vh;
    background-color: var(--qv-color-background-surface, #F9FAFB);
    border-radius: var(--qv-radius-lg, 13px) var(--qv-radius-lg, 13px) 0 0;
    box-shadow: var(--qv-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1));
    animation: qv-sheet-panel-in var(--qv-motion-duration-normal, 180ms) var(--qv-motion-easing-enter, cubic-bezier(0.16, 1, 0.3, 1));
    outline: none;
}

.panel[closing] {
    animation: qv-sheet-panel-out var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-exit, cubic-bezier(0.7, 0, 0.84, 0)) forwards;
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

.handle {
    width: 36px;
    height: 4px;
    border-radius: var(--qv-radius-full, 9999px);
    background-color: var(--qv-color-border-strong, #D1D5DB)
}

.header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--qv-spacing-md, 16px);
    padding: 0 var(--qv-spacing-lg, 24px) var(--qv-spacing-md, 16px);
}

.header.empty { display: none; }

.title {
    font-size: var(--qv-font-size-lg, 26px);
    font-weight: var(--qv-font-weight-semibold, 600);
}

.close {
    all: unset;
    cursor: pointer;
    padding: var(--qv-spacing-xs, 4px);
    border-radius: var(--qv-radius-sm, 5px);
    color: var(--qv-color-foreground-muted. #737373);
}

.close:hover { background-color: var(--qv-color-background-muted, #F3F4F6); }
.close:focus-visible { outline: 2px solid var(--qv-color-brand-primary, #0027C4); outline-offset: 2px;}

.body {
    padding: 0 var(--qv-spacing-lg, 24px) var(--qv-spacing-lg, 24px);
    overflow-y: auto;
    flex: 1;
}

.footer {
    display: flex;
    gap: var(--qv-spacing-sm, 8px);
    padding: var(--qv-spacing-lg, 24px);
    border-top: 1px solid var(--qv-color-border-default, #E5E7EB);
}

.footer.empty { display: none; }

@keyframes qv-sheet-backdrop-in { from { opacity: 0; } to { opacity: 1;} }

@keyframes qv-sheet-backdrop-out { from { opacity: 1; } to { opacity: 0; } }

@keyframes qv-sheet-panel-in {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
}

@keyframes qv-sheet-panel-out {
    from { transform: translateY(0); }
    to { transform: translateY(100%); }
}

@media (prefers-reduced-motion: reduce) {
    .backdrop, .panel { animation: none; }
}
`)