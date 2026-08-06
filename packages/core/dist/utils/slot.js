/**
 * packages/core/utils/slot.ts
 */
import { listen } from "../events/listener.js";
/**
 * Return all nodes assigned to a slot
 */
export function getAssignedNodes(slot, flatten = true) {
    return slot.assignedNodes({ flatten });
}
/**
 * Return all assigned elements.
 */
export function getAssignedElements(slot, flatten = true) {
    return slot.assignedElements({
        flatten,
    });
}
/**
 * Return the first assigned element.
 */
export function getFirstAssignedElement(slot, flatten = true) {
    return (getAssignedElements(slot, flatten)[0] ??
        null);
}
/**
 * Return true when the slot contains assigned nodes.
 */
export function hasAssignedNodes(slot, flatten = true) {
    return getAssignedNodes(slot, flatten).length > 0;
}
/**
 * Return true when the slot contains assigned elements.
 */
export function hasAssignedElements(slot, flatten = true) {
    return getAssignedElements(slot, flatten).length > 0;
}
/**
 * Return the concatenated text content of assigned nodes.
 */
export function getAssignedText(slot, flatten = true) {
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
export function onSlotChange(slot, callback) {
    return listen(slot, "slotchange", () => callback(slot));
}
//# sourceMappingURL=slot.js.map