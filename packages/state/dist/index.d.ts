/**
 * ----------------------------------------------------------
 * QUEVY STATE
 * ----------------------------------------------------------
 * Public entry point for @quevy/state.
 *
 * Framework-agnostic only — no Lit, no @quevy/core dependency
 * is pulled in by importing from this path. For Lit-bound
 * helpers (createState, createDerivedState), import from
 * '@quevy/state/lit' instead.
 *
 * @packageDocumentation
 */
export { createSignal } from './primitives/signal.js';
export type { Signal, SignalListener } from './primitives/signal.js';
export { createComputed } from './primitives/computed.js';
export type { Computed } from './primitives/computed.js';
export { defaultEquality, shallowEquality, } from './utils/equality.js';
export type { EqualityFn } from './utils/equality.js';
export { isControlled, resolveValue, } from './synchronization/controlled.js';
export { createUncontrolledState, createControllableValue, } from './synchronization/uncontrolled.js';
export type { UncontrolledState, ControllableValue, } from './synchronization/uncontrolled.js';
export { createStore } from './store/store.js';
export type { Store, StoreState, StoreUpdater, } from './store/types.js';
//# sourceMappingURL=index.d.ts.map