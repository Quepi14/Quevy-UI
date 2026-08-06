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
import { LitElement } from 'lit';
import { createComponentMetadata, createTagName, } from './component.js';
import { QvControllerManager } from '../controllers/controller.js';
import { dispatch as dispatchEvent } from '../events/dispatch.js';
/**
 * Base class for every QUEVY UI component.
 *
 * This class centralizes all common behaviors that should
 * be shared across every component.
 */
export class QvElement extends LitElement {
    /**
     * -----------
     * Lifecycle Section
     * -----------
     */
    /**
     * Called when the component is attached to the DOM.
     */
    connectedCallback() {
        super.connectedCallback();
        this.onConnected?.();
    }
    /**
     * Called when the component is detached.
     */
    disconnectedCallback() {
        this.onDisconnected?.();
        super.disconnectedCallback();
    }
    /**
     * Lit lifecylce
     *
     * Execute before rendering.
     */
    willUpdate(changedProperties) {
        super.willUpdate(changedProperties);
        this.beforeRender?.();
    }
    /**
     * lit Lifecycle.
     *
     * Called once after the initial render.
     */
    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        this.hasRendered = true;
        this.onFirstRender?.();
    }
    /**
     * Lit lifecycle
     *
     * Called after every update.
     */
    updated(changedProperties) {
        super.updated(changedProperties);
        this.afterRender?.();
    }
    /**
     * Creates the component.
     */
    constructor() {
        super();
        /**
         * Component metadata.
         *
         * Every derived component should override this property
         */
        this.metadata = createComponentMetadata({
            name: "QvElement",
            tagName: createTagName("element"),
            version: "0.1.0",
        });
        /**
         * Whether the component has completed
         * its first render cycle.
         */
        this.hasRendered = false;
        /**
         * Manages QvController instance attached to this component.
         */
        this.controllerManager = new QvControllerManager(this);
        this.addController(this.controllerManager);
    }
    /**
     * Creates and registers a QvController for this component.
     *
     * @param Controller - Controller constructor to instantiate.
     * @returns The created controller instance.
     */
    useController(Controller) {
        return this.controllerManager.create(Controller);
    }
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
    emit(type, detail, options = {}) {
        return dispatchEvent(this, type, { detail, ...options });
    }
    /**
     * Dispatches any Event instance.
     */
    dispatch(event) {
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
    getSlot(name = "") {
        const selector = name
            ? `slot[name="${name}"]`
            : "slot:not([name])";
        return this.renderRoot.querySelector(selector);
    }
    /**
     * Return true if a slot exist.
     */
    hasSlot(name = "") {
        const slot = this.getSlot(name);
        if (!slot) {
            return false;
        }
        return slot.assignedNodes({
            flatten: true,
        }).length > 0;
    }
    /**
     * Return all assigned nodes.
     */
    getAssignedNodes(name = "", flatten = true) {
        return (this.getSlot(name)?.assignedNodes({
            flatten,
        }) ?? []);
    }
    /**
     * Return assigned elements only.
     */
    getAssignedElements(name = "", flatten = true) {
        return this.getSlot(name)?.assignedElements({
            flatten,
        }) ?? [];
    }
    /**
     * -------------
     * DOM Helpers
     * -------------
     */
    /**
     * Returns the host element
     */
    get host() {
        return this;
    }
    /**
     * Return the component shadow root
     */
    get shadow() {
        return this.renderRoot;
    }
    /**
     * Returns whether the component
     * has completed its first render.
     */
    get isRendered() {
        return this.hasRendered;
    }
    /**
     * Returns whether the component
     * is currently connected.
     */
    get isMounted() {
        return this.isConnected;
    }
    /**
     * Return the component tag name.
     */
    get tagName() {
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
    invalidate() {
        this.requestUpdate();
    }
    /**
     * Waits until the current udpate cycle completes.
     */
    whenReady() {
        return this.updateComplete;
    }
}
//# sourceMappingURL=qv-element.js.map