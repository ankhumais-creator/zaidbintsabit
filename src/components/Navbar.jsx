import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const menuRef = useRef(null);
    const menuButtonRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on Escape key and trap focus
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape' && isOpen) {
            setIsOpen(false);
            menuButtonRef.current?.focus();
        }

        // Focus trap
        if (e.key === 'Tab' && isOpen && menuRef.current) {
            const focusableElements = menuRef.current.querySelectorAll(
                'a, button, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement?.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement?.focus();
            }
        }
    }, [isOpen]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Focus first menu item when menu opens
    useEffect(() => {
        if (isOpen && menuRef.current) {
            const firstLink = menuRef.current.querySelector('a');
            firstLink?.focus();
        }
    }, [isOpen]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Profil', path: '/profil' }, // About
        { name: 'Akademik', path: '/akademik' }, // Academics
        { name: 'Fasilitas', path: '/fasilitas' }, // Facilities
        { name: 'PPDB', path: '/ppdb' }, // Admissions
        { name: 'Berita', path: '/berita' }, // News
    ];

    return (
        <>
            {/* Skip to main content link for accessibility */}
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-green-600 text-white px-4 py-2 rounded z-[100]">
                Langsung ke konten utama
            </a>
            <nav
                role="navigation"
                aria-label="Menu utama"
                className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
                    }`}
            >
                <div className="container mx-auto px-4 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        {/* Placeholder Logo */}
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                            ZB
                        </div>
                        <span className="font-bold text-lg md:text-xl text-gray-800">
                            RA & MI Zaid Bin Tsabit
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="font-medium transition-colors hover:text-green-600 text-gray-700"
                            >
                                {link.name}
                            </Link>
                        ))}

                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        ref={menuButtonRef}
                        className="md:hidden text-gray-800"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                    >
                        {isOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            id="mobile-menu"
                            ref={menuRef}
                            role="menu"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white shadow-lg overflow-hidden"
                        >
                            <div className="flex flex-col p-4 space-y-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className="text-gray-700 font-medium hover:text-green-600"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}

                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};

export default Navbar;
