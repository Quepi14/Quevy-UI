/**
 * --------------------------------------------------
 * QUEVY UI
 * --------------------------------------------------
 * Method decorator for observing reactive property
 * changes.
 *
 * This decorator stores watcher metadata on the
 * component prototype. The metadata is consumed
 * by QvElement during the update lifecycle.
 *
 * @packageDocumentation
 */
/**
 * Internal watcher metadata.
 */
export interface WatchMetadata {
    /**
     * Observed property name.
     */
    property: string;
    /**
     * Method invoked when the property changes.
     */
    method: string | symbol;
}
/**
 * Internal metadata storage key.
 */
export declare const WATCH_METADATA: unique symbol;
/**
 * Registers a method as a watcher for a reactive property.
 *
 * @param property - Property name to observe.
 *
 * @returns A method decorator.
 */
export declare function watch(property: string): MethodDecorator;
//# sourceMappingURL=watch.d.ts.map