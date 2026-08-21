/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-checkbox
 * ----------------------------------------------------------
 * Pola 1 (host is the interactive element), same trio of mixins
 * as qv-button. Keyboard activation is Space only — Enter is
 * intentionally NOT wired, matching native <input
 * type="checkbox"> behavior (Enter submits the enclosing form
 * instead, it doesn't toggle the checkbox).
 *
 * `indeterminate` is presentation-only (no separate value it
 * resolves to) — same convention as the native checkbox's
 * .indeterminate property: purely visual, doesn't change what
 * `checked` reports.
 *
 * @packageDocumentation
 */

import { html, type PropertyValues } from "lit";
import { property, customElement } from "lit/decorators.js";

import { QvElement, createComponentMetadata, createTagName, FocusableMixin, DisabledMixin, FormAssociatedMixin } from "@quevy/core";

import { qvCheckboxStyles } from "./qv-checkbox.styles.js";
import type { QvCheckboxChangeEventDetail } from "./qv-checkbox.types.js";
import { createControllableValue } from "@quevy/state";

const QvCheckboxBase = FormAssociatedMixin(DisabledMixin(FocusableMixin(QvElement)));

@customElement('qv-checkbox')
export class QvCheckbox extends QvCheckboxBase {
    static override styles = qvCheckboxStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvCheckbox',
        tagName: createTagName('checkbox'),
        version: '0.1.1',
    });

    /** Controlled prop. Leave unset for uncontrolled usage. */
    @property({ type: Boolean, reflect: true})
    public checked?: boolean;

    @property({ type: Boolean, reflect: true})
    public indeterminate = false;

    @property() public name?: string;
    @property() public value = 'on';

    private readonly controllableChecked = createControllableValue<boolean>(false);

    private get isChecked(): boolean {
        return this.controllableChecked.value(this.checked);
    }

    public override onConnected(): void {
        this.addEventListener('clicked', this.handleClick);
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

        this.setAttribute('role', 'checkbox');
        this.tabIndex = this.disabled ? -1 : 0;
        this.setAttribute('aria-checked', this.indeterminate ? 'mixed' : String(this.isChecked));

        this.internals?.setFormValue(this.isChecked ? this.value : null);
    }

    private toggle(): void {
        if (this.disabled) return;

        const next = this.controllableChecked.request(this.checked, !this.isChecked);
        this.emit<QvCheckboxChangeEventDetail>('change', { checked: next });
        this.invalidate();
    }

    private readonly handleClick = (): void => this.toggle();

    private readonly handleKeyDown = (event: KeyboardEvent): void => {
        if (this.disabled) return;
        if (event.key === ' ') event.preventDefault();
    };

    private readonly handleKeyUp = (event: KeyboardEvent): void => {
        if (this.disabled) return;
        if (event.key === ' ') { event.preventDefault(); this.click(); }
    }

    protected override render() {
        return html`
            <span class="box" part="box">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                    ${this.indeterminate
                        ? html `<path d="M4 8h8" stroke-linecap="round" />`
                        : html `<path d="M3 813.5 3.5L13 5" stroke-linecap="round" stroke-linejoin="round"/>`  
                    }
                </svg>
            </span>
            <slot></slot>
        `;
    }
}