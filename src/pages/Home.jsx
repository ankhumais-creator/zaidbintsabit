import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Heart, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import heroBg from '../assets/images/hero-bg.jpg';
import GallerySection from '../components/GallerySection';
import SEO from '../components/SEO';

const Home = () => {
    const [content, setContent] = useState(null);

    useEffect(() => {
        fetch('/data/content.json')
            .then(res => res.json())
            .then(data => setContent(data))
            .catch(err => console.error("Failed to load content", err));
    }, []);

    // Default values if fetch fails or loading
    const heroData = content?.hero || {
        title_line_1: "Membangun Generasi",
        title_highlight: "Qur'ani & Berprestasi",
        subtitle: "Pendidikan Islam terpadu yang menggabungkan nilai-nilai Al-Qur'an dengan kurikulum modern untuk masa depan yang gemilang.",
        bg_image: ""
    };

    const bgImage = heroData.bg_image || heroBg;

    return (
        <div className="w-full">
            <SEO
                title="Beranda"
                description="RA & MI Zaid Bin Tsabit - Sekolah Islam terpadu di Kulon Progo, Yogyakarta. Mencetak generasi Qur'ani, cerdas, dan berakhlakul karimah dengan kurikulum modern."
                keywords="RA Zaid Bin Tsabit, MI Zaid Bin Tsabit, sekolah islam kulon progo, madrasah ibtidaiyah yogyakarta, sekolah islam terpadu jogja"
                url="/"
            />
            {/* Hero Section */}
            <section className="relative w-full bg-gray-900">
                {/* Background Image Container - Controls height */}
                <div className="relative w-full">
                    <img
                        src={bgImage}
                        alt="Gedung RA dan MI Zaid Bin Tsabit"
                        width={1920}
                        height={1080}
                        className="w-full h-auto object-contain opacity-60 block"
                        fetchPriority="high"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                    <div className="max-w-4xl mx-auto text-white">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="block text-green-400 font-semibold tracking-wider mb-2 uppercase text-sm md:text-base">
                                RA & MI Zaid Bin Tsabit
                            </span>
                            <h1 className="text-2xl md:text-4xl lg:text-6xl font-extrabold mb-4 md:mb-6 leading-tight">
                                {heroData.title_line_1} <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                                    {heroData.title_highlight}
                                </span>
                            </h1>
                            <p className="text-gray-300 text-sm md:text-lg lg:text-xl mb-6 md:mb-8 max-w-2xl mx-auto hidden sm:block">
                                {heroData.subtitle}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                                <Link
                                    to="/ppdb"
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 md:py-3 md:px-8 rounded-full transition transform hover:scale-105 flex items-center justify-center gap-2 text-sm md:text-base"
                                >
                                    Daftar Sekarang <ArrowRight size={18} />
                                </Link>
                                <Link
                                    to="/profil"
                                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold py-2 px-6 md:py-3 md:px-8 rounded-full transition flex items-center justify-center text-sm md:text-base"
                                >
                                    Selengkapnya
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <GallerySection />

            {/* Features / Why Choose Us */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Mengapa Memilih Kami?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Kami berkomitmen memberikan pendidikan terbaik dengan lingkungan yang kondusif.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: BookOpen, title: 'Kurikulum Terpadu', desc: 'Memadukan kurikulum nasional dan nilai-nilai keislaman.' },
                            { icon: Users, title: 'Pengajar Berkualitas', desc: 'Guru-guru berpengalaman dan berdedikasi tinggi.' },
                            { icon: Heart, title: 'Bimbingan Karakter', desc: 'Fokus pada pembentukan akhlak mulia dan mandiri.' },
                            { icon: Star, title: 'Ekstrakurikuler', desc: 'Beragam kegiatan untuk mengembangkan bakat siswa.' },
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center"
                            >
                                <div className="w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                    <feature.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                                <p className="text-gray-600 text-sm">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Location Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Lokasi Strategis</h2>
                        <p className="text-gray-600 mb-6 text-lg">
                            Terletak di lingkungan yang asri dan kondusif untuk belajar. Kunjungi kami di Panjatan, Kulon Progo.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
                                    <span className="font-bold">A</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Alamat Lengkap</h4>
                                    <p className="text-gray-600">
                                        Dusun 1, Gotakan, Kec. Panjatan, Kabupaten Kulon Progo, Daerah Istimewa Yogyakarta 55655
                                    </p>
                                </div>
                            </div>
                        </div>
                        <a
                            href="https://maps.app.goo.gl/VdCreBMHPxCn3yK56"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block mt-8 text-green-600 font-semibold hover:text-green-700 hover:underline"
                        >
                            Buka di Google Maps &rarr;
                        </a>
                    </div>
                    <div className="w-full md:w-1/2 h-[400px] bg-gray-200 rounded-2xl overflow-hidden shadow-xl">
                        {/* Google Maps Embed */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3952.126487146583!2d110.1654813!3d-7.8818293!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7afb313ef04655%3A0xe549cd2b0286705!2sRA%20dan%20MI%20Zaid%20Bin%20Tsabit!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Lokasi RA dan MI Zaid Bin Tsabit di Google Maps"
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
