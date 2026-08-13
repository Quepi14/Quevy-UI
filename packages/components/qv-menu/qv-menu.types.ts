export interface QvMenuItem {
    id?: string;
    label: string;
    href?: string;
    disabled?: boolean;
}

export interface QvMenuSelectEventDetail {
    id?: string;
    label: string;
    index: number;
}