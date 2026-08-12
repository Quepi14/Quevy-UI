/**
 * Builds the visible page list with ellipsis collapsing.
 *
 * Always includes page 1 and `total`, plus `current` and
 * `siblingCount` pages on either side of it. Gaps of exactly 1
 * page are filled in directly rather than collapsed — an
 * ellipsis standing in for a single hidden page reads oddly
 * ("1 ... 3" instead of just "1 2 3").
 */

export function buildPageItems(
    current: number,
    total: number,
    siblingCount: number,
): (number | 'start-ellipsis'  | 'end-ellipsis')[] {
    if (total <= 0) {
        return [];
    }

    const pages = new Set<number>([1, total]);

    for (let p = current - siblingCount; p <= current + siblingCount; p += 1){
        if (p >= 1  &&  p <= total){
            pages.add(p)
        }
    }

    const sorted = [...pages].sort((a, b) => a - b);
    const items: (number | 'start-ellipsis' | 'end-ellipsis')[] = [];

    for (let i =  0; i < sorted.length; i += 1){
        items.push(sorted[i]);

        const next = sorted[i +1];
        if (next === undefined) {
            continue;
        }

        const gap =  next - sorted [i];

        if (gap === 2){
            items.push(sorted[i] + 1);
        }else if (gap > 2)  {
            items.push (i ===  0? 'start-ellipsis'  : 'end-ellipsis');
        }
    }

    return items;
}