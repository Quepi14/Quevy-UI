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
/**
 * Creates a typed CustomEvent.
 *
 * @param type - Event type.
 * @param options - Event configuration.
 *
 * @returns A new CustomEvent instance.
 */
export function createEvent(type, options = {}) {
    const { detail, bubbles = true, composed = true, cancelable = true, } = options;
    return new CustomEvent(type, {
        detail,
        bubbles,
        composed,
        cancelable,
    });
}
//# sourceMappingURL=create-event.js.map