/**
 * packages/core/utils/dom.ts
 */
/**
 * Return ture if the node is attached to the current document.
 */
export function isConnected(node) {
    return node.isConnected;
}
/**
 * Return the root node of a given node.
 */
export function getRootNode(node, composed = true) {
    return node.getRootNode({ composed });
}
/**
 * Safely queries a single element.
 */
export function query(root, selector) {
    return root.querySelector(selector);
}
/**
 * Safely queries multiple elements.
 */
export function queryAll(root, selector) {
    return Array.from(root.querySelectorAll(selector));
}
/**
 * Return true if the parent contains the child.
 */
export function contains(parent, child) {
    return child !== null && parent.contains(child);
}
/**
 * Removes all child nodes.
 */
export function clearChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
/**
 * Replace all children with the provided nodes.
 */
export function replaceChildren(element, ...children) {
    element.replaceChildren(...children);
}
/**
 * Return the closest matching ancestor
 */
export function closest(element, selector) {
    return element.closest(selector);
}
/**
 * Return true if the event target originated inside the given root.
 */
export function isEventInside(event, root) {
    return event.composedPath().includes(root);
}
/**
 * Creates an HTMLElement with optional properties.
 */
export function createElement(tag, options) {
    const element = document.createElement(tag);
    if (!options) {
        return element;
    }
    if (options.className) {
        element.className = options.className;
    }
    if (options.textContent !== undefined) {
        element.textContent = options.textContent;
    }
    if (options.attributes) {
        for (const [key, value] of Object.entries(options.attributes)) {
            element.setAttribute(key, value);
        }
    }
    return element;
}
//# sourceMappingURL=dom.js.map