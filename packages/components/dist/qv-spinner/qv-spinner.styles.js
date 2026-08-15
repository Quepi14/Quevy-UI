import { host, hostAttribute, createStyles } from "@quevy/core";
export const qvSpinnerStyles = createStyles(`
${host()} {
    display: inline-flex;
    color-: var(--qv-color-brand-primary, #3157c7);
}    

.spinner {P
    border-radius: var(--qv-radius-full, 9999px);
    border: 2px solid currentColor;
    border-top-color: transparent;
    opacity: 0.85;
    animation: qv-spinner-spin 0.8s linear infinite;
}

${hostAttribute('size="sm"')} .spinner { width: 16px; height: 16px; border-width: 2px; }
${hostAttribute('size="md"')} .spinner { width: 24px; height: 24px; border-width: 2.5px; }
${hostAttribute('size="lg"')} .spinner { width: 32px; height: 32px; border-width: 3px; }

@keyframes qv-spinner-spin { to { transform: rotate(360deg);} }

@media (prefers-reduced-motion: reduce) {
    .spinner { animation-duration: 1.6s; }
}
`);
//# sourceMappingURL=qv-spinner.styles.js.map