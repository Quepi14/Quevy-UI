export type QvToastVariant = 'info' | 'success' | 'warning' | 'error';
export type QvToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
export interface QvToastOptions {
    variant?: QvToastVariant;
    position?: QvToastPosition;
    /** ms before auto-dismiss, 0 = stays untill manually dismissed. Default: 4000. */
    duration?: number;
    dismissible?: boolean;
}
export interface QvToastEntry {
    id: string;
    message: string;
    variant: QvToastVariant;
    position: QvToastPosition;
    dismissible: boolean;
    /** Resolved auto-dismiss duration in ms (0 = sticky, not progress bar). */
    duration: number;
}
//# sourceMappingURL=qv-toast.types.d.ts.map