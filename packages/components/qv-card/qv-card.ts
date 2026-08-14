/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-card
 * ----------------------------------------------------------
 * Same interaction pattern as qv-button (Pola 1: host is the
 * interactive element). The click/keydown/keyup trio here is
 * structurally identical to qv-button's — if a third component
 * ends up needing the same "clickable host" behavior, that's
 * the signal to extract a shared internal controller. Two
 * occurrences isn't (rule of three); not extracted yet.
 *
 * @packageDocumentation
 */

import { html, type PropertyValues } from "lit";
import { property, state, customElement } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import {
    QvElement,
    createComponentMetadata,
    createTagName,
    FocusableMixin
} from '@quevy/core';

import { qvCardStyles } from "./qv-card.styles.js";
import type { QvCardVariant, QvCardTarget } from "./qv-card.types.js";

const QvCardBase = FocusableMixin(QvElement);

const INTERACTIVE_SELECTOR = 
    'a,button,input,select,textarea,summary,[tabindex],[role="button"],[role="link"]';

@customElement('qv-card')
export class QvCard extends QvCardBase {
    static override styles = qvCardStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvCard',
        tagName: createTagName('card'),
        version:  '0.2.2',
    });

    @property({ reflect: true})
    public variant: QvCardVariant = 'elevated';

    @property({  type: Boolean, reflect: true})
    public interactive = false;

    @property({ reflect: true })
    public href?: string;

    @property()
    public target?: QvCardTarget;

    @state() private hasMedia = false;
    @state() private hasTitle = false;
    @state() private hasDescription = false;
    @state() private hasFooter = false;
    @state() private hasActions = false;

    private get isInteractive(): boolean{
        return this.interactive || Boolean(this.href);
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

    protected override updated(changedProperties: PropertyValues): void{
        super.updated(changedProperties);
        this.syncAccessibility();
    }

    private syncAccessibility(): void {
        if (!this.isInteractive) {
            this.removeAttribute('role');
            this.removeAttribute('tabIndex');
            return;
        }

        this.setAttribute('role', this.href ? 'link' : 'button');
        this.tabIndex = 0;
    }

    /**
     * True if the event originated form a genuinely interactive
     * descendant (e.g. a <qv-button> in the footer slot), so  the
     * card can avoid firing its own action on top of whatever
     * that inner element already did.
     */
    private originatesFromInteractiveDescendant(event: Event): boolean {
        for (const node of event.composedPath()) {
            if (node === this) {
                return false;
            }

            if (node instanceof Element && node.matches(INTERACTIVE_SELECTOR)) {
                return true;
            }
        }

        return false;
    }

    private readonly handleClick = (event: MouseEvent): void => {
        if (!this.isInteractive || this.originatesFromInteractiveDescendant(event)) {
            return;
        }

        this.activate();
    }

    private readonly handleKeyDown = (event:  KeyboardEvent): void => {
        if (!this.isInteractive || this.originatesFromInteractiveDescendant(event)) {
            return;
        }

        if (event.key === ' ') {
            event.preventDefault();
        }

        if (event.key === 'Enter') {
            event.preventDefault();
            this.click();
        }
    };

    private readonly handleKeyUp = (event: KeyboardEvent): void => {
        if (!this.isInteractive  || this.originatesFromInteractiveDescendant(event)) {
            return;
        }

        if (event.key === ' ') {
            event.preventDefault();
            this.click();
        }
    };

    private activate(): void {
        if  (this.href) {
            this.navigate();
        }

        // Button-like mode (no href): no default action beyond
        // the native 'click' event, already bubbled to whatever
        // listener the consumer attached to <qv-card>.
    }

    private navigate(): void {
        if (!this.href) {
            return
        }

        if (this.target && this.target !== '_self') {
            // noopener, noreferrer: prevents the opened page from
            // getting a `window.opener` reference back to this one
            // (reverse tabnabbing) - same as rel="noopener noreferrer"
            // on a real  <a target="_blank">.
            window.open(this.href, this.target, 'noopener,noreferrer');
            return;
        }

        window.location.assign(this.href);
    }

    private readonly handleMediaSlotChange = (): void => {
        this.hasMedia = this.hasSlot('media');
    };

    private readonly handleTitleSlotChange = (): void => {
        this.hasTitle = this.hasSlot('title');
    };

    private readonly handleDescriptionSlotChange = (): void => {
        this.hasDescription = this.hasSlot('description');
    };

    private readonly handleFooterSlotChange = (): void => {
        this.hasFooter = this.hasSlot('footer');
    };

    private readonly handleActionsSlotChange = (): void => {
        this.hasActions = this.hasSlot('actions');
    }

    protected override render(): unknown {
        return html`
            <div class=${classMap({ actions: true, empty: !this.hasActions})} part="actions">
                <slot name="actions" @slotchange=${this.handleActionsSlotChange}></slot>
            </div>

            <div class=${classMap({ media: true, empty: !this.hasMedia})} part="media">
                <slot name="media" @slotchange=${this.handleMediaSlotChange}></slot>
            </div>

            <div
                class=${classMap({
                    header: true,
                    empty: !this.hasTitle && !this.hasDescription,
                })}
                part="header"
            >
                <div class=${classMap({ title: true, empty: !this.hasTitle})} part="title">
                    <slot name="title" @slotchange=${this.handleTitleSlotChange}></slot>
                </div>
                <div
                    class=${classMap({ description: true,  empty: !this.hasDescription})}
                    part="description"
                >
                    <slot
                        name="description"
                        @slotchange=${this.handleDescriptionSlotChange}
                    ></slot>
                </div>
            </div>

            <div class="body" part="body">
                <slot></slot>
            </div>

            <div class=${classMap({ footer:true, empty: !this.hasFooter })} part="footer">
                <slot name="footer" @slotchange=${this.handleFooterSlotChange}></slot>
            </div>
        `;
    }
}