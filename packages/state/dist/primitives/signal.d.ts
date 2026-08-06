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
import { type EqualityFn } from '../utils/equality.js';
/**
 * A subscriber callback, invoked with the signal's new value
 * whenever it changes (and is not equal to the previous value).
 */
export type SignalListener<T> = (value: T) => void;
/**
 * A reactive value container.
 *
 * Public API: get/peek/set/subscribe. Consumers should never
 * need more than this to build derived state or UI bindings.
 */
export interface Signal<T> {
    /**
     * Reads the current value.
     */
    get(): T;
    /**
     * Reads the current value without any tracking side effects.
     *
     * Identical to get() today (no auto-tracking exist yet),
     * but kept as a distinct method so that call sites already
     * express intent ("I don't want this read to count as a
     * dependency") if auto-tracking is introduced later.
     */
    peek(): T;
    /**
     * Updates the value. Subscriber are only notified if the
     * new value is not equal to the current one, per the signal's
     * equality function.
     */
    set(value: T): void;
    /**
     * Registers a listnener called on every change.
     *
     * @return An unsubscribe function.
     */
    subscribe(listener: SignalListener<T>): () => void;
}
/**
 * Create a signal.
 *
 * @param initialValue Initial value held by the signal.
 * @param equal Equality function used to skip redundant
 *  notifications. Default to Object.is semantics.
 */
export declare function createSignal<T>(initialValue: T, equals?: EqualityFn<T>): Signal<T>;
//# sourceMappingURL=signal.d.ts.map