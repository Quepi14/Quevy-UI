/**
 * ----------------------------------------------------------
 * QUEVY TOKENS
 * ----------------------------------------------------------
 * Applies design tokens as CSS Custom Properties on :root,
 * so they inherit through every Shadow DOM boundary in the
 * document (CSS custom properties penetrate shadow roots by
 * default — no per-component redeclaration needed).
 *
 * @packageDocumentation
 */
/**
 * Convert the flattened token  map into a `:root { ... }`
 * Css text block.
 */
export declare function tokensToCssText(): string;
/**
 * Injects Quevy UI design tokens inot the document as a
 * global stylesheet, using adoptedStyleSheets when available
 * (falls back to a <stle> tag otherwise).
 *
 * Call this once, as early as possible, in the consuming
 * application - not per-component.
 */
export declare function applyTokens(target?: Document): void;
//# sourceMappingURL=inject.d.ts.map