import { motion } from 'framer-motion'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { about } from '../../data/portfolio'
import {
    fadeInUp,
    staggerContainer,
    staggerItem,
    viewportOnce,
} from '../../utils/animations'

export default function About() {
    return (
        <Section id="about">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
                <div>
                    <SectionHeading eyebrow="Profile" title={about.heading} />
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="mt-6 space-y-4"
                    >
                        {about.paragraphs.map((p, i) => (
                            <p key={i} className="text-base leading-relaxed text-slate-400">
                                {p}
                            </p>
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid grid-cols-3 gap-4"
                >
                    {about.stats.map((stat) => (
                        <motion.div
                            key={stat.label}
                            variants={staggerItem}
                            className="rounded-2xl border border-white/10 bg-base-800/50 p-6 text-center"
                        >
                            <div className="font-display text-3xl font-bold text-white sm:text-4xl">
                                {stat.value}
                            </div>
                            <div className="mt-2 text-xs text-slate-400 sm:text-sm">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </Section>
    )
}
