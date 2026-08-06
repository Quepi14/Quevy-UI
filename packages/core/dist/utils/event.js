/**
 * packages/core/utils/event.ts
 */
/**
 * Return true if the event's default action has been prevented.
 */
export function isDefaultPrevented(event) {
    return event.defaultPrevented;
}
/**
 * Stops event propagation.
 */
export function stop(event) {
    event.stopPropagation();
}
/**
 * Stops immediate event propagation.
 */
export function stopImmediate(event) {
    event.stopImmediatePropagation();
}
/**
 * Prevent the default browser behavior
 */
export function prevent(event) {
    event.preventDefault();
}
/**
 * Prevent default behavior and stop propagation.
 */
export function halt(event) {
    event.preventDefault();
    event.stopPropagation();
}
//# sourceMappingURL=event.js.map