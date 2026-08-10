export interface QvBreadcrumbItem {
    /** Identifies  this item in the `select` event - required for filter-mode usage. */
    id?: string;
    label: string;
    /**Preset -> renders as a real link (navigate). Absent -> renders as a button (emits `select`) */
    href?: string;
}