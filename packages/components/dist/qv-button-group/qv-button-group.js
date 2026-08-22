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
import { customElement } from "lit/decorators.js";
import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";
import { qvButtonGroupStyles } from "./qv-button-group.styles.js";
let QvButtonGroup = class QvButtonGroup extends QvElement {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvButtonGroup',
            tagName: createTagName('button-group'),
            version: '0.1.0',
        });
    }
    static { this.styles = qvButtonGroupStyles; }
    onConnected() {
        this.setAttribute('role', 'group');
    }
    render() {
        return html `<slot></slot>`;
    }
};
QvButtonGroup = __decorate([
    customElement('qv-button-group')
], QvButtonGroup);
export { QvButtonGroup };
//# sourceMappingURL=qv-button-group.js.map