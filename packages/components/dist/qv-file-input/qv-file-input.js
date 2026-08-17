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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { property, state, customElement } from "lit/decorators.js";
import { QvElement, createComponentMetadata, createTagName, queryDecorator as query, DisabledMixin } from "@quevy/core";
import { qvFileInputStyles } from "./qv-file-input.styles.js";
function formatSize(bytes) {
    if (bytes < 1024)
        return `${bytes} B`;
    if (bytes < 1024 * 1024)
        return `${(bytes / 1024).toFixed(1)} Kb`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
const QvFileInputBase = DisabledMixin(QvElement);
let QvFileInput = class QvFileInput extends QvFileInputBase {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvFileInput',
            tagName: createTagName('file-input'),
            version: '0.1.0',
        });
        this.multiple = false;
        this.files = [];
        this.isDragging = false;
        this.handleClick = () => {
            if (!this.disabled)
                this.inputEl?.click();
        };
        this.handleInputChange = (event) => {
            this.setFiles(event.target.files);
        };
        this.handleDragOver = (event) => {
            event.preventDefault();
            if (!this.disabled)
                this.isDragging = true;
        };
        this.handleDragLeave = () => {
            this.isDragging = false;
        };
        this.handleDrop = (event) => {
            event.preventDefault();
            this.isDragging = false;
            if (!this.disabled)
                this.setFiles(event.dataTransfer?.files ?? null);
        };
    }
    static { this.styles = qvFileInputStyles; }
    updated(changedProperties) {
        super.updated(changedProperties);
        this.toggleAttribute('dragging', this.isDragging);
    }
    setFiles(list) {
        if (!list)
            return;
        this.files = this.multiple ? [...this.files, ...Array.from(list)] : [list[0]];
        this.emit('change', { files: this.files });
    }
    removeFile(index) {
        this.files = this.files.filter((_, i) => i !== index);
        this.emit('change', { files: this.files });
    }
    render() {
        return html `
            <div
                class="dropzone"
                part="dropzone"
                role="button"
                tabindex=${this.disabled ? -1 : 0}
                @click=${this.handleClick}
                @keydown=${(e) => e.key === 'Enter' && this.handleClick()}
                @dragover=${this.handleDragOver}
                @dragleave=${this.handleDragLeave}
                @dragdrop=${this.handleDrop}
            >
                <span>Seret file ke sini, atau <span class="browse">pilih file</span></span>
            </div>

            <input
                type="file"
                ?multiple=${this.multiple}
                accept=${this.accept ?? ''}
                ?disabled=${this.disabled}
                @change=${this.handleInputChange}
            />

            ${this.files.length > 0
            ? html `
                    <div class="file-list" part="file-list">
                        ${this.files.map((file, index) => html `
                                <div class="file-row">
                                    <span class="file-name">${file.name}</span>
                                    <span class="file-size">${formatSize(file.size)}</span>
                                    <button class="file-remove" aria-label="Remove" @click=${() => this.removeFile(index)}>&times;</button>
                                </div>
                            `)}
                    </div>
                        `
            : ''}
        `;
    }
};
__decorate([
    property({ type: Boolean, reflect: true })
], QvFileInput.prototype, "multiple", void 0);
__decorate([
    property()
], QvFileInput.prototype, "accept", void 0);
__decorate([
    state()
], QvFileInput.prototype, "files", void 0);
__decorate([
    state()
], QvFileInput.prototype, "isDragging", void 0);
__decorate([
    query('input[type="file"]', false)
], QvFileInput.prototype, "inputEl", void 0);
QvFileInput = __decorate([
    customElement('qv-file-input')
], QvFileInput);
export { QvFileInput };
//# sourceMappingURL=qv-file-input.js.map