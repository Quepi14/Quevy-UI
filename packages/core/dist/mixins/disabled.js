/**
 * --------------------------------------------------
 * QUEVY UI
 * --------------------------------------------------
 * Provides reusable disabled-state behavior for
 * Quevy UI components.
 *
 * @packageDocumentation
 */
import { isDisabled as checkDisabled } from '../utils/accessibility.js';
export function DisabledMixin(Base) {
    class Mixin extends Base {
        /**
         * Returns whether the component is disabled.
         *
         * Reflects the native `disabled` attribute, which remains
         * the source of truth for this property.
         */
        get disabled() {
            return this.hasAttribute('disabled');
        }
        /**
         * Enables or disables the component.
         *
         * The `disabled` attribute is the source of truth. The
         * `aria-disabled` attribute is kept in sync so assistive
         * technology receives an equivalent signal.
         */
        set disabled(value) {
            const currentValue = this.disabled;
            if (currentValue === value) {
                return;
            }
            if (value) {
                this.setAttribute('disabled', '');
                this.setAttribute('aria-disabled', 'true');
            }
            else {
                this.removeAttribute('disabled');
                this.removeAttribute('aria-disabled');
            }
            this.requestUpdate();
        }
        /**
         * Returns whether the component can currently receive
         * interaction.
         *
         * Unlike `disabled`, this also accounts for `aria-disabled`
         * set independently (e.g. directly in markup), using the
         * same check relied on elsewhere in Quevy UI.
         */
        get isDisabled() {
            return checkDisabled(this);
        }
    }
    return Mixin;
}
//# sourceMappingURL=disabled.js.map