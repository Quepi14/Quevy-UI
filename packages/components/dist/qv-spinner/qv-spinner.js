var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-spinner
 * ----------------------------------------------------------
 * Standalone indeterminate loading indicator. Deliberately NOT
 * yet reused by qv-button/qv-state's own inline spinners (3
 * separate implementations now exist) — consumer decided to
 * defer that consolidation. Revisit if a 4th spinner need shows
 * up, or whenever convenient.
 *
 * @packageDocumentation
 */
import { html } from "lit";
import { property, customElement } from "lit/decorators.js";
import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";
import { qvSpinnerStyles } from "./qv-spinner.styles.js";
let QvSpinner = class QvSpinner extends QvElement {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvSpinner',
            tagName: createTagName('spinner'),
            version: '0.1.0',
        });
        this.size = 'md';
    }
    static { this.styles = qvSpinnerStyles; }
    onConnected() {
        this.setAttribute('role', 'status');
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (this.label) {
            this.setAttribute('aria-label', this.label);
            this.removeAttribute('aria-hidden');
        }
        else {
            this.removeAttribute('aria-label');
            this.setAttribute('aria-hidden', 'true');
        }
    }
    render() {
        return html `<span class="spinner" part="spinner"></span>`;
    }
};
__decorate([
    property({ reflect: true })
], QvSpinner.prototype, "size", void 0);
__decorate([
    property()
], QvSpinner.prototype, "label", void 0);
QvSpinner = __decorate([
    customElement('qv-spinner')
], QvSpinner);
export { QvSpinner };
//# sourceMappingURL=qv-spinner.js.map