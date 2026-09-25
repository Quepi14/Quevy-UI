import { host, hostAttribute, createStyles } from "@quevy/core";

export const qvCalendarStyles = createStyles(`
${host()} {
    display: inline-block;
    box-sizing: border-box;
    width: 296px;
    padding: var(--qv-spacing-lg, 24px);
    background-color: var(--qv-color-background-surface, #F9FAFB);
    box-shadow: var(--qv-shadow-md, 0 4px 16px -4px rgba(0 0 0 /0.1));
    border-radius: var(--qv-radius-lg, 13px);
    font-size: var(--qv-font-size-sm, 11px);
}    

${hostAttribute('variant="detached"')} {
    padding: 0;
    background-color: transparent;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    gap: var(--qv-spacing-sm, 8px);
}

${hostAttribute('variant="detached"')} .header {
    margin: 0;
    border-radius: var(--qv-radius-lg, 13px);
    box-shadow: var(--qv-shadow-md, 0 4px 16px -4px rgba(0 0 0 /0.1));
}

${hostAttribute('variant="detached"')} .body{
    padding: var(--qv-spacing-lg, 24px);
    background-color: var(--qv-color-background-surface, #F9FAFB);
    border-radius: var(--qv-radius-lg, 13px);
    box-shadow: var(--qv-shadow-md, 0 4px 16px -4px rgba(0 0 0 /0.1));
}

${hostAttribute('variant="detached"')} .shortcuts {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
}

${hostAttribute('variant="detached"')} .shortcut {
    color: var(--qv-color-foreground-inverse, #FFF);
    border-color: rgba(255, 255, 255, 0.35);
}

${hostAttribute('variant="detached"')} .shortcut:hover {
    background-color: rgba(255, 255, 255, 0.12)l
    border-color: rgba(255, 255, 255, 0.6);
}

.shortcuts {
    diplay: flex;
    flex-wrap: wrap;
    gap: var(--qv-spacing-sm, 8px);
    margin-top: var(--qv-spacing-md, 16px);
    padding-top: var(--qv-spacing-md, 16px);
    border-top: 1px solid var(--qv-color-border-default, #E5E7EB);
}

.shortcut {
    all: unset;
    box-sizing: border-box;
    flex: 1 1 auto;
    text-align: center;
    padding: var(--qv-spacing-sm, 8px) var(--qv-spacing-md, 16px);
    border: 1px solid var(--qv-color-border-default, #E5E7EB);
    border-radius: var(--qv-radius-md, 8px);
    cursor: pointer;
    font-size: var(--qv-font-size-xs, 10px);
    color: var(--qv-color-foreground-default, #111827);
    transition: background-color var(--qv-motion-duraiton-normal, 180ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1)), border-color var(--qv-motion-duration-normal, 180ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
}

.shortcut:hover {
    background-color: var(--qv-color-background-muted, #F3F4F6);
    border-color: var(--qv-color-foreground-muted, #6B7280);
}

.header .label {
    all: unset;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    gap: 2px;
    cursor: pointer;
    font-weight: var(--qv-font-weight-semibold, 600);
    font-size: var(--qv-font-size-md, 16px);
    padding: 4px 8px;
    border-radius: var(--qv-radius-md, 8px);
    color: var(--qv-color-foreground-inverse, #FFFFFF);
    transition: background-color var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
}

.header .label:hover { background-color: rgba(255, 255, 255, 0.15); }
.header .label.static { cursor: default; }
.header .label.static:hover { background-color: transparent; }
.header .label .caret { width: 14px; height: 14px; color: var(--qv-color-foreground-inverse, #FFFFFF); }

.header { 
    display: flex; 
    align-items: center; 
    justify-content: space-between; 
    margin: calc(-1 * var(--qv-spacing-lg, 24px)) calc(-1 * var(--qv-spacing-lg, 24px)) var(--qv-spacing-md, 16px);
    padding: var(--qv-spacing-md, 16px) var(--qv-spacing-lg, 24px);
    background-color: var(--qv-color-brand-primary, #0027C4);
    border-radius: var(--qv-radius-lg, 13px) var(--qv-radius-lg, 13px) 0 0;
    color: var(--qv-color-foreground-inverse, #FFFFFF);
}

.header button { 
    all: unset; 
    cursor: pointer; 
    padding: var(--qv-spacing-sm, 8px); 
    border-radius: var(--qv-radius-sm, 5px); 
    transition: background-color var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
}

.header .nav {
    display: inline-flex; 
    align-items: center; 
    justify-content: center; 
    width: 28px; 
    height: 28px; 
} 

.header .nav svg { width: 16px; height: 16px; flex-shrink: 0; }
.header .nav-spacer {display: inline-block; width: 28px; height: 28px; }

.header button:hover { 
    background-color: rgba(255, 255, 255, 0.15);
}

.header .nav { 
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
}

.header .nav svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
}

.grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
.weekday { text-align: center; font-size: var(--qv-font-size-xs, 10px); color: var(--qv-color-foreground-muted, #6B7280); padding: var(--qv-spacing-xs, 4px) 0; }

.day {
    all: unset;
    box-sizing: border-box;
    width: 36px;
    height: 36px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--qv-radius-full, 9999px);
    cursor: pointer;
    color: var(--qv-color-foreground-default, #111827);
    transition: background-color var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1)), color var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
}

.day:hover:not([aria-disabled="true"]) { background-color: var(--qv-color-background-muted, #F3F4F6); }
.day.outside { color: var(--qv-color-foreground-muted, #6B7280); opacity: 0.4; }
.day[aria-disabled="true"] { opacity: 0.3; cursor: not-allowed; }

.day.today::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: var(--qv-color-brand-primary, #0027C4);
}

.day.selected.today::after { background-color: var(--qv-color-foreground-inverse, #FFFFFF); }
.day.selected { background-color: var(--qv-color-brand-primary, #0027C4); color: var(--qv-color-foreground-inverse, #FFFFFF); }
.day.in-range { background-color: var(--qv-color-blue-50, #eff6ff); border-radius: 0; }
.day.range-start { border-radius: var(--qv-radius-sm, 5px) 0 0 var(--qv-radius-sm, 5px); }
.day.range-end { border-radius: 0 var(--qv-radius-sm, 5px) var(--qv-radius-sm, 5px) 0; }

${hostAttribute('mode="range"')} .grid {
    gap: 2px 0;
}

${hostAttribute('mode="range"')} .day.in-range,
${hostAttribute('mode="range"')} .day.selected {
    width: 100%;
    margin: 0;
}

${hostAttribute('mode="range"')} .day.range-start:not(.range-end) {
    border-radius: var(--qv-radius-full, 9999px) 0 0 var(--qv-radius-full, 9999px);
}

${hostAttribute('mode="range"')} .day.range-end:not(.range-start) {
    border-radius: 0 var(--qv-radius-full, 9999px) var(--qv-radius-full, 9999px) 0;
}

.month-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: var(--qv-spacing-sm, 8px);
    height: 250px;
}

.month-grid .month {
    all: unset;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--qv-radius-md, 8px);
    cursor: pointer;
    color: var(--qv-color-foreground-default, #111827);
    transition: background-color var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1)), color var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
}

.month-grid .month:hover { background-color: var(--qv-color-background-muted, #F3F4F6); }
.month-grid .month.active {
    background-color: var(--qv-color-brand-primary, #0027C4);
    color: var(--qv-color-foreground-inverse, #FFFFFF);
    font-weight: var(--qv-font-weight-semibold, 600);
}

.year-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: var(--qv-spacing-sm, 8px);
    height: 250px;
}

.year-grid .year {
    all: unset;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--qv-radius-md, 8px);
    cursor: pointer;
    color: var(--qv-color-foreground-default, #111827);
    transition: background-color var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1)), color var(--qv-motion-duration-fast, 120ms) var(--qv-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
}

.year-grid .year:hover { background-color: var(--qv-color-background-muted, #F3F4F6); }
.year-grid .year.active {
    background-color: var(--qv-color-brand-primary, #0027C4);
    color: var(--qv-color-foreground-inverse, #FFFFFF);
    font-weight: var(--qv-font-weight-semibold, 600);
}

${hostAttribute('month="2"')} {
    width: auto;
    padding: 0;
    background-color: transparent;
    box-shadow: none;
}

.dual-pane {
    display: flex;
    gap: var(--qv-spacing-lg, 24px);
}

.pane {
    flex: 1;
    min-width: 0;
    background-color: var(--qv-color-background-surface, #F9FAFB);
    border-radius: var(--qv-radius-lg, 13px);
    box-shadow: var(--qv-shadow-md, 0 4px 16px -4px rgba(0 0 0 /0.1));
    overflow: hidden;
    padding-bottom: var(--qv-spacing-lg, 24px);
}

.pane .header {
    margin: 0 0 var(--qv-spacing-md, 16px);
    border-radius: var(--qv-radius-lg, 13px) var(--qv-radius-lg, 13px) 0 0;
}

.pane .body {
    padding: 0 var(--qv-spacing-lg, 24px);
}
`);