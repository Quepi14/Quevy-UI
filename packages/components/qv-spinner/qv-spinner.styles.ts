import { host, hostAttribute, createStyles } from "@quevy/core";

export const qvSpinnerStyles = createStyles(`
${host()} {
    display: inline-flex;
    color: var(--qv-color-brand-primary, #3157c7);
}    

.spinner {
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


/* Fold variant - 4 squared folded */
.fold {
    display: block;
    position: relative;
    transform: rotateZ(45deg);
}

.fold-piece {
    float: left;
    width: 50%;
    height: 50%;
    position: relative;
    transform: scale(1.1);
}

.fold-piece:before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: currentColor;
    opacity: 0.85;
    animation: qv-spinner-fold 1.2s infinite linear both;
    transform-origin: 100% 100%;
}

.fold-piece-2 { transform: scale(1.1) rotateZ(90deg); }
.fold-piece-3 { transform: scale(1.1) rotateZ(180deg); }
.fold-piece-4 { transform: scale(1.1) rotateZ(270deg); }

.fold-piece-2:before { animation-delay: 0.3s; }
.fold-piece-3:before { animation-delay: 0.6s; }
.fold-piece-4:before { animation-delay: 0.9s; }

${hostAttribute('size="sm"')} .fold { width: 16px; height: 16px; }
${hostAttribute('size="md"')} .fold { width: 24px; height: 24px; }
${hostAttribute('size="lg"')} .fold { width: 32px; height: 32px; }

@keyframes qv-spinner-fold {
    0%, 10% { transform: perspective(140px) rotateX(-180deg); opacity: 0;}
    25%, 75% { transform: perspective(140px) rotateX(0deg); opacity: 0;}
    90%, 100% { transform: perspective(140px) rotateX(180deg); opacity: 0;}
}
@media (prefers-reduced-motion: reduce) {
    .spinner { animation-duration: 1.6s; }
    .fold-piece:before { animation-duration: 4.8s; }
}
`)