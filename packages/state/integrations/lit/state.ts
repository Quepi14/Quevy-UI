/**
 * ----------------------------------------------------------
 * QUEVY STATE — LIT INTEGRATION
 * ----------------------------------------------------------
 * Bridges primitives/signal.ts and primitives/computed.ts to
 * Lit's render cycle via QvElement.requestUpdate().
 *
 * This is the ONLY file in @quevy/state allowed to depend on
 * Lit or @quevy/core. primitives/* must stay framework-agnostic
 * so packages/react can reuse them independently.
 *
 * @packageDocumentation
 */

import type { ReactiveController } from "lit";
import type { QvElement } from '@quevy/core';

import { createSignal, type Signal, } from '../../primitives/signal.js';
import { createComputed, type Computed} from '../../primitives/computed.js';
import { defaultEquality, type EqualityFn } from "../../utils/equality.js";

/**
 * Minimal shape both Signal and Computed satisfy - all this
 * file needs to bridge a value to Lit's update cycle. 
 */
interface Readable<T> {
    subscribe(listener: (value: T) => void): () => void;
}

/**
 * A Lit ReactiveController that request a host update whenever
 * a signal/computed changes, for as long as the host is connected.
 * Subscribes on hostConnected, unsubscribes on hostDisconnected -
 * safe across reconnect/disconnect cycles
 * (e.g. moving a component in the DOM).
 */
class ReactiveBinding<T> implements ReactiveController {
    private unsubscribe: (() => void) | null = null;

    public constructor(
        private readonly host: QvElement,
        private readonly source: Readable<T>,
        private readonly onDispose?: () => void,
    ){
        this.host.addController(this);
    }

    public hostConnected(): void{
        this.unsubscribe = this.source.subscribe(() => {
            this.host.requestUpdate();
        });
    }

    public hostDisconnected(): void{
        this.unsubscribe?.();
        this.unsubscribe = null;
        this.onDispose?.();
    }
}

/**
 * Binds an existing signal to a host so that changes trigger
 * a re-render. Use this when the signal is created  elsewhere
 * and possibly shared across multiple components; ownership
 * (and disposal) of the signal itself stays with its creator.
 */
export function bindState<T>(host: QvElement, signal:Signal<T>): Signal<T> {
    new ReactiveBinding(host, signal);
    return signal;
}

/**
 * Binds an existing computed to a host so that changes trigger
 * a re-render, and disposes the computed automatically when the
 * host disconnects.
 * 
 * Unlike bindState(), this DOES take ownership of the computed's
 * lifecycle - a computed subscribes to its own dependencies, so 
 * something has to detach it eventually,  if the computed is meant
 * to outline this host (shared accross component), create it outside
 * the component and pass dispose responsibility elsewhere  instead
 * of using this function
 */
export function bindComputed<T>(
    host: QvElement,
    computed: Computed<T>,
): Computed<T> {
    new ReactiveBinding(host, computed, () => computed.dispose());
    return computed;
}

/**Creates a signal owned by and bound to this component.
 * 
 * This is the primary API most components should reach for -
 * equivalent to Lit's @state(), but backed by a signal so the 
 * same value can also be read/derived from outside the  component
 * if ever needed
 * 
 * @param host Component the state belongs to (usually `this`).
 * @param initialValue Inital value.
 * @param equals Optional custom equality function.
 */
export function createState<T>(
    host: QvElement,
    initalValue: T,
    equals: EqualityFn<T> = defaultEquality,
): Signal<T> {
    return bindState(host, createSignal(initalValue, equals));
}

/**
 * Creates a computed value owned by and bound to this
 * component. Disposed automatically on disconnect.
 * 
 * @param host Component the derived state belongs to/
 * @param dependencies Signals this value derives from.
 * @param compute Function producing the derived value.
 * @param equals Optional custom equality function.
 */
export function createDerivedState<T>(
    host: QvElement,
    dependencies: readonly Signal<unknown>[],
    compute: () => T,
    equals: EqualityFn<T> = defaultEquality,
): Computed<T> {
    return bindComputed(host, createComputed(dependencies, compute, equals));
}