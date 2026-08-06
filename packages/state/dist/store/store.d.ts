/**
 * ----------------------------------------------------------
 * QUEVY STATE
 * ----------------------------------------------------------
 * A store composed on top of primitives/signal.ts and
 * primitives/computed.ts — no independent reactivity mechanism
 * is implemented here.
 *
 * Zero dependency on Lit or @quevy/core, same as primitives/*.
 *
 * @packageDocumentation
 */
import type { Store, StoreState } from "./types.js";
/**
 * Creates a store.
 *
 * @param initialState Initial state object.
 */
export declare function createStore<T extends StoreState>(initialState: T): Store<T>;
//# sourceMappingURL=store.d.ts.map