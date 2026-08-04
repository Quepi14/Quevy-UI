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
export const WATCH_METADATA = Symbol('qv:watch');

/**
 * Registers a method as a watcher for a reactive property.
 * 
 * @param property - Property name to observe.
 * 
 * @returns A method decorator.
 */
export function watch(property: string): MethodDecorator{
    return(
        target: object,
        propertyKey: string | symbol,
    ): void => {
        const metadata = (
            <WatchMetadata[] | undefined>(target as Record<PropertyKey, unknown>)[WATCH_METADATA]
        ) ?? [];

        metadata.push({
            property,
            method: propertyKey,
        });

        Object.defineProperty(target, WATCH_METADATA, {
            value: metadata,
            configurable:true,
        })
    }
}