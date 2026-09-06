import { type StoreState } from "@quevy/state";
export type QvLocale = 'id' | 'en';
export interface LocaleState extends StoreState {
    locale: QvLocale;
}
export declare const localeStore: import("@quevy/state").Store<LocaleState>;
//# sourceMappingURL=locale-store.d.ts.map