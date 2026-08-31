/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-radio-group
 * ----------------------------------------------------------
 * Coordinates single-select among light-DOM qv-radio children —
 * plain DOM query + direct property assignment, no Context API,
 * per the "Compound Components" decision from core's audit
 * (DOM hierarchy + events is enough; don't build a
 * ContextManager without a concrete need). This is that
 * concrete need, resolved the simple way.
 *
 * The ONLY form-associated element here is the group itself —
 * individual qv-radio children are not (matches how a native
 * radio group submits exactly one value under one shared name).
 *
 * @packageDocumentation
 */

import { html, type PropertyValues } from "lit";
import { property, customElement } from "lit/decorators.js";

import { QvElement, createComponentMetadata, createTagName, FormAssociatedMixin, host, createStyles } from "@quevy/core";
import { createControllableValue } from "@quevy/state";

import type { QvRadio } from "./qv-radio.js";

const qvRadioGroupStyles = createStyles(`
${host()} {
    display: flex;
    flex-direction: column;
    gap: var(--qv-spacing-sm, 8px);
}    
`);

const QvRadioGroupBase = FormAssociatedMixin(QvElement);

@customElement('qv-radio-group')
export class QvRadioGroup extends QvRadioGroupBase {
    static override styles = qvRadioGroupStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvRadioGroup',
        tagName: createTagName('radio-group'),
        version: '0.1.1',
    });

    /** Controlled prop. Leave unset for uncontrolled usage. */
    @property() public value?: string;
    @property() public name?: string;

    private readonly controllableValue = createControllableValue<string | undefined>(undefined);

    private get currentValue(): string | undefined {
        return this.controllableValue.value(this.value);
    }

    public override onConnected(): void {
        this.setAttribute('role', 'radiogroup');
        this.addEventListener('qv-radio-activate', this.handleActivate as EventListener);
        this.addEventListener('keydown', this.handleArrowNav);
    } 

    public override onDisconnected(): void {
        this.removeEventListener('qv-radio-activate', this.handleActivate as EventListener);
        this.removeEventListener('keydown', this.handleArrowNav)
    }

    private get radios(): QvRadio[] {
        return Array.from(this.querySelectorAll('qv-radio')) as unknown as QvRadio[];
    }

    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        this.syncChildren();
        this.internals?.setFormValue(this.currentValue ?? null);
    }

    /** Pushes checked/roving-tabindex state down
     * to every qv-radio child. Called on every 
     * update, not just once, so it stays correct
     * if children are added/removed dynamically. 
     */
    private syncChildren(): void {
        const radios = this.radios;
        const current = this.currentValue;
        const checkedIndex = radios.findIndex((r) => r.value === current);

        radios.forEach((radio, index) => {
            radio.checked = radio.value === current;
            radio.tabIndex = index === (checkedIndex === -1 ? 0 : checkedIndex)? 0 : -1;
        });
    }

    private readonly handleActivate = (event: Event): void => {
        const radio = event.target as QvRadio;
        if (radio.value === this.currentValue) return;

        const resolved = this.controllableValue.request(this.value, radio.value);
        this.emit('change', { value: resolved });
        this.invalidate();
    };

    private readonly handleArrowNav = (event: KeyboardEvent): void => {
        const keys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'];
        if (!keys.includes(event.key)) return;

        const radios = this.radios.filter((r) => !r.disabled);
        if (radios.length === 0) return;

        const curretnIndex = radios.findIndex((r) => r.value === this.currentValue);
        const forward = event.key === 'ArrowDown' || event.key === 'ArrowRight';
        const nextIndex = forward
            ? (curretnIndex + 1 + radios.length) % radios.length
            : (curretnIndex - 1 + radios.length) % radios.length;

        event.preventDefault();
        const next = radios[nextIndex];
        next.focus();
        next.click();
    };

    protected override render() {
        return html `<slot></slot>`;
    }
}