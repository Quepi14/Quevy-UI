/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-datepicker
 * ----------------------------------------------------------
 * Same OverlayController pattern as qv-dropdown. Single mode
 * closes on selection; range mode stays open until both start
 * and end are picked (qv-calendar only emits `change` once the
 * range is complete, so this component just listens and closes
 * then).
 *
 * @packageDocumentation
 */
import { type PropertyValues } from "lit";
import { QvElement } from "@quevy/core";
import '../qv-calendar/index.js';
import type { QvCalendarMode } from "../qv-calendar/index.js";
declare const QvDatepickerBase: typeof QvElement & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/disabled.js").DisabledInterface>;
export declare class QvDatepicker extends QvDatepickerBase {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    mode: QvCalendarMode;
    min?: Date;
    max?: Date;
    value?: Date;
    valueStart?: Date;
    valueEnd?: Date;
    placeholder: string;
    private readonly overlay;
    private triggerEl;
    private calendarEl;
    protected updated(changedProperties: PropertyValues): void;
    private readonly handleCalendarChange;
    private get displayText();
    render(): any;
}
export {};
//# sourceMappingURL=qv-datepicker.d.ts.map