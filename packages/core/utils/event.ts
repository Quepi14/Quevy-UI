/**
 * packages/core/utils/event.ts
 */

export interface ListenOptions extends AddEventListenerOptions{
    /**
     * Optional AbortSignal for automatic cleanup.
     */
    signal?: AbortSignal;
}

/**
 * Return true if the event's default action has been prevented.
 */
export function isDefaultPrevented(
    event: Event,
): boolean {
    return event.defaultPrevented;
}

/**
 * Stops event propagation.
 */
export function stop(
    event: Event,
): void {
    event.stopPropagation()
}

/**
 * Stops immediate event propagation.
 */
export function stopImmediate(
    event: Event,
): void {
    event.stopImmediatePropagation();
}

/**
 * Prevent the default browser behavior
 */
export function prevent(
    event: Event,
): void {
    event.preventDefault();
}

/**
 * Prevent default behavior and stop propagation.
 */
export function halt(
    event: Event,
): void {
    event.preventDefault()
    event.stopPropagation();
}