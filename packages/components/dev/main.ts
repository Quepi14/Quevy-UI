import { applyTokens } from '@quevy/tokens';

import '../qv-button/index.js';
import '../qv-card/index.js';
import '../qv-skeleton/index.js';
import '../qv-banner/index.js';
import '../qv-state/index.js';
import '../qv-breadcrumbs/index.js';
import '../qv-chip/index.js';

applyTokens();

document
    .getElementById('test-form')
    ?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Form submitted! (qv-button type="submit" jalan)');
    });

document
    .getElementById('pick-card')
    ?.addEventListener('click', () => {
        alert('Card diklik - bukan navigasi, cuma custom action');
    });

// qv-banner: controlled example
const promoBanner = document.getElementById('promo-banner');
promoBanner?.addEventListener('close', (e) => {
    const detail = (e as CustomEvent).detail;
    console.log('Banner ditutup, next state:', detail.open);
    (promoBanner as any).open = false;
});

// qv-breadcrumbs: perlu di-set lewat property (bukan attribute),
// karena `items` array tidak bisa ditulis sebagai HTML attribute biasa.
const navCrumbs = document.getElementById('nav-crumbs') as any;
if (navCrumbs) {
    navCrumbs.items = [
        { label: 'Home', href: '/' },
        { label: 'Electronics', href: '/electronics' },
        { label: 'Laptops', href: '/electronics/laptops' },
        { label: 'Gaming Laptops' },
    ];
}

const filterCrumbs = document.getElementById('filter-crumbs') as any;
if (filterCrumbs) {
    filterCrumbs.items = [
        { id: 'cat', label: 'Sepatu' },
        { id: 'type', label: 'Sneakers' },
        { id: 'color', label: 'Hitam' },
        { id: 'size', label: 'Ukuran 43' },
    ];
    filterCrumbs.addEventListener('select', (e: Event) => {
        console.log('Hapus filter dari level:', (e as CustomEvent).detail);
    });
}

const longCrumbs = document.getElementById('long-crumbs') as any;
if (longCrumbs) {
    longCrumbs.items = [
        { label: 'Home', href: '/' },
        { label: 'A', href: '/a' },
        { label: 'B', href: '/a/b' },
        { label: 'C', href: '/a/b/c' },
        { label: 'D', href: '/a/b/c/d' },
        { label: 'Current Page' },
    ];
}

// qv-chip: dismissible demo, chip dihapus dari array lalu di-render ulang
let activeFilters = [
    { value: 'sneakers', label: 'Sneakers' },
    { value: 'hitam', label: 'Hitam' },
    { value: 'u43', label: 'Ukuran 43' },
];

function renderActiveFilters(): void {
    const container = document.getElementById('active-filters');
    if (!container) return;

    container.innerHTML = '';
    for (const f of activeFilters) {
        const chip = document.createElement('qv-chip');
        (chip as any).dismissible = true;
        (chip as any).value = f.value;
        chip.textContent = f.label;
        chip.addEventListener('dismiss', (e) => {
            const detail = (e as CustomEvent).detail;
            activeFilters = activeFilters.filter((x) => x.value !== detail.value);
            renderActiveFilters();
        });
        container.appendChild(chip);
    }
}
renderActiveFilters();