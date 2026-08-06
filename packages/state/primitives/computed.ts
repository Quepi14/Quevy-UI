/**
 * ----------------------------------------------------------
 * QUEVY STATE
 * ----------------------------------------------------------
 * Derived reactive value, computed from one or more signals.
 *
 * Dependencies are explicit (passed as an array), not
 * auto-tracked. This keeps the implementation simple and
 * predictable, at the cost of the caller having to list
 * dependencies themselves. See signal.ts for the rationale.
 *
 * Zero dependency on Lit or @quevy/core, same as signal.ts.
 *
 * @packageDocumentation
 */

import {
    defaultEquality,
    type EqualityFn,
} from '../utils/equality.js'

import type {
    Signal,
    SignalListener,
} from './signal.js'

/**
 * A read-only reactive value derived from other signals.
 * 
 * Deliberately does not expose set() - a computed's value can
 * only change as a result of its dependencies changing.
 */
export interface Computed<T> {
    /**
     * Reads the current derived value.
     */
    get(): T;

    /**
     * Reads the curretn derived value without tracking
     * side effects. See Signal.peek() for rationale.
     */
    peek(): T;

    /**
     * Registers a listener called whenever the derived 
     * value changes.
     * 
     * @returns An unsubscribe function
     */
    subscribe(listener: SignalListener<T>): () => void;

    /**
     * Detaches this computed from all of its dependencies.
     * 
     * Must be called once the computed is no longer needed,
     * otherwise the dependency signals keep a reference to it
     * forever (memory leak). Typically called from a component's
     * onDisconnected() hook.
     */
    dispose(): void;
}

/**
 * Creates a computed value derived from one or more siganls.
 * 
 * @param dependecies Signals this computed reads from.
 * @param compute Function producing the derived value. Called
 *  once immediately, and  again every time any dependency changes.
 * @param equals Equality function used to skip redundant notifications
 *  when the recomputed value is unchanged.
 */
export function createComputed<T>(
    dependencies: readonly Signal<unknown>[],
    compute: () => T,
    equals: EqualityFn<T> = defaultEquality,
): Computed<T> {
    let value  = compute();
    const listeners = new Set<SignalListener<T>>();

    function recompute(): void {
        const next = compute();

        if (equals(value, next)){
            return
        }

        value = next;

        for (const listener of [...listeners]){
            listener(value)
        }
    }

    const unsubscribes = dependencies.map((dependency) => 
        dependency.subscribe(recompute)
    );

    function get(): T {
        return value;
    }

    function peek(): T {
        return value;
    }

    function subscribe(listener: SignalListener<T>): () => void {
        listeners.add(listener);
        return () => listeners.delete(listener)
    }

    function dispose(): void{
        for (const unsubscribe of unsubscribes) {
            unsubscribe()
        }
        listeners.clear()
    }
    
    return { get, peek, subscribe, dispose };
}