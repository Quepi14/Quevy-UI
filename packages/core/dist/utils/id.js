/**
 * packages/core/utils/id.ts
 */
/**
 * Generates a unique ID without relying on module-global mutable state.
 *
 * Example: qv-<uuid>
 */
export function generateId(prefix = "qv") {
    const value = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    return `${prefix}-${value}`;
}
/**
 * Creates a new ID using the given prefix.
 *
 * Alias of generateId() for semantic readability.
 */
export function createPrefixedId(prefix) {
    return generateId(prefix);
}
/**
 * Ensures that an element has an ID.
 *
 * If the element already has one, it is returned unchanged.
 */
export function ensureId(element, prefix = "qv") {
    if (element.id.length > 0) {
        return element.id;
    }
    let id = generateId(prefix);
    while (document.getElementById(id) !== null) {
        id = generateId(prefix);
    }
    element.id = id;
    return id;
}
/**
 * Returns true if the ID is a non-empty string.
 */
export function isValidId(value) {
    return (typeof value === "string" &&
        value.trim().length > 0);
}
/**
 * Compatibility helper retained for API stability.
 *
 * No-op because ID generation is now stateless.
 */
export function resetIdCounter() {
    // Intentionally empty.
}
//# sourceMappingURL=id.js.map