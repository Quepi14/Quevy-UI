/**
 * packages/core/utils/id.ts
 */
/**
 * Generates a unique ID without relying on module-global mutable state.
 *
 * Example: qv-<uuid>
 */
export declare function generateId(prefix?: string): string;
/**
 * Creates a new ID using the given prefix.
 *
 * Alias of generateId() for semantic readability.
 */
export declare function createPrefixedId(prefix: string): string;
/**
 * Ensures that an element has an ID.
 *
 * If the element already has one, it is returned unchanged.
 */
export declare function ensureId(element: Element, prefix?: string): string;
/**
 * Returns true if the ID is a non-empty string.
 */
export declare function isValidId(value: unknown): value is string;
/**
 * Compatibility helper retained for API stability.
 *
 * No-op because ID generation is now stateless.
 */
export declare function resetIdCounter(): void;
//# sourceMappingURL=id.d.ts.map