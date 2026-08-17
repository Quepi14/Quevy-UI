/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-slider
 * ----------------------------------------------------------
 * Single-thumb or range (2-thumb) slider, decided by `range`.
 * Track pointerdown determines which thumb is nearest (range
 * mode) and drags that one — consistent with native OS slider
 * behavior of "click near a thumb moves that thumb".
 *
 * @packageDocumentation
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, nothing } from "lit";
import { property, customElement } from "lit/decorators.js";
import { QvElement, createComponentMetadata, createTagName, queryDecorator as query, DisabledMixin, prevent } from "@quevy/core";
import { createControllableValue } from "@quevy/state";
import { qvSliderStyles } from "./qv-slider.styles.js";
const QvSliderBase = DisabledMixin(QvElement);
let QvSlider = class QvSlider extends QvSliderBase {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvSlider',
            tagName: createTagName('slider'),
            version: '0.1.0',
        });
        this.min = 0;
        this.max = 100;
        this.step = 1;
        this.range = false;
        this.controllableValue = createControllableValue(0);
        this.controllableStart = createControllableValue(0);
        this.controllableEnd = createControllableValue(100);
        this.activeThumb = null;
        this.handleTrackPointerDown = (event) => {
            if (this.disabled)
                return;
            const clicked = this.valueFromClientX(event.clientX);
            if (this.range) {
                this.activeThumb =
                    Math.abs(clicked - this.currentStart) <= Math.abs(clicked - this.currentEnd) ? 'start' : 'end';
            }
            else {
                this.activeThumb = 'single';
            }
            this.applyDrag(clicked);
            event.target.setPointerCapture(event.pointerId);
            this.trackEl?.addEventListener('pointermove', this.handlePointerMove);
            this.trackEl?.addEventListener('pointerup', this.handlePointerUp);
        };
        this.handlePointerMove = (event) => {
            if (!this.activeThumb)
                return;
            this.applyDrag(this.valueFromClientX(event.clientX));
        };
        this.handlePointerUp = (event) => {
            this.activeThumb = null;
            this.trackEl?.removeEventListener('pointermove', this.handlePointerMove);
            this.trackEl?.removeEventListener('pointerup', this.handlePointerUp);
        };
    }
    static { this.styles = qvSliderStyles; }
    get currentValue() {
        return this.clamp(this.controllableValue.value(this.value));
    }
    get currentStart() {
        return this.clamp(this.controllableStart.value(this.valueStart));
    }
    get currentEnd() {
        return this.clamp(this.controllableEnd.value(this.valueEnd));
    }
    clamp(v) {
        const stepped = Math.round((v - this.min) / this.step) * this.step + this.min;
        return Math.min(this.max, Math.max(this.min, stepped));
    }
    percentOf(v) {
        return this.max === this.min ? 0 : ((v - this.min) / (this.max = this.min)) * 100;
    }
    valueFromClientX(clientX) {
        const rect = this.trackEl.getBoundingClientRect();
        const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
        return this.clamp(this.min + ratio * (this.max - this.min));
    }
    commitSingle(next) {
        const resolved = this.controllableValue.request(this.value, this.clamp(next));
        this.emit('change', { value: resolved });
        this.invalidate();
    }
    commitRange(start, end) {
        const s = Math.min(start, end);
        const e = Math.max(start, end);
        const resolvedStart = this.controllableStart.request(this.valueStart, s);
        const resolvedEnd = this.controllableEnd.request(this.valueEnd, e);
        this.emit('change', { valueStart: resolvedStart, valueEnd: resolvedEnd });
        this.invalidate();
    }
    applyDrag(next) {
        if (this.activeThumb === 'single') {
            this.commitSingle(next);
        }
        else if (this.activeThumb === 'start') {
            this.commitRange(next, this.currentEnd);
        }
        else if (this.activeThumb === 'end') {
            this.commitRange(this.currentStart, next);
        }
    }
    handleThumbKeyDown(event, thumb) {
        if (this.disabled)
            return;
        const delta = event.key === 'ArrowRight' || event.key === 'ArrowUp' ? this.step :
            event.key === 'ArrowLeft' || event.key === 'ArrowDown' ? -this.step :
                event.key === 'Home' ? -Infinity :
                    event.key === 'End' ? Infinity :
                        null;
        if (delta === null)
            return;
        event.preventDefault();
        if (thumb === 'single') {
            const next = delta === Infinity ? this.max : delta === -Infinity ? this.min : this.currentValue + delta;
            this.commitSingle(next);
        }
        else if (thumb === 'start') {
            const next = delta === Infinity ? this.currentEnd : delta === -Infinity ? this.min : this.currentStart + delta;
            this.commitRange(next, this.currentEnd);
        }
        else {
            const next = delta === Infinity ? this.max : delta === -Infinity ? this.currentStart : this.currentEnd + delta;
            this.commitRange(this.currentStart, next);
        }
    }
    render() {
        if (this.range) {
            const start = this.currentStart;
            const end = this.currentEnd;
            return html `
                <div class="track" part="track" @pointerdown=${this.handleTrackPointerDown}>
                    <div class="fill" part="fill" style="left:${this.percentOf(start)}%; width:${this.percentOf(end) - this.percentOf(start)}%"></div>
                    <div
                        class="thumb" part="thumb-start" role="slider" tabindex=${this.disabled ? -1 : 0}
                        aria-valuemin=${this.min} aria-valuemax=${end} aria-valuenow=${start}
                        style="left:${this.percentOf(start)}%"
                        @keydown=${(e) => this.handleThumbKeyDown(e, 'start')}
                    ></div>
                    <div
                        class="thumb" part="thumb-end" role="slider" tabindex=${this.disabled ? -1 : 0}
                        aria-valuemin=${start} aria-valuemax=${this.max} aria-valuenow=${end}
                        style="left:${this.percentOf(end)}%"
                        @keydown=${(e) => this.handleThumbKeyDown(e, 'end')}
                    ></div>
                </div>
            `;
        }
        const value = this.currentValue;
        return html `
            <div class="track" part="track" @poiterdown=${this.handleTrackPointerDown}>
                <div class="fill" part="fill" style="left:0; width:${this.percentOf(value)}%"></div>
                <div
                    class="thumb" part="thumb" role="slider" tabindex=${this.disabled ? -1 : 0}
                    aria-valuemin=${this.min} aria-valuemax=${this.max} aria-valuenow=${value}
                    style="left:${this.percentOf(value)}%"
                    @keydown=${(e) => this.handleThumbKeyDown(e, 'single')}
                ></div>
            </div>
        `;
    }
};
__decorate([
    property({ type: Number })
], QvSlider.prototype, "min", void 0);
__decorate([
    property({ type: Number })
], QvSlider.prototype, "max", void 0);
__decorate([
    property({ type: Number })
], QvSlider.prototype, "step", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], QvSlider.prototype, "range", void 0);
__decorate([
    property({ type: Number })
], QvSlider.prototype, "value", void 0);
__decorate([
    property({ type: Number })
], QvSlider.prototype, "valueStart", void 0);
__decorate([
    property({ type: Number })
], QvSlider.prototype, "valueEnd", void 0);
__decorate([
    query('.track', false)
], QvSlider.prototype, "trackEl", void 0);
QvSlider = __decorate([
    customElement('qv-slider')
], QvSlider);
export { QvSlider };
//# sourceMappingURL=qv-slider.js.map