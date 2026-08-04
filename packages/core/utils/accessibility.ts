/**
 * packages/core/utils/accessiblity.ts
 */

const FOCUSABLE_SELECTOR = [
    "a[href]",
    "area[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "iframe",
    "object",
    "embed",
    "[contenteditable]",
    "[tabindex]:not([tabindex='-1'])"
].join(",");

export function setRole(
    element: Element,
    role: string
): void {
    element.setAttribute("role", role);
}

export function removeRole(
    element: Element,
): void {
    element.removeAttribute("role");
}

export function setAria(
    element: Element,
    name: string,
    value: string | boolean | number,
):void {
    element.setAttribute(
        `aria-${name}`,
        String(value),
    );
}

export function removeAria(
    element: Element,
    name: string,
): void {
    element.removeAttribute(
        `aria-${name}`,
    );
}

export function setTabIndex(
    element: HTMLElement,
    value: number,
): void {
    element.tabIndex = value;
}

export function focus(
    element: HTMLElement,
    options?: FocusOptions,
): void {
    element.focus(options);
}

export function blur(
    element: HTMLElement,
): void {
    element.blur()
}

export function isDisabled(
    element: Element,
): boolean {
    return(
        element.hasAttribute("disabled") ||
        element.getAttribute("aria-disabled") === "true"
    );
}

export function isFocusable(
    element: Element,
): element is HTMLElement {
    return(
        element instanceof HTMLElement && element.matches(FOCUSABLE_SELECTOR) && !isDisabled(element)
    );
}

export function getFocusableElement(
    root: ParentNode,
): HTMLElement[] {
    return Array.from(
        root.querySelectorAll<HTMLElement>(
            FOCUSABLE_SELECTOR,
        ),
    ).filter(isFocusable)
}

export function focusFirst(
    root: ParentNode,
): boolean {
    const element = getFocusableElement(root)[0];

    if(!element){
        return false;
    }

    element.focus();

    return true;
}

export function focusLast(
    root: ParentNode,
): boolean {
    const elements = getFocusableElement(root);

    const element = elements[elements.length - 1];

    if (!element){
        return false;
    }

    element.focus();

    return true;
}