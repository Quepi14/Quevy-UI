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
 * Default equality check used by signal/computed when the
 * caller does not provide a custom one.
 *
 * Uses Object.is semantic (like React/Preact), which correctly
 * handles NaN and -0/+0 edge cases that '===' gets wrong.
 */
export const defaultEquality = (a, b) => Object.is(a, b);
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
export const shallowEquality = (a, b) => {
    if (Object.is(a, b)) {
        return true;
    }
    if (typeof a !== 'object' ||
        typeof b !== 'object' ||
        a === null ||
        b === null) {
        return false;
    }
    if (Array.isArray(a) || Array.isArray(b)) {
        if (!Array.isArray(a) || !Array.isArray(b)) {
            return false;
        }
        return a.every((value, index) => Object.is(value, b[index]));
    }
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(a);
    if (aKeys.length !== bKeys.length) {
        return false;
    }
    return aKeys.every((key) => Object.is(a[key], b[key]));
};
//# sourceMappingURL=equality.js.map