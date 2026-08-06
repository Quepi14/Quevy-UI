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
import { cssVariables } from "./variables.js";
/**
 * Convert the flattened token  map into a `:root { ... }`
 * Css text block.
 */
export function tokenToCssText() {
    const declarations = Object.entries(cssVariables)
        .map(([name, value]) => ` ${name}: ${value}`)
        .join('\n');
    return `:root {\n${declarations}`;
}
/**
 * Injects Quevy UI design tokens inot the document as a
 * global stylesheet, using adoptedStyleSheets when available
 * (falls back to a <stle> tag otherwise).
 *
 * Call this once, as early as possible, in the consuming
 * application - not per-component.
 */
export function applyTokens(target = document) {
    const cssText = tokenToCssText();
    if ('adoptedStyleSheets' in target) {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(cssText);
        target.adoptedStyleSheets = [...target.adoptedStyleSheets, sheet];
        return;
    }
    const doc = target;
    const style = doc.createElement('style');
    style.textContent = cssText;
    doc.head.appendChild(style);
}
//# sourceMappingURL=inject.js.map