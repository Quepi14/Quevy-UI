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
export declare function query(selector: string, cache?: boolean): PropertyDecorator;
//# sourceMappingURL=query.d.ts.map