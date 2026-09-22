import { host, hostAttribute, createStyles } from "@quevy/core";

export const qvFileInputStyles = createStyles(`
${host()} {
    display: block;
    font-size: var(--qv-font-size-sm, 11px);
}    

.dropzone {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--qv-spacing-xs, 4px);
    padding: var(--qv-spacing-2xl, 24px);
    border: 2px dashed var(--qv-color-border-default, #E5E7EB);
    border-radius: var(--qv-radius-lg, 13px);
    color: var(--qv-color-foreground-muted, #6B7280);
    cursor: pointer;
    text-align: center;
}

.upload-icon {
    width: 32px;
    height: 32px;
    color: var(--qv-color-foreground-muted, #6B7280);
}

${hostAttribute('dragging')} .upload-icon {
    color: var(--qv-color-brand-primary, #0027C4);
}

${hostAttribute('dragging')} .dropzone {
    border-color: var(--qv-color-brand-primary, #0027C4);
    background-color: var(--qv-color-blue-50, #eff6ff);
}

.browse {
    color: var(--qv-color-brand-primary, #0027C4);
    font-weight: var(--qv-font-weight-medium, 500);
}

.file-list { 
    display: flex; 
    flex-direction: column; 
    gap: var(--qv-spacing-xs, 4px);
    margin-top: var(--qv-spacing-sm, 8px);
}

.file-row {
    display: flex;
    align-items: center;
    gap: var(--qv-spacing-sm, 8px);
    padding: var(--qv-spacing-xs, 4px) var(--qv-spacing-sm, 8px);
    border-radius: var(--qv-radius-sm, 5px);
    background-color: var(--qv-color-background-muted, #F3F4F6);
}

.file-name {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis; 
    white-space: nowrap;
}

.file-size {
    color: var(--qv-color-foreground-muted, #6B7280);
    font-size: var(--qv-font-size-xs, 10px);
}

.file-remove {
    all: unset;
    cursor: pointer;
    color: var(--qv-color-foreground-muted, #6B7280);
    padding: 2px;
}

.file-remove:hover {
    color: var(--qv-color-status-error, #dc2626);
}

input[type="file"] { display: none; }
`);