/**
 * ----------------------------------------------------------
 * QUEVY UI
 * ----------------------------------------------------------
 * Base element for every Quevy UI Web Component.
 * 
 * All components should extend QvElement instead o f LitElement directly.
 * 
 * Responsibilities
 * ----------------
 * - Component  metadata
 * - Lifecylce bridge
 * - Shadow DOM access
 * - Internal helpers
 * 
 * NOTE:
 * Event helpers, Slot helpers, CSS Variable helpers,
 * Accessability helpers, and ID helpers will be implemented
 * in the next parts of this file.
 * 
 * @packageDocumentation
 */

import { LitElement, type PropertyValues } from 'lit';

import type {
    BaseComponent,
    ComponentMetadata,
} from './component.js';

import {
    createComponentMetadata,
    createTagName,
} from './component.js';

import type {
    QvLifecycle,
} from './lifecycle.js';

/**
 * Base class for every QUEVY UI component.
 * 
 * This class centralizes all common behaviors that should
 * be shared across every component.
 */
export abstract class QvElement extends LitElement implements BaseComponent, QvLifecycle {
 /**
  * Component metadata.
  * 
  * Every derived component should override this property
  */
 public readonly metadata: ComponentMetadata =
    createComponentMetadata({
        name: "QvElement",
        tagName: createTagName("element"),
        version: "0.1.0",
    });
    
    /**
     * Whether the component has completed
     * its first render cycle.
     */
    protected hasRendered: boolean = false;

    /**
     * Creates the component.
     */
    protected constructor() {
        super();
    }

    /**
     * -----------
     * Lifecycle Section
     * -----------
     */

    /**
     * Called when the component is attached to the DOM.
     */
    public override connectedCallback(): void{
        (this as QvLifecycle).onConnected?.();

        super.connectedCallback()
    }

    /**
     * Called when the component is detached.
     */
    public override disconnectedCallback(): void {
        (this as QvLifecycle).onDisconnected?.();

        super.disconnectedCallback();
    }

    /**
     * Lit lifecylce
     * 
     * Execute before rendering.
     */
    public override willUpdate(changedProperties: PropertyValues): void {
        super.willUpdate(changedProperties);

        (this as QvLifecycle).beforeRender?.();
    }

    /**
     * lit Lifecycle.
     * 
     * Called once after the initial render.
     */
    protected override firstUpdated(_changedProperties: PropertyValues): void {
        super.firstUpdated(_changedProperties);

        this.hasRendered = true;

        (this as QvLifecycle).onFirstRender?.();
    }

    /**
     * Lit lifecycle
     * 
     * Called after every update.
     */
    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        (this as QvLifecycle).afterRender?.();
    }

    /**
     * -----------
     * Internal Lifecycle Hooks
     * -----------
     */

    /**
     * Internal lifecycle hook.
     */
    public onConnected?(): void;

    /**
     * Internal lifecycle hook.
     */
    public onDisconnected?(): void;
        
    /**
     * Internal lifecycle hook.
     */
    public afterRender?(): void;

    /**
     * Internal lifecycle hook.
     */
    public onFirstRender?(): void 
    
    /**
     * ---------
     * Event Helpers
     * ---------
     */
    
    /**
     * Dispatches a CustomEvent from this component.
     * 
     * @param type Event name.
     * @param detail Event payload.
     * @param options Additional event options.
     * 
     * @returns True if the events was not canceled.
     */
    protected emit<T = unknown>(
        type: string,
        detail?: T,
        options: CustomEventInit<T> = {},
    ): boolean {
        return this.dispatchEvent(
            new CustomEvent<T>(type, {
                detail,
                bubbles: true,
                composed: true,
                cancelable: true,
                ...options,
            }),
        );
    }

    /**
     * Dispatches any Event instance.
     */
    protected dispatch(event: Event): boolean {
        return this.dispatchEvent(event);
    }

    /**
     * ----------------
     * Slot Helpers
     * ----------------
     */

    /**
     * Return the slot element.
     */
    protected getSlot(
        name = "",
    ): HTMLSlotElement | null{
        const selector = name
        ? `slot[name="${name}"]`
        : "slot:not([name])"

        return this.renderRoot.querySelector<HTMLSlotElement>(
            selector,
        );
    }

    /**
     * Return true if a slot exist.
     */
    protected hasSlot(
        name = "",
    ): boolean {
        const slot = this.getSlot(name);

        if(!slot){
            return false
        }

        return slot.assignedNodes({
            flatten: true,
        }).length > 0;
    }

    /**
     * Return all assigned nodes.
     */
    protected getAssignedNodes(
        name = "",
        flatten = true,
    ): Node[] {
        return(
            this.getSlot(name)?.assignedNodes({
                flatten,
            })?? []
        );
    }

    /**
     * Return assigned elements only.
     */
    protected getAssignedElements<T extends Element = Element>(
        name = "",
        flatten = true,
    ): T[] {
        return (
            this.getSlot(name)?.assignedElements({
                flatten,
            }) as T[]
        ) ?? [];
    }

    /**
     * -------------
     * DOM Helpers
     * -------------
     */

    /**
     * Returns the host element
     */
    protected get host(): this {
        return this
    }

    /**
     * Return the component shadow root
     */
    protected get shadow(): ShadowRoot{
        return this.renderRoot as ShadowRoot;
    }

    /**
     * Returns whether the component
     * has completed its first render.
     */
    protected get isRendered(): boolean{
        return this.hasRendered;
    }

    /**
     * Returns whether the component
     * is currently connected.
     */
    protected get isMounted(): boolean{
        return this.isConnected;
    }

    /**
     * Return the component tag name.
     */
    public override get tagName(): string {
        return this.localName;
    }

    /**
     * ----------
     * Update Helpers
     * ----------
     */

    /**
     * Request a component update.
     */
    protected invalidate(): void {
        this.requestUpdate();
    }

    /**
     * Waits until the current udpate cycle completes.
     */
    protected whenReady(): Promise<boolean> {
        return this.updateComplete;
    }
}
