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
 * - Component metadata
 * - Lifecylce bridge
 * - Shadow DOM access
 * - Event helpers (instance-bound: emit, dispatch)
 * - Slot helpers (instance-bould: getSlot, hasSlot, getAssignedNodes/Elements)
 * - Controller integration (QvControllerManager wired via addController())
 *
 * NOTE:
 * CSS Variable, Accessability, and ID helpers are intentionally
 * Not exposed as methods here, They live as standalone, element-
 * agnostic function in utils/css.ts, utils/accessibility.ts, adn
 * utils/id.ts, since they operate on any element passed explicitly
 * (not necessarily `this`) -  e.g. applying ARIA attributes to a
 * child inside the shadow root, not just the host itself.
 *
 * @packageDocumentation
 */
import { LitElement, type PropertyValues } from 'lit';
import type { BaseComponent, ComponentMetadata } from './component.js';
import type { QvLifecycle } from './lifecycle.js';
import type { ControllerConstructor } from '../controllers/types.js';
import type { QvController } from './qv-controller.js';
import type { CreateEventOptions } from '../events/types.js';
/**
 * Base class for every QUEVY UI component.
 *
 * This class centralizes all common behaviors that should
 * be shared across every component.
 */
export declare abstract class QvElement extends LitElement implements BaseComponent, QvLifecycle {
    /**
     * Component metadata.
     *
     * Every derived component should override this property
     */
    readonly metadata: ComponentMetadata;
    /**
     * Whether the component has completed
     * its first render cycle.
     */
    protected hasRendered: boolean;
    /**
     * -----------
     * Lifecycle Section
     * -----------
     */
    /**
     * Called when the component is attached to the DOM.
     */
    connectedCallback(): void;
    /**
     * Called when the component is detached.
     */
    disconnectedCallback(): void;
    /**
     * Lit lifecylce
     *
     * Execute before rendering.
     */
    willUpdate(changedProperties: PropertyValues): void;
    /**
     * lit Lifecycle.
     *
     * Called once after the initial render.
     */
    protected firstUpdated(_changedProperties: PropertyValues): void;
    /**
     * Lit lifecycle
     *
     * Called after every update.
     */
    protected updated(changedProperties: PropertyValues): void;
    /**
     * Manages QvController instance attached to this component.
     */
    private readonly controllerManager;
    /**
     * Creates the component.
     */
    constructor();
    /**
     * Creates and registers a QvController for this component.
     *
     * @param Controller - Controller constructor to instantiate.
     * @returns The created controller instance.
     */
    protected useController<TController extends QvController<this>>(Controller: ControllerConstructor<TController, this>): TController;
    /**
     * -----------
     * Internal Lifecycle Hooks
     * -----------
     */
    /**
     * Internal lifecycle hook.
     */
    onConnected?(): void;
    /**
     * Internal lifecycle hook.
     */
    onDisconnected?(): void;
    /**
     * Internal lifecycle hook.
     */
    afterRender?(): void;
    /**
     * Internal lifecycle hook.
     */
    onFirstRender?(): void;
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
    protected emit<T = unknown>(type: string, detail?: T, options?: CreateEventOptions<T>): boolean;
    /**
     * Dispatches any Event instance.
     */
    protected dispatch(event: Event): boolean;
    /**
     * ----------------
     * Slot Helpers
     * ----------------
     */
    /**
     * Return the slot element.
     */
    protected getSlot(name?: string): HTMLSlotElement | null;
    /**
     * Return true if a slot exist.
     */
    protected hasSlot(name?: string): boolean;
    /**
     * Return all assigned nodes.
     */
    protected getAssignedNodes(name?: string, flatten?: boolean): Node[];
    /**
     * Return assigned elements only.
     */
    protected getAssignedElements<T extends Element = Element>(name?: string, flatten?: boolean): T[];
    /**
     * -------------
     * DOM Helpers
     * -------------
     */
    /**
     * Returns the host element
     */
    protected get host(): this;
    /**
     * Return the component shadow root
     */
    protected get shadow(): ShadowRoot;
    /**
     * Returns whether the component
     * has completed its first render.
     */
    protected get isRendered(): boolean;
    /**
     * Returns whether the component
     * is currently connected.
     */
    protected get isMounted(): boolean;
    /**
     * Return the component tag name.
     */
    get tagName(): string;
    /**
     * ----------
     * Update Helpers
     * ----------
     */
    /**
     * Request a component update.
     */
    protected invalidate(): void;
    /**
     * Waits until the current udpate cycle completes.
     */
    protected whenReady(): Promise<boolean>;
}
//# sourceMappingURL=qv-element.d.ts.map