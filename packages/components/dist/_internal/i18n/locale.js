import { localeStore } from "./locale-store.js";
export { localeStore };
export function setLocale(locale) {
    localeStore.setState({ locale });
}
export function getLocale() {
    return localeStore.getState().locale;
}
export function resolveLocale(el) {
    const lang = el.closest('[lang]')?.getAttribute('lang');
    return lang === 'en' || lang === 'id' ? lang : getLocale();
}
//# sourceMappingURL=locale.js.map