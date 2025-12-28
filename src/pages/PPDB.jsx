import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calendar, FileText, Phone } from 'lucide-react';
import SEO from '../components/SEO';

const PPDB = () => {
    const [content, setContent] = useState(null);

    useEffect(() => {
        fetch('/data/content.json')
            .then(res => res.json())
            .then(data => setContent(data))
            .catch(err => console.error("Failed to load content", err));
    }, []);

    const ppdb = content?.ppdb || {
        tahun_ajaran: "2025/2026",
        alur: [
            { title: 'Mengisi Formulir', desc: 'Isi formulir pendaftaran secara online atau datang langsung ke sekolah.' },
            { title: 'Wawancara & Observasi', desc: 'Calon siswa dan orang tua mengikuti sesi wawancara dan observasi.' },
            { title: 'Pengumuman', desc: 'Hasil seleksi akan diumumkan melalui website dan WhatsApp.' },
            { title: 'Daftar Ulang', desc: 'Melakukan pembayaran administrasi dan melengkapi berkas.' }
        ],
        syarat: [
            "Mengisi formulir pendaftaran.",
            "Fotokopi Akta Kelahiran (2 lembar).",
            "Fotokopi Kartu Keluarga (2 lembar).",
            "Fotokopi KTP Orang Tua (Ayah & Ibu).",
            "Pas foto berwarna ukuran 3x4 (2 lembar).",
            "Usia minimal 6 tahun (untuk MI) pada bulan Juli."
        ],
        phone: "0812-8588-8284",
        jam_layanan: "Senin - Sabtu (08.00 - 14.00)",
        whatsapp_number: "6281285888284"
    };

    return (
        <div className="pt-20 pb-20 bg-gray-50 min-h-screen">
            <SEO
                title="PPDB - Pendaftaran Siswa Baru"
                description={`Pendaftaran Peserta Didik Baru (PPDB) RA & MI Zaid Bin Tsabit Tahun Ajaran ${ppdb.tahun_ajaran}. Daftar sekarang di Kulon Progo!`}
                keywords="PPDB Kulon Progo 2025, pendaftaran sekolah islam, daftar MI Zaid Bin Tsabit, pendaftaran RA Yogyakarta, penerimaan siswa baru"
                url="/ppdb"
            />
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Penerimaan Peserta Didik Baru</h1>
                    <p className="text-xl text-green-600 font-semibold">Tahun Ajaran {ppdb.tahun_ajaran}</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Alur Pendaftaran */}
                        <div className="bg-white p-8 rounded-2xl shadow-md">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <FileText className="text-green-500" /> Alur Pendaftaran
                            </h2>
                            <div className="space-y-6">
                                {ppdb.alur.map((item, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800">{item.title}</h3>
                                            <p className="text-gray-600 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Syarat Pendaftaran */}
                        <div className="bg-white p-8 rounded-2xl shadow-md">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Syarat Pendaftaran</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                {ppdb.syarat.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        {/* Contact Card */}
                        <div className="bg-green-600 text-white p-8 rounded-2xl shadow-xl sticky top-24">
                            <h3 className="text-xl font-bold mb-6">Butuh Bantuan?</h3>
                            <p className="mb-6 text-green-100">
                                Jika ada pertanyaan mengenai PPDB, silakan hubungi panitia kami.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <Phone size={20} />
                                    <span className="font-semibold">{ppdb.phone}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar size={20} />
                                    <span>{ppdb.jam_layanan}</span>
                                </div>
                            </div>

                            <a
                                href={`https://wa.me/${ppdb.whatsapp_number}?text=Assalamualaikum,%20saya%20ingin%20bertanya%20tentang%20PPDB`}
                                target="_blank"
                                rel="noreferrer"
                                className="block w-full bg-white text-green-700 font-bold text-center py-3 rounded-xl hover:bg-gray-100 transition"
                            >
                                Hubungi via WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PPDB;
