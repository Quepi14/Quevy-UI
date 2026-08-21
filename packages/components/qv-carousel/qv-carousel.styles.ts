import { host, createStyles } from "@quevy/core";

export const qvCarouselStyles = createStyles(`
${host()}{
    display: block;
    position: relative;
    overflow: hidden;
    border-radius: var(--qv-radius-signature, 2px) var(--qv-radius-lg, 12px) var(--qv-radius-lg, 12px) var(--qv-radius-lg, 12px)
} 
   
.track { display: flex; transition: transform var(--qv-motion-duration-slow, 300ms) var(--qv-motion-easing-standard, ease); }
.track ::slotted(*) { flex: 0 0 100%; width: 100%; }

.arrow {
    all: unset;
    position: absolute;
    top: 50%;
    transfrom: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: var(--qv-radius-full, 9999px);
    backgorund-color: rgba(0, 0, 0, 0.4);
    color: #fff;
    cursor: pointer;
}

.arrow.prev { left: var(--qv-spacing-sm, 8px); }
.arrow.next { right: var(--qv-spacing-sm, 8px); }
.arrow:hover { background-color: rgba(0,0,0,0.6); }

.dots { position: absolute; bottom: var(--qv-spacing-sm, 8px); left: 50%; transform: translateX(-50%); display: flex; gap: var(--qv-spacing-xs, 4px); }
.dot { all: unset; width: 8px; height: 8px; border-radius: var(--qv-radius-full, 9999px); background-color: rgba(255,255,255,0.5); cursor: pointer; }
.dot.active { background-color: #fff; }
`);