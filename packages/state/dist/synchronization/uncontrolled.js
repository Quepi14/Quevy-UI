/**
 * ----------------------------------------------------------
 * QUEVY STATE
 * ----------------------------------------------------------
 * Uncontrolled fallback state, and the main controllable-value
 * factory components use to support both controlled and
 * uncontrolled usage from a single code path.
 *
 * Zero dependency on signal.ts/computed.ts, Lit, or
 * @quevy/core.
 *
 * @packageDocumentation
 */
import { isControlled } from './controlled.js';
/**
 * Creates an uncontrolled fallback state container.
 *
 * @param defaulValue Value used initially, and restored by reset().
 */
export function createUncontrolledState(defaultValue) {
    let value = defaultValue;
    return {
        get: () => value,
        set: (next) => {
            value = next;
        },
        reset: () => {
            value = defaultValue;
        }
    };
}
/**
 * Creates a controllable value for use inside a component.
 *
 * @param defaultValue initial fallback value while uncontrolled.
 */
export function createControllableValue(defaultValue) {
    const fallback = createUncontrolledState(defaultValue);
    function value(controlledValue) {
        return isControlled(controlledValue) ? controlledValue : fallback.get();
    }
    function request(controlledValue, next) {
        if (!isControlled(controlledValue)) {
            fallback.set(next);
        }
        return next;
    }
    return { value, request };
}
//# sourceMappingURL=uncontrolled.js.map