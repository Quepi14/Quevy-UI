import { host, hostAttribute, createStyles } from "@quevy/core";

export const sideSheetStyles = createStyles(`
${host()} {
    position: fixed;
    inset: 0;
    z-index: var(--qv-z-index-modal, 1600);
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    pointer-events: none;
}    

${hostAttribute('side="right"')} {
    justify-content: flex-end;
}

.backdrop {
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 /0.5);
    animation: qv-sheet-backdrop-in var(--qv-motion-duration-normal, 180ms) var(--qv-motion-easing-enter, cubic-bezier(0.16, 1, 0.3, 1));
    pointer-events: auto;
}

.backdrop[closing] {
    animation: qv-sheet-backdrop-out var(--qv-motion-duration-normal, 180ms) var(--qv-motion-easing-exit, cubic-bezier(0.7, 0, 0.84, 0)) forwards;
}

.panel {
    position: relative;
    pointer-events: auto;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    max-width: 400px;
    background-color: var(--qv-color-background-surface, #F9FAFB);
    box-shadow: var(--qv-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1));
    outline: none;
}

${hostAttribute('side="left"')} .panel {
    border-radius: 0 var(--qv-radius-lg, 13px) var(--qv-radius-lg, 13px) 0;
    animation: qv-sheet-panel-in-left var(--qv-motion-duration-normal, 180ms) var(--qv-motion-easing-enter, cubic-bezier(0.16, 1, 0.3, 1));
}

${hostAttribute('side="left"')} .panel[closing] {
    animation: qv-sheet-panel-out-left var(--qv-motion-duration-normal, 180ms) var(--qv-motion-easing-exit, cubic-bezier(0.7, 0, 0.84, 0)) forwards;
}

${hostAttribute('side="right"')} .panel {
    border-radius: var(--qv-radius-lg, 13px) 0 0  var(--qv-radius-lg, 13px);
    animation: qv-sheet-panel-in-right var(--qv-motion-duration-normal, 180ms) var(--qv-motion-easing-enter, cubic-bezier(0.16, 1, 0.3, 1));
}

${hostAttribute('side="right"')} .panel[closing] {
    animation: qv-sheet-panel-out-right var(--qv-motion-duration-normal, 180ms) var(--qv-motion-easing-exit, cubic-bezier(0.7, 0, 0.84, 0)) forwars;
}

${hostAttribute('size="sm"')} .panel { max-width: 320px; }
${hostAttribute('size="md"')} .panel { max-width: 400px; }
${hostAttribute('size="lg"')} .panel { max-width: 560px; }
${hostAttribute('size="fullscreen"')} .panel {
    max-width: 100vw;
    width: 100vw;
    border-radius: 0;
}

.header {
    display: flex;
    align-items: flex-start;
    justify-content: space-betweem;
    gap: var(--qv-spacing-md, 16px);
    padding: var(--qv-spacing-lg, 24px) var(--qv-spacing-lg, 24px) var(--qv-spacing-md, 16px);
}

.header.empty {display: none; }

.title {
    font-size: var(--qv-font-size-lg, 26px);
    font-weight: var(--qv-font-weight-semibold, 600);
}

.close {
    all: unset;
    cursor: pointer;
    padding: var(--qv-spacing-xs, 4px);
    border-radius: var(--qv-radius-sm, 5px);
    color: var(--qv-color-foreground-muted, #737373);
    transition: background-color var(--qv-motion-duration-normal, 180ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
}

.close:hover { background-color: var(--qv-color-background-muted, #F3F4F6); }
.close:foucus-visible { outline: 2px solid var(--qv-color-brand-primary, #0027C4); outline-offset: 2px; }

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

@keyframes qv-sheet-backdrop-in { from { opacity: 0; } to { opacity: 1; } }

@keyframes qv-sheet-backdrop-out { from { opacity: 1; } to { opacity: 0; } }

@keyframes qv-sheet-panel-in-left {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
}

@keyframes qv-sheet-panel-out-left {
    from { transform: translateX(0); }
    to { transform: translateX(-100%); }
}

@keyframes qv-sheet-panel-in-right {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
}

@keyframes qv-sheet-panel-out-right {
    from { transform: translateX(0); }
    to { transform: translateX(100%); }
}

@media (prefers-reduced-motion: reduce) {
    .backdrop, .panel { animation: none; }
}
`)