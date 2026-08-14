/**
 * ----------------------------------------------------------
 * QUEVY UI — toast (public imperative API)
 * ----------------------------------------------------------
 * import { toast } from '@quevy/components';
 * toast.success('Saved!');
 *
 * @packageDocumentation
 */
import type { QvToastOptions } from "./qv-toast.types.js";
export declare function dismiss(id: string): void;
export declare function dismissAll(): void;
export declare const toast: {
    show: (message: string, options?: QvToastOptions) => string;
    info: (message: string, options?: Omit<QvToastOptions, 'variant'>) => string;
    success: (message: string, options?: Omit<QvToastOptions, 'variant'>) => string;
    warning: (message: string, options?: Omit<QvToastOptions, 'variant'>) => string;
    error: (message: string, options?: Omit<QvToastOptions, 'variant'>) => string;
    dismiss: typeof dismiss;
    dismissAll: typeof dismissAll;
};
//# sourceMappingURL=qv-toast.d.ts.map