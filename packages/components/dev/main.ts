import { applyTokens } from '@quevy/tokens';

import '../qv-button/index.js';
import '../qv-card/index.js';
import '../qv-skeleton/index.js';
import '../qv-banner/index.js';
import '../qv-state/index.js';
import '../qv-breadcrumbs/index.js';
import '../qv-chip/index.js';
import '../qv-stepper/index.js';
import '../qv-pagination/index.js';
import '../qv-dropdown/index.js';
import '../qv-menu/index.js';

applyTokens();

// ===== qv-button =====
document.getElementById('test-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Form submitted! (qv-button type="submit" jalan)');
});

// ===== qv-card =====
document.getElementById('pick-card')?.addEventListener('click', () => {
    alert('Card diklik - bukan navigasi, cuma custom action');
});

// ===== qv-chip (dismissible demo) =====
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

// ===== qv-breadcrumbs =====
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
        console.log('[breadcrumbs] hapus filter dari level:', (e as CustomEvent).detail);
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

// ===== qv-banner (controlled) =====
const promoBanner = document.getElementById('promo-banner');
promoBanner?.addEventListener('close', (e) => {
    const detail = (e as CustomEvent).detail;
    console.log('[banner] ditutup, next state:', detail.open);
    (promoBanner as any).open = false;
});

// ===== qv-stepper =====
document.querySelectorAll('qv-stepper').forEach((el) => {
    el.addEventListener('change', (e) => {
        console.log('[stepper]', el.id || '(no id)', (e as CustomEvent).detail);
    });
});

document.getElementById('qty-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    alert(`Qty submitted: ${formData.get('qty')}`);
});

// ===== qv-pagination =====
document.getElementById('big-list')?.addEventListener('change', (e) => {
    console.log('[pagination] pindah ke halaman:', (e as CustomEvent).detail.page);
});

// ===== qv-dropdown =====
const fruitDropdown = document.getElementById('fruit-dropdown') as any;
if (fruitDropdown) {
    fruitDropdown.items = [
        { value: 'apple', label: 'Apel' },
        { value: 'banana', label: 'Pisang' },
        { value: 'grape', label: 'Anggur', disabled: true },
        { value: 'mango', label: 'Mangga' },
    ];
    fruitDropdown.addEventListener('change', (e: Event) => {
        console.log('[dropdown] value terpilih:', (e as CustomEvent).detail.value);
    });
}

// ===== qv-menu (kebab di dalam card) =====
for (const id of ['card-menu', 'card-menu-2', 'card-menu-3']) {
    const menu = document.getElementById(id) as any;
    if (!menu) continue;

    menu.items = [
        { id: 'edit', label: 'Edit' },
        { id: 'duplicate', label: 'Duplikat' },
        { id: 'delete', label: 'Hapus', disabled: id === 'card-menu-2' },
    ];
    menu.addEventListener('select', (e: Event) => {
        console.log(`[menu:${id}] aksi dipilih:`, (e as CustomEvent).detail);
    });
}

// ===== stress test: interactive card + kebab bersamaan =====
document.getElementById('stress-card')?.addEventListener('click', () => {
    console.log('[stress-card] card diklik — INI HANYA BOLEH MUNCUL kalau klik di luar kebab/menu/tombol Beli')
})

// ===== qv-menu (standalone  navbar style) =====
const standaloneMenu = document.getElementById('standalone-menu') as any;
if (standaloneMenu) {
    standaloneMenu.items = [
        { id: 'share', label: 'Share' },
        { id: 'report', label: 'Report' },
    ];
    standaloneMenu.addEventListener('select', (e: Event) => {
        console.log('[menu:standalone] aksi dipilih:', (e as CustomEvent).detail);
    });
}

const navProducts = document.getElementById('nav-products') as any;
if (navProducts) {
    navProducts.items = [
        { label: 'Analytics', href: '/products/analytics' },
        { label: 'Automation', href: '/products/automation' },
        { label: 'Insights', href: '/products/insights' },
    ];
}