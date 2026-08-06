/**
 * --------------------------------------------------
 * QUEVY UI
 * --------------------------------------------------
 * Base controller implementation shared by all internal controllers.
 *
 * Controllers encapsulate reusable behavior that can be attached to a
 * QvElement without relying on inheritance.
 *
 * @packageDocumentation
 */
/**
 * Base class for all Quevy UI controllers.
 */
export class QvController {
    /**
     * Creates a new Controller.
     */
    constructor(host) {
        /**
         * Whether this controller is enabled
         */
        this.enabled = true;
        /**
         * Whether this controller has been destroyed.
         */
        this.destroyed = false;
        this.host = host;
    }
    /**
     * ----------
     * Getters
     * ----------
     */
    /**
     * Returns the host component.
     */
    getHost() {
        return this.host;
    }
    /**
     * Return whether the controller is enabled
     */
    get isEnabled() {
        return this.enabled;
    }
    /**
     * Return whether the controller has been destroyed.
     */
    get isDestroyed() {
        return this.destroyed;
    }
    /**
     * ------------
     * State
     * ------------
     */
    /**
     * Enables the controller.
     */
    enable() {
        this.enabled = true;
    }
    /**
     * Disables the controller.
     */
    disable() {
        this.enabled = false;
    }
    /**
     * Toggles the enabled state.
     */
    toggle() {
        this.enabled = !this.enabled;
    }
    /**
     * --------------
     * Update helpers
     * --------------
     */
    /**
     * Request the host component to update.
     */
    requestUpdate() {
        if (!this.destroyed && this.enabled) {
            this.host.requestUpdate();
        }
    }
    /**
     * Waits until the host finishes updating.
     */
    whenUpdated() {
        return this.host.updateComplete;
    }
    /**
     * -------
     * Lifecycle
     * -------
     */
    /**
     * Called when the host is connected.
     */
    hostConnected() { }
    /**
     * Called before the host updates.
     */
    hostUpdate() { }
    /**
     * Called after the host updates.
     */
    hostUpdated() { }
    /**
     * Called when the host is disconnected.
     */
    hostDisconnected() { }
    /**
     * ---------
     * Clean up
     * ---------
     */
    /**
     * Release controller resources.
     */
    destroy() {
        if (this.destroyed) {
            return;
        }
        this.destroyed = true;
    }
}
//# sourceMappingURL=qv-controller.js.map