/**
 * --------------------------------------------------
 * QUEVY UI
 * --------------------------------------------------
 * Provides reusable disabled-state behavior for
 * Quevy UI components.
 *
 * @packageDocumentation
 */

import type { QvElement } from '../base/qv-element.js';

import type { Constructor } from './types.js';

/**
 * Base type for elements that can use disabled-state
 * behavior.
 */
export type DisableableElement = QvElement;

/**
 * Adds reusable disabled-state behavior to a QvElement.
 * 
 * The disabled state is represented by the standart 
 * `disabled` HTML attribute and exposed through a
 * boolean property.
 * 
 * @template TBase - Base constructor extending QvElement.
 * 
 * @param Base - Base class to extend.
 * 
 * @returns A class with disabled-state behavior.
 */
export function DisabledMixin<
    TBase extends Constructor<DisableableElement>,
>(Base: TBase) {
    return class extends Base {
        /**
         * Returns whether the component is disabled.
         */
        public get disabled(): boolean {
            return this.hasAttribute('disabled');
        }


        /**
         * Enables or disables the component.
         * 
         * The attribute is used as the source of  truth so
         * the property and DOM remain synchronized.
         */
        public set disabled(value: boolean){
            const currentValue = this.disabled;

            if(currentValue == value) {
                return;
            }

            if (value) {
                this.setAttribute('disabled', '')
            }else {
                this.removeAttribute('disabled');
            }

            this.requestUpdate();
        }

        /**
         * Returns whether the component can currently
         * receive interaction.
         */
        public get isDisabled(): boolean {
            return this.disabled;
        }
    }
}