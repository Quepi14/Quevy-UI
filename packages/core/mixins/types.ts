/**
 * ---------------------------------------
 * QUEVY UI
 * ---------------------------------------
 * Shared types for Quevy UI mixins.
 * 
 * @packageDocumentation
 */

/**
 * Constructor type used by Quevy UI mixins.
 * 
 * @template TInstance - Instance type produced by the constructor.
 */
export type Constructor<TInstance = object> = new (
    ...args: any[]
) => TInstance;