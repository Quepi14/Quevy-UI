export type QvInputVariant = 'default' | 'floating';
export type QvInputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

export interface QvInputChangeEventDetail {
    value: string;
}