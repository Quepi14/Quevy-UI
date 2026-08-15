/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-bar
 * ----------------------------------------------------------
 * Structural layout component covering topbar/navbar/footbar
 * (position="top"/"bottom") and sidebar (position="left"/
 * "right"). Deliberately near-zero JS behavior — this is a
 * layout primitive, not an interactive component, closer in
 * complexity to qv-card than to qv-modal/qv-dropdown.
 *
 * @packageDocumentation
 */
import { QvElement } from "@quevy/core";
import type { QvBarPosition } from "./qv-bar.types.js";
export declare class QvBar extends QvElement {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    position: QvBarPosition;
    sticky: boolean;
    onConnected(): void;
    render(): import("lit").TemplateResult<1>;
}
//# sourceMappingURL=qv-bar.d.ts.map