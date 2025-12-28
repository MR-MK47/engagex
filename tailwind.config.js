/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0a0a0f', // Deep space dark
                surface: '#12121a',    // Slightly lighter panel
                primary: '#0db9f2',    // Updated to design primary
                'primary-dark': '#0987b0', // New design color
                'secondary-success': '#10b981', // New design color
                'background-light': '#f5f8f8', // New design color
                'background-dark': '#101e22', // New design color (overrides/complements existing background)
                'surface-dark': '#16262c', // New design color
                secondary: '#7000ff',  // Deep neon purple
                success: '#00ff9d',    // Neon green
                warning: '#ffb600',
                error: '#ff0055',
                text: '#e0e0e0',
                muted: '#94a3b8',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
                display: ['Space Grotesk', 'sans-serif'], // Added from design
            }
        },
    },
    plugins: [],
}
