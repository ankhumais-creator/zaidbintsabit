import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import SEO from '../components/SEO';

const Fasilitas = () => {
    const [content, setContent] = useState(null);

    useEffect(() => {
        fetch('/data/content.json')
            .then(res => res.json())
            .then(data => setContent(data))
            .catch(err => console.error("Failed to load content", err));
    }, []);

    const facilities = content?.fasilitas || [
        { name: 'Ruang Kelas Nyaman', img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop' },
        { name: 'Masjid Sekolah', img: 'https://images.unsplash.com/photo-1564121211835-e88c852648ab?q=80&w=800&auto=format&fit=crop' },
        { name: 'Perpustakaan', img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop' },
        { name: 'Lapangan Olahraga', img: 'https://images.unsplash.com/photo-1562771242-a02d9090c90c?q=80&w=800&auto=format&fit=crop' },
        { name: 'Area Bermain RA', img: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800&auto=format&fit=crop' },
        { name: 'UKS', img: 'https://images.unsplash.com/photo-1576091160550-2187d80018fd?q=80&w=800&auto=format&fit=crop' },
    ];

    return (
        <div className="pt-20 pb-20 bg-white min-h-screen">
            <SEO
                title="Fasilitas Sekolah"
                description="Fasilitas lengkap RA dan MI Zaid Bin Tsabit: Ruang Kelas Nyaman, Masjid, Perpustakaan, Lapangan Olahraga, Area Bermain."
                keywords="fasilitas sekolah islam, ruang kelas nyaman, masjid sekolah, perpustakaan anak, lapangan olahraga sekolah"
                url="/fasilitas"
            />
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Fasilitas Sekolah</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Sarana dan prasarana yang mendukung proses belajar mengajar.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {facilities.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
                        >
                            <div className="aspect-w-16 aspect-h-12 h-64">
                                <img
                                    src={item.img}
                                    alt={`Fasilitas ${item.name} di RA dan MI Zaid Bin Tsabit`}
                                    width={400}
                                    height={256}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-end p-6">
                                <h2 className="text-white text-xl font-bold">{item.name}</h2>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Fasilitas;
