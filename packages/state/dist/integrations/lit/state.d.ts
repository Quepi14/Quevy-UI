/**
 * ----------------------------------------------------------
 * QUEVY STATE — LIT INTEGRATION
 * ----------------------------------------------------------
 * Bridges primitives/signal.ts and primitives/computed.ts to
 * Lit's render cycle via QvElement.requestUpdate().
 *
 * This is the ONLY file in @quevy/state allowed to depend on
 * Lit or @quevy/core. primitives/* must stay framework-agnostic
 * so packages/react can reuse them independently.
 *
 * @packageDocumentation
 */
import type { QvElement } from '@quevy/core';
import { type Signal } from '../../primitives/signal.js';
import { type Computed } from '../../primitives/computed.js';
import { type EqualityFn } from "../../utils/equality.js";
/**
 * Binds an existing signal to a host so that changes trigger
 * a re-render. Use this when the signal is created  elsewhere
 * and possibly shared across multiple components; ownership
 * (and disposal) of the signal itself stays with its creator.
 */
export declare function bindState<T>(host: QvElement, signal: Signal<T>): Signal<T>;
/**
 * Binds an existing computed to a host so that changes trigger
 * a re-render, and disposes the computed automatically when the
 * host disconnects.
 *
 * Unlike bindState(), this DOES take ownership of the computed's
 * lifecycle - a computed subscribes to its own dependencies, so
 * something has to detach it eventually,  if the computed is meant
 * to outline this host (shared accross component), create it outside
 * the component and pass dispose responsibility elsewhere  instead
 * of using this function
 */
export declare function bindComputed<T>(host: QvElement, computed: Computed<T>): Computed<T>;
/**Creates a signal owned by and bound to this component.
 *
 * This is the primary API most components should reach for -
 * equivalent to Lit's @state(), but backed by a signal so the
 * same value can also be read/derived from outside the  component
 * if ever needed
 *
 * @param host Component the state belongs to (usually `this`).
 * @param initialValue Inital value.
 * @param equals Optional custom equality function.
 */
export declare function createState<T>(host: QvElement, initalValue: T, equals?: EqualityFn<T>): Signal<T>;
/**
 * Creates a computed value owned by and bound to this
 * component. Disposed automatically on disconnect.
 *
 * @param host Component the derived state belongs to/
 * @param dependencies Signals this value derives from.
 * @param compute Function producing the derived value.
 * @param equals Optional custom equality function.
 */
export declare function createDerivedState<T>(host: QvElement, dependencies: readonly Signal<unknown>[], compute: () => T, equals?: EqualityFn<T>): Computed<T>;
//# sourceMappingURL=state.d.ts.map