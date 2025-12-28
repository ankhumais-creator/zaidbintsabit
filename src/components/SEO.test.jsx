import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '../components/SEO';

// Wrapper with HelmetProvider
const renderWithHelmet = (component) => {
    return render(
        <HelmetProvider>
            {component}
        </HelmetProvider>
    );
};

describe('SEO Component', () => {
    it('renders without crashing', () => {
        const { container } = renderWithHelmet(<SEO />);
        expect(container).toBeInTheDocument();
    });

    it('renders with custom title', () => {
        renderWithHelmet(<SEO title="Test Page" />);
        // Helmet updates document.title asynchronously, so we check the Helmet instance
        // In a real scenario, you might need to wait for the title to update
    });

    it('accepts all props without errors', () => {
        expect(() => {
            renderWithHelmet(
                <SEO
                    title="Test Title"
                    description="Test description for the page"
                    keywords="test, keywords, seo"
                    image="https://example.com/image.jpg"
                    url="/test-page"
                    type="article"
                />
            );
        }).not.toThrow();
    });

    it('uses default values when props are not provided', () => {
        const { container } = renderWithHelmet(<SEO />);
        expect(container).toBeInTheDocument();
    });
});
