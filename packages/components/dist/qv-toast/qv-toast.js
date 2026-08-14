/**
 * ----------------------------------------------------------
 * QUEVY UI — toast (public imperative API)
 * ----------------------------------------------------------
 * import { toast } from '@quevy/components';
 * toast.success('Saved!');
 *
 * @packageDocumentation
 */
import { generateId } from "@quevy/core";
import { toastStore } from "../_internal/toast/toast-store.js";
import { ensureToastRegion } from "../_internal/toast/ensure-region.js";
const DEFAULT_DURATION = 4000;
const DEFAULT_POSITION = 'bottom-center';
const timers = new Map();
function push(message, variant, options = {}) {
    ensureToastRegion();
    const id = generateId('toast');
    const duration = options.duration ?? DEFAULT_DURATION;
    const entry = {
        id,
        message,
        variant,
        position: options.position ?? DEFAULT_POSITION,
        dismissible: options.dismissible ?? true,
    };
    toastStore.setState((state) => ({ toast: [...state.toast, entry] }));
    if (duration > 0) {
        timers.set(id, setTimeout(() => dismiss(id), duration));
    }
    return id;
}
export function dismiss(id) {
    const timer = timers.get(id);
    if (timer) {
        clearTimeout(timer);
        timers.delete(id);
    }
    toastStore.setState((state) => ({ toast: state.toast.filter((t) => t.id !== id) }));
}
export function dismissAll() {
    timers.forEach(clearTimeout);
    timers.clear();
    toastStore.setState({ toast: [] });
}
export const toast = {
    show: (message, options) => push(message, options?.variant ?? 'info', options),
    info: (message, options) => push(message, 'info', options),
    success: (message, options) => push(message, 'success', options),
    warning: (message, options) => push(message, 'warning', options),
    error: (message, options) => push(message, 'error', options),
    dismiss,
    dismissAll,
};
//# sourceMappingURL=qv-toast.js.map