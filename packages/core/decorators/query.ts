/**
 * --------------------------------------------------
 * QUEVY UI
 * --------------------------------------------------
 * Property decorator for querying an element from the
 * component render root.
 *
 * @packageDocumentation
 */

/**
 * Creates a property decorator that queries the first
 * matching element from the component render root.
 * 
 * The queried element is resolved lazily whatever the 
 * decorated property is accessed.
 * 
 * @param selector - CSS selector used to locate the element.
 * 
 * @returns A property decorator.
 */
export function query(selector: string, cache = false): PropertyDecorator {
    return (target, propertyKey) => {
        let cachedValue: Element | null | undefined;

        Object.defineProperty(target, propertyKey, {
            configurable: true,
            enumerable: true,
            get(this: { renderRoot: ParentNode }): Element | null {
                if (cache && cachedValue !== undefined) {
                    return cachedValue;
                }
                const result = this.renderRoot.querySelector(selector);
                if (cache) cachedValue = result;
                return result;
            },
        });
    };
}