/**
 * ----------------------------------------------------------
 * QUEVY STATE
 * ----------------------------------------------------------
 * Equality helpers used by signal.ts and computed.ts to decide
 * whether a value change should trigger notification.
 *
 * These are pure, framework-agnostic, dependency-free functions.
 *
 * @packageDocumentation
 */
/**
 * A function that determines whether two values should be
 * consider equal for the purpose of skipping notification.
 */
export type EqualityFn<T> = (a: T, b: T) => boolean;
/**
 * Default equality check used by signal/computed when the
 * caller does not provide a custom one.
 *
 * Uses Object.is semantic (like React/Preact), which correctly
 * handles NaN and -0/+0 edge cases that '===' gets wrong.
 */
export declare const defaultEquality: EqualityFn<unknown>;
/**
 * Shallow equality check for plain object and arrays.
 *
 * Useful when a signal holds an object/array that is
 * reconstructed on every update (e.g. derived from a query
 * result), where reference equality would always report
 * "changed" even if the content are identical.
 *
 * Not used by default - callers opt in explicitly, since
 * shallow comparison has a cost and isn't always correct
 * (e.g. nested objects).
 */
export declare const shallowEquality: EqualityFn<unknown>;
//# sourceMappingURL=equality.d.ts.map