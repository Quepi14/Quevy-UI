/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-file-input
 * ----------------------------------------------------------
 * Both drag-and-drop AND click-to-browse, as decided. Native
 * <input type="file"> hidden inside shadow root does the actual
 * file picker + drag/drop event plumbing — no need to reinvent
 * OS-level file dialog behavior.
 *
 * @packageDocumentation
 */
import { type PropertyValues } from "lit";
import { QvElement } from "@quevy/core";
declare const QvFileInputBase: typeof QvElement & import("@quevy/core").MixinConstructor<import("@quevy/core/dist/mixins/disabled.js").DisabledInterface>;
export declare class QvFileInput extends QvFileInputBase {
    static styles: CSSStyleSheet;
    readonly metadata: import("@quevy/core").ComponentMetadata;
    multiple: boolean;
    accept?: string;
    private files;
    private isDragging;
    private inputEl;
    protected updated(changedProperties: PropertyValues): void;
    private setFiles;
    private removeFile;
    private readonly handleClick;
    private readonly handleInputChange;
    private readonly handleDragOver;
    private readonly handleDragLeave;
    private readonly handleDrop;
    protected render(): import("lit").TemplateResult<1>;
}
export {};
//# sourceMappingURL=qv-file-input.d.ts.map