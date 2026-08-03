import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowDown } from 'react-icons/fi'
import Section from '../common/Section'
import { personal, socials, about } from '../../data/portfolio'
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations'

/**
 * Cycles through `personal.taglineWords`, animating each word in/out.
 */
function RotatingWord() {
    const words = personal.taglineWords
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(
            () => setIndex((i) => (i + 1) % words.length),
            2800
        )
        return () => clearInterval(timer)
    }, [words.length])

    return (
        <span className="relative inline-flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ y: 10, opacity: 0, filter: 'blur(8px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -10, opacity: 0, filter: 'blur(8px)' }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block bg-gradient-to-r from-accent-soft via-glow to-accent bg-clip-text text-transparent"
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
            <span className="ml-1 inline-block h-[0.9em] w-[3px] animate-blink bg-glow" />
        </span>
    )
}

export default function Hero() {
    return (
        <Section id="home" className="flex min-h-screen items-center pt-24">
            {/* Decorative animated background */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />
                <div className="absolute bottom-0 right-10 h-80 w-80 animate-float rounded-full bg-glow/10 blur-[100px]" />
                <div className="absolute left-10 top-1/3 h-72 w-72 rounded-full bg-purple-500/10 blur-[100px]" />
            </div>

            <div className="w-full">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="mx-auto flex max-w-5xl flex-col items-center text-center"
                >
                    <motion.p
                        variants={staggerItem}
                        className="mb-8 inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 font-mono text-sm text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/5 dark:text-emerald-300"
                    >
                        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 dark:bg-emerald-400" />
                        <span className="text-slate-500">$</span> whoami{' '}
                        <span className="text-emerald-600 dark:text-emerald-400">--status</span> available
                    </motion.p>

                    <motion.h1
                        variants={staggerItem}
                        className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl md:text-8xl"
                    >
                        Hi, I'm {personal.name.split(' ')[0]}.
                    </motion.h1>

                    <motion.h2
                        variants={staggerItem}
                        className="mt-3 font-display text-3xl font-bold leading-tight text-slate-300 sm:text-5xl md:text-6xl"
                    >
                        I build
                        <span className="mt-1 flex min-h-[1.2em] items-center justify-center">
                            <RotatingWord />
                        </span>
                    </motion.h2>

                    <motion.p
                        variants={staggerItem}
                        className="mt-6 max-w-2xl text-lg font-medium text-slate-200 sm:text-xl"
                    >
                        {personal.pitch}
                    </motion.p>

                    <motion.p
                        variants={staggerItem}
                        className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400"
                    >
                        {personal.intro}
                    </motion.p>

                    <motion.div
                        variants={staggerItem}
                        className="mt-10 flex flex-wrap items-center justify-center gap-4"
                    >
                        <button
                            onClick={() =>
                                document
                                    .getElementById('projects')
                                    ?.scrollIntoView({ behavior: 'smooth' })
                            }
                            className="rounded-full bg-accent px-8 py-3.5 font-semibold text-on-accent shadow-lg shadow-accent/25 transition-all hover:-translate-y-0.5 hover:bg-accent-hover"
                        >
                            View My Work
                        </button>
                        <button
                            onClick={() =>
                                document
                                    .getElementById('contact')
                                    ?.scrollIntoView({ behavior: 'smooth' })
                            }
                            className="rounded-full border border-white/15 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-white/5"
                        >
                            Get in Touch
                        </button>
                    </motion.div>

                    <motion.ul
                        variants={staggerItem}
                        className="mt-10 flex items-center justify-center gap-6"
                    >
                        {socials.map(({ label, href, icon: Icon }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="text-slate-500 transition-colors hover:text-white"
                                >
                                    <Icon size={22} />
                                </a>
                            </li>
                        ))}
                    </motion.ul>

                    {/* Horizontal stats strip */}
                    <motion.dl
                        variants={staggerItem}
                        className="mt-16 grid w-full max-w-3xl grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] py-6"
                    >
                        {about.stats.map((stat) => (
                            <div key={stat.label} className="px-4 text-center">
                                <dt className="font-display text-2xl font-bold text-white sm:text-4xl">
                                    {stat.value}
                                </dt>
                                <dd className="mt-1 text-xs uppercase tracking-wider text-slate-400 sm:text-sm">
                                    {stat.label}
                                </dd>
                            </div>
                        ))}
                    </motion.dl>
                </motion.div>
            </div>

            {/* Scroll cue */}
            <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500"
            >
                <FiArrowDown className="animate-bounce" size={22} />
            </motion.div>
        </Section>
    )
}
