import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiCheck, FiDroplet, FiSun, FiMoon } from 'react-icons/fi'
import { navLinks, personal } from '../../data/portfolio'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { useScrolled } from '../../hooks/useScrolled'
import { useTheme } from '../../context/ThemeProvider'

const sectionIds = navLinks.map((l) => l.id)

/** Palette picker: choose a color family, then a light/dark mode. */
function ThemePicker() {
    const { palette, mode, setPalette, toggleMode, palettes } = useTheme()
    const [open, setOpen] = useState(false)
    const isDark = mode === 'dark'
    const containerRef = useRef(null)

    // Close when clicking anywhere outside the picker, or on Escape.
    useEffect(() => {
        if (!open) return
        const handlePointer = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        const handleKey = (e) => {
            if (e.key === 'Escape') setOpen(false)
        }
        document.addEventListener('pointerdown', handlePointer)
        document.addEventListener('keydown', handleKey)
        return () => {
            document.removeEventListener('pointerdown', handlePointer)
            document.removeEventListener('keydown', handleKey)
        }
    }, [open])

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Change color theme"
                aria-haspopup="menu"
                aria-expanded={open}
                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:text-white"
            >
                <FiDroplet size={16} />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        role="menu"
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-white/10 bg-base-800/95 p-1.5 shadow-xl backdrop-blur-lg"
                    >
                        <p className="px-2 pb-1 pt-1 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                            Palette
                        </p>
                        {palettes.map((p) => (
                            <button
                                key={p.id}
                                role="menuitemradio"
                                aria-checked={palette === p.id}
                                onClick={() => setPalette(p.id)}
                                className={`flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-sm transition-colors ${palette === p.id
                                    ? 'bg-white/10 text-white'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <span
                                    className="h-3.5 w-3.5 rounded-full border border-white/20"
                                    style={{ background: p.swatch }}
                                />
                                {p.label}
                                {palette === p.id && (
                                    <FiCheck className="ml-auto text-accent-soft" size={14} />
                                )}
                            </button>
                        ))}

                        <div className="my-1 border-t border-white/10" />

                        {/* Light / dark mode toggle */}
                        <button
                            onClick={toggleMode}
                            className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                        >
                            {isDark ? <FiMoon size={15} /> : <FiSun size={15} />}
                            {isDark ? 'Dark' : 'Light'} mode
                            <span className="ml-auto flex h-5 w-9 items-center rounded-full bg-white/10 p-0.5">
                                <span
                                    className={`h-4 w-4 rounded-full bg-accent transition-transform ${isDark ? 'translate-x-4' : 'translate-x-0'
                                        }`}
                                />
                            </span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const activeId = useScrollSpy(sectionIds)
    const scrolled = useScrolled(24)

    const handleNav = (id) => {
        setOpen(false)
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled
                ? 'border-b border-white/5 bg-base-900/80 backdrop-blur-lg'
                : 'bg-transparent'
                }`}
        >
            <nav className="container mx-auto flex max-w-6xl items-center justify-between py-4">
                <button
                    onClick={() => handleNav('home')}
                    className="font-display text-lg font-bold tracking-tight text-white"
                >
                    {personal.name.split(' ')[0]}
                    <span className="text-accent">.</span>
                </button>

                {/* Desktop links */}
                <ul className="hidden items-center gap-1 md:flex">
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <button
                                onClick={() => handleNav(link.id)}
                                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeId === link.id
                                    ? 'text-white'
                                    : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                {activeId === link.id && (
                                    <motion.span
                                        layoutId="nav-pill"
                                        className="absolute inset-0 -z-10 rounded-full bg-white/10"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                                {link.label}
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="hidden items-center gap-3 md:flex">
                    <ThemePicker />
                    <a
                        href={personal.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover"
                    >
                        Resume
                    </a>
                </div>

                {/* Mobile controls */}
                <div className="flex items-center gap-1 md:hidden">
                    <ThemePicker />
                    <button
                        onClick={() => setOpen((v) => !v)}
                        className="rounded-lg p-2 text-white"
                        aria-label="Toggle menu"
                    >
                        {open ? <FiX size={22} /> : <FiMenu size={22} />}
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden border-t border-white/5 bg-base-900/95 backdrop-blur-lg md:hidden"
                    >
                        <ul className="container mx-auto flex max-w-6xl flex-col py-4">
                            {navLinks.map((link) => (
                                <li key={link.id}>
                                    <button
                                        onClick={() => handleNav(link.id)}
                                        className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${activeId === link.id
                                            ? 'bg-white/10 text-white'
                                            : 'text-slate-400 hover:text-white'
                                            }`}
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}
