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

import { html, nothing, type CSSResultGroup } from "lit";
import { property, state, customElement } from "lit/decorators.js";

import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";

import { qvAvatarStyles } from "./qv-avatar.styles.js";
import type { QvAvatarSize, QvAvatarShape, QvAvatarStatus } from "./qv-avatar.types.js";

function initialOf(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

@customElement('qv-avatar')
export class QvAvatar extends QvElement {
    static override styles = qvAvatarStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvAvatar',
        tagName: createTagName('avatar'),
        version: '0.1.0',
    });

    @property() public src?: string;
    @property() public name = '';
    @property({ reflect: true }) public size: QvAvatarSize = 'md';
    @property({ reflect: true }) public shape: QvAvatarShape ='circle';
    @property() public status?: QvAvatarStatus;

    @state() private imageFailed = false;

    private readonly handleImageError = (): void => {
        this.imageFailed = true;
    };

    public override onConnected(): void {
        this.setAttribute('role', 'img');
        if (this.name) this.setAttribute('aria-label', this.name);
    }

    protected override render() {
        const showImage = this.src && !this.imageFailed;

        return html`
        ${showImage
            ? html`<img src=${this.src} alt="" @error=${this.handleImageError} />`
            : html`${initialOf(this.name)}`}
        ${this.status
            ? html`<span class=${`status ${this.status}`} part="staus" aria-hidden="true"></span>`
            : nothing}
        `;
    }
}