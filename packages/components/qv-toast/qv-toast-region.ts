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

import { html, nothing } from "lit";
import { state, customElement } from "lit/decorators.js";

import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";

import { toastStore } from "../_internal/toast/toast-store.js";
import { dismiss } from "./qv-toast.js";
import { qvToastRegionStyles } from "./qv-toast-region.styles.js";
import type { QvToastEntry, QvToastPosition } from "./qv-toast.types.js";

@customElement('qv-toast-region')
export class QvToastRegion extends QvElement {
    static override styles = qvToastRegionStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvToastRegion',
        tagName: createTagName('toast-region'),
        version: '0.1.2',
    })

    @state() private toasts: QvToastEntry[] = [];
    private unsubscribe?: () => void;

    public override onConnected(): void {
        this.toasts = toastStore.getState().toast;
        this.unsubscribe = toastStore.subscribe((state) => {
            this.toasts = state.toast;
        });
    }

    public override onDisconnected(): void {
        this.unsubscribe?.();
    }

    private groupByPosition(): Map<QvToastPosition, QvToastEntry[]> {
        const groups = new Map<QvToastPosition, QvToastEntry[]>();
        for (const entry of this.toasts) {
            const list = groups.get(entry.position) ?? [];
            list.push(entry);
            groups.set(entry.position, list);
        }
        return groups;
    }

    protected override render() {
        return html`
            ${[...this.groupByPosition().entries()].map(
                ([position, items]) => html`
                    <div class="viewport" data-position=${position}>
                        ${items.map(
                            (item) => html`
                                <div
                                    class="toast"
                                    data-variant=${item.variant}
                                    role=${item.variant === 'error'? 'alert' : 'status'}
                                >
                                    <span class="message">${item.message}</span>
                                    ${item.dismissible
                                        ? html`
                                            <button
                                                class="close"
                                                aria-label="Dismiss"
                                                @click=${() => dismiss(item.id)}
                                            >&times;</button>
                                        `
                                        : nothing}
                                    ${item.duration > 0
                                        ? html`<span class="progress" style="animation-duration: ${item.duration}ms"></span>`
                                        : nothing}
                                </div>
                            `,
                        )}
                    </div>
                `,
            )}
        `;
    }
}