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
                primary: '#00f0ff',    // Cyberpunk cyan
                secondary: '#7000ff',  // Deep neon purple
                success: '#00ff9d',    // Neon green
                warning: '#ffb600',
                error: '#ff0055',
                text: '#e0e0e0',
                muted: '#94a3b8',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'], // For code/stats
            }
        },
    },
    plugins: [],
}
