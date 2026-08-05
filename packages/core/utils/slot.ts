/**
 * packages/core/utils/slot.ts
 */

import { listen } from "../events/listener.js"

/**
 * Return all nodes assigned to a slot
 */
export function getAssignedNodes(
    slot:  HTMLSlotElement,
    flatten = true,
): Node [] {
    return slot.assignedNodes({ flatten })
}

/**
 * Return all assigned elements.
 */
export function getAssignedElements<T extends Element =  Element>(
    slot: HTMLSlotElement,
    flatten = true,
): T[]{
    return slot.assignedElements({
        flatten,
    }) as T[];
}

/**
 * Return the first assigned element.
 */
export function getFirstAssignedElement<T extends Element = Element>(
    slot: HTMLSlotElement,
    flatten = true,
): T | null {
    return(
        getAssignedElements<T>(slot, flatten)[0] ??
        null
    );
}

/**
 * Return true when the slot contains assigned nodes.
 */
export function hasAssignedNodes(
    slot: HTMLSlotElement,
    flatten = true,
): boolean {
    return getAssignedNodes(slot, flatten).length > 0;
}

/**
 * Return true when the slot contains assigned elements.
 */
export function hasAssignedElements(
    slot: HTMLSlotElement,
    flatten = true,
): boolean {
    return getAssignedElements(slot, flatten).length > 0;
}

/**
 * Return the concatenated text content of assigned nodes.
 */
export function getAssignedText(
    slot: HTMLSlotElement,
    flatten = true,
): string {
    return getAssignedNodes(slot, flatten)
    .map((node) => node.textContent ?? "")
    .join("")
    .trim();
}

/**
 * Subscirbes to slotchange events.
 * 
 * Returns a  cleanup function.
 */
export function onSlotChange(
    slot: HTMLSlotElement,
    callback: (slot: HTMLSlotElement) => void,
): () => void {
    return listen(
        slot,
        "slotchange",
        () => callback(slot)
    )
}