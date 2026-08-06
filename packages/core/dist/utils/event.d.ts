/**
 * packages/core/utils/event.ts
 */
export interface ListenOptions extends AddEventListenerOptions {
    /**
     * Optional AbortSignal for automatic cleanup.
     */
    signal?: AbortSignal;
}
/**
 * Return true if the event's default action has been prevented.
 */
export declare function isDefaultPrevented(event: Event): boolean;
/**
 * Stops event propagation.
 */
export declare function stop(event: Event): void;
/**
 * Stops immediate event propagation.
 */
export declare function stopImmediate(event: Event): void;
/**
 * Prevent the default browser behavior
 */
export declare function prevent(event: Event): void;
/**
 * Prevent default behavior and stop propagation.
 */
export declare function halt(event: Event): void;
//# sourceMappingURL=event.d.ts.map