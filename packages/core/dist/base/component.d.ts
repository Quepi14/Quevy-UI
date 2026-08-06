/**
 * -----------------------------------------------------------------------------
 * Quevy UI
 * -----------------------------------------------------------------------------
 * Base component contracts shared across all Quevy UI components.
 *
 * @packageDocumentation
 */
import type { ShadowRootMode, TagName } from "./types.js";
/**
 * Metadata exposed by every Quevy UI component.
 */
export interface ComponentMetadata {
    /**
     * Human-readable component name.
     *
     * Example:
     * QvButton
     */
    readonly name: string;
    /**
     * Custom element tag name.
     */
    readonly tagName: TagName;
    /**
     * Current component version.
     */
    readonly version: string;
    /**
     * Component namespace.
     */
    readonly namespace: string;
}
/**
 * Shared component configuration.
 */
export interface ComponentOptions {
    /**
     * Shadow DOM mode.
     *
     * @default "open"
     */
    readonly shadowRoot?: ShadowRootMode;
}
/**
 * Component registration information.
 */
export interface ComponentRegistration {
    /**
     * Custom element tag.
     */
    readonly tagName: TagName;
    /**
     * Component constructor.
     */
    readonly constructor: CustomElementConstructor;
}
/**
 * Base contract implemented by all Quevy UI components.
 */
export interface BaseComponent {
    /**
     * Component metadata.
     */
    readonly metadata: ComponentMetadata;
}
/**
 * Quevy UI namespace.
 */
export declare const QV_NAMESPACE: "qv";
/**
 * Default Shadow DOM mode.
 */
export declare const DEFAULT_SHADOW_ROOT_MODE: ShadowRootMode;
/**
 * Creates a valid Quevy UI custom element tag.
 *
 * Example:
 * createTagName("button")
 * -> qv-button
 */
export declare function createTagName(name: string): TagName;
/**
 * Returns true if a component has already been registered.
 */
export declare function isRegistered(tagName: TagName): boolean;
/**
 * Creates normalized component metadata.
 */
export declare function createComponentMetadata(metadata: Omit<ComponentMetadata, "namespace">): ComponentMetadata;
//# sourceMappingURL=component.d.ts.map