/**
 * ----------------------------------------------------------
 * QUEVY STATE
 * ----------------------------------------------------------
 * Type definitions for the store layer.
 *
 * @packageDocumentation
 */

import type { Computed } from '../primitives/computed.js';
import type { EqualityFn  } from '../utils/equality.js';

/**
 * Store state shape. Intentionally unconstrained  beoynd "plain
 * object" - the store does not care about the domain shape. 
 */
export type StoreState = Record<string, unknown>;

/**
 * An update passed to setState(): either a partial object
 * merged shallowly into the current state, or a function that 
 * computes that partial from the current state (needed when
 * the new value depends on the previous one, e.g. toggling).
 */
export type StoreUpdater<T extends StoreState> =
    | Partial<T>
    | ((state: T) => Partial<T>);
    
/**
 * A store a single place of shared state with whole-state
 * subscription and derived selectors.
 */
export interface Store<T extends StoreState> {
    /**
     * Returns the current state snapshot.
     */
    getState(): T;
    
    /**
     * Merges `update` into the current state (shallow merge).
     * Always produces a new state object, so subscribers are
     * always notified - even if the merged values are
     * unchanged. Pass an empty object only if you intend to
     * force a notification.
     */
    setState(update: StoreUpdater<T>): void;

    /**
     * Registers a listener called with the full state whenever
     * it changes.
     * 
     * @returns An unsubscribe function.
     */
    subscribe(listener:  (state:  T) => void): () => void;

    /**
     * Derives a read-only value from the store's state.
     * 
     * Backed by primitives/computed.ts - the returned Computed
     * only notifies its own subscribers when the selected slice
     * actually changes, even though the store itself notifies on
     * every setState().
     * 
     * @param selector Function extracting a slice of state.
     * @param equals Optional custom equality for the slice. 
     */
    select<R>(
        selector: (state: T) => R,
        equals?: EqualityFn<R>,
    ): Computed<R>;
}
