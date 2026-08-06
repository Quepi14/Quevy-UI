/**
 * --------------------------------------------------
 * QUEVY UI
 * --------------------------------------------------
 * Shared types definitions used across the Quevy UI Core.
 *
 * this file must only contain TypeScript types and interfaces.
 * Do not place constants, classe, enums, or functions here.
 *
 * @packageDocumentation
 */
/**
 * Nullable value.
 */
export type Nullable<T> = T | null;
/**
 * Optional value.
 */
export type Optional<T> = T | undefined;
/**
 * Nullable or optional value.
 */
export type Maybe<T> = T | null | undefined;
/**
 * Represent a value that can be provided directly
 * or lazily via a callback.
 */
export type MaybeFactory<T> = T | (() => T);
/**
 * Generic dictionary.
 */
export type Dictionary<T = unknown> = Record<string, T>;
/**
 * Generic event handler.
 */
export type EventHandler<T extends Event> = (event: T) => void;
/**
 * Gemeroc constructor.
 */
export type Constructor<T = object> = abstract new (...args: never[]) => T;
/**
 * Supportted Shadow DOM modes.
 */
export type ShadowRootMode = "open" | "closed";
/**
 * Valid Quevy UI CSS Variable.
 *
 * example: --qv-primary or  --qv-radius-md
 */
export type CssVariable = `--qv-${string}`;
/**
 * Valid Quevy UI custom element tag.
 *
 * example: qv-button or qv-card
 */
export type TagName = `qv-${string}`;
/**
 * Generic slot name.
 */
export type SlotName = string;
//# sourceMappingURL=types.d.ts.map