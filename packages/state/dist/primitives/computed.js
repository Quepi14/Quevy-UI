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
import { defaultEquality, } from '../utils/equality.js';
/**
 * Creates a computed value derived from one or more siganls.
 *
 * @param dependecies Signals this computed reads from.
 * @param compute Function producing the derived value. Called
 *  once immediately, and  again every time any dependency changes.
 * @param equals Equality function used to skip redundant notifications
 *  when the recomputed value is unchanged.
 */
export function createComputed(dependencies, compute, equals = defaultEquality) {
    let value = compute();
    const listeners = new Set();
    function recompute() {
        const next = compute();
        if (equals(value, next)) {
            return;
        }
        value = next;
        for (const listener of [...listeners]) {
            listener(value);
        }
    }
    const unsubscribes = dependencies.map((dependency) => dependency.subscribe(recompute));
    function get() {
        return value;
    }
    function peek() {
        return value;
    }
    function subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
    }
    function dispose() {
        for (const unsubscribe of unsubscribes) {
            unsubscribe();
        }
        listeners.clear();
    }
    return { get, peek, subscribe, dispose };
}
//# sourceMappingURL=computed.js.map