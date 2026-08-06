/**
 * packages/core/utils/dom.ts
 */
export type DOMTarget = ParentNode | Document | ShadowRoot | HTMLElement;
/**
 * Return ture if the node is attached to the current document.
 */
export declare function isConnected(node: Node): boolean;
/**
 * Return the root node of a given node.
 */
export declare function getRootNode(node: Node, composed?: boolean): Node;
/**
 * Safely queries a single element.
 */
export declare function query<T extends Element = Element>(root: DOMTarget, selector: string): T | null;
/**
 * Safely queries multiple elements.
 */
export declare function queryAll<T extends Element = Element>(root: DOMTarget, selector: string): T[];
/**
 * Return true if the parent contains the child.
 */
export declare function contains(parent: Node, child: Node | null): boolean;
/**
 * Removes all child nodes.
 */
export declare function clearChildren(element: Element): void;
/**
 * Replace all children with the provided nodes.
 */
export declare function replaceChildren(element: Element, ...children: Node[]): void;
/**
 * Return the closest matching ancestor
 */
export declare function closest<T extends Element = Element>(element: Element, selector: string): T | null;
/**
 * Return true if the event target originated inside the given root.
 */
export declare function isEventInside(event: Event, root: Node): boolean;
/**
 * Creates an HTMLElement with optional properties.
 */
export declare function createElement<K extends keyof HTMLElementTagNameMap>(tag: K, options?: {
    className?: string;
    textContent?: string;
    attributes?: Record<string, string>;
}): HTMLElementTagNameMap[K];
//# sourceMappingURL=dom.d.ts.map