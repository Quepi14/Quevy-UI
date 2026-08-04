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
export abstract class QvController<
  THost extends QvElement = QvElement,
> {    
    /**
     * Host Component
     */
    protected readonly host: THost;

    /**
     * Whether this controller is enabled
     */
    private enabled = true;

    /**
     * Whether this controller has been destroyed.
     */
    private destroyed = false;

    /**
     * Creates a new Controller.
     */
    protected constructor(host: THost) {
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
    public getHost(): THost {
        return this.host;
    }

    /**
     * Return whether the controller is enabled
     */
    public get isEnabled(): boolean {
        return this.enabled;
    }

    /**
     * Return whether the controller has been destroyed.
     */
    public get isDestroyed(): boolean {
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
    public enable(): void {
        this.enabled = true;
    }

    /**
     * Disables the controller.
     */
    public disable(): void{
        this.enabled= false;
    }

    /**
     * Toggles the enabled state.
     */
    public toggle(): void {
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
    protected requestUpdate(): void {
        if (!this.destroyed && this.enabled) {
            this.host.requestUpdate();
        }
    }

    /**
     * Waits until the host finishes updating.
     */
    protected whenUpdated(): Promise<boolean> {
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
    public hostConnected(): void{}

    /**
     * Called before the host updates.
     */
    public hostUpdate(): void {}

    /**
     * Called after the host updates.
     */
    public hostUpdated(): void{}

    /**
     * Called when the host is disconnected.
     */
    public hostDisconnected(): void{}

    /**
     * ---------
     * Clean up
     * ---------
     */

    /**
     * Release controller resources.
     */
    public destroy(): void{
        if (this.destroyed) {
            return;
        }

        this.destroyed = true;
    }
}