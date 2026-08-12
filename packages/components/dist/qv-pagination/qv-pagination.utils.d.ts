/**
 * Builds the visible page list with ellipsis collapsing.
 *
 * Always includes page 1 and `total`, plus `current` and
 * `siblingCount` pages on either side of it. Gaps of exactly 1
 * page are filled in directly rather than collapsed — an
 * ellipsis standing in for a single hidden page reads oddly
 * ("1 ... 3" instead of just "1 2 3").
 */
export declare function buildPageItems(current: number, total: number, siblingCount: number): (number | 'start-ellipsis' | 'end-ellipsis')[];
//# sourceMappingURL=qv-pagination.utils.d.ts.map