import { host, hostAttribute, createStyles } from "@quevy/core";
export const qvAvatarStyles = createStyles(`
${host()} {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background-color: var(--qv-color-background-muted, #e5e5e5);
    color: var(--qv-color-foreground-muted, #737373);
    font-weight: var(--qv-font-weight-semibold, 600);
    overflow: hidden;
    user-select: none;
}

img { 
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

${hostAttribute('shape="circle"')} { border-radius: var(--qv-radius-full, 9999px); }
${hostAttribute('shape="square"')} { border-radius: var(--qv-radius-md, 8px); }

${hostAttribute('size="xs"')} { width: 24px; height: 24px; font-size: 10px; }
${hostAttribute('size="sm"')} { width: 32px; height: 32px; font-size: 12px; }
${hostAttribute('size="md"')} { width: 40px; height: 40px; font-size: 14px; }
${hostAttribute('size="lg"')} { width: 56px; height: 56px; font-size: 18px; }
${hostAttribute('size="xl"')} { width: 80px; height: 80px; font-size: 24px; }

.status {
    position: absolute;
    bottom: 0;
    right: 0;
    border-radius: var(--qv-radius-full, 9999px);
    border: 2px solid var(--qv-color-background-surface, #fff);
}

${hostAttribute('size="xs"')} .status, ${hostAttribute('size="sm"')} .status { width: 8px; height: 8px; }
${hostAttribute('size="md"')} .status { width: 10px; height: 10px; }
${hostAttribute('size="lg"')} .status, ${hostAttribute('size="xl"')} .status { width: 14px; height: 14px; }

.status.online { background-color: var(--qv-color-status-success, #16a34a); }
.status.offline { background-color: var(--qv-color-neutral-400, #a3a3a3); }
.status.busy { background-color: var(--qv-color-status-error, #dc2626); }
.status.away { background-color: var(--qv-color-yellow-600, #ca8a04); }
`);
//# sourceMappingURL=qv-avatar.styles.js.map