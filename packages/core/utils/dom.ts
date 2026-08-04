/**
 * packages/core/utils/dom.ts
 */

export type DOMTarget = ParentNode | Document |  ShadowRoot | HTMLElement;

/**
 * Return ture if the node is attached to the current document.
 */
export function isConnected(node: Node): boolean{
    return node.isConnected;
}

/**
 * Return the root node of a given node.
 */
export function getRootNode(
    node: Node, composed = true,
): Node {
    return node.getRootNode({ composed });
}

/**
 * Safely queries a single element.
 */
export function query<T extends Element = Element>(
    root: DOMTarget, selector: string,
): T | null {
    return root.querySelector<T>(selector);
}

/**
 * Safely queries multiple elements.
 */
export function queryAll<T extends Element = Element>(
    root: DOMTarget, selector: string,
): T[] {
    return Array.from(root.querySelectorAll<T>(selector))
}

/**
 * Return true if the parent contains the child.
 */
export function contains(
    parent: Node, child: Node | null,
): boolean {
    return child !== null && parent.contains(child)
}

/**
 * Removes all child nodes.
 */
export function clearChildren(
    element: Element,
): void {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

/**
 * Replace all children with the provided nodes.
 */
export function replaceChildren(
    element: Element,  ...children: Node[]
): void {
    element.replaceChildren(...children)
}

/**
 * Return the closest matching ancestor
 */
export function closest<T extends Element = Element>(
    element: Element, selector: string
): T | null {
    return element.closest<T>(selector);
}

/**
 * Return true if the event target originated inside the given root.
 */
export function isEventInside(
    event: Event, root: Node,
): boolean {
    return event.composedPath().includes(root)
}

/**
 * Creates an HTMLElement with optional properties.
 */
export function createElement<K  extends keyof HTMLElementTagNameMap>(
    tag:K,
    options?: {
        className?: string;
        textContent?: string;
        attributes?: Record<string, string>;
    },
): HTMLElementTagNameMap[K]{
    const element = document.createElement(tag);

    if(!options){
        return element;
    }

    if(options.className){
        element.className = options.className;
    }

    if(options.textContent !== undefined) {
        element.textContent = options.textContent;
    }

    if(options.attributes){
        for(const [key, value] of Object.entries(options.attributes)) {
            element.setAttribute(key, value);
        }
    }

    return element;
}