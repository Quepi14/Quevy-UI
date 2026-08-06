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
import type { ControllerConstructor, ControllerInstance } from './types.js';
/**
 * Manages controller instance attached to a QvElement.
 *
 * The manager is responsible for controller registration,
 * lifecycle forwarding, and cleanup. Individual controller
 * behavior remains the responsibility of QvController.
 *
 * @template THost - Host Component type.
 */
export declare class QvControllerManager<THost extends QvElement = QvElement> {
    /**
     * Host component managed by this controller manager.
     */
    private readonly host;
    /**
     * Registered controller instance.
     */
    private readonly controllers;
    /**
     * Creates a controller manager for a host component.
     *
     * @param host - Component that owns the controllers.
     */
    constructor(host: THost);
    /**
     * Returns the host component.
     *
     * @return the component associated with this manager.
     */
    getHost(): THost;
    /**
     * Registers a controller instance.
     *
     * A controller that is already registered is not added again
     *
     * @param controller - Controller instance to register.
     *
     * @return The registered controller.
     */
    register<TController extends ControllerInstance<THost>>(controller: TController): TController;
    /**
     * Creates and register a controller for the host.
     *
     * @param Controller - Controller constructor.
     *
     * @return the Created controller.
     */
    create<TController extends QvController<THost>>(Controller: ControllerConstructor<TController, THost>): TController;
    unregister(controller: ControllerInstance<THost>): boolean;
    /**
     * Returns whether a controller is registered.
     *
     * @param controller - Controller instance to check.
     *
     * @return True when the controller is registered.
     */
    has(controller: ControllerInstance<THost>): boolean;
    /**
     * Returns all registered controllers.
     *
     * A new array is returned so callers cannot modify the manager's
     * internal collection.
     *
     * @return Registered controller instances.
     */
    getAll(): ControllerInstance<THost>[];
    /**
     * Forwards the connected lifecycle to all controllers.
     */
    hostConnected(): void;
    /**
     * Forwards the updated lifecycle to all controllers.
     */
    hostUpdate(): void;
    /**
     * Forwards the updated lifecylce to all controllers.
     *
     * Called after the host component has completed an update
     * (i.e. after render), mirroring Lit's ReactiveController
     * hostUpadted() hook.
     */
    hostUpdated(): void;
    /**
     * Forward the disconnected lifecycle to all controllers.
     */
    hostDisconnected(): void;
    /**
     * Destroy all registered controllers and clears
     * the manager.
     */
    destroy(): void;
}
//# sourceMappingURL=controller.d.ts.map