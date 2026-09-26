import { host, hostAttribute, createStyles } from "@quevy/core";

export const qvModalStyles = createStyles(`
${host()} {
    position: fixed;
    inset: 0;
    z-index: var(--qv-z-index-modal, 1300);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
}    

${hostAttribute('open')} {
    pointer-events: auto;
}

.backdrop {
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    animation: qv-modal-backdrop-in var(--qv-motion-duration-normal, 180ms) var(--qv-motion-easing-enter, cubic-bezier(0.16, 1, 0.3, 1));
}

.backdrop[closing] {
    animation: qv-modal-backdrop-out var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-exit, cubic-bezier(0.7, 0, 0.84, 0)) forwards;
}

.panel {
    position: relative;
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - var(--qv-spacing-2xl, 40px) * 2);
    width: 100%;
    background-color: var(--qv-color-background-surface, #F9FAFB);
    border-radius: var(--qv-radius-lg, 13px);
    box-shadow: var(--qv-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1));
    animation: qv-modal-panel-in var(--qv-motion-duration-normal, 180ms) var(--qv-motion-easing-enter, cubic-bezier(0.16, 1, 0.3, 1));
    outline: none;
}

.panel[closing] {
    animation: qv-modal-panel-out var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-exit, cubic-bezier(0.7, 0, 0.84, 0)) forwards;
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
    gap: var(--qv-spacing-md, 16px);
    padding: var(--qv-spacing-lg, 24px) var(--qv-spacing-lg, 24px) var(--qv-spacing-md, 16px);
    background-color: var(--qv-color-brand-primary, #0027C4);
    border-radius: var(--qv-radius-lg, 13px) var(--qv-radius-lg, 13px) 0 0;
}

.header.empty { display: none}

.header ::slotted(*) {
    font-size: var(--qv-font-size-lg, 26px);
    font-weight: var(--qv-font-weight-semibold, 600);
    color: #fff;
}

.close {
    all: unset;
    cursor: pointer;
    padding: var(--qv-spacing-xs, 4px);
    border-radius: var(--qv-radius-sm, 5px);
    color: #fff;
    transition: background-color var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
}
.close:hover { background-color: rgb(255 255 255 / 0.15);}
.close:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }

.body {
    padding: var(--qv-spacing-lg, 24px);
    overflow-y: auto;
    flex: 1;
}

.footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--qv-spacing-sm, 8px);
    padding: var(--qv-spacing-lg, 24px);
    border-top: 1px solid var(--qv-color-border-default, #E5E7EB);
}

.footer.empty { display: none; }

@keyframes qv-modal-backdrop-in { from { opacity: 0;} to { opacity: 1;} }

@keyframes qv-modal-backdrop-out { from { opacity: 1;} to { opacity: 0;} }

@keyframes qv-modal-panel-in {
    from { opacity: 0; transform: scale(0.96) translateY(8px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes qv-modal-panel-out {
    from { opacity: 1; transform: scale(1) translateY(0); }
    to { opacity: 0; transform: scale(0.96) translateY(8px); }
}

@media (prefers-reduced-motion: reduce) {
    .backdrop, .panel { animation: none; }
}
`)