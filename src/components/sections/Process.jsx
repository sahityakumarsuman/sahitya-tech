import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import {
    FiSearch,
    FiFilter,
    FiLayers,
    FiZap,
    FiRefreshCw,
    FiLifeBuoy,
    FiTool,
    FiChevronDown,
    FiCheck,
} from 'react-icons/fi'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { process } from '../../data/portfolio'
import { staggerContainer, staggerItem, viewportOnce } from '../../utils/animations'

const EASE = [0.22, 1, 0.36, 1]

// Icons are mapped by step order so content.json stays free of code.
const STEP_ICONS = [FiSearch, FiFilter, FiLayers, FiZap, FiRefreshCw, FiLifeBuoy, FiTool]

export default function Process() {
    const pathRef = useRef(null)

    // Draw the connecting spine as the section scrolls through the viewport.
    const { scrollYProgress } = useScroll({
        target: pathRef,
        offset: ['start 0.75', 'end 0.55'],
    })
    const drawn = useSpring(scrollYProgress, { stiffness: 60, damping: 22, mass: 0.6 })

    return (
        <Section id="process">
            <SectionHeading
                eyebrow="How I work"
                title={process.heading}
                subtitle={process.subheading}
            />

            <div ref={pathRef} className="relative mx-auto mt-16 max-w-4xl">
                {/* Spine track */}
                <div className="absolute left-6 top-2 bottom-2 w-px -translate-x-1/2 bg-white/10 lg:left-1/2" />

                {/* Spine fill — draws with scroll */}
                <motion.div
                    style={{ scaleY: drawn }}
                    className="absolute left-6 top-2 bottom-2 w-px -translate-x-1/2 origin-top bg-gradient-to-b from-accent via-glow to-accent lg:left-1/2"
                />

                {/* Travelling glow — the continuous, soothing flow */}
                <motion.div
                    aria-hidden="true"
                    initial={{ top: '-6%' }}
                    animate={{ top: '106%' }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute left-6 h-24 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-accent to-transparent blur-[2px] lg:left-1/2"
                />

                {/* Start dot */}
                <span className="absolute left-6 top-2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_16px_2px] shadow-accent/60 lg:left-1/2" />

                <div className="relative space-y-10 lg:space-y-16">
                    {process.steps.map((item, i) => {
                        const Icon = STEP_ICONS[i] ?? FiZap
                        const isLeft = i % 2 === 0
                        const isLast = i === process.steps.length - 1

                        return (
                            <div key={item.step} className="relative pl-16 lg:pl-0">
                                {/* Node on the spine */}
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={viewportOnce}
                                    transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                                    className="absolute left-6 top-4 z-10 -translate-x-1/2 lg:left-1/2"
                                >
                                    <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-accent to-glow text-on-accent shadow-lg shadow-accent/30 ring-4 ring-base-900">
                                        <motion.span
                                            aria-hidden="true"
                                            className="absolute inset-0 rounded-full bg-accent/40"
                                            animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                                            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut', delay: i * 0.15 }}
                                        />
                                        <Icon size={18} className="relative" />
                                    </div>
                                </motion.div>

                                {/* Connector from spine to card */}
                                <span
                                    className={`absolute top-[2.6rem] hidden h-px w-8 lg:block ${isLeft
                                        ? 'right-1/2 bg-gradient-to-l from-accent/50 to-transparent'
                                        : 'left-1/2 bg-gradient-to-r from-accent/50 to-transparent'
                                        }`}
                                />
                                <span className="absolute left-6 top-[2.6rem] h-px w-8 bg-gradient-to-r from-accent/50 to-transparent lg:hidden" />

                                {/* Step card */}
                                <motion.article
                                    initial={{ opacity: 0, x: isLeft ? -44 : 44, y: 12 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    viewport={viewportOnce}
                                    transition={{ duration: 0.6, ease: EASE }}
                                    className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-base-800/50 p-6 backdrop-blur-sm transition-colors hover:border-accent/40 lg:w-[calc(50%-2.75rem)] ${isLeft ? 'lg:mr-auto lg:text-right' : 'lg:ml-auto'
                                        }`}
                                >
                                    {/* Watermark step number */}
                                    <span
                                        className={`pointer-events-none absolute -top-4 select-none font-display text-7xl font-bold text-white/5 transition-colors group-hover:text-accent/10 ${isLeft ? '-left-1' : '-right-1'
                                            }`}
                                    >
                                        {item.step}
                                    </span>

                                    <div
                                        className={`relative flex items-center gap-2.5 ${isLeft ? 'lg:flex-row-reverse' : ''
                                            }`}
                                    >
                                        <span className="font-mono text-xs font-semibold text-glow">
                                            {item.step}
                                        </span>
                                        <h3 className="font-display text-base font-semibold text-white">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <p className="relative mt-3 text-sm leading-relaxed text-slate-400">
                                        {item.description}
                                    </p>
                                </motion.article>

                                {/* Flow arrow between steps */}
                                {!isLast && (
                                    <motion.div
                                        aria-hidden="true"
                                        initial={{ opacity: 0.25, y: -2 }}
                                        animate={{ opacity: [0.25, 0.75, 0.25], y: [-2, 3, -2] }}
                                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                                        className="absolute -bottom-7 left-6 z-10 -translate-x-1/2 text-accent-soft lg:left-1/2"
                                    >
                                        <FiChevronDown size={18} />
                                    </motion.div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* End dot */}
                <span className="absolute left-6 bottom-2 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-glow shadow-[0_0_16px_2px] shadow-glow/60 lg:left-1/2" />
            </div>

            {/* Guiding principles */}
            {process.principles?.length > 0 && (
                <motion.ul
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-14 flex flex-wrap justify-center gap-3"
                >
                    {process.principles.map((principle) => (
                        <motion.li
                            key={principle}
                            variants={staggerItem}
                            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/5 dark:text-emerald-300"
                        >
                            <FiCheck size={15} className="text-emerald-600 dark:text-emerald-400" />
                            {principle}
                        </motion.li>
                    ))}
                </motion.ul>
            )}
        </Section>
    )
}
