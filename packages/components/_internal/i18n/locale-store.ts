import { createStore, type StoreState } from "@quevy/state";

export type QvLocale = 'id' | 'en';

export interface LocaleState extends StoreState {
    locale: QvLocale;
}

export const localeStore = createStore<LocaleState>({ locale: 'id' });