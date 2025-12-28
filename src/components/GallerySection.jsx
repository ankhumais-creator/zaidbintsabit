import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const GallerySection = () => {
    const [galleryImages, setGalleryImages] = useState([]);
    const [useLocalImages, setUseLocalImages] = useState(true);

    // Dynamically import all images from the gallery folder (local assets)
    const imagesGlob = import.meta.glob('../assets/images/gallery/*.{png,jpg,jpeg,webp}', { eager: true, as: 'url' });
    const localImages = Object.values(imagesGlob);

    useEffect(() => {
        fetch('/data/content.json')
            .then(res => res.json())
            .then(data => {
                if (data.gallery && data.gallery.length > 0) {
                    setGalleryImages(data.gallery.map(g => g.img));
                    setUseLocalImages(false);
                }
            })
            .catch(err => {
                console.error("Failed to load gallery from CMS", err);
            });
    }, []);

    // Use CMS images if available, otherwise use local images
    const images = useLocalImages ? localImages : galleryImages;

    // Fallback if no images found
    if (images.length === 0) {
        return null;
    }

    // Duplicate images to create seamless loop
    const duplicatedImages = [...images, ...images, ...images, ...images];

    return (
        <section className="py-4 bg-white overflow-hidden border-b border-gray-100 group pause-on-hover">
            <div className="w-full">
                {/* Marquee Container */}
                <div className="flex overflow-hidden relative py-8">
                    <div className="flex gap-4 min-w-full animate-marquee items-center">
                        {duplicatedImages.map((src, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.25, zIndex: 10 }}
                                transition={{ duration: 0.3 }}
                                className="relative h-32 md:h-40 flex-shrink-0 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                            >
                                <img
                                    src={src}
                                    alt={`Kegiatan siswa RA dan MI Zaid Bin Tsabit ${idx + 1}`}
                                    width={200}
                                    height={160}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-auto h-full object-cover"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GallerySection;
