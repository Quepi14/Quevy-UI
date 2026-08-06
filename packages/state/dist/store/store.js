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
import { createComputed } from '../primitives/computed.js';
import { defaultEquality } from "../utils/equality.js";
/**
 * Creates a store.
 *
 * @param initialState Initial state object.
 */
export function createStore(initialState) {
    const state = createSignal(initialState);
    function getState() {
        return state.get();
    }
    function setState(update) {
        const current = state.get();
        const partial = typeof update === 'function' ? update(current) : update;
        state.set({ ...current, ...partial });
    }
    function subscribe(listener) {
        return state.subscribe(listener);
    }
    function select(selector, equals = defaultEquality) {
        return createComputed([state], () => selector(state.get()), equals);
    }
    return { getState, setState, subscribe, select };
}
//# sourceMappingURL=store.js.map