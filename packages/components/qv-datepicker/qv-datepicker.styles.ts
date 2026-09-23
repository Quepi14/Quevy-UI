import { host, createStyles } from "@quevy/core";

export const qvDatePickerStyles = createStyles(`
${host()} {
    display: inline-block;
    position: relative;
    font-size: var(--qv-font-size-sm, 11px);
}    

.trigger {
    all: unset;
    display: inline-flex;
    align-items: center;
    gap: var(--qv-spacing-sm, 8px);
    min-width: 200px;
    line-height: 1.4;
    padding-block: 0.7em;
    padding-inline: var(--qv-spacing-md, 16px);
    border: 1px solid var(--qv-color-border-default, #E5E7EB);
    border-radius: var(--qv-radius-md, 8px);
    cursor: pointer;
    color: var(--qv-color-foreground-default, #111827);
    transition: border-color var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
}

.trigger:hover { border-color: var(--qv-color-neutral-400, #9CA3AF); }

.trigger:focus-visible {
    outline: 2px solid var(--qv-color-brand-primary, #0027C4);
    outline-offset: 2px;
}

.trigger .icon {
    display: inline-flex;
    flex-shrink: 0;
    width: calc(1em * 1.4);
    height: calc(1em * 1.4);
    color: var(--qv-color-foreground-muted, #6B7280);
}

.trigger .placeholder{
    color: var(--qv-color-foreground-muted, #6B7280);
}

qv-calendar {
    position: fixed;
    z-index: var(--qv-z-index-dropdown, 1000);
    transform-origin: top center;
    animation: qv-datepicker-panel-in var(--qv-motion-duraiton-normal, 180ms) var(--qv-motion-easing-enterm cubic-bezier(0.16, 1, 0.3, 1));
}

qv-calendar[closing] {
    animation: qv-datepicker-panel-out var(--qv-motion-duraiton-fast, 120ms) var(--qv-motion-easing-exit, cubic-bezier(0.7, 0, 0.84, 0)) forwards;
}

@keyframes qv-datepicker-panel-in {
    from { opacity: 0; transform: scale(0.96) translateY(-4px); }
    to { opacity: 0; transform: scale(1) translateY(0); }
}

@keyframes qv-datepicker-panel-out {
    from { opacity: 0; transform: scale(1) translateY(0); }
    to { opacity: 0; transform: scale(0.96) translateY(-4px); }
}

@media (prefers-reduced-motion: reduce) {
    qv-calendar { aniamtion: none; }
}
`)