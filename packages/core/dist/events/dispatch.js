/**
 * ----------------------------------------------
 * QUEVY UI
 * ----------------------------------------------
 * Dispatches typed DOM CustomEvents.
 *
 * This utility creates and dispatches a CustomEvent
 * using the standart DOM EventTarget API.
 *
 * @packageDocumentation
 */
import { createEvent } from "./create-event.js";
/**
 * Creates and dispatches a typed CustomEvent.
 *
 * Return the value from EventTarget.dispatchEvent(),
 * allowing callers to determine whether a cancelable
 * event was prevented
 *
 * @param target - Event target that dispatches the event.
 * @param type - Event type.
 * @param options - Event configuration.
 *
 * @return True if the event was not canceled.
 */
export function dispatch(target, type, options = {}) {
    const event = createEvent(type, options);
    return target.dispatchEvent(event);
}
//# sourceMappingURL=dispatch.js.map