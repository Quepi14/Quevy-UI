/**
 * -----------------------------------------------------------------------------
 * Quevy UI
 * -----------------------------------------------------------------------------
 * Base component contracts shared across all Quevy UI components.
 *
 * @packageDocumentation
 */
/**
 * Quevy UI namespace.
 */
export const QV_NAMESPACE = "qv";
/**
 * Default Shadow DOM mode.
 */
export const DEFAULT_SHADOW_ROOT_MODE = "open";
/**
 * Creates a valid Quevy UI custom element tag.
 *
 * Example:
 * createTagName("button")
 * -> qv-button
 */
export function createTagName(name) {
    return `${QV_NAMESPACE}-${name}`;
}
/**
 * Returns true if a component has already been registered.
 */
export function isRegistered(tagName) {
    return customElements.get(tagName) !== undefined;
}
/**
 * Creates normalized component metadata.
 */
export function createComponentMetadata(metadata) {
    return {
        ...metadata,
        namespace: QV_NAMESPACE,
    };
}
//# sourceMappingURL=component.js.map