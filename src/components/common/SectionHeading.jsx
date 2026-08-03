import { motion } from 'framer-motion'
import { fadeInUp, viewportOnce } from '../../utils/animations'

/**
 * Standardized heading block used at the top of each section.
 */
export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }) {
    const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'

    return (
        <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className={`max-w-2xl ${alignment}`}
        >
            {eyebrow && (
                <span className="mb-3 inline-flex items-center gap-2 font-mono text-sm font-medium lowercase tracking-tight text-accent-soft">
                    <span className="text-glow">&gt;</span>
                    <span className="text-slate-500">//</span> {eyebrow}
                    <span className="ml-0.5 inline-block h-4 w-2 animate-blink bg-glow/80" />
                </span>
            )}
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                {title}
            </h2>
            {subtitle && (
                <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
                    {subtitle}
                </p>
            )}
        </motion.div>
    )
}
