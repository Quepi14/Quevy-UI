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
    user-select: none;
}

.content {
    width: 100%;
    heigth: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

img { 
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

${hostAttribute('shape="circle"')} { border-radius: var(--qv-radius-full, 9999px); }
${hostAttribute('shape="circle"')} .content { border-radius: var(--qv-radius-full, 9999px); }
${hostAttribute('shape="square"')} { border-radius: var(--qv-radius-md, 8px); }
${hostAttribute('shape="square"')} .content { border-radius: var(--qv-radius-md, 8px); }

${hostAttribute('size="xs"')} { width: 24px; height: 24px; font-size: 10px; }
${hostAttribute('size="sm"')} { width: 32px; height: 32px; font-size: 12px; }
${hostAttribute('size="md"')} { width: 40px; height: 40px; font-size: 14px; }
${hostAttribute('size="lg"')} { width: 56px; height: 56px; font-size: 18px; }
${hostAttribute('size="xl"')} { width: 80px; height: 80px; font-size: 24px; }

.status {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    border-radius: var(--qv-radius-full, 9999px);
    border: 2px solid var(--qv-color-background-surface, #fff);
    color: #fff;
    overflow: hidden;
}

.status svg { width: 70%; height: 70%; }

${hostAttribute('size="xs"')} .status, ${hostAttribute('size="sm"')} .status { width: 8px; height: 8px; }
${hostAttribute('size="md"')} .status { width: 10px; height: 10px; }
${hostAttribute('size="lg"')} .status, ${hostAttribute('size="xl"')} .status { width: 14px; height: 14px; }

/* Too small at 8px to render a legible icon - stay plain color there */
${hostAttribute('size="xs"')} .status svg, ${hostAttribute('size="sm"')} .status svg { dispaly: none; }

.status.online { background-color: var(--qv-color-status-success, #16a34a); }
.status.offline { background-color: var(--qv-color-neutral-400, #a3a3a3); }
.status.dnd { background-color: var(--qv-color-status-error, #dc2626); }
.status.away { background-color: var(--qv-color-yellow-600, #ca8a04); }

/* Solid dot with a moon-shaped "bite" cut out of it - the same
    two circle trick Discord uses for its Idle status, rather than a 
    separate crescent icon. Keeps this dot the same size/weight as
    the plain ones instead of shrinking down to just a sliver. */
.status.busy {
    background-color: var(--qv-color-yellow-600, #ca8a04);
}

.status.busy::after {
    content: '';
    position: absolute;
    top: -25%;
    left: -20%;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: var(--qv-color-background-surface, #fff);
}
`);