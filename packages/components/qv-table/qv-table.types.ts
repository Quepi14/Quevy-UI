export interface QvTableColumns <T = Record<string, unknown>> {
    key: string;
    label: string;
    align?: 'left' | 'center' | 'right';
    width?: string;
    render?: (row: T) => unknown;
}

export interface QvTableSelectEventDetail {
    selectedKeys: string[];
}