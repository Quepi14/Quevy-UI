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
export function listen(target, type, listener, options = {}) {
    target.addEventListener(type, listener, options);
    return () => {
        target.removeEventListener(type, listener, options);
    };
}
//# sourceMappingURL=listener.js.map