import { host, hostAttribute, createStyles } from "@quevy/core";
export const qvFileInputStyles = createStyles(`
${host()} {
    display: block;
    font-size: var(--qv-font-size-sm, 14px);
}    

.dropzone {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--qv-spacing-xs, 4px);
    padding: var(--qv-spacing-2xl, 24px);
    border: 2px dashed var(--qv-color-border-default, #e5e5e5);
    border-radius: var(--qv-radius-signature, 2px) var(--qv-radius-lg, 12px) var(--qv-radius-lg, 12px) var(--qv-radius-lg, 12px);
    color: var(--qv-color-foreground-muted, #737373);
    cursor: pointer;
    text-align: center;
}

${hostAttribute('dragging')} .dropzone {
    border-color: var(-qv-color-brand-primary, #3157c7);
    background-color: var(--qv-color-blue-50, #eff6ff);
}

.browse {
    color: var(--qv-color-brand-primary, #3157c7);
    font-weight: var(--qv-font-weight-medium, 500);
}

.file-list { 
    display: flex; 
    flex-direction: column; 
    gap: var(--qv-spacing-xs, 4px);
    margin-top: var(-qv-spacing-sm, 8px);
}

.file-row {
    display: flex;
    align-items: center;
    gap: var(--qv-spacing-sm, 8px)l
    padding: var(--qv-spacing-xs, 4px) var(-qv-spacing-sm, 8px);
    border-radius: var(--qv-radius-sm, 4px);
    background-color: var(--qv-color-background-muted, #f5f5f5);
}

.file-name {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis; 
    white-space: nowrap;
}

.file-size {
    color: var(--qv-color-foreground-muted, #737373);
    font-size: var(--qv-font-size-xs, 12px);
}

.file-remove {
    all: unset;
    cursor: pointer;
    color: var(--qv-color-foreground-muted, #737373);
    padding: 2px;
}

.file-remove:hover {
    colot: var(--qv-color-status-error, #dc2626);
}

input[type="file"] { display: none; }
`);
//# sourceMappingURL=qv-file-input.styles.js.map