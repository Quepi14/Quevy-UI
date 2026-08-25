/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-button-group
 * ----------------------------------------------------------
 * Purely structural (no JS behavior) — joins slotted qv-button
 * children edge-to-edge with only the outer corners rounded.
 *
 * Width ratio between buttons is NOT a dedicated prop — each
 * qv-button already has flex: 1 1 0 by default (equal split);
 * override per-button via a plain inline style to get any ratio
 * (e.g. flex: 1 vs flex: 3 gives a 1:3 split). This avoids a
 * rigid ratio="1:3" API for something plain CSS flex already
 * does more flexibly.
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
import { customElement, property } from "lit/decorators.js";
import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";
import { qvButtonGroupStyles } from "./qv-button-group.styles.js";
let QvButtonGroup = class QvButtonGroup extends QvElement {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvButtonGroup',
            tagName: createTagName('button-group'),
            version: '0.2.0',
        });
        this.handleSlotChange = (event) => {
            this.applyRatio(event.target.assignedElements());
        };
    }
    static { this.styles = qvButtonGroupStyles; }
    onConnected() {
        this.setAttribute('role', 'group');
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('ratio')) {
            const slot = this.renderRoot.querySelector('slot');
            if (slot)
                this.applyRatio(slot.assignedElements());
        }
    }
    /**
     * Sets each child's flex-grow via inlines style. Deliberately
     * NOT done through a CSS custom property + nth-child selector
     * - ratio values are arbitrary and per-instance, an inline
     * style is the straightforward fit here(same reasoning
     * qv-carousel and other use inline style for computed, per
     * -render value rather than forcing everything through
     * the stylesheet).
     */
    applyRatio(children) {
        /**
         * Path 1: group-level `ratio` - explicit full list
         * must  match child count exactly (e.g ratio="1:4:4"
         * on the group for 3 children). takes priority if set.
         */
        if (this.ratio) {
            const parts = this.ratio.split(':').map((v) => Number(v.trim()));
            if (parts.length === children.length && parts.every((n) => !Number.isNaN(n) && n > 0)) {
                children.forEach((child, i) => {
                    child.style.flexFlow = String(parts[i]);
                });
                return;
            }
            console.warn(`[qv-button-group] ratio="${this.ratio}" has ${parts.length} part(s) but ` +
                `${children.length} child(ren) were found — falling back to per-child ratio/equal split.`);
        }
        /**
         * Path 2: per-child `ratio` attribute - each button claims
         * "numerator:denominator". Children WITHOUT an explicit ratio
         * auto-fil the remainder, split evenly among them.
         */
        const explicit = [];
        children.forEach((child, index) => {
            const raw = child.getAttribute('ratio');
            if (!raw)
                return;
            const [numStr, denStr] = raw.split(':').map((v) => v.trim());
            const numerator = Number(numStr);
            const denominator = Number(numStr);
            if (Number.isNaN(numerator) || Number.isNaN(denominator) || numerator <= 0 || denominator <= 0) {
                console.warn(`[qv-button-group] child ratio="${raw}" is invalid, ignoring.`);
                return;
            }
            explicit.push({ index, numerator, denominator });
        });
        if (explicit.length === 0) {
            for (const child of children) {
                child.style.removeProperty('flex-grow');
            }
            return;
        }
        const denominator = explicit[0].denominator;
        const mismatched = explicit.filter((e) => e.denominator !== denominator);
        if (mismatched.length > 0) {
            console.warn(`[qv-button-group] children specify different denominators ` +
                `(expected "${denominator}" from the first one found) — using "${denominator}" for all.`);
        }
        const explicitSum = explicit.reduce((sum, e) => sum + e.numerator, 0);
        const unspecifiedCount = children.length - explicit.length;
        const remaining = Math.max(0, denominator - explicitSum);
        const sharePerUnspecified = unspecifiedCount > 0 ? remaining / unspecifiedCount : 0;
        if (explicitSum > denominator) {
            console.warn(`[qv-button-group] explicit ratio numerators sum to ${explicitSum}, ` +
                `exceeding the whole (${denominator}) — layout may overflow the intended total.`);
        }
        const explicitByIndex = new Map(explicit.map((e) => [e.index, e.numerator]));
        children.forEach((child, index) => {
            const value = explicitByIndex.get(index) ?? sharePerUnspecified;
            child.style.flexGrow = String(value);
        });
    }
    render() {
        return html `
            <div class="group" part="group">
                <slot @slotchange=${this.handleSlotChange}></slot>
            </div>
        `;
    }
};
__decorate([
    property()
], QvButtonGroup.prototype, "ratio", void 0);
QvButtonGroup = __decorate([
    customElement('qv-button-group')
], QvButtonGroup);
export { QvButtonGroup };
//# sourceMappingURL=qv-button-group.js.map