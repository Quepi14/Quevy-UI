import { localeStore, type QvLocale } from "./locale-store.js";

export { localeStore };
export type { QvLocale } from './locale-store.js';

export function setLocale(locale: QvLocale): void {
    localeStore.setState({ locale });
}

export function getLocale(): QvLocale {
    return localeStore.getState().locale;
}

export function resolveLocale(el: Element): QvLocale {
    const lang = el.closest('[lang]')?.getAttribute('lang');
    return lang === 'en' || lang === 'id' ? lang : getLocale();
}