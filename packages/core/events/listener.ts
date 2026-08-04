/**
 * --------------------------------------------------
 * QUEVY UI
 * --------------------------------------------------
 * Registers typed DOM event listeners.
 *
 * This utility provides a lightweight wrapper around
 * EventTarget.addEventListener() and returns a cleanup
 * function for removing the listener.
 *
 * @packageDocumentation
 */

import type {
    EventListener,
    EventListenerOptions,
} from './types.js';

/**
 * Registers a typed event listener.
 * 
 * Returns a cleanup function that removes the listener
 * using the same options originally provided.
 * 
 * @param target - Event target.
 * @param type - Event type.
 * @param listener - Event callback.
 * @param options - Listener options.
 * 
 * @returns Cleanup function
 */
export function listen<T extends Event = Event>(
    target: EventTarget,
    type: string,
    listener: EventListener<T>,
    options: EventListenerOptions = {},
): () => void {
    target.addEventListener(
        type,
        listener as EventListener,
        options,
    )

    return (): void => {
        target.removeEventListener(
            type,
            listener as EventListener,
            options,
        );
    };
}