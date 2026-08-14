/**
 * ----------------------------------------------------------
 * QUEVY UI (internal) — toast store
 * ----------------------------------------------------------
 * First real consumer of @quevy/state's createStore(). A toast
 * stack is exactly the "one shared piece of state, one writer
 * (toast.show), one or more readers (qv-toast-region)" case
 * store.ts was designed for — unlike per-component booleans,
 * this genuinely needs to be reachable from anywhere in the
 * app, not just from a single element's own state.
 *
 * @packageDocumentation
 */
import { createStore } from "@quevy/state";
export const toastStore = createStore({ toast: [] });
//# sourceMappingURL=toast-store.js.map