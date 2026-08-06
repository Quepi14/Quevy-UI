/**
 * ----------------------------------------------------------
 * QUEVY STATE
 * ----------------------------------------------------------
 * Controlled/uncontrolled detection helpers.
 *
 * These are pure functions with no internal state — they only
 * answer "is this prop being driven externally right now?".
 * Actual fallback state management lives in uncontrolled.ts.
 *
 * Zero dependency on signal.ts/computed.ts, Lit, or
 * @quevy/core — usable by any component regardless of whether
 * it needs the reactive engine at all.
 *
 * @packageDocumentation
 */

/**
 * Determines whether a component should be treated as
 * "controlled" for a given prop.
 *
 * A prop is considered controlled when the consumer has
 * explicitly provided a value for it. `undefined` is the only
 * signal for "not provided" — `null` is treated as a real,
 * controlled value, since some components may use `null`
 * intentionally (e.g. "no selection").
 */
export function isControlled<T>(value: T | undefined): value is T{
    return value !== undefined
}

/**
 * Resolves the value a component should currently render or
 * expose, given  the (possibly undefined) controlled prop and
 * the internal fallback value used when uncontrolled.
 */
export function resolveValue<T>(
    controlledValue: T | undefined,
    internalValue: T,
): T {
    return isControlled(controlledValue) ? controlledValue : internalValue;
}