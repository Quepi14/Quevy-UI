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
 * Adds an event listener.
 * 
 * Returns a cleanup function.
 */
export function listen<
    T extends EventTarget,
    E extends Event = Event,
>(
    target: T, type: string, listener: (event: E) => void, options?: ListenOptions,
): () => void {
    target.addEventListener(
        type,
        listener as EventListener,
        options,
    );

    return () => {
        target.removeEventListener(
            type,
            listener as EventListener,
            options,
        );
    };
}

/**
 * Dispatches a CustomEvent.
 */
export function emit<T = unknown> (
    target: EventTarget,
    type: string,
    detail?: T,
    options?: CustomEventInit<T>,
): boolean {
    return target.dispatchEvent(
        new CustomEvent<T>(type,  {
            bubbles: true,
            composed: true,
            cancelable: false,
            ...options,
            detail,
        }),
    );
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