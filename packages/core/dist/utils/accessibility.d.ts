/**
 * packages/core/utils/accessiblity.ts
 */
export declare function setRole(element: Element, role: string): void;
export declare function removeRole(element: Element): void;
export declare function setAria(element: Element, name: string, value: string | boolean | number): void;
export declare function removeAria(element: Element, name: string): void;
export declare function setTabIndex(element: HTMLElement, value: number): void;
export declare function focus(element: HTMLElement, options?: FocusOptions): void;
export declare function blur(element: HTMLElement): void;
export declare function isDisabled(element: Element): boolean;
export declare function isFocusable(element: Element): element is HTMLElement;
export declare function getFocusableElement(root: ParentNode): HTMLElement[];
export declare function focusFirst(root: ParentNode): boolean;
export declare function focusLast(root: ParentNode): boolean;
//# sourceMappingURL=accessibility.d.ts.map