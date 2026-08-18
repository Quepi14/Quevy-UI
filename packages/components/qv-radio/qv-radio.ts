/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-radio
 * ----------------------------------------------------------
 * Deliberately NOT self-managing `checked` — that's pushed down
 * imperatively by the enclosing qv-radio-group. This component
 * only reports intent (click/keyboard) via a plain DOM event
 * the group listens for; it never decides its own checked state.
 *
 * @packageDocumentation
 */
import { html, type PropertyValues } from "lit";
import { property, customElement } from "lit/decorators.js";

import { QvElement, createComponentMetadata, createTagName, FocusableMixin, DisabledMixin } from "@quevy/core";

import { qvRadioStyles } from "./qv-radio.styles.js";

const QvRadioBase = DisabledMixin(FocusableMixin(QvElement));

@customElement('qv-radio')
export class QvRadio extends QvRadioBase {
    static override styles = qvRadioStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvRadio',
        tagName: createTagName('radio'),
        version: '0.1.0',
    });

    @property() public value = '';

    /** Set imperatively by the parent qv-radio-group - do not bind this from outside. */
    @property({ type: Boolean, reflect: true})
    public checked = false;

    public override onConnected(): void {
        this.addEventListener('click', this.handleActivate);
        this.addEventListener('keydown', this.handleKeyDown);
        this.addEventListener('keyup', this.handleKeyUp);
    }

    public override onDisconnected(): void {
        this.removeEventListener('click', this.handleActivate);
        this.removeEventListener('keydown', this.handleKeyDown);
        this.removeEventListener('keyup', this.handleKeyUp);
    }

    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        this.setAttribute('role', 'radio');
        this.setAttribute('aria-checked', String(this.checked));
        // Roving tabindex: only the checked radio (or the first,
        // if none checked yet) is tab-reachable - matches native
        // radio-group keyboard behavior. Group finalizes this;
        // see qv-radio-group's syncRovingTabindex(.)
    }

    private readonly handleActivate = (): void => {
        if (this.disabled) return;
        this.dispatchEvent(new CustomEvent('qv-radio-activate', { bubbles: true, composed: true}));
    };

    private readonly handleKeyDown = (event: KeyboardEvent): void => {
        if (this.disabled) return;
        if (event.key === ' ') event.preventDefault();
    };

    private readonly handleKeyUp = (event: KeyboardEvent): void => {
        if (this.disabled) return;
        if (event.key === ' ') { event.preventDefault(); this.click(); }
    };

    protected override render() {
        return html`
            <span class="dot-outer" part="dot-outer"><span class="dot-inner" part="dot-inner"></span></span>
            <slot></slot>
        `;
    }
}