import { createContext, useContext, useEffect, useState } from 'react'

/**
 * Two-axis theme management: a color PALETTE × a light/dark MODE.
 * - The active theme id is `${palette}-${mode}` (e.g. "forest-dark"), which maps
 *   to a [data-theme] block in index.css.
 * - Dark modes also toggle the `.dark` class so Tailwind `dark:` variants work.
 * - The choice is persisted to localStorage ('theme') and applied before paint
 *   by /theme-init.js (avoids a flash of the wrong palette).
 */
export const PALETTES = [
    { id: 'indigo', label: 'Indigo', swatch: '#6366f1' },
    { id: 'emerald', label: 'Emerald', swatch: '#10b981' },
    { id: 'forest', label: 'Forest', swatch: '#588157' },
    { id: 'stone', label: 'Stone', swatch: '#6c757d' },
    { id: 'mono', label: 'Black & White', swatch: 'linear-gradient(135deg, #fff 0 50%, #111 50% 100%)' },
]

const PALETTE_IDS = PALETTES.map((p) => p.id)
const MODES = ['light', 'dark']

// Map the previous single-name themes onto the new palette + mode model.
const LEGACY = {
    midnight: 'indigo-dark',
    daylight: 'indigo-light',
    emerald: 'emerald-dark',
    mint: 'emerald-light',
    graphite: 'stone-dark',
    dark: 'indigo-dark',
    light: 'indigo-light',
}

function parseTheme(id) {
    if (id) {
        const mapped = LEGACY[id] || id
        const [palette, mode] = mapped.split('-')
        if (PALETTE_IDS.includes(palette) && MODES.includes(mode)) {
            return { palette, mode }
        }
    }
    return null
}

function getInitial() {
    if (typeof window === 'undefined') return { palette: 'mono', mode: 'light' }
    const parsed = parseTheme(localStorage.getItem('theme'))
    if (parsed) return parsed
    return { palette: 'mono', mode: 'light' }
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
    const [{ palette, mode }, setState] = useState(getInitial)
    const theme = `${palette}-${mode}`

    useEffect(() => {
        const root = document.documentElement
        root.dataset.theme = theme
        root.classList.toggle('dark', mode === 'dark')
        localStorage.setItem('theme', theme)
    }, [theme, mode])

    const setPalette = (id) => {
        if (PALETTE_IDS.includes(id)) setState((s) => ({ ...s, palette: id }))
    }
    const setMode = (m) => {
        if (MODES.includes(m)) setState((s) => ({ ...s, mode: m }))
    }
    const toggleMode = () =>
        setState((s) => ({ ...s, mode: s.mode === 'dark' ? 'light' : 'dark' }))

    const isDark = mode === 'dark'

    return (
        <ThemeContext.Provider
            value={{
                theme,
                palette,
                mode,
                isDark,
                setPalette,
                setMode,
                toggleMode,
                palettes: PALETTES,
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
    return ctx
}
