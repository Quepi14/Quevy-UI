/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-carousel
 * ----------------------------------------------------------
 * Slides are direct light-DOM children (default slot) — each
 * top-level slotted element is one slide. Autoplay pauses on
 * pointerenter/leaves via host events, and is fully torn down
 * in onDisconnected() to avoid a leaked interval outliving the
 * element.
 *
 * @packageDocumentation
 */

import { html, type PropertyValues } from "lit";
import { property, state, customElement } from "lit/decorators.js";

import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";

import { qvCarouselStyles } from "./qv-carousel.styles.js";;

@customElement('qv-carousel')
export class QvCarousel extends QvElement {
    static override styles = qvCarouselStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvCarousel',
        tagName: createTagName('carousel'),
        version: '0.1.1',
    });

    @property({ type: Boolean, reflect: true}) public autoplay = false;
    @property({ type: Number }) public interval = 4000;

    @state() private index = 0;
    @state() private slideCount = 0;

    private timer: ReturnType<typeof setInterval> | null = null;

    public override onConnected(): void {
        this.addEventListener('pointerenter', this.pauseAutoplay);
        this.addEventListener('pointerleave', this.resumeAutoplay);
        this.startAutoPlay();
    }

    public override onDisconnected(): void {
        this.removeEventListener('pointerenter', this.pauseAutoplay);
        this.removeEventListener('pointerleave', this.resumeAutoplay);
        this.stopAutoplay();
    }

    private readonly pauseAutoplay = (): void => this.stopAutoplay();
    private readonly resumeAutoplay = (): void => this.startAutoPlay();

    private startAutoPlay(): void {
        if (!this.autoplay || this.timer || this.slideCount <= 1) return;
        this.timer = setInterval(() => this.next(), this.interval); 
    }

    private stopAutoplay(): void {
        if (this.timer) clearInterval(this.timer);
        this.timer = null;
    }

    private handleSlotChange = (event: Event): void => {
        this.slideCount = (event.target as HTMLSlotElement).assignedElements().length;
        this.index = Math.min(this.index, Math.max(0, this.slideCount - 1));
    };

    public next(): void {
        if (this.slideCount === 0) return;
        this.index = (this.index + 1) % this.slideCount;
    }

    public prev(): void {
        if (this.slideCount === 0) return;
        this.index = (this.index - 1 + this.slideCount) % this.slideCount;
    }

    public goTo(i: number): void {
        this.index = Math.min(Math.max(i, 0), this.slideCount - 1);
    }

    protected override render() {
        return html`
            <div class="track" style="transform: translateX(-${this.index * 100}%)">
                <slot @slotChange=${this.handleSlotChange}></slot>
            </div>

            ${this.slideCount > 1
                ? html`
                <button class="arrow prev" aria-label="Previous slide" @click=${() => this.prev}>&lsaquo;</button>
                <button class="arrow next" aria-label="Next slide" @click=${() => this.next}>&rsaquo;</button>
                <div class="dots" role="tablist">
                    ${Array.from({ length: this.slideCount }, (_, i) => html`
                        <button
                            class=${i === this.index ? 'dot active' : 'dot'}
                            aria-label=${ `Go to slide ${i + 1}`}
                            @click=${() => this.goTo(i)}
                        ></button>
                    `)}
                `
            : ''}
        `;
    }
}