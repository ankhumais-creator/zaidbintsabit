import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
    const [content, setContent] = useState(null);

    useEffect(() => {
        fetch('/data/content.json')
            .then(res => res.json())
            .then(data => setContent(data))
            .catch(err => console.error("Failed to load footer content", err));
    }, []);

    const footer = content?.footer || {
        tagline: "Membangun Generasi Qur'ani, Cerdas, dan Berakhlakul Karimah.",
        alamat: "Dusun 1, Gotakan, Kec. Panjatan, Kabupaten Kulon Progo, Daerah Istimewa Yogyakarta 55655",
        phone: "0812-8588-8284",
        email: "info@zaidbintsabit.sch.id",
        facebook: "",
        instagram: "",
        youtube: ""
    };

    return (
        <footer className="bg-gray-900 text-white pt-12 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand & About */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                ZB
                            </div>
                            <span className="font-bold text-xl">Zaid Bin Tsabit</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            {footer.tagline}
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Hubungi Kami</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="mt-1 flex-shrink-0 text-green-500" size={20} aria-hidden="true" />
                                <span>{footer.alamat}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-green-500" size={20} aria-hidden="true" />
                                <span>{footer.phone}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-green-500" size={20} aria-hidden="true" />
                                <span>{footer.email}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Ikuti Kami</h3>
                        <div className="flex gap-4">
                            {footer.facebook && (
                                <a href={footer.facebook} target="_blank" rel="noreferrer" className="bg-gray-800 p-2 rounded-full hover:bg-green-600 transition" aria-label="Facebook RA & MI Zaid Bin Tsabit">
                                    <Facebook size={20} aria-hidden="true" />
                                </a>
                            )}
                            {footer.instagram && (
                                <a href={footer.instagram} target="_blank" rel="noreferrer" className="bg-gray-800 p-2 rounded-full hover:bg-green-600 transition" aria-label="Instagram RA & MI Zaid Bin Tsabit">
                                    <Instagram size={20} aria-hidden="true" />
                                </a>
                            )}
                            {footer.youtube && (
                                <a href={footer.youtube} target="_blank" rel="noreferrer" className="bg-gray-800 p-2 rounded-full hover:bg-green-600 transition" aria-label="YouTube RA & MI Zaid Bin Tsabit">
                                    <Youtube size={20} aria-hidden="true" />
                                </a>
                            )}
                            {!footer.facebook && !footer.instagram && !footer.youtube && (
                                <>
                                    <span className="bg-gray-800 p-2 rounded-full opacity-50 cursor-not-allowed" aria-label="Facebook (belum aktif)"><Facebook size={20} aria-hidden="true" /></span>
                                    <span className="bg-gray-800 p-2 rounded-full opacity-50 cursor-not-allowed" aria-label="Instagram (belum aktif)"><Instagram size={20} aria-hidden="true" /></span>
                                    <span className="bg-gray-800 p-2 rounded-full opacity-50 cursor-not-allowed" aria-label="YouTube (belum aktif)"><Youtube size={20} aria-hidden="true" /></span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} RA & MI Zaid Bin Tsabit. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
