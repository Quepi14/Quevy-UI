import { host, createStyles } from "@quevy/core";

export const qvToastRegionStyles = createStyles(`
${host()}{
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: var(--qv-z-index-toast, 1500);
}    

.viewport {
    position: fixed;
    display: flex;
    flex-direction: column;
    gap: var(--qv-spacing-sm, 8px);
    max-width: 360px;
}

.viewport[data-position="top-left"]     { top: var(--qv-spacing-lg, 16px); left: var(--qv-spacing-lg, 16px); align-items: flex-start; }
.viewport[data-position="top-center"]   { top: var(--qv-spacing-lg, 16px); left: 50%; transform: translateX(-50%); align-items: center; }
.viewport[data-position="top-right"]    { top: var(--qv-spacing-lg, 16px); right: var(--qv-spacing-lg, 16px); align-items: flex-end; }
.viewport[data-position="bottom-left"]  { bottom: var(--qv-spacing-lg, 16px); left: var(--qv-spacing-lg, 16px); align-items: flex-start; }
.viewport[data-position="bottom-center"]{ bottom: var(--qv-spacing-lg, 16px); left: 50%; transform: translateX(-50%); align-items: center; }
.viewport[data-position="bottom-right"] { bottom: var(--qv-spacing-lg, 16px); right: var(--qv-spacing-lg, 16px); align-items: flex-end; }

.toast {
    position: relative;
    pointer-events: auto;
    display: flex;
    align-items: center;
    gap: var(--qv-spacing-sm, 8px);
    padding: var(--qv-spacing-md, 12px) var(--qv-spacing-lg, 16px);
    border-radius: var(--qv-radius-md, 8px);
    box-shadow: var(--qv-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1));
    color: var(--qv-color-foreground, #fff);
    background-color: var(--qv-color-primary, #3157c7);
    animation: qv-toast-in 150ms ease-out;
}

.progress {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 3px;
    background-color: rgba(255, 255, 255, 0.6);
    transform-origin: left;
    animation-name: qv-toast-progress;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
}

@keyframes qv-toast-progress {
    from { transform: scaleX(1); }
    to { transform: scaleX(0); }
}

.toast[data-variant="success"] { background-color: var(--qv-color-status-success, #16a34a); }
.toast[data-variant="warning"] { background-color: var(--qv-color-yellow-600, #ca8a04); }
.toast[data-variant="error"]   { background-color: var(--qv-color-status-error, #dc2626); }

@keyframes qv-toast-in {
    from { opacity: 0; transform: translateY(4px); }
    to   { opacity: 1; transform: translateY(0); }
}

.close {
    all: unset;
    cursor: pointer;
    opacity: 0.8;
    line-height: 1;
    margin-inline-start: auto;
}

.close:hover { opacity: 1; }
`);