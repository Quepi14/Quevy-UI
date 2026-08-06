/**
 * ----------------------------------------------------------
 * QUEVY STATE
 * ----------------------------------------------------------
 * Uncontrolled fallback state, and the main controllable-value
 * factory components use to support both controlled and
 * uncontrolled usage from a single code path.
 *
 * Zero dependency on signal.ts/computed.ts, Lit, or
 * @quevy/core.
 *
 * @packageDocumentation
 */
/**
 * Holds a fallback value used only while a component is
 * uncontrolled. Intentionally minimal — no subscribe(), no
 * equality check. If a component needs to react to this value
 * changing over time, it should use primitives/signal.ts
 * instead; this container exists purely to remember "the last
 * value the user picked" between renders.
 */
export interface UncontrolledState<T> {
    get(): T;
    set(value: T): void;
    reset(): void;
}
/**
 * Creates an uncontrolled fallback state container.
 *
 * @param defaulValue Value used initially, and restored by reset().
 */
export declare function createUncontrolledState<T>(defaultValue: T): UncontrolledState<T>;
export interface ControllableValue<T> {
    /**
     * Resolve the value to render, given the component's
     * current controlled prop (may be undefined).
     */
    value(controlledValue: T | undefined): T;
    /**
     * Call this whenever a user interaction request a value
     * change (e.g. a click on qv-checkbox).
     *
     * If the component is uncontrolled, the internal fallback
     * is updated so subsequent value() calls reflect it. If
     * controlled, the internal fallback is left untouched - the
     * consumer is epected to feed the new value back in via
     * the controlled prop after handling the emitted event.
     *
     * Either way, return `next` unchanged, so call sites can
     * use the return value directly as the event detail:
     *
     * ``` ts
     * const next = this.controllable.request(this.checkProp, !this.checked);
     * this.emit('change', {checked: next});
     * ```
     */
    request(controlledValue: T | undefined, next: T): T;
}
/**
 * Creates a controllable value for use inside a component.
 *
 * @param defaultValue initial fallback value while uncontrolled.
 */
export declare function createControllableValue<T>(defaultValue: T): ControllableValue<T>;
//# sourceMappingURL=uncontrolled.d.ts.map