/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-skeleton styles
 * ----------------------------------------------------------
 * Animation durations here are intentionally NOT sourced from
 * @quevy/tokens/motion — that token category models short
 * micro-interaction transitions (hover, focus), not ambient
 * loop animations like a loading skeleton. Using them here
 * would be token misuse, not consistency.
 *
 * @packageDocumentation
 */

import { css, host, hostAttribute, createStyles } from '@quevy/core';

const base = css(`
${host()} {
    display: block;
    position: relative;
    overflow: hidden;
    background-color: var(--qv-color-background-muted,  #e5e5e5);
    border-radius: var(--qv-radius-sm, 4px);
}

${hostAttribute('shape="text"')} {
    height: 1em;
    border-radius: var(--qv-radius-sm, 4px);
}

${hostAttribute('shape="circle"')} {
    aspect-ratio: 1 / 1;
    border-radius: var(--qv-radius-full,  9999px);
}

${hostAttribute('shape="rectangle"')} {
    border-radius: var(--qv-radius-md, 8px);
}
`);

const pulse = css(`
${hostAttribute('animation="pulse"')} {
    animation: qv-skeleton-pulse 1.5s ease-in-out infinite;
}    

@keyframes -qv-skeleton-pulse {
    0%, 100% { opacity:1; }
    50% { opacity: 0.5; }
}
`);

const shimmer = css (`
${hostAttribute('animation="shimmer"')} {
    background-image: linear-gradient(
        90deg,
        var(--qv-color-background-muted, #e5e5e5) 25%,
        var(--qv-color-background-default, #fafafa) 50%,
        var(--qv-color-background-muted, #e5e5e5) 75%
    );
    background-size: 200% 100%;
    animation: qv-skeleton-shimmer 1.5s ease-in-out infinite;
}    

@keyframes qv-skeleton-shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}
`);

const reduceMotion = css(`
@media (prefers-reduced-motion: reduce) {
    ${host()} {
        animation: none !important;
    }
}    
`);

export const qvSkeletonStyles = createStyles  (
    css(base, pulse, shimmer, reduceMotion),
);