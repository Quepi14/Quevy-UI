import { host, hostAttribute, createStyles } from "@quevy/core";

export const qvCalendarStyles = createStyles(`
${host()} {
    display: inline-block;
    padding: var(--qv-spacing-md, 12px);
    background-color: var(--qv-color-background-surface, #fff);
    border: 1px solid var(--qv-color-border-default, #e5e5e5);
    border-radius: var(--qv-radius-lg, 12px);
    font-size: var(--qv-font-size-sm, 14px);
}    

.header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--qv-spacing-sm, 8px); }
.header button { all: unset; cursor: pointer; padding: var(--qv-spacing-xs, 4px); border-radius: var(--qv-radius-sm, 4px); }
.header button:hover { background-color: var(--qv-color-background-muted, #f5f5f5); }
.header .label { font-weight: var(--qv-font-weight-semibold, 600); }

.grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
.weekday { text-align: center; font-size: var(--qv-font-size-xs, 12px); color: var(--qv-color-foreground-muted, #737373); padding: var(--qv-spacing-xs, 4px) 0; }

.day {
    all: unset;
    box-sizing: border-box;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--qv-radius-sm, 4px);
    cursor: pointer;
    color: var(--qv-color-foreground-default, #171717);
}

.day:hover:not([aria-disabled="true"]) { background-color: var(--qv-color-background-muted, #f5f5f5); }
.day.outside { color: var(--qv-color-foreground-muted, #737373); opacity: 0.4; }
.day[aria-disabled="true"] { opacity: 0.3; cursor: not-allowed; }
.day.today { font-weight: var(--qv-font-weight-semibold, 600); }
.day.selected { background-color: var(--qv-color-brand-primary, #3157C7); color: var(--qv-color-foreground-inverse, #ffffff); }
.day.in-range { background-color: var(--qv-color-blue-50, #eff6ff); border-radius: 0; }
.day.range-start { border-radius: var(--qv-radius-sm, 4px) 0 0 var(--qv-radius-sm, 4px); }
.day.range-end { border-radius: 0 var(--qv-radius-sm, 4px) var(--qv-radius-sm, 4px) 0; }

`);