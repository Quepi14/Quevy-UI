/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-list
 * ----------------------------------------------------------
 * Compound with qv-list-item (light-DOM children), not
 * data-driven — chosen because consumer needs range from
 * plain-text-only items up to rich leading/trailing items, and
 * a fixed columns[]/rows[]-style API (like qv-table) would force
 * one shape on both cases. Communication is plain DOM: no
 * shared context/state manager, consistent with the
 * "Compound Components" decision made back during core's audit
 * (DOM hierarchy + slots is enough here — no consumer for
 * anything more).
 *
 * @packageDocumentation
 */
import { QvElement } from "@quevy/core";
export declare class QvList extends QvElement {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    onConnected(): void;
    protected render(): import("lit").TemplateResult<1>;
}
//# sourceMappingURL=qv-list.d.ts.map