/**
 * --------------------------------------------------
 * QUEVY UI
 * --------------------------------------------------
 * Provides reusable focus state helpers for Quevy UI
 * components.
 *
 * @packageDocumentation
 */
export function FocusableMixin(Base) {
    class Mixin extends Base {
        /**
         * Returns whether the component currently has focus.
         *
         * @returns True when the component is the active element.
         */
        get isFocused() {
            return document.activeElement === this;
        }
    }
    return Mixin;
}
//# sourceMappingURL=focusable.js.map