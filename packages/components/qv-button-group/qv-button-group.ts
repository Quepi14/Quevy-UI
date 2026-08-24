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

import { html, type CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";

import { qvButtonGroupStyles } from "./qv-button-group.styles.js";

@customElement('qv-button-group')
export class QvButtonGroup extends QvElement {
    static override styles = qvButtonGroupStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvButtonGroup',
        tagName: createTagName('button-group'),
        version: '0.1.1',
    });

    public override onConnected(): void {
        this.setAttribute('role', 'group');
    }

    protected override render() {
        return html`<slot></slot>`;
    }
}