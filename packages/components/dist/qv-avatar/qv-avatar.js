/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-avatar
 * ----------------------------------------------------------
 * Falls back to initials (derived from `name`) when `src` is
 * missing or fails to load — tracked via a plain error handler
 * on <img>, not a network pre-check (simpler, and the browser
 * already does the request either way).
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
import { property, state, customElement } from "lit/decorators.js";
import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";
import { qvAvatarStyles } from "./qv-avatar.styles.js";
function initialOf(name) {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0)
        return '?';
    if (parts.length === 1)
        return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
let QvAvatar = class QvAvatar extends QvElement {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvAvatar',
            tagName: createTagName('avatar'),
            version: '0.1.1',
        });
        this.name = '';
        this.size = 'md';
        this.shape = 'circle';
        this.imageFailed = false;
        this.handleImageError = () => {
            this.imageFailed = true;
        };
    }
    static { this.styles = qvAvatarStyles; }
    onConnected() {
        this.setAttribute('role', 'img');
        if (this.name)
            this.setAttribute('aria-label', this.name);
    }
    render() {
        const showImage = this.src && !this.imageFailed;
        const DASH_ICON = html `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="10" width="16" height="4" rx="2"/></svg>`;
        return html `
        <span class="content" part="content">
            ${showImage
            ? html `<img src=${this.src} alt="" @error=${this.handleImageError} />`
            : html `${initialOf(this.name)}`}
        </span>
        ${this.status
            ? html `
                <span class=${`status ${this.status}`} part="status" aria-hidden="true">
                    ${this.status === 'dnd' ? DASH_ICON : nothing}
                </span>
            `
            : nothing}
        `;
    }
};
__decorate([
    property()
], QvAvatar.prototype, "src", void 0);
__decorate([
    property()
], QvAvatar.prototype, "name", void 0);
__decorate([
    property({ reflect: true })
], QvAvatar.prototype, "size", void 0);
__decorate([
    property({ reflect: true })
], QvAvatar.prototype, "shape", void 0);
__decorate([
    property()
], QvAvatar.prototype, "status", void 0);
__decorate([
    state()
], QvAvatar.prototype, "imageFailed", void 0);
QvAvatar = __decorate([
    customElement('qv-avatar')
], QvAvatar);
export { QvAvatar };
//# sourceMappingURL=qv-avatar.js.map