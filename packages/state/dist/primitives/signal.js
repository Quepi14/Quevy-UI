/**
 * ----------------------------------------------------------
 * QUEVY STATE
 * ----------------------------------------------------------
 * Framework-agnostic reactive primitive.
 *
 * A signal holds a single value and notifies subscribers when
 * it changes. This file has zero dependency on Lit or
 * @quevy/core — it must stay reusable by any consumer
 * (packages/core's Lit integration, packages/react, or plain
 * vanilla usage).
 *
 * @packageDocumentation
 */
import { defaultEquality, } from '../utils/equality.js';
/**
 * Create a signal.
 *
 * @param initialValue Initial value held by the signal.
 * @param equal Equality function used to skip redundant
 *  notifications. Default to Object.is semantics.
 */
export function createSignal(initialValue, equals = defaultEquality) {
    let value = initialValue;
    const listeners = new Set();
    function get() {
        return value;
    }
    function peek() {
        return value;
    }
    function set(next) {
        if (equals(value, next)) {
            return;
        }
        value = next;
        // Snapshot before iterating: a listener may synchronously
        // subscribe/unsubscribe, which must not affect this notification pass.
        for (const listener of [...listeners]) {
            listener(value);
        }
    }
    function subscribe(listener) {
        listeners.add(listener);
        return () => {
            listeners.delete(listener);
        };
    }
    return { get, peek, set, subscribe };
}
//# sourceMappingURL=signal.js.map