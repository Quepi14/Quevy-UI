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

        Object.defineProperty(target, propertyKey, {
            configurable: true,
            enumerable: true,
            get(this: { renderRoot: ParentNode }): Element | null {
                if (cache && (this as any).__queryCache?.[propertyKey as string] !== undefined) {
                    return (this as any).__queryCache[propertyKey as string];
                }
                const result = this.renderRoot.querySelector(selector);
                if (cache) {
                    (this as any).__queryCache ??= {};
                    (this as any).__queryCache[propertyKey as string] = result;
                }
                return result;
            },
        });
    };
}