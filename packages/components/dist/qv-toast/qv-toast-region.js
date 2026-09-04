/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-toast-region
 * ----------------------------------------------------------
 * Singleton, mounted automatically by ensure-region.ts. Purely
 * presentational — subscribes to toastStore and renders. All
 * writes (push/dismiss) go through toast.ts, never directly
 * through this component.
 *
 * KNOWN LIMITATION: dismissal is instant removal, no exit
 * animation (only qv-toast-in exists, no matching out-animation
 * with a delay before actual DOM removal). Acceptable for v1;
 * revisit if this becomes a real complaint, since it needs
 * either a fixed delay before store removal or a Web Animations
 * API-driven remove — not something to build speculatively now.
 *
 * @packageDocumentation
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, nothing } from "lit";
import { state, customElement } from "lit/decorators.js";
import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";
import { toastStore } from "../_internal/toast/toast-store.js";
import { dismiss } from "./qv-toast.js";
import { qvToastRegionStyles } from "./qv-toast-region.styles.js";
let QvToastRegion = class QvToastRegion extends QvElement {
    constructor() {
        super(...arguments);
        this.metadata = createComponentMetadata({
            name: 'QvToastRegion',
            tagName: createTagName('toast-region'),
            version: '0.1.2',
        });
        this.toasts = [];
    }
    static { this.styles = qvToastRegionStyles; }
    onConnected() {
        this.toasts = toastStore.getState().toast;
        this.unsubscribe = toastStore.subscribe((state) => {
            this.toasts = state.toast;
        });
    }
    onDisconnected() {
        this.unsubscribe?.();
    }
    groupByPosition() {
        const groups = new Map();
        for (const entry of this.toasts) {
            const list = groups.get(entry.position) ?? [];
            list.push(entry);
            groups.set(entry.position, list);
        }
        return groups;
    }
    render() {
        return html `
            ${[...this.groupByPosition().entries()].map(([position, items]) => html `
                    <div class="viewport" data-position=${position}>
                        ${items.map((item) => html `
                                <div
                                    class="toast"
                                    data-variant=${item.variant}
                                    role=${item.variant === 'error' ? 'alert' : 'status'}
                                >
                                    <span class="message">${item.message}</span>
                                    ${item.dismissible
            ? html `
                                            <button
                                                class="close"
                                                aria-label="Dismiss"
                                                @click=${() => dismiss(item.id)}
                                            >&times;</button>
                                        `
            : nothing}
                                    ${item.duration > 0
            ? html `<span class="progress" style="animation-duration: ${item.duration}ms"></span>`
            : nothing}
                                </div>
                            `)}
                    </div>
                `)}
        `;
    }
};
__decorate([
    state()
], QvToastRegion.prototype, "toasts", void 0);
QvToastRegion = __decorate([
    customElement('qv-toast-region')
], QvToastRegion);
export { QvToastRegion };
//# sourceMappingURL=qv-toast-region.js.map