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
export interface DisabledInterface {
    readonly isDisabled: boolean;
    disabled: boolean;
}
export declare function DisabledMixin<TBase extends Constructor<DisableableElement>>(Base: TBase): TBase & Constructor<DisabledInterface>;
//# sourceMappingURL=disabled.d.ts.map