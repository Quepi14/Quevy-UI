/**
 * ----------------------------------------------------------
 * QUEVY UI — qv-skeleton
 * ----------------------------------------------------------
 * Purely visual loading placeholder. No slots, no interaction,
 * no render() override needed — the host element itself IS the
 * placeholder box; sizing is left entirely to the consumer via
 * inline style (width/height), same as any block element.
 *
 * @packageDocumentation
 */

import { property, customElement } from "lit/decorators.js";

import { QvElement, createComponentMetadata, createTagName } from "@quevy/core";

import { qvSkeletonStyles } from "./qv-skeleton.styles.js";
import type { QvSkeletonShape, QvSkeletonAnimation } from "./qv-skeleton.types.js";

@customElement('qv-skeleton')
export class QvSkeleton extends QvElement {
    static override styles = qvSkeletonStyles;

    public override readonly metadata = createComponentMetadata({
        name:  'QvSkeleton',
        tagName: createTagName('skeleton'),
        version: '0.1.1',
    });

    @property({ reflect: true })
    public shape: QvSkeletonShape = 'text';

    @property({ reflect: true }) 
    public animation: QvSkeletonAnimation = 'pulse';

    public override onConnected(): void {
        // Decorative placeholder - a loading region should be
        // announced bt its container (role="status" + sr-only
        // text), not  by each individual skeleton shape. Only set
        // if the consumer hasn't already overridden it.
        if (!this.hasAttribute('aria-hidden')) {
            this.setAttribute('aria-hidden', 'true');
        }
    }

}