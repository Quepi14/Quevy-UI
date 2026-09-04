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
    animation: qv-spinner-fold 2.4s infinite cubic-bezier(0.4, 0, 0.2, 1) both;
    transform-origin: 100% 100%;
    will-change: transform, opacity;
}

.fold-piece-2 { transform: scale(1.1) rotateZ(90deg); }
.fold-piece-3 { transform: scale(1.1) rotateZ(180deg); }
.fold-piece-4 { transform: scale(1.1) rotateZ(270deg); }

.fold-piece-2:before { animation-delay: 0.6s; }
.fold-piece-3:before { animation-delay: 1.2s; }
.fold-piece-4:before { animation-delay: 1.8s; }

${hostAttribute('size="sm"')} .fold { width: 16px; height: 16px; }
${hostAttribute('size="md"')} .fold { width: 24px; height: 24px; }
${hostAttribute('size="lg"')} .fold { width: 32px; height: 32px; }

@keyframes qv-spinner-fold {
    0% { transform: perspective(140px) rotateX(-180deg); opacity: 0; }
    20% { transform: perspective(140px) rotateX(0deg); opacity: 1; }
    67% { transform: perspective(140px) rotateX(0deg); opacity: 1; }
    85% { transform: perspective(140px) rotateX(180deg); opacity: 0; }
    100% { transform: perspective(140px) rotateX(180deg); opacity: 0; }
}

/* Logo variant - rotates whatever is slotted in (falls back to a default mark) */
.logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    animation: qv-spinner-spin 1.2s linear infinite;
}

.logo ::slotted(*),
.logo svg {
    width: 100%;
    height: 100%;
    display: block;
}

@keyframes qv-spinner-logo { to { transform: rotate(360deg); } }

${hostAttribute('size="sm"')} .logo { width: 16px; height: 16px; }
${hostAttribute('size="md"')} .logo { width: 24px; height: 24px; }
${hostAttribute('size="lg"')} .logo { width: 32px; height: 32px; }

/* Dots variant - 4 dots oribiting together liek pinwheel */
.dots {
    position: relative;
    display: block;
    animation: qv-spinner-dots 1s linear infinite;
}

.dot {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 24%;
    height: 24%;
    margin: -12% 0 0 -12%;
    border-radius: var(--qv-radius-full, 9999px);
    background-color: currentColor;  
}

.dot-1 { transform: rotate(0deg) translate(140%) rotate(0deg); opacity: 1; }
.dot-2 { transform: rotate(90deg) translate(140%) rotate(-90deg); opacity: 0.75; }
.dot-3 { transform: rotate(180deg) translate(140%) rotate(-180deg); opacity: 0.5; }
.dot-4 { transform: rotate(270deg) translate(140%) rotate(-270deg); opacity: 0.25; }

@keyframes qv-spinner-dots { to { transform: rotate(360deg); } }

${hostAttribute('size="sm"')} .dots { width: 16px; height: 16px; }
${hostAttribute('size="md"')} .dots { width: 24px; height: 24px; }
${hostAttribute('size="lg"')} .dots { width: 32px; height: 32px; }

/* Pendulum variant - a rod + bob swinging around a top pivot */
.pendulum {
    position: relative;
    display: block;
}

.pendulum-rail {
    position: absolute;
    top: 8%;
    left: 10%;
    right: 10%;
    height: 1px;
    background-color: currentColor;
    opacity: 0.35;
}

.pendulum-arm {
    position: absolute;
    top: 8%;
    left: 50%;
    width: 1px;
    height: 58%;
    background-color: currentColor;
    opacity: 0.35;
    transform-origin: top center;
}

.pendulum-arm-1 { left: 12%; animation: qv-spinner-cradle-right 1.6s ease-in-out infinite; }
.pendulum-arm-2 { left: 37.3%; }
.pendulum-arm-3 { left: 62.6%; }
.pendulum-arm-4 { left: 88%; animation: qv-spinner-cradle-left 1.6s ease-in-out infinite; }

.pendulum-ball {
    position: absolute;
    left: 50%;
    bottom: -10%;
    border-radius: var(--qv-radius-full, 9999px);
    background-color: currentColor;
}

@keyframes qv-spinner-cradle-left {
    0% { transform: rotate(-28deg); animation-timing-function: ease-in; }
    25% { transform: rotate(0deg); animation-timing-function: linear;}
    75% { transform: rotate(0deg); animation-timing-function: ease-out; }
    100% { transform: rotate(-28deg); }
}

@keyframes qv-spinner-cradle-right {
    0% { transform: rotate(0deg); animation-timing-function: linear; } 
    25% { transform: rotate(0deg); animation-timing-function: ease-out; }
    50% { transform: rotate(28deg); animation-timing-function: ease-in; }
    75% { transform: rotate(0deg); animation-timing-function: linear; }
    100% { transform: rotate(0deg); }
}

${hostAttribute('size="sm"')} .pendulum { width: 16px; height: 16px; }
${hostAttribute('size="md"')} .pendulum { width: 24px; height: 24px; }
${hostAttribute('size="lg"')} .pendulum { width: 32px; height: 32px; }

${hostAttribute('size="sm"')} .pendulum-ball { width: 6px; height: 6px; margin-left: -3px; }
${hostAttribute('size="md"')} .pendulum-ball { width: 8px; height: 8px; margin-left: -4px; }
${hostAttribute('size="lg"')} .pendulum-ball { width: 10px; height: 10px; margin-left: -5px; }

@media (prefers-reduced-motion: reduce) {
    .spinner { animation-duration: 1.6s; }
    .fold-piece:before { animation-duration: 4.8s; }
    .logo { animation-duration: 2.4s; }
    .dots { animation-duration: 2s; }
    .pendulum-arm-1, .pendulum-arm-4 { animation-duration: 3.2s; }
}
`);
//# sourceMappingURL=qv-spinner.styles.js.map