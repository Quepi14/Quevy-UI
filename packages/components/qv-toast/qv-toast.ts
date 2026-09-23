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
import { state } from "lit/decorators.js";

const DEFAULT_DURATION = 4000;
const DEFAULT_POSITION = 'bottom-center';

// Must match qv-toast-region-styles.ts's .toast[closing] animation
// duration (var(--qv-motion-duration-fastm 120ms)) - there's no
// animationed wiring here (toast are store-driven, not a single
// controller-owned panel like OverlayController's), so removal
// from the store is timed to the CSS exit animation instead.
const EXIT_ANIMATION_DURATION = 120;

const timers = new Map<string, ReturnType<typeof setTimeout>>();
const closeTimers = new Map<string, ReturnType<typeof setTimeout>>();

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
    if (closeTimers.has(id)) return;

    // Two-phase removal: mark the entry as closing first, so 
    // qv-toast-region keeps rendereing it with [closing] driving its
    // exit animation via CSS, then actually drop it from the store
    // once that animation has ad time to finish - mirrors the isClosing
    // pattenr OverlayController uses for panels.
    toastStore.setState((state) => ({
        toast: state.toast.map((t) => (t.id === id ? {...t, closing: true} : t)),
    }));

    const closeTimer = setTimeout(() => {
        closeTimers.delete(id);
        toastStore.setState((state) => ({ toast: state.toast.filter((t) => t.id !== id)}));
    }, EXIT_ANIMATION_DURATION);
    closeTimers.set(id, closeTimer);
}

export function dismissAll(): void {
    timers.forEach(clearTimeout);
    timers.clear();
    closeTimers.forEach(clearTimeout);
    closeTimers.clear()
    
    toastStore.setState((state) => ({
        toast: state.toast.map((t) => ({ ...t, closing: true})),
    }));

    setTimeout(() => {
        toastStore.setState({ toast: []});
    }, EXIT_ANIMATION_DURATION)
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