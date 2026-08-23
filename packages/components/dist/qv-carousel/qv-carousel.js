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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { property, state, customElement } from "lit/decorators.js";
import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";
import { qvCarouselStyles } from "./qv-carousel.styles.js";
;
let QvCarousel = class QvCarousel extends QvElement {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvCarousel',
            tagName: createTagName('carousel'),
            version: '0.1.1',
        });
        this.autoplay = false;
        this.interval = 4000;
        this.index = 0;
        this.slideCount = 0;
        this.timer = null;
        this.pauseAutoplay = () => this.stopAutoplay();
        this.resumeAutoplay = () => this.startAutoPlay();
        this.handleSlotChange = (event) => {
            this.slideCount = event.target.assignedElements().length;
            this.index = Math.min(this.index, Math.max(0, this.slideCount - 1));
        };
    }
    static { this.styles = qvCarouselStyles; }
    onConnected() {
        this.addEventListener('pointerenter', this.pauseAutoplay);
        this.addEventListener('pointerleave', this.resumeAutoplay);
        this.startAutoPlay();
    }
    onDisconnected() {
        this.removeEventListener('pointerenter', this.pauseAutoplay);
        this.removeEventListener('pointerleave', this.resumeAutoplay);
        this.stopAutoplay();
    }
    startAutoPlay() {
        if (!this.autoplay || this.timer || this.slideCount <= 1)
            return;
        this.timer = setInterval(() => this.next(), this.interval);
    }
    stopAutoplay() {
        if (this.timer)
            clearInterval(this.timer);
        this.timer = null;
    }
    next() {
        if (this.slideCount === 0)
            return;
        this.index = (this.index + 1) % this.slideCount;
    }
    prev() {
        if (this.slideCount === 0)
            return;
        this.index = (this.index - 1 + this.slideCount) % this.slideCount;
    }
    goTo(i) {
        this.index = Math.min(Math.max(i, 0), this.slideCount - 1);
    }
    render() {
        return html `
            <div class="track" style="transform: translateX(-${this.index * 100}%)">
                <slot @slotchange=${this.handleSlotChange}></slot>
            </div>

            ${this.slideCount > 1
            ? html `
                <button class="arrow prev" aria-label="Previous slide" @click=${() => this.prev()}>&lsaquo;</button>
                <button class="arrow next" aria-label="Next slide" @click=${() => this.next()}>&rsaquo;</button>
                <div class="dots" role="tablist">
                    ${Array.from({ length: this.slideCount }, (_, i) => html `
                        <button
                            class=${i === this.index ? 'dot active' : 'dot'}
                            aria-label=${`Go to slide ${i + 1}`}
                            @click=${() => this.goTo(i)}
                        ></button>
                    `)}
                </div>
                `
            : ''}
        `;
    }
};
__decorate([
    property({ type: Boolean, reflect: true })
], QvCarousel.prototype, "autoplay", void 0);
__decorate([
    property({ type: Number })
], QvCarousel.prototype, "interval", void 0);
__decorate([
    state()
], QvCarousel.prototype, "index", void 0);
__decorate([
    state()
], QvCarousel.prototype, "slideCount", void 0);
QvCarousel = __decorate([
    customElement('qv-carousel')
], QvCarousel);
export { QvCarousel };
//# sourceMappingURL=qv-carousel.js.map