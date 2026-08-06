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
export function setRole(element, role) {
    element.setAttribute("role", role);
}
export function removeRole(element) {
    element.removeAttribute("role");
}
export function setAria(element, name, value) {
    element.setAttribute(`aria-${name}`, String(value));
}
export function removeAria(element, name) {
    element.removeAttribute(`aria-${name}`);
}
export function setTabIndex(element, value) {
    element.tabIndex = value;
}
export function focus(element, options) {
    element.focus(options);
}
export function blur(element) {
    element.blur();
}
export function isDisabled(element) {
    return (element.hasAttribute("disabled") ||
        element.getAttribute("aria-disabled") === "true");
}
export function isFocusable(element) {
    return (element instanceof HTMLElement && element.matches(FOCUSABLE_SELECTOR) && !isDisabled(element));
}
export function getFocusableElement(root) {
    return Array.from(root.querySelectorAll(FOCUSABLE_SELECTOR)).filter(isFocusable);
}
export function focusFirst(root) {
    const element = getFocusableElement(root)[0];
    if (!element) {
        return false;
    }
    element.focus();
    return true;
}
export function focusLast(root) {
    const elements = getFocusableElement(root);
    const element = elements[elements.length - 1];
    if (!element) {
        return false;
    }
    element.focus();
    return true;
}
//# sourceMappingURL=accessibility.js.map