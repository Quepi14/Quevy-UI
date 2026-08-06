/**
 * --------------------------------------------------
 * QUEVY UI
 * --------------------------------------------------
 * Property decorator for querying multiple elements
 * from the component render root.
 *
 * @packageDocumentation
 */
/**
 * Creates a property decorator that queries all
 * matching elements from the component render root.
 *
 * The queried elements are resolved lazily whenever
 * the decorated property is accessed.
 *
 * @param selector - CSS selector used to locate elements.
 *
 * @returns A property decorator.
 */
export function queryAll(selector) {
    return (target, propertyKey) => {
        Object.defineProperty(target, propertyKey, {
            configurable: true,
            enumerable: true,
            get() {
                return this.renderRoot.querySelectorAll(selector);
            }
        });
    };
}
//# sourceMappingURL=query-all.js.map