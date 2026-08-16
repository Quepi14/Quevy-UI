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

import { html, type PropertyValues } from "lit";
import { property, state, customElement } from "lit/decorators.js";

import { QvElement, createComponentMetadata, createTagName, queryDecorator as query, DisabledMixin } from "@quevy/core";

import { qvFileInputStyles } from "./qv-file-input.styles.js";
import type { QvFileInputChangeEventDetail } from "./qv-file-input.types.js";

function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Kb`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const QvFileInputBase = DisabledMixin(QvElement);

@customElement('qv-file-input')
export class QvFileInput extends QvFileInputBase {
    static override styles = qvFileInputStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvFileInput',
        tagName: createTagName('file-input'),
        version: '0.1.0',
    });

    @property({ type: Boolean, reflect: true}) public multiple = false;
    @property() public accept?: string;

    @state() private files: File[] = [];
    @state() private isDragging = false;

    @query('input[type="file"]', false) private inputEl!: HTMLInputElement | null;

    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        this.toggleAttribute('dragging', this.isDragging);
    }

    private setFiles(list: FileList | null): void {
        if (!list) return;
        this.files = this.multiple ? [...this.files, ...Array.from(list)] : [list[0]];
        this.emit<QvFileInputChangeEventDetail>('change', { files: this.files});
    }

    private removeFile(index: number): void {
        this.files = this.files.filter((_, i) => i !== index);
        this.emit<QvFileInputChangeEventDetail>('change', { files: this.files });
    }

    private readonly handleClick = (): void => {
        if (!this.disabled) this.inputEl?.click();
    };

    private readonly handleInputChange = (event: Event): void => {
        this.setFiles((event.target as HTMLInputElement).files);
    };

    private readonly handleDragOver = (event: DragEvent): void => {
        event.preventDefault();
        if (!this.disabled) this.isDragging = true;
    };

    private readonly handleDragLeave = (): void => {
        this.isDragging = false;
    };

    private readonly handleDrop = (event: DragEvent): void => {
        event.preventDefault();
        this.isDragging = false;
        if (!this.disabled) this.setFiles(event.dataTransfer?.files ?? null);
    };

    protected override render() {
        return html`
            <div
                class="dropzone"
                part="dropzone"
                role="button"
                tabindex=${this.disabled ? -1 : 0}
                @click=${this.handleClick}
                @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this.handleClick()}
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
                        ${this.files.map(
                            (file, index) => html `
                                <div class="file-row">
                                    <span class="file-name">${file.name}</span>
                                    <span class="file-size">${formatSize(file.size)}</span>
                                    <button class="file-remove" aria-label="Remove" @click=${() => this.removeFile(index)}>&times;</button>
                                </div>
                            `,
                        )}
                    </div>
                        `
            : ''}
        `;
    }
}