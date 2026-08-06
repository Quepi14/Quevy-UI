/**
 * Options for creating a custom DOM event.
 */
export interface CreateEventOptions<T = unknown> extends EventInit {
    /**
     * Event payload.
     */
    detail?: T;
}
/**
 * Options for registering an event listener.
 */
export interface EventListenerOptions {
    /**
     * Invokes the listener only once.
     */
    once?: boolean;
    /**
     * Indicates that the listener will never call preventDefault().
     */
    passive?: boolean;
    /**
     * Registers the listener during the capture phase.
     */
    capture?: boolean;
    /**
     * AbortSignal used to automatically remove the listener.
     */
    signal?: AbortSignal;
}
/**
 * Typed DOM event listener.
 */
export type EventListener<T extends Event = Event> = (event: T) => void;
//# sourceMappingURL=types.d.ts.map