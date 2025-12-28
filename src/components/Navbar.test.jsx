import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

// Wrapper component with Router
const renderWithRouter = (component) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

describe('Navbar Component', () => {
    it('renders the logo text', () => {
        renderWithRouter(<Navbar />);
        expect(screen.getByText('RA & MI Zaid Bin Tsabit')).toBeInTheDocument();
    });

    it('renders all navigation links', () => {
        renderWithRouter(<Navbar />);

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Profil')).toBeInTheDocument();
        expect(screen.getByText('Akademik')).toBeInTheDocument();
        expect(screen.getByText('Fasilitas')).toBeInTheDocument();
        expect(screen.getByText('PPDB')).toBeInTheDocument();
        expect(screen.getByText('Berita')).toBeInTheDocument();
    });

    it('renders skip to content link for accessibility', () => {
        renderWithRouter(<Navbar />);
        expect(screen.getByText('Langsung ke konten utama')).toBeInTheDocument();
    });

    it('has proper ARIA attributes on mobile menu button', () => {
        renderWithRouter(<Navbar />);

        const menuButton = screen.getByRole('button', { name: /buka menu navigasi/i });
        expect(menuButton).toHaveAttribute('aria-expanded', 'false');
        expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');
    });

    it('toggles mobile menu on button click', async () => {
        renderWithRouter(<Navbar />);

        const menuButton = screen.getByRole('button', { name: /buka menu navigasi/i });

        // Initially closed
        expect(menuButton).toHaveAttribute('aria-expanded', 'false');

        // Click to open
        fireEvent.click(menuButton);
        expect(menuButton).toHaveAttribute('aria-expanded', 'true');

        // Click to close
        fireEvent.click(menuButton);
        expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('closes menu on Escape key', () => {
        renderWithRouter(<Navbar />);

        const menuButton = screen.getByRole('button', { name: /buka menu navigasi/i });

        // Open menu
        fireEvent.click(menuButton);
        expect(menuButton).toHaveAttribute('aria-expanded', 'true');

        // Press Escape
        fireEvent.keyDown(document, { key: 'Escape' });
        expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('renders navigation with proper role', () => {
        renderWithRouter(<Navbar />);

        const nav = screen.getByRole('navigation', { name: /menu utama/i });
        expect(nav).toBeInTheDocument();
    });
});
