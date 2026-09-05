import { applyTokens } from '@quevy/tokens';
import { html } from 'lit';

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
import '../qv-modal/index.js';
import '../qv-bottom-sheet/index.js';
import '../qv-bottom-sheet-inline/index.js';
import '../qv-spinner/index.js';
import '../qv-progress/index.js';
import '../qv-bar/index.js';
import '../qv-table/index.js';
import '../qv-badge/index.js';
import '../qv-textarea/index.js';
import '../qv-slider/index.js';
import '../qv-file-input/index.js';
import '../qv-list/index.js';
import '../qv-calendar/index.js';
import '../qv-datepicker/index.js';
import '../qv-carousel/index.js';
import '../qv-checkbox/index.js';
import '../qv-switch/index.js';
import '../qv-radio/index.js';
import '../qv-input/index.js';
import '../qv-tooltip/index.js';
import '../qv-avatar/index.js';
import '../qv-collapsible/index.js';
import '../qv-accordion/index.js';
import '../qv-navbar/index.js';

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
(promoBanner as any).open = false;

document.getElementById('show-promo-button')?.addEventListener('click', () => {
    (promoBanner as any).open = true;
});
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

const controlledStepper = document.getElementById('controlled-stepper') as any;
controlledStepper?.addEventListener('change', (e: Event) => {
    controlledStepper.value = (e as CustomEvent).detail.value;
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
const fruitItems = [
    { value: 'apple', label: 'Apel' },
    { value: 'banana', label: 'Pisang' },
    { value: 'grape', label: 'Anggur', disabled: true },
    { value: 'mango', label: 'Mangga' },
];

for (const id of ['fruit-dropdown', 'fruit-search', 'fruit-combobox']) {
    const dropdown = document.getElementById(id) as any;
    if (!dropdown) continue;

    dropdown.items = fruitItems;
    dropdown.addEventListener('change', (e: Event) => {
        console.log(`[dropdown:${id}] value terpilih:`, (e as CustomEvent).detail.value);
    });
}

// ===== qv-menu (kebab di dalam card) =====
const EDIT_ICON = html`<svg viewBox="0 0 20 20" fill="currentColor"><path d="M13.6 2.3a1 1 0 011.4 0l2.7 2.7a1 1 0 010 1.4L7 17.1l-4 1 1-4L13.6 2.3z"/></svg>`;
const DUPLICATE_ICON = html`<svg viewBox="0 0 20 20" fill="currentColor"><path d="M5 3h9v2H7v9H5V3zm4 4h9v11H9V7z"/></svg>`;
const DELETE_ICON = html`<svg viewBox="0 0 20 20" fill="currentColor"><path d="M6 7h8l-1 10H7L6 7zm2-3h4l1 1h3v2H4V5h3l1-1z"/></svg>`;

for (const id of ['card-menu', 'card-menu-2', 'card-menu-3']) {
    const menu = document.getElementById(id) as any;
    if (!menu) continue;

    menu.items = [
        { id: 'edit', label: 'Edit', icon: EDIT_ICON },
        { id: 'duplicate', label: 'Duplikat', icon: DUPLICATE_ICON },
        { id: 'delete', label: 'Hapus', icon: DELETE_ICON, disabled: id === 'card-menu-2' },
    ];
    menu.addEventListener('select', (e: Event) => {
        console.log(`[menu:${id}] aksi dipilih:`, (e as CustomEvent).detail);
    });
}

// ===== stress test: interactive card  kebab bersamaan =====
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

// ===== qv-switch =====
const controlledSwitch = document.getElementById('controlled-switch') as any;
controlledSwitch?.addEventListener('change', (e: Event) => {
    controlledSwitch.checked = (e as CustomEvent).detail.checked;
});

// ===== qv-radio-group =====
document.getElementById('payment-method')?.addEventListener('change', (e) => {
    console.log('[radio-group] metode terpilih:', (e as CustomEvent).detail);
});

// ===== qv-slider =====
document.getElementById('single-slider')?.addEventListener('change', (e) => {
    console.log('[slider:single]', (e as CustomEvent).detail);
});
document.getElementById('big-step-slider')?.addEventListener('change', (e) => {
    console.log('[slider:big-step]', (e as CustomEvent).detail);
});
document.getElementById('range-slider')?.addEventListener('change', (e) => {
    console.log('[slider:range]', (e as CustomEvent).detail);
});

// ===== qv-file-input =====
document.getElementById('file-upload')?.addEventListener('change', (e) => {
    console.log('[file-input] files:', (e as CustomEvent).detail.files.map((f: File) => f.name));
});

// ===== qv-collapsible/qv-accordion =====
document.querySelectorAll('qv-collapsible').forEach((el) => {
    el.addEventListener('toggle', (e) => console.log('[collapsible]', (e as CustomEvent).detail));
});

// ===== qv-modal =====
const confirmModal = document.getElementById('confirm-modal') as any;
document.getElementById('open-modal-btn')?.addEventListener('click', () => confirmModal?.show());
document.getElementById('cancel-btn')?.addEventListener('click', () => confirmModal?.close());
document.getElementById('confirm-btn')?.addEventListener('click', () => {
    console.log('[modal] terkonfirmasi hapus');
    confirmModal?.close();
});

const accentModal = document.getElementById('accent-modal') as any;
document.getElementById('open-modal-accent-btn')?.addEventListener('click', () => accentModal?.show());

// ===== qv-bottom-sheet =====
const filterSheet = document.getElementById('filter-sheet') as any;
document.getElementById('open-sheet-btn')?.addEventListener('click', () => filterSheet?.show());

const playerSheet = document.getElementById('player-sheet') as any;
document.getElementById('open-sheet-inline-btn')?.addEventListener('click', () => playerSheet?.show());

// ===== qv-toast =====
import('../qv-toast/qv-toast.js').then(({ toast }) => {
    document.getElementById('toast-info-btn')?.addEventListener('click', () => toast.info('Update tersedia'));
    document.getElementById('toast-success-btn')?.addEventListener('click', () => toast.success('Data berhasil disimpan'));
    document.getElementById('toast-error-btn')?.addEventListener('click', () => toast.error('Gagal upload file', { duration: 0 }));
    document.getElementById('toast-topright-btn')?.addEventListener('click', () => toast.info('Pesan baru diterima', { position: 'top-right', duration: 5000 }));
});

// ===== qv-table =====
const pegawaiTable = document.getElementById('pegawai-table') as any;
if (pegawaiTable) {
    pegawaiTable.columns = [
        { key: 'nama', label: 'Nama Pegawai' },
        { key: 'bagian', label: 'Bagian' },
        { key: 'gaji', label: 'Gaji', align: 'right' },
    ];
    pegawaiTable.rows = [
        { id: 1, nama: 'Budi', bagian: 'Kasir', gaji: 'Rp 3.500.000' },
        { id: 2, nama: 'Siti', bagian: 'Gudang', gaji: 'Rp 3.200.000' },
        { id: 3, nama: 'Andi', bagian: 'Kasir', gaji: 'Rp 3.500.000' },
    ];
    pegawaiTable.addEventListener('select', (e: Event) => {
        console.log('[table] baris terpilih:', (e as CustomEvent).detail);
    });
}

const pesananTable = document.getElementById('pesanan-table') as any;
if (pesananTable) {
    pesananTable.columns = [
        { key: 'idPesanan', label: 'ID Pesanan' },
        { key: 'tanggal', label: 'Tanggal' },
        { key: 'pelanggan', label: 'Pelanggan' },
        { key: 'produk', label: 'Produk' },
        { key: 'qty', label: 'Qty', align: 'center' },
        { key: 'total', label: 'Total', align: 'right' },
    ];
    pesananTable.rows = [
        { id: 1, idPesanan: 'ORD-1001', tanggal: '01 Sep 2026', pelanggan: 'Dewi', produk: 'Sepatu Lari X', qty: 1, total: 'Rp 899.000' },
        { id: 2, idPesanan: 'ORD-1002', tanggal: '02 Sep 2026', pelanggan: 'Rian', produk: 'Kaos Polos', qty: 3, total: 'Rp 255.000' },
        { id: 3, idPesanan: 'ORD-1003', tanggal: '03 Sep 2026', pelanggan: 'Nadia', produk: 'Jaket Hoodie', qty: 2, total: 'Rp 598.000' },
        { id: 4, idPesanan: 'ORD-1004', tanggal: '04 Sep 2026', pelanggan: 'Fajar', produk: 'Topi Baseball', qty: 1, total: 'Rp 120.000' },
    ];
}

const produkTable = document.getElementById('produk-table') as any;
if (produkTable) {
    produkTable.columns = [
        { key: 'sku', label: 'SKU' },
        { key: 'nama', label: 'Nama Produk' },
        { key: 'kategori', label: 'Kategori' },
        { key: 'stok', label: 'Stok', align: 'center' },
        { key: 'harga', label: 'Harga', align: 'right' },
        { key: 'status', label: 'Status' },
    ];
    produkTable.rows = [
        { id: 1, sku: 'SKU-001', nama: 'Sepatu Lari X', kategori: 'Sepatu', stok: 24, harga: 'Rp 899.000', status: 'Aktif' },
        { id: 2, sku: 'SKU-002', nama: 'Kaos Polos', kategori: 'Pakaian', stok: 120, harga: 'Rp 85.000', status: 'Aktif' },
        { id: 3, sku: 'SKU-003', nama: 'Jaket Hoodie', kategori: 'Pakaian', stok: 0, harga: 'Rp 299.000', status: 'Habis' },
        { id: 4, sku: 'SKU-004', nama: 'Topi Baseball', kategori: 'Aksesoris', stok: 45, harga: 'Rp 120.000', status: 'Aktif' },
    ];
}

// ===== qv-calendar (standalone, controlled) =====
const calSingle = document.getElementById('cal-single') as any;
calSingle?.addEventListener('change', (e: Event) => {
    calSingle.value = (e as CustomEvent).detail.value;
});

const calRange = document.getElementById('cal-range') as any;
calRange?.addEventListener('change', (e: Event) => {
    const detail = (e as CustomEvent).detail;
    calRange.valueStart = detail.valueStart;
    calRange.valueEnd = detail.valueEnd;
});

// ===== qv-datepicker =====
document.querySelectorAll('qv-datepicker').forEach((el) => {
    el.addEventListener('change', (e: Event) => {
        const detail = (e as CustomEvent).detail;
        (el as any).value = detail.value;
        (el as any).valueStart = detail.valueStart;
        (el as any).valueEnd = detail.valueEnd;
    });
});