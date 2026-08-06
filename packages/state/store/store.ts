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

import { createSignal } from "../primitives/signal.js";
import { createComputed, type Computed } from '../primitives/computed.js'
import { defaultEquality, type EqualityFn } from "../utils/equality.js";

import type { Store, StoreState, StoreUpdater } from "./types.js";
/**
 * Creates a store.
 * 
 * @param initialState Initial state object.
 */
export function createStore<T extends StoreState>(
    initialState: T,
): Store<T> {
    const state = createSignal(initialState);

    function getState(): T {
        return state.get();
    }

    function setState(update: StoreUpdater<T>): void {
        const current = state.get();

        const partial =  
            typeof update === 'function' ? update(current) :  update;

        state.set({ ...current, ...partial});
    }

    function subscribe(listener: (state: T) => void): () => void{
        return state.subscribe(listener);
    } 
    
    function select<R>(
        selector:  (s: T) => R,
        equals: EqualityFn<R> = defaultEquality,
    ): Computed<R> {
        return createComputed([state], () =>  selector(state.get()), equals);
    }

    return { getState, setState, subscribe, select}
}