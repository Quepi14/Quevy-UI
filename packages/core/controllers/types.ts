/**
 * --------------------------------------------------
 * QUEVY UI
 * --------------------------------------------------
 * Shared type definitions for the Quevy UI controller
 * management layer.
 *
 * @packageDocumentation
 */

import type { QvController } from '../base/qv-controller.js';
import type { QvElement } from '../base/qv-element.js';

/**
 * Constructor type for a Quevy UI controller.
 * 
 * A controller constructor receives its host component
 * and creates a controller instance associated with that host.
 * 
 * @template TController - Controller instance type.
 * @template THost - Host component type.
 */
export type ControllerConstructor<
    TController extends QvController<THost>,
    THost extends QvElement = QvElement,
> = new (host: THost) => TController;

/**
 * Represent a controller instance managed by the
 * controller layer.
 * 
 * @template THost - Host component type.
 */
export type ControllerInstance<
    THost extends QvElement = QvElement,
> = QvController<THost>;

/**
 * Collection of controller instances managed by a
 * controller host.
 * 
 * @template THost - Host component type.
 */
export type ControllerCollection<
    THost extends QvElement = QvElement,
> = Set<ControllerInstance<THost>>;