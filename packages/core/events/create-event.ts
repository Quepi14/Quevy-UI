/**
 * ---------------------------------------
 * QUEVY UI
 * ---------------------------------------
 * Creates typed DOM CustomEvenet instances.
 * 
 * This utility provides a consistent way to construct
 * CustomEvent object across Quevy UI withoud dispatching them.
 * 
 * @packageDocumentation
 */

import type { CreateEventOptions } from "./types.js";
/**
 * Creates a typed CustomEvent.
 * 
 * @param type - Event type.
 * @param options - Event configuration.
 * 
 * @returns A new CustomEvent instance.
 */
export function createEvent<T =  unknown>(
    type: string,
    options: CreateEventOptions<T> = {},
): CustomEvent<T>{
    const {
        detail,
        bubbles = true,
        composed = true,
        cancelable = true,
    } = options;

    return new CustomEvent<T>(type, {
        detail,
        bubbles,
        composed,
        cancelable,
    });
}