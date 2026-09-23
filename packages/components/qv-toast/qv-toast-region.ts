/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-toast-region
 * ----------------------------------------------------------
 * Singleton, mounted automatically by ensure-region.ts. Purely
 * presentational — subscribes to toastStore and renders. All
 * writes (push/dismiss) go through toast.ts, never directly
 * through this component.
 *
 * Exit animation: dismiss()/dismissAll() (in qv-toast.ts) mark an
 * entry `closing: true` before actually removing it from the store,
 * so this component keeps rendering it with [closing] fro one more
 * cycle - long enough for its CSS exit animation to play
 * before the entry is truly dropped.
 * 
 * @packageDocumentation
 */

import { html, nothing } from "lit";
import { state, customElement } from "lit/decorators.js";

import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";

import { LocalizedMixin } from "../_internal/i18n/localized-mixin.js";
import { toastStore } from "../_internal/toast/toast-store.js";
import { dismiss } from "./qv-toast.js";
import { qvToastRegionStyles } from "./qv-toast-region.styles.js";
import type { QvToastEntry, QvToastPosition } from "./qv-toast.types.js";
import { COMMON_MESSAGES } from "../i18n/common-messages.js";

const QvToastRegionBase = LocalizedMixin(QvElement);

@customElement('qv-toast-region')
export class QvToastRegion extends QvToastRegionBase {
    static override styles = qvToastRegionStyles;

    public override readonly metadata = createComponentMetadata({
        name: 'QvToastRegion',
        tagName: createTagName('toast-region'),
        version: '0.1.4',
    })

    @state() private toasts: QvToastEntry[] = [];
    private unsubscribe?: () => void;

    public override onConnected(): void {
        super.onConnected?.();
        this.toasts = toastStore.getState().toast;
        this.unsubscribe = toastStore.subscribe((state) => {
            this.toasts = state.toast;
        });
    }

    public override onDisconnected(): void {
        this.unsubscribe?.();
        super.onDisconnected?.();
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
        const messages = COMMON_MESSAGES[this.locale];

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
                                    ?closing=${item.closing}
                                >
                                    <span class="message">${item.message}</span>
                                    ${item.dismissible
                                        ? html`
                                            <button
                                                class="close"
                                                aria-label=${messages.dismiss}
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