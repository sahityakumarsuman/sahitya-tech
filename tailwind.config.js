/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // ── Theme-aware tokens ──────────────────────────────────────────────
                // These map to CSS variables defined in src/index.css. The values swap
                // between light and dark automatically via the `.dark` class on <html>.
                // `base` = surfaces, `white` = strong text, `slate` = body/muted text.
                base: {
                    900: 'rgb(var(--c-bg-900) / <alpha-value>)', // page background
                    800: 'rgb(var(--c-bg-800) / <alpha-value>)', // cards / surfaces
                    700: 'rgb(var(--c-bg-700) / <alpha-value>)',
                    600: 'rgb(var(--c-bg-600) / <alpha-value>)',
                },
                white: 'rgb(var(--c-white) / <alpha-value>)', // headings / strong text & subtle fills
                slate: {
                    200: 'rgb(var(--c-slate-200) / <alpha-value>)',
                    300: 'rgb(var(--c-slate-300) / <alpha-value>)',
                    400: 'rgb(var(--c-slate-400) / <alpha-value>)', // primary body text
                    500: 'rgb(var(--c-slate-500) / <alpha-value>)', // muted text
                },
                // Accent + glow are theme-aware too (each theme redefines them).
                accent: {
                    DEFAULT: 'rgb(var(--c-accent) / <alpha-value>)',
                    hover: 'rgb(var(--c-accent-hover) / <alpha-value>)',
                    soft: 'rgb(var(--c-accent-soft) / <alpha-value>)',
                },
                // Guaranteed-contrast text/icon color for use on accent fills.
                'on-accent': 'rgb(var(--c-on-accent) / <alpha-value>)',
                glow: 'rgb(var(--c-glow) / <alpha-value>)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
            },
            container: {
                center: true,
                padding: '1.5rem',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
                'gradient-shift': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' },
                },
                flicker: {
                    '0%, 19%, 21%, 55%, 57%, 100%': { opacity: '1' },
                    '20%, 56%': { opacity: '0.4' },
                },
            },
            animation: {
                float: 'float 6s ease-in-out infinite',
                'gradient-shift': 'gradient-shift 8s ease infinite',
                blink: 'blink 1.1s step-end infinite',
                flicker: 'flicker 4s linear infinite',
            },
        },
    },
    plugins: [],
}
