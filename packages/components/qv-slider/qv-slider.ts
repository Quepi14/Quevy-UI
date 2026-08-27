/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-slider
 * ----------------------------------------------------------
 * Single-thumb or range (2-thumb) slider, decided by `range`.
 * Track pointerdown determines which thumb is nearest (range
 * mode) and drags that one — consistent with native OS slider
 * behavior of "click near a thumb moves that thumb".
 *
 * @event {CustomEvent<QvSliderChangeEventDetail>} change - Fired when the value (or range) commits.
 *
 * @packageDocumentation
 */

import { html, nothing } from "lit";
import { property, customElement, state } from "lit/decorators.js";

import { QvElement, createComponentMetadata, createTagName, queryDecorator as query, DisabledMixin, prevent } from "@quevy/core";
import { createControllableValue } from "@quevy/state";

import { qvSliderStyles } from "./qv-slider.styles.js";
import type { QvSliderChangeEventDetail, QvSliderLabelPosition } from "./qv-slider.types.js";

const QvSliderBase = DisabledMixin(QvElement);

@customElement('qv-slider')
export class QvSlider extends QvSliderBase {
    static override styles = qvSliderStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvSlider',
        tagName: createTagName('slider'),
        version: '0.2.1',
    });

    @property({ type: Number }) public min = 0;
    @property({ type: Number }) public max = 100;
    @property({ type: Number }) public step = 1;
    @property({ type: Boolean, reflect: true }) public range = false;

    @property({ reflect: true, attribute: 'label-position' })
    public labelPosition: QvSliderLabelPosition = 'none';

    /** Single mode. Leave unset for uncontrolled usage. */
    @property({ type: Number }) public value?: number;
    /** Range mode. Leave unset for uncontrolled usage. */
    @property({ type: Number, attribute: 'value-start' }) public valueStart?: number;
    @property({ type: Number, attribute: 'value-end' }) public valueEnd?: number;

    private readonly controllableValue = createControllableValue<number>(0);
    private readonly controllableStart = createControllableValue<number>(0);
    private readonly controllableEnd = createControllableValue<number>(100);

    @query('.track', false) private trackEl!: HTMLElement | null;
    @state() private activeThumb: 'single' | 'start' | 'end' | null = null;

    private get currentValue(): number {
        return this.clamp(this.controllableValue.value(this.value));
    }

    private get currentStart(): number {
        return this.clamp(this.controllableStart.value(this.valueStart));
    }

    private get currentEnd(): number {
        return this.clamp(this.controllableEnd.value(this.valueEnd));
    }

    private clamp(v: number): number {
        if (v == null || Number.isNaN(v)) return this.min;
        const stepped = Math.round((v - this.min) / this.step) * this.step + this.min;
        return Math.min(this.max, Math.max(this.min, stepped));
    }

    private percentOf(v: number): number {
        return this.max === this.min ? 0 : ((v - this.min) / (this.max - this.min)) * 100;
    }

    private valueFromClientX(clientX: number): number {
        const rect = this.trackEl!.getBoundingClientRect();
        const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
        return this.clamp(this.min + ratio * (this.max - this.min));
    }

    private commitSingle(next: number): void {
        const resolved = this.controllableValue.request(this.value, this.clamp(next));
        this.emit<QvSliderChangeEventDetail>('change', { value: resolved });
        this.invalidate();
    }

    private commitRange(start: number, end: number): void {
        const s = Math.min(start, end);
        const e = Math.max(start, end);
        const resolvedStart = this.controllableStart.request(this.valueStart, s);
        const resolvedEnd = this.controllableEnd.request(this.valueEnd, e);
        this.emit<QvSliderChangeEventDetail>('change', { valueStart: resolvedStart, valueEnd: resolvedEnd });
        this.invalidate();
    }

    private readonly handleTrackPointerDown = (event: PointerEvent): void => {
        if (this.disabled) return;

        prevent(event);

        const clicked = this.valueFromClientX(event.clientX);

        if (this.range) {
            this.activeThumb =
                Math.abs(clicked - this.currentStart) <= Math.abs(clicked - this.currentEnd) ? 'start' : 'end';
        } else {
            this.activeThumb = 'single';
        }

        this.applyDrag(clicked);
        this.trackEl?.setPointerCapture(event.pointerId);
        this.trackEl?.addEventListener('pointermove', this.handlePointerMove);
        this.trackEl?.addEventListener('pointerup', this.handlePointerUp);
    };

    private readonly handlePointerMove = (event: PointerEvent): void => {
        if (!this.activeThumb) return;
        this.applyDrag(this.valueFromClientX(event.clientX));
    };

    private readonly handlePointerUp = (event: PointerEvent): void => {
        this.activeThumb = null;
        this.trackEl?.releasePointerCapture(event.pointerId);
        this.trackEl?.removeEventListener('pointermove', this.handlePointerMove);
        this.trackEl?.removeEventListener('pointerup', this.handlePointerUp);
    };

    private applyDrag(next: number): void {
        if (this.activeThumb === 'single') {
            this.commitSingle(next);
        } else if (this.activeThumb === 'start') {
            this.commitRange(next, this.currentEnd);
        } else if (this.activeThumb === 'end') {
            this.commitRange(this.currentStart, next);
        }
    }

    private handleThumbKeyDown(event: KeyboardEvent, thumb: 'single' | 'start' | 'end'): void {
        if (this.disabled) return;

        const delta =
            event.key === 'ArrowRight' || event.key === 'ArrowUp' ? this.step :
            event.key === 'ArrowLeft' || event.key === 'ArrowDown' ? -this.step :
            event.key === 'Home' ? -Infinity :
            event.key === 'End' ? Infinity :
            null;

        if (delta === null) return;
        event.preventDefault();

        if (thumb === 'single') {
            const next = delta === Infinity ? this.max : delta === -Infinity ? this.min : this.currentValue + delta;
            this.commitSingle(next);
        } else if (thumb === 'start') {
            const next = delta === Infinity ? this.currentEnd : delta === -Infinity ? this.min : this.currentStart + delta;
            this.commitRange(next, this.currentEnd);
        } else {
            const next = delta === Infinity ? this.max : delta === -Infinity ? this.currentStart : this.currentEnd + delta;
            this.commitRange(this.currentStart, next);
        }
    }

    private renderThumbLabel(value: number) {
        if (this.labelPosition !== 'floating') return nothing;
        return html`<span class="label-floating" part="label-floating">${value}</span>`;
    }

    protected override render() {
        const sideLabel = (value: number) =>
            this.labelPosition === 'side'
                ? html`<span class="label-side" part="label-side">${value}</span>`
                : nothing;

        if (this.range) {
            const start = this.currentStart;
            const end = this.currentEnd;
            return html`
                ${sideLabel(start)}
                <div class="track" part="track" @pointerdown=${this.handleTrackPointerDown}>
                    <div class="fill" part="fill" style="left:${this.percentOf(start)}%; width:${this.percentOf(end) - this.percentOf(start)}%"></div>
                    <div
                        class="thumb" part="thumb-start" role="slider" tabindex=${this.disabled ? -1 : 0}
                        aria-valuemin=${this.min} aria-valuemax=${end} aria-valuenow=${start}
                        style="left:${this.percentOf(start)}%"
                        @keydown=${(e: KeyboardEvent) => this.handleThumbKeyDown(e, 'start')}
                    >${this.renderThumbLabel(start)}</div>
                    <div
                        class="thumb" part="thumb-end" role="slider" tabindex=${this.disabled ? -1 : 0}
                        aria-valuemin=${start} aria-valuemax=${this.max} aria-valuenow=${end}
                        style="left:${this.percentOf(end)}%"
                        @keydown=${(e: KeyboardEvent) => this.handleThumbKeyDown(e, 'end')}
                    >${this.renderThumbLabel(end)}</div>
                </div>
                ${sideLabel(end)}
            `;
        }

        const value = this.currentValue;
        return html`
            ${sideLabel(this.min)}
            <div class="track" part="track" @pointerdown=${this.handleTrackPointerDown}>
                <div class="fill" part="fill" style="left:0; width:${this.percentOf(value)}%"></div>
                <div
                    class="thumb" part="thumb" role="slider" tabindex=${this.disabled ? -1 : 0}
                    aria-valuemin=${this.min} aria-valuemax=${this.max} aria-valuenow=${value}
                    style="left:${this.percentOf(value)}%"
                    @keydown=${(e: KeyboardEvent) => this.handleThumbKeyDown(e, 'single')}
                >${this.renderThumbLabel(value)}</div>
            </div>
            ${sideLabel(value)}
        `;
    }
}