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

import { isDisabled as checkDisabled } from '../utils/accessibility.js';

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
export interface DisabledInterface {
    readonly isDisabled: boolean;
    disabled: boolean;
}

export function DisabledMixin<
    TBase extends Constructor<DisableableElement>,
>(Base: TBase): TBase & Constructor<DisabledInterface> {
    abstract class Mixin extends Base implements DisabledInterface {
        /**
         * Returns whether the component is disabled.
         *
         * Reflects the native `disabled` attribute, which remains
         * the source of truth for this property.
         */
        public get disabled(): boolean {
            return this.hasAttribute('disabled');
        }

        /**
         * Enables or disables the component.
         *
         * The `disabled` attribute is the source of truth. The
         * `aria-disabled` attribute is kept in sync so assistive
         * technology receives an equivalent signal.
         */
        public set disabled(value: boolean) {
            const currentValue = this.disabled;

            if (currentValue === value) {
                return;
            }

            if (value) {
                this.setAttribute('disabled', '');
                this.setAttribute('aria-disabled', 'true');
            } else {
                this.removeAttribute('disabled');
                this.removeAttribute('aria-disabled');
            }

            this.requestUpdate();
        }

        /**
         * Returns whether the component can currently receive
         * interaction.
         *
         * Unlike `disabled`, this also accounts for `aria-disabled`
         * set independently (e.g. directly in markup), using the
         * same check relied on elsewhere in Quevy UI.
         */
        public get isDisabled(): boolean {
            return checkDisabled(this);
        }
    }

    return Mixin;
}