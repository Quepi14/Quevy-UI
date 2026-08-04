/**
 *------------------------------------------------------------
 * QUEVY UI
 * ------------------------------------------------------------
 * Internal lifecyle contracts shared  across all Qv Components.
 * 
 * These interface provide a consistent internal lifecycle model without
 * replacing Lit's native lifecycle methods.
 * 
 * @packageDocumentation
*/

import { PropertyValues } from "lit";

/**
 * called after the component has been connected to the Document
 */
export interface OnConnected {
    onConnected(): void;
}

/**
 * called before the component has been disconnected from the Document
 */
export interface OnDisconnected {
    onDisconnected(): void;
}

/**
 * called once after the first render has completed
 */
export interface OnFirstRender {
    onFirstRender(): void;
}

/**
 * called before every render cycle
 */
export interface BeforeRender {
    beforeRender(): void;
}

/**
 * called after every render cycle
 */
export interface AfterRender {
    afterRender(): void;
}

/**
 * This is for lit element cycle 
 */
export interface LitElementLifecycle {
    /**
     * called before every update cycle
     */
    willUpdate(changedProperties: PropertyValues): void;
}

/**
 * Optional lifecycle aggregation
 * 
 * Components can implement only the hooks they need
 */
export interface QvLifecycle
    extends Partial<OnConnected>,
        Partial<OnDisconnected>,
        Partial<OnFirstRender>,
        Partial<BeforeRender>,
        Partial<AfterRender>,
        Partial<LitElementLifecycle> {}