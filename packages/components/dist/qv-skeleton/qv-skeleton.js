/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-skeleton
 * ----------------------------------------------------------
 * Purely visual loading placeholder. No slots, no interaction,
 * no render() override needed — the host element itself IS the
 * placeholder box; sizing is left entirely to the consumer via
 * inline style (width/height), same as any block element.
 *
 * @packageDocumentation
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { property, customElement } from "lit/decorators.js";
import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";
import { qvSkeletonStyles } from "./qv-skeleton.styles.js";
let QvSkeleton = class QvSkeleton extends QvElement {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvSkeleton',
            tagName: createTagName('skeleton'),
            version: '0.1.1',
        });
        this.shape = 'text';
        this.animation = 'pulse';
    }
    static { this.styles = qvSkeletonStyles; }
    onConnected() {
        // Decorative placeholder - a loading region should be
        // announced bt its container (role="status" + sr-only
        // text), not  by each individual skeleton shape. Only set
        // if the consumer hasn't already overridden it.
        if (!this.hasAttribute('aria-hidden')) {
            this.setAttribute('aria-hidden', 'true');
        }
    }
};
__decorate([
    property({ reflect: true })
], QvSkeleton.prototype, "shape", void 0);
__decorate([
    property({ reflect: true })
], QvSkeleton.prototype, "animation", void 0);
QvSkeleton = __decorate([
    customElement('qv-skeleton')
], QvSkeleton);
export { QvSkeleton };
//# sourceMappingURL=qv-skeleton.js.map