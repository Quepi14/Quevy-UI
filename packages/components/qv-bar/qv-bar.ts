/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-bar
 * ----------------------------------------------------------
 * Structural layout component covering topbar/navbar/footbar
 * (position="top"/"bottom") and sidebar (position="left"/
 * "right"). Deliberately near-zero JS behavior — this is a
 * layout primitive, not an interactive component, closer in
 * complexity to qv-card than to qv-modal/qv-dropdown.
 *
 * @packageDocumentation
 */

import { customElement, property } from "lit/decorators.js";
import { html } from "lit";

import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";;

import { qvBarStyles } from "./qv-bar.styles.js";
import type { QvBarPosition } from "./qv-bar.types.js";

@customElement('qv-bar')
export class QvBar extends QvElement {
    static override styles = qvBarStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvBar',
        tagName: createTagName('bar'),
        version: '0.1.0',
    });

    @property({ reflect: true})
    public position: QvBarPosition = 'top';

    @property({ type: Boolean, reflect: true })
    public sticky = false;

    public override onConnected(): void {
        const isVertical = this.position === 'left' || this.position === 'right';
        this.setAttribute('role', isVertical ? 'complementary' : 'banner');
    }

    public override render() {
        return html`
            <slot name="start"></slot>
            <slot name="center"></slot>
            <slot name="end"></slot>
        `;
    }
}