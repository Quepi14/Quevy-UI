import { host, hostAttribute, createStyles } from "@quevy/core";

export const qvCalendarStyles = createStyles(`
${host()} {
    display: inline-block;
    padding: var(--qv-spacing-lg, 16x);
    color: var(--qv-color-brand-primary, #3157c7);
    background-color: var(--qv-color-background-surface, #fff);
    box-shadow: var(--qv-shadow-md, 0 4px 16px -4px rgba(0 0 0 /0.1));
    border-radius: var(--qv-radius-lg, 12px);
    font-size: var(--qv-font-size-sm, 14px);
}    

.header .label {
    all: unset;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    gap: 2px;
    cursor: pointer;
    font-weight: var(--qv-font-weight-semibold, 600);
    font-size: var(--qv-font-size-md, 15px);
    padding: 4px 8px;
    border-radius: var(--qv-radius-md, 8px);
    color: var(--qv-color-foreground-default, #171717);
}

.header .label:hover { background-color: var(--qv-color-background-muted, #f5f5f5); }
.header .label.static { cursor: default; }
.header .label.static:hover { background-color: transparent; }
.header .label .caret { width: 14px; height: 14px; color: var(--qv-color-foreground-muted, #737373); }

.header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--qv-spacing-sm, 8px); }
.header button { all: unset; cursor: pointer; padding: var(--qv-spacing-xs, 4px); border-radius: var(--qv-radius-sm, 4px); }
.header button:hover { background-color: var(--qv-color-background-muted, #f5f5f5); }
.header .label { font-weight: var(--qv-font-weight-semibold, 600); }

.grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
.weekday { text-align: center; font-size: var(--qv-font-size-xs, 12px); color: var(--qv-color-foreground-muted, #737373); padding: var(--qv-spacing-xs, 4px) 0; }

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
    color: var(--qv-color-foreground-default, #171717);
}

.day:hover:not([aria-disabled="true"]) { background-color: var(--qv-color-background-muted, #f5f5f5); }
.day.outside { color: var(--qv-color-foreground-muted, #737373); opacity: 0.4; }
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
    background-color: var(--qv-color-brand-primary, #3157c7);
}

.day.selected.today::after { background-color: var(--qv-color-foreground-inverse, #fff); }
.day.selected { background-color: var(--qv-color-brand-primary, #3157C7); color: var(--qv-color-foreground-inverse, #ffffff); }
.day.in-range { background-color: var(--qv-color-blue-50, #eff6ff); border-radius: 0; }
.day.range-start { border-radius: var(--qv-radius-sm, 4px) 0 0 var(--qv-radius-sm, 4px); }
.day.range-end { border-radius: 0 var(--qv-radius-sm, 4px) var(--qv-radius-sm, 4px) 0; }

.month-grid {
    display: grid;
    grid-template-column: repeat(3, 1fr);
    gap: var(--qv-spacing-sm, 8px);
}

.month-grid .month {
    all: unset;
    box-sizing: border-box;
    text-align: center;
    padding: var(--qv-spacing-sm, 8px) 0;
    border-radius: var(--qv-radius-md, 8px);
    cursor: pointer;
    color: var(--qv-color-foreground-default, #171717);
}

.month-grid .month-hover { background-color: var(--qv-color-background-muted, #f5f5f5); }
.month-grid .month.active {
    background-color: var(--qv-coor-brand-primary, #3157c7);
    color: var(--qv-color-foreground-inverse, #fff);
    font-weight: var(--qv-font-weight-semibold, 600);
}
`);