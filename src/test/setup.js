import '@testing-library/jest-dom';

// Mock globalThis.matchMedia
Object.defineProperty(globalThis, 'matchMedia', {
    writable: true,
    value: (query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => { },
        removeListener: () => { },
        addEventListener: () => { },
        removeEventListener: () => { },
        dispatchEvent: () => { },
    }),
});

// Mock IntersectionObserver
class MockIntersectionObserver {
    observe() {
        // Empty mock implementation
    }
    unobserve() {
        // Empty mock implementation
    }
    disconnect() {
        // Empty mock implementation
    }
}

Object.defineProperty(globalThis, 'IntersectionObserver', {
    writable: true,
    value: MockIntersectionObserver,
});

// Mock scrollTo
Object.defineProperty(globalThis, 'scrollTo', {
    writable: true,
    value: () => { },
});
