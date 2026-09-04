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
import type { QvToastEntry, QvToastOptions, QvToastVariant } from "./qv-toast.types.js";

const DEFAULT_DURATION = 4000;
const DEFAULT_POSITION = 'bottom-center';

const timers = new Map<string, ReturnType<typeof setTimeout>>();

function push(message: string, variant: QvToastVariant, options: QvToastOptions = {}): string {
    ensureToastRegion();

    const id = generateId('toast');
    const duration = options.duration ?? DEFAULT_DURATION;

    const entry: QvToastEntry = {
        id, 
        message,
        variant,
        position: options.position ?? DEFAULT_POSITION,
        dismissible: options.dismissible ?? true,
        duration,
    };

    toastStore.setState((state) => ({ toast: [...state.toast, entry]}));

    if (duration > 0) {
        timers.set(id, setTimeout(() => dismiss(id), duration))
    }

    return id;
}

export function dismiss(id: string): void {
    const timer = timers.get(id);
    if(timer) {
        clearTimeout(timer);
        timers.delete(id);
    }
    toastStore.setState((state) => ({ toast: state.toast.filter((t) => t.id !== id)}));
}

export function dismissAll(): void {
    timers.forEach(clearTimeout);
    timers.clear();
    toastStore.setState({ toast: []});
}

export const toast = {
    show: (message: string, options?: QvToastOptions) =>
        push(message, options?.variant ?? 'info', options),
    info: (message: string, options?: Omit<QvToastOptions, 'variant'>) => push(message, 'info', options),
    success: (message: string, options?: Omit<QvToastOptions, 'variant'>) => push(message, 'success', options),
    warning: (message: string, options?: Omit<QvToastOptions, 'variant'>) => push(message, 'warning', options),
    error: (message: string, options?: Omit<QvToastOptions, 'variant'>) => push(message, 'error', options),
    dismiss,
    dismissAll,
};