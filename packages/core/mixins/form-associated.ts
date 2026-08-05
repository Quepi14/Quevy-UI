/**
 * --------------------------------------------------
 * QUEVY UI
 * --------------------------------------------------
 * Provides form-association capabilities for Quevy UI
 * Web Components.
 *
 * @packageDocumentation
 */

import type { QvElement } from '../base/qv-element.js'

import type { Constructor } from './types.js'

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

export function FormAssociatedMixin<
    TBase extends Constructor<FormAssociatedElement>,
>(Base: TBase): TBase & Constructor<FormAssociatedInterface> {
    class Mixin extends Base implements FormAssociatedInterface {
        /**
         * Enables the Form-Associated Custom Element
         * behavior for the derived custom element.
         */
        public static readonly formAssociated = true;

        /**
         * Lazily initialized internals used for native form association.
         */
        private _internals: ElementInternals | null = null;

        /**
         * Returns the ElementInternals instance associated
         * with the component.
         *
         * @returns ElementInternals when supported, otherwise null.
         */
        public get internals(): ElementInternals | null {
            if (this._internals === null) {
                this._internals = this.attachInternalSafely();
            }

            return this._internals;
        }

        /**
         * Returns the form associated with the component.
         *
         * @return The associated form or null when the component
         * is not associated with a form.
         */
        public get form(): HTMLFormElement | null {
            return this.internals?.form ?? null;
        }

        /**
         * Attaches ElementInternals without allowing an
         * unsupported environment to break component creation.
         *
         * @return The attached ElementInternals instance or null.
         */
        private attachInternalSafely(): ElementInternals | null {
            if (!('attachInternals' in this)) {
                return null;
            }

            try {
                return this.attachInternals();
            } catch {
                return null;
            }
        }
    }

    return Mixin;
}