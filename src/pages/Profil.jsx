import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ProfilImage from '../assets/images/profil-sekolah.png';
import SEO from '../components/SEO';

const Profil = () => {
    const [content, setContent] = useState(null);

    useEffect(() => {
        fetch('/data/content.json')
            .then(res => res.json())
            .then(data => setContent(data))
            .catch(err => console.error("Failed to load content", err));
    }, []);

    const profilData = content?.profil || {
        sejarah: "RA dan MI Zaid Bin Tsabit berdiri dengan semangat untuk mencetak generasi Islami yang cerdas dan berakhlakul karimah. Berlokasi di Kulon Progo, kami terus berkembang menjadi lembaga pendidikan pilihan yang memadukan ilmu pengetahuan umum dan agama.\n\nNama \"Zaid Bin Tsabit\" diambil dari nama sahabat Nabi yang dikenal sebagai penulis wahyu, dengan harapan peserta didik kami dapat meneladani kecerdasannya dan ketaatannya pada Al-Qur'an.",
        visi: "\"Terwujudnya Generasi Qur'ani, Cerdas, Mandiri, dan Berwawasan Global.\"",
        misi: [
            "Menanamkan nilai-nilai Al-Qur'an dan As-Sunnah dalam kehidupan sehari-hari.",
            "Menyelenggarakan pendidikan yang berkualitas dan menyenangkan.",
            "Mengembangkan potensi minat dan bakat siswa secara optimal.",
            "Membangun kerjasama sinergis antara sekolah, orang tua, dan masyarakat."
        ],
        image: ""
    };

    const profilImage = profilData.image || ProfilImage;

    return (
        <div className="pt-20 pb-20 bg-gray-50 min-h-screen">
            <SEO
                title="Profil Sekolah"
                description="Profil lengkap RA dan MI Zaid Bin Tsabit. Sejarah, Visi, Misi sekolah Islam terpadu di Kulon Progo, Yogyakarta."
                keywords="profil sekolah zaid bin tsabit, visi misi sekolah islam, sejarah madrasah kulon progo, RA MI Panjatan"
                url="/profil"
            />
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Profil Sekolah</h1>
                    <div className="w-20 h-1 bg-green-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <img
                            src={profilImage}
                            alt="Gedung RA dan MI Zaid Bin Tsabit tampak depan"
                            width={600}
                            height={400}
                            loading="lazy"
                            decoding="async"
                            className="rounded-2xl shadow-xl w-full object-cover h-[400px]"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Sejarah Singkat</h2>
                        <p className="text-gray-600 mb-4 leading-relaxed whitespace-pre-line">
                            {profilData.sejarah}
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-green-500"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Visi</h2>
                        <p className="text-xl font-medium text-green-700 italic">
                            {profilData.visi}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-blue-500"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Misi</h2>
                        <ul className="space-y-3 text-gray-600 list-disc list-inside">
                            {profilData.misi.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Profil;
