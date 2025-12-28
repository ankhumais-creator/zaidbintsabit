// Simple WebP conversion script using sharp
import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, basename } from 'path';

const galleryDir = 'src/assets/images/gallery';
const imagesDir = 'src/assets/images';

async function convertPngToWebP(inputPath, quality = 75) {
    const outputPath = inputPath.replace('.png', '.webp').replace('.jpg', '.webp');
    try {
        await sharp(inputPath)
            .webp({ quality })
            .toFile(outputPath);

        const origSize = statSync(inputPath).size;
        const newSize = statSync(outputPath).size;
        const saved = ((1 - newSize / origSize) * 100).toFixed(1);
        console.log(`✓ ${basename(inputPath)} → WebP (${saved}% smaller)`);
        return { orig: origSize, new: newSize };
    } catch (e) {
        console.error(`✗ ${basename(inputPath)}: ${e.message}`);
        return null;
    }
}

async function main() {
    console.log('Converting gallery images to WebP...\n');
    let totalOrig = 0, totalNew = 0;

    // Gallery PNGs
    const files = readdirSync(galleryDir).filter(f => f.endsWith('.png'));
    for (const f of files) {
        const r = await convertPngToWebP(join(galleryDir, f));
        if (r) { totalOrig += r.orig; totalNew += r.new; }
    }

    // Hero image
    console.log('\nConverting hero-bg.jpg...');
    const heroResult = await convertPngToWebP(join(imagesDir, 'hero-bg.jpg'), 80);
    if (heroResult) { totalOrig += heroResult.orig; totalNew += heroResult.new; }

    // Profil image
    console.log('\nConverting profil-sekolah.png...');
    const profilResult = await convertPngToWebP(join(imagesDir, 'profil-sekolah.png'), 80);
    if (profilResult) { totalOrig += profilResult.orig; totalNew += profilResult.new; }

    console.log(`\n✅ Total: ${(totalOrig / 1024 / 1024).toFixed(2)}MB → ${(totalNew / 1024 / 1024).toFixed(2)}MB (${((1 - totalNew / totalOrig) * 100).toFixed(1)}% saved)`);
}

main();
