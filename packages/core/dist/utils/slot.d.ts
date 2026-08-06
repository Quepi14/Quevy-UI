/**
 * packages/core/utils/slot.ts
 */
/**
 * Return all nodes assigned to a slot
 */
export declare function getAssignedNodes(slot: HTMLSlotElement, flatten?: boolean): Node[];
/**
 * Return all assigned elements.
 */
export declare function getAssignedElements<T extends Element = Element>(slot: HTMLSlotElement, flatten?: boolean): T[];
/**
 * Return the first assigned element.
 */
export declare function getFirstAssignedElement<T extends Element = Element>(slot: HTMLSlotElement, flatten?: boolean): T | null;
/**
 * Return true when the slot contains assigned nodes.
 */
export declare function hasAssignedNodes(slot: HTMLSlotElement, flatten?: boolean): boolean;
/**
 * Return true when the slot contains assigned elements.
 */
export declare function hasAssignedElements(slot: HTMLSlotElement, flatten?: boolean): boolean;
/**
 * Return the concatenated text content of assigned nodes.
 */
export declare function getAssignedText(slot: HTMLSlotElement, flatten?: boolean): string;
/**
 * Subscirbes to slotchange events.
 *
 * Returns a  cleanup function.
 */
export declare function onSlotChange(slot: HTMLSlotElement, callback: (slot: HTMLSlotElement) => void): () => void;
//# sourceMappingURL=slot.d.ts.map