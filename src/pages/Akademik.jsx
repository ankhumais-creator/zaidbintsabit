import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Book, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

const Akademik = () => {
    const [content, setContent] = useState(null);

    useEffect(() => {
        fetch('/data/content.json')
            .then(res => res.json())
            .then(data => setContent(data))
            .catch(err => console.error("Failed to load content", err));
    }, []);

    const akademik = content?.akademik || {
        page_description: "Program pendidikan kami dirancang untuk menyeimbangkan kecerdasan intelektual, emosional, dan spiritual.",
        ra_title: "Raudhatul Athfal (RA)",
        ra_description: "Pendidikan usia dini yang berfokus pada pembentukan karakter dasar, kemandirian, dan pengenalan nilai-nilai Islam melalui metode bermain sambil belajar.",
        ra_programs: ["Tahfidz Juz 30 (Surat Pendek)", "Pembiasaan Ibadah Harian", "Pengenalan Calistung Dasar", "Kreativitas & Motorik"],
        mi_title: "Madrasah Ibtidaiyah (MI)",
        mi_description: "Pendidikan dasar setingkat SD dengan kurikulum Kemenag dan Kemendikbud, diperkaya dengan muatan lokal keagamaan yang intensif.",
        mi_programs: ["Kurikulum Merdeka", "Tahfidz Al-Qur'an Target 3 Juz", "Bahasa Arab & Inggris", "Pramuka & Ekstrakurikuler Pilihan"]
    };

    return (
        <div className="pt-20 pb-20 bg-white min-h-screen">
            <SEO
                title="Program Akademik"
                description="Program akademik RA dan MI Zaid Bin Tsabit. Kurikulum Merdeka, Tahfidz Al-Qur'an, Bahasa Arab & Inggris di Kulon Progo."
                keywords="kurikulum sekolah islam, program tahfidz anak, raudhatul athfal yogyakarta, madrasah ibtidaiyah kulon progo, pendidikan anak usia dini islam"
                url="/akademik"
            />
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Akademik</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {akademik.page_description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {/* RA Section */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-green-50 rounded-3xl p-8 border border-green-100"
                    >
                        <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center text-green-600 mb-6">
                            <Book size={28} />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">{akademik.ra_title}</h2>
                        <p className="text-gray-600 mb-6">
                            {akademik.ra_description}
                        </p>
                        <ul className="space-y-3">
                            {akademik.ra_programs.map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-700">
                                    <CheckCircle className="text-green-500" size={18} />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* MI Section */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-blue-50 rounded-3xl p-8 border border-blue-100"
                    >
                        <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center text-blue-600 mb-6">
                            <Book size={28} />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">{akademik.mi_title}</h2>
                        <p className="text-gray-600 mb-6">
                            {akademik.mi_description}
                        </p>
                        <ul className="space-y-3">
                            {akademik.mi_programs.map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-700">
                                    <CheckCircle className="text-blue-500" size={18} />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Akademik;
