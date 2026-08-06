/**
 * --------------------------------------------------
 * QUEVY UI
 * --------------------------------------------------
 * Provides form-association capabilities for Quevy UI
 * Web Components.
 *
 * @packageDocumentation
 */
import type { QvElement } from '../base/qv-element.js';
import type { Constructor } from './types.js';
/**
 * Base type for elements that can participate in
 * form association.
 */
export type FormAssociatedElement = QvElement;
/**
 * Adds Form-Associated Custom capabilities
 * to a QvElement.
 *
 * The mixin enables the component to participate in
 * native HTML forms through ElementInternals.
 *
 * @template TBase - Base constructor extending QvElement.
 *
 * @param Base - Base class to extend.
 *
 * @returns A class with form-association capabilities.
 */
export interface FormAssociatedInterface {
    readonly form: HTMLFormElement | null;
    readonly internals: ElementInternals | null;
}
export declare function FormAssociatedMixin<TBase extends Constructor<FormAssociatedElement>>(Base: TBase): TBase & Constructor<FormAssociatedInterface>;
//# sourceMappingURL=form-associated.d.ts.map