import { host, hostAttribute, createStyles } from "@quevy/core";

export const qvProgressStyles = createStyles(`
${host()} {
    display: block;
    width: 100%;
}    

.track {
    position: relative;
    width: 100%;
    height: 6px;
    border-radius: var(--qv-radius-full, 9999px);
    background-color: var(--qv-color-background-muted, #e5e5e5);
    overflow: hidden;
}

.bar {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    border-radius: var(--qv-radius-full, 9999px);
    background-color: var(--qv-color-brand-primary, #3157c7);
    transition: width var(--qv-motion-duration-fast, 100ms) var(--qv-motion-easing-standard, ease);
}

${hostAttribute('variant="success"')} .bar { background-color: var(--qv-color-status-success, #16a34a); }
${hostAttribute('variant="warning"')} .bar { background-color: var(--qv-color-yellow-600, #ca8a04); }
${hostAttribute('variant="error"')} .bar { background-color: var(--qv-color-status-error, #dc2626); }


${hostAttribute('indeterminate')} .bar {
    width: 40% !important;
    animation: qv-progress-indeterminate 1.2s ease-in-out infinite;
}

@keyframes qv-progress-indeterminate {
    0% { left: -40%; }
    100% { left: 100%; }
}

@media (prefers-reduced-motion: reduce) {
    ${hostAttribute('indeterminate')} .bar { animation-duration: 2.4s; }
}
`);