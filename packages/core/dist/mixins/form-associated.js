/**
 * --------------------------------------------------
 * QUEVY UI
 * --------------------------------------------------
 * Provides form-association capabilities for Quevy UI
 * Web Components.
 *
 * @packageDocumentation
 */
export function FormAssociatedMixin(Base) {
    class Mixin extends Base {
        constructor() {
            super(...arguments);
            /**
             * Lazily initialized internals used for native form association.
             */
            this._internals = null;
        }
        /**
         * Enables the Form-Associated Custom Element
         * behavior for the derived custom element.
         */
        static { this.formAssociated = true; }
        /**
         * Returns the ElementInternals instance associated
         * with the component.
         *
         * @returns ElementInternals when supported, otherwise null.
         */
        get internals() {
            if (this._internals === null) {
                this._internals = this.attachInternalSafely();
            }
            return this._internals;
        }
        /**
         * Returns the form associated with the component.
         *
         * @return The associated form or null when the component
         * is not associated with a form.
         */
        get form() {
            return this.internals?.form ?? null;
        }
        /**
         * Attaches ElementInternals without allowing an
         * unsupported environment to break component creation.
         *
         * @return The attached ElementInternals instance or null.
         */
        attachInternalSafely() {
            if (!('attachInternals' in this)) {
                return null;
            }
            try {
                return this.attachInternals();
            }
            catch {
                return null;
            }
        }
    }
    return Mixin;
}
//# sourceMappingURL=form-associated.js.map