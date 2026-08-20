/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-avatar
 * ----------------------------------------------------------
 * Falls back to initials (derived from `name`) when `src` is
 * missing or fails to load — tracked via a plain error handler
 * on <img>, not a network pre-check (simpler, and the browser
 * already does the request either way).
 *
 * @packageDocumentation
 */
import { QvElement } from "@quevy/core";
import type { QvAvatarSize, QvAvatarShape, QvAvatarStatus } from "./qv-avatar.types.js";
export declare class QvAvatar extends QvElement {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    src?: string;
    name: string;
    size: QvAvatarSize;
    shape: QvAvatarShape;
    status?: QvAvatarStatus;
    private imageFailed;
    private readonly handleImageError;
    onConnected(): void;
    protected render(): import("lit").TemplateResult<1>;
}
//# sourceMappingURL=qv-avatar.d.ts.map