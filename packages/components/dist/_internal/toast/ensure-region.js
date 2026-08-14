/**
 * Lazily registers and mounts <qv-toast-region> the first time
 * a toast is shown — most pages never call toast.show(), so
 * paying the cost of defining/mounting the region eagerly on
 * every page load would be wasteful. Dynamic import also keeps
 * qv-toast-region's Lit/CSS weight out of the imperative API's
 * own module graph until actually needed.
 */
let ensured = false;
export function ensureToastRegion() {
    if (ensured || typeof document === 'undefined')
        return;
    ensured = true;
    void import('../../qv-toast/qv-toast-region.js').then(() => {
        if (document.querySelector('qv-toast-region'))
            return;
        document.body.appendChild(document.createElement('qv-toast-region'));
    });
}
//# sourceMappingURL=ensure-region.js.map