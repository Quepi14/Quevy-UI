export interface QvMenuItem {
    id?: string;
    label: string;
    href?: string;
    disabled?: boolean;
    /** Optional leading icon */
    icon?: unknown;
}

export interface QvMenuSelectEventDetail {
    id?: string;
    label: string;
    index: number;
}