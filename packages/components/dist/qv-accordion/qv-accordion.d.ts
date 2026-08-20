/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-accordion
 * ----------------------------------------------------------
 * Same DOM-query-based coordination pattern as qv-radio-group —
 * plain query of light-DOM qv-collapsible children, no Context
 * API. Listens for the qv-collapsible-toggle event; in exclusive
 * mode, opening one child imperatively closes the rest.
 *
 * @packageDocumentation
 */
import { QvElement } from "@quevy/core";
export declare class QvAccordion extends QvElement {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    exclusive: boolean;
    onConnected(): void;
    onDisconnected(): void;
    private get items();
    private readonly handleChildToggle;
    protected render(): import("lit").TemplateResult<1>;
}
//# sourceMappingURL=qv-accordion.d.ts.map