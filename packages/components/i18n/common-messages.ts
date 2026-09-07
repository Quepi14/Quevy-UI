import type { QvLocale } from "../_internal/i18n/locale-store.js";

export interface CommonMessages {
    close: string;
    dismiss: string;
    remove: string;
    breadcrumbNav: string;
    showHiddenBreadcrumbItems: string;
    previousPage: string;
    nextPage: string;
    jumpToPage: string;
    page: (n: number) => string;
    goToPage: string;
    pagination: string;
    decrease: string;
    increase: string;
    selectOption: string;
    search: string;
    noResult: string;
    selectAllRows: string;
    selectRow: (key: string) => string;
    noDataAvailable: string;
    previousSlide: string;
    nextSlide: string;
    goToSlide: (n: number) => string;
    dragFileHere: string;
    chooseFile: string;
}

export const COMMON_MESSAGES: Record<QvLocale, CommonMessages> = {
    id: {
        close: 'Tutup',
        dismiss: 'Tutup',
        remove: 'Hapus',
        breadcrumbNav: 'Navigasi breadcrumb',
        showHiddenBreadcrumbItems: 'Tampilkan item breadcrumb yang tersembunyi',
        previousPage: 'Halaman sebelumnya',
        nextPage: 'Halaman berikutnya',
        jumpToPage: 'Lompat ke halaman',
        page: (n) => `Halaman ${n}`,
        goToPage: 'Ke halaman',
        pagination: 'Navigasi halaman',
        decrease: 'Kurangi',
        increase: 'Tambah',
        selectOption: 'Pilih opsi',
        search: 'Cari...',
        noResult: 'Tidak ada hasil',
        selectAllRows: 'Pilih semua baris',
        selectRow: (key) => `Pilih baris ${key}`,
        noDataAvailable: 'Tidak ada data',
        previousSlide: 'Slide sebelumnya',
        nextSlide: 'Slide berikutnya',
        goToSlide: (n) => `Ke slide ${n}`,
        dragFileHere: 'Seret file ke sini, atau',
        chooseFile: 'Pilih file',
    },
    en: {
        close: 'Close',
        dismiss: 'Dismiss',
        remove: 'Remove',
        breadcrumbNav: 'Breadcrumb',
        showHiddenBreadcrumbItems: 'Show hidden breadcrumb items',
        previousPage: 'Previous page',
        nextPage: 'Next Page',
        jumpToPage: 'Jump to page',
        page: (n) => `Page ${n}`,
        goToPage: 'Go to',
        pagination: 'Pagination',
        decrease: 'Decrease',
        increase: 'Increase',
        selectOption: 'Select an option',
        search: 'Search...',
        noResult: 'No result',
        selectAllRows: 'Select all rows',
        selectRow: (key) => `Select row ${key}`,
        noDataAvailable: 'No data available',
        previousSlide: 'Previous slide',
        nextSlide: 'Next slide',
        goToSlide: (n) => `Go to slide ${n}`,
        dragFileHere: 'Drag file here, or',
        chooseFile: 'Choose file',
    },
};