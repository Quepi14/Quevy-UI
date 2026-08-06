/**
 * ----------------------------------------------------------
 * QUEVY STATE — LIT ENTRY POINT
 * ----------------------------------------------------------
 * Separate subpath entry so consumers that only need the
 * framework-agnostic primitives (index.ts) never pull in Lit
 * or @quevy/core as a side effect of importing '@quevy/state'.
 *
 * @packageDocumentation
 */
export { bindState, bindComputed, createState, createDerivedState, } from './integrations/lit/state.js';
//# sourceMappingURL=lit.js.map