/**
 * --------------------------------------------------
 * QUEVY UI
 * --------------------------------------------------
 * Controller management implementation for Quevy UI.
 *
 * Controllers encapsulate reusable behavior that can be
 * attached to a QvElement without relying on inheritance.
 *
 * @packageDocumentation
 */

import type { QvController } from '../base/qv-controller.js';
import type { QvElement } from '../base/qv-element.js';

import type {
    ControllerCollection,
    ControllerConstructor,
    ControllerInstance,
} from './types.js';

/**
 * Manages controller instance attached to a QvElement.
 * 
 * The manager is responsible for controller registration,
 * lifecycle forwarding, and cleanup. Individual controller
 * behavior remains the responsibility of QvController.
 * 
 * @template THost - Host Component type.
 */
export class QvControllerManager <
    THost extends QvElement = QvElement,
> {
    /**
     * Host component managed by this controller manager.
     */
    private readonly host: THost;

    /**
     * Registered controller instance.
     */
    private readonly controllers: ControllerCollection<THost> = new Set();

    /**
     * Creates a controller manager for a host component.
     * 
     * @param host - Component that owns the controllers.
     */
    public constructor(host: THost) {
        this.host = host;
    }

    /**
     * Returns the host component.
     * 
     * @return the component associated with this manager.
     */
    public getHost():  THost{
        return this.host;
    }

    /**
     * Registers a controller instance.
     * 
     * A controller that is already registered is not added again
     * 
     * @param controller - Controller instance to register.
     * 
     * @return The registered controller.
     */
    public register<TController extends ControllerInstance<THost>>(
        controller: TController,
    ): TController {
        if (this.controllers.has(controller)){
            return controller;
        }

        this.controllers.add(controller)

        return controller;
    }

    /**
     * Creates and register a controller for the host.
     * 
     * @param Controller - Controller constructor.
     * 
     * @return the Created controller.
     */
    public create <TController extends QvController<THost>>(
        Controller: ControllerConstructor<TController, THost>,
    ): TController {
        const controller = new Controller(this.host)

        return this.register(controller)
    }

    public unregister(controller: ControllerInstance<THost>): boolean {
        if (!this.controllers.has(controller)){
            return false;
        }

        controller.destroy();

        return this.controllers.delete(controller);
    }

    /**
     * Returns whether a controller is registered.
     * 
     * @param controller - Controller instance to check.
     * 
     * @return True when the controller is registered.
     */
    public has(controller: ControllerInstance<THost>): boolean {
        return this.controllers.has(controller)
    }

    /**
     * Returns all registered controllers.
     * 
     * A new array is returned so callers cannot modify the manager's
     * internal collection.
     * 
     * @return Registered controller instances.
     */
    public getAll(): ControllerInstance<THost>[] {
        return Array.from(this.controllers);
    }

    /**
     * Forwards the connected lifecycle to all controllers.
     */
    public hostConnected(): void {
        for (const controller of this.controllers){
            controller.hostConnected();
        }
    }

    /**
     * Forwards the updated lifecycle to all controllers.
     */
    public hostUpdate(): void {
        for (const controller of this.controllers) {
            controller.hostUpdate();
        }
    }

    /**
     * Forwards the updated lifecylce to all controllers.
     * 
     * Called after the host component has completed an update
     * (i.e. after render), mirroring Lit's ReactiveController
     * hostUpadted() hook. 
     */
    public hostUpdated(): void {
        for  (const controller of this.controllers) {
            controller.hostUpdated()
        }
    }

    /**
     * Forward the disconnected lifecycle to all controllers.
     */
    public hostDisconnected(): void {
        for (const controller of this.controllers){
            controller.hostDisconnected();
        }
    }

    /**
     * Destroy all registered controllers and clears
     * the manager.
     */
    public destroy(): void {
        for (const controller of this.controllers){
            controller.destroy()
        }

        this.controllers.clear()
    }
}