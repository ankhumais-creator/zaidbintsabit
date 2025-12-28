import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import SEO from '../components/SEO';

const Berita = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/data/berita.json')
            .then(res => res.json())
            .then(data => {
                setNews(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Gagal mengambil berita:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="pt-20 pb-20 bg-gray-50 min-h-screen">
            <SEO
                title="Berita & Kegiatan"
                description="Berita dan kegiatan terbaru dari RA & MI Zaid Bin Tsabit. Prestasi siswa, lomba tahfidz, dan agenda sekolah Islam di Kulon Progo."
                keywords="berita sekolah islam, kegiatan madrasah, prestasi siswa, lomba tahfidz, agenda sekolah yogyakarta"
                url="/berita"
            />
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Berita & Kegiatan</h1>
                    <p className="text-gray-600">Update terbaru seputar kegiatan sekolah.</p>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                        <p className="mt-4 text-gray-500">Memuat berita...</p>
                    </div>
                ) : news.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                        <p className="text-gray-500 text-lg">Belum ada berita terbaru.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {news.map((item) => (
                            <motion.article
                                key={item.id}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full"
                            >
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        width={400}
                                        height={192}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover transition hover:scale-105"
                                    />
                                </div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="text-sm text-green-600 font-semibold mb-2">{item.date}</div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-green-600 cursor-pointer">
                                        {item.title}
                                    </h2>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {item.summary}
                                    </p>
                                    <button className="mt-auto text-green-600 font-bold hover:underline self-start">
                                        Baca Selengkapnya
                                    </button>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Berita;
