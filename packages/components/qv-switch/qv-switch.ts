/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-switch
 * ----------------------------------------------------------
 * Structurally identical to qv-checkbox (same mixins, same
 * controlled/uncontrolled + keyboard pattern) — only role
 * ("switch" vs "checkbox") and rendering differ. Deliberately
 * NOT sharing an abstract base with qv-checkbox yet: the
 * duplication is small (a handful of lines), and forcing a
 * shared base now would be premature — revisit only if a third
 * toggle-like component needs the same shape.
 *
 * @packageDocumentation
 */
import { html, type PropertyValues } from "lit";
import { property, customElement } from "lit/decorators.js";

import { QvElement, createComponentMetadata, createTagName, FocusableMixin, DisabledMixin, FormAssociatedMixin } from "@quevy/core";

import { qvSwitchStyles } from "./qv-switch.styles.js";
import type { QvCheckboxChangeEventDetail } from "../qv-checkbox/qv-checkbox.types.js";
import { createControllableValue } from "@quevy/state";

const QvSwitchBase = FormAssociatedMixin(DisabledMixin(FocusableMixin(QvElement)));

@customElement('qv-switch')
export class QvSwitch extends QvSwitchBase {
    static override styles = qvSwitchStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvSwitch',
        tagName: createTagName('switch'),
        version: '0.1.0',
    });

    @property({ type: Boolean, reflect: true})
    public checked?: boolean;

    @property() public name?: string
    @property() public value = 'on';

    private readonly controllableChecked = createControllableValue<boolean>(false);

    private get isChecked(): boolean {
        return this.controllableChecked.value(this.checked);
    }

    public override onConnected(): void {
        this.addEventListener('click', this.handleClick);
        this.addEventListener('keydown', this.handleKeyDown);
        this.addEventListener('keyup', this.handleKeyUp);
    }

    public override onDisconnected(): void {
        this.removeEventListener('click', this.handleClick);
        this.removeEventListener('keydown', this.handleKeyDown);
        this.removeEventListener('keyup', this.handleKeyUp);
    }

    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        this.setAttribute('role', 'switch');
        this.tabIndex = this.disabled ? -1 : 0;
        this.setAttribute('aria-checked', String(this.isChecked));
        this.internals?.setFormValue(this.isChecked ? this.value : null);
    }

    private toggle(): void {
        if (this.disabled) return;
        const next = this.controllableChecked.request(this.checked, !this.isChecked);
        this.emit<QvCheckboxChangeEventDetail>('change', { checked: next});
        this.invalidate()
    }

    private readonly handleClick = (): void => this.toggle();
    private readonly handleKeyDown = (event:KeyboardEvent): void => {
        if(this.disabled) return;
        if(event.key === ' ') event.preventDefault();
    };
    private readonly handleKeyUp = (event: KeyboardEvent): void => {
        if(this.disabled) return;
        if(event.key === ' ') { event.preventDefault(); this.click(); }
    }

    protected override render() {
        return html `
            <span class="track" part="track"><span class="thumb" part="thumb"></span></span>
            <slot></slot>
        `;
    }
}