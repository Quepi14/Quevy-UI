/**
 * --------------------------------------------------
 * QUEVY UI
 * --------------------------------------------------
 * Provides reusable focus state helpers for Quevy UI
 * components.
 *
 * @packageDocumentation
 */
import type { QvElement } from '../base/qv-element.js';
import type { Constructor } from './types.js';
/**
 * Base type for elements that can use focus state
 * helpers.
 */
export type FocusableElement = QvElement;
/**
 * Adds reusable focus state helpers to a QvElement.
 *
 * Native HTMLElement focus() and blur() methods are
 * intentionally preserved. This mixin only adds
 * state-oriented helpers that are not provided by
 * the base element.
 *
 * @template TBase - Base constructor extending QvElement.
 *
 * @param Base - Base class to extend.
 *
 * @returns A class with focus state helpers.
 */
export interface FocusableInterface {
    readonly isFocused: boolean;
}
export declare function FocusableMixin<TBase extends Constructor<FocusableElement>>(Base: TBase): TBase & Constructor<FocusableInterface>;
//# sourceMappingURL=focusable.d.ts.map