/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-progress
 * ----------------------------------------------------------
 * Horizontal loading bar. Indeterminate when `value` is unset
 * (default), determinate once a numeric `value` is provided.
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
import { property, customElement } from "lit/decorators.js";
import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";
import { qvProgressStyles } from "./qv-progress.styles.js";
let QvProgress = class QvProgress extends QvElement {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvProgress',
            tagName: createTagName('progress'),
            version: '0.1.1',
        });
        this.max = 100;
        this.variant = 'default';
    }
    static { this.styles = qvProgressStyles; }
    get isIndeterminate() {
        return this.value === undefined;
    }
    get percentage() {
        if (this.value === undefined)
            return 0;
        return Math.min(100, Math.max(0, (this.value / this.max) * 100));
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        this.setAttribute('role', 'progressbar');
        this.toggleAttribute('indeterminate', this.isIndeterminate);
        if (this.isIndeterminate) {
            this.removeAttribute('aria-valuenow');
            this.removeAttribute('aria-valuemin');
            this.removeAttribute('aria-valuemax');
        }
        else {
            this.setAttribute('aria-valuenow', String(this.value));
            this.setAttribute('aria-valuemin', '0');
            this.setAttribute('aria-valuemax', String(this.max));
        }
    }
    render() {
        return html `
            <div class="track" part="track">
                <div
                    class="bar"
                    part="bar"
                    style=${this.isIndeterminate ? '' : `width: ${this.percentage}%`}
                ></div>
            </div>
        `;
    }
};
__decorate([
    property({ type: Number })
], QvProgress.prototype, "value", void 0);
__decorate([
    property({ type: Number })
], QvProgress.prototype, "max", void 0);
__decorate([
    property({ reflect: true })
], QvProgress.prototype, "variant", void 0);
QvProgress = __decorate([
    customElement('qv-progress')
], QvProgress);
export { QvProgress };
//# sourceMappingURL=qv-progress.js.map