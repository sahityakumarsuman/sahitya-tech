import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUp } from 'react-icons/fi'

/**
 * Floating "back to top" button. Appears once the user has scrolled past the
 * first viewport (i.e. is heading toward the bottom of the page) and smoothly
 * returns them to the top on click.
 */
export default function ScrollToTop() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const toTop = () =>
        window.scrollTo({ top: 0, behavior: 'smooth' })

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    type="button"
                    onClick={toTop}
                    aria-label="Scroll back to top"
                    initial={{ opacity: 0, scale: 0.8, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 12 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.92 }}
                    className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-on-accent shadow-lg shadow-accent/25 ring-1 ring-white/10 transition-colors hover:bg-accent-hover"
                >
                    <FiArrowUp size={20} />
                </motion.button>
            )}
        </AnimatePresence>
    )
}
