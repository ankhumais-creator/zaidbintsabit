import { describe, it, expect } from 'vitest';

// Note: GallerySection menggunakan import.meta.glob yang sulit di-mock
// Untuk test ini, kita hanya memverifikasi bahwa komponen bisa diimpor

describe('GallerySection Component', () => {
    it('module can be imported without errors', async () => {
        // This verifies the module structure is correct
        const module = await import('../components/GallerySection');
        expect(module.default).toBeDefined();
        expect(typeof module.default).toBe('function');
    });
});
