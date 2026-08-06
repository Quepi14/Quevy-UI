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
import type { QvElement } from './qv-element.js';
/**
 * Base class for all Quevy UI controllers.
 */
export declare abstract class QvController<THost extends QvElement = QvElement> {
    /**
     * Host Component
     */
    protected readonly host: THost;
    /**
     * Whether this controller is enabled
     */
    private enabled;
    /**
     * Whether this controller has been destroyed.
     */
    private destroyed;
    /**
     * Creates a new Controller.
     */
    protected constructor(host: THost);
    /**
     * ----------
     * Getters
     * ----------
     */
    /**
     * Returns the host component.
     */
    getHost(): THost;
    /**
     * Return whether the controller is enabled
     */
    get isEnabled(): boolean;
    /**
     * Return whether the controller has been destroyed.
     */
    get isDestroyed(): boolean;
    /**
     * ------------
     * State
     * ------------
     */
    /**
     * Enables the controller.
     */
    enable(): void;
    /**
     * Disables the controller.
     */
    disable(): void;
    /**
     * Toggles the enabled state.
     */
    toggle(): void;
    /**
     * --------------
     * Update helpers
     * --------------
     */
    /**
     * Request the host component to update.
     */
    protected requestUpdate(): void;
    /**
     * Waits until the host finishes updating.
     */
    protected whenUpdated(): Promise<boolean>;
    /**
     * -------
     * Lifecycle
     * -------
     */
    /**
     * Called when the host is connected.
     */
    hostConnected(): void;
    /**
     * Called before the host updates.
     */
    hostUpdate(): void;
    /**
     * Called after the host updates.
     */
    hostUpdated(): void;
    /**
     * Called when the host is disconnected.
     */
    hostDisconnected(): void;
    /**
     * ---------
     * Clean up
     * ---------
     */
    /**
     * Release controller resources.
     */
    destroy(): void;
}
//# sourceMappingURL=qv-controller.d.ts.map