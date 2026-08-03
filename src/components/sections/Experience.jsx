import { motion } from 'framer-motion'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { experience } from '../../data/portfolio'
import { staggerContainer, staggerItem, viewportOnce } from '../../utils/animations'

/**
 * Derives a short monogram from a company name so each role gets a
 * recognizable, theme-consistent logo badge without external logo files.
 */
function companyInitials(name) {
    const clean = name.replace(/\(.*?\)/g, '').trim()
    const words = clean.split(/\s+/).filter(Boolean)
    let letters
    if (words.length > 1) {
        letters = words.slice(0, 2).map((w) => w[0])
    } else {
        const camel = clean.match(/[A-Z][a-z]*/g)
        letters =
            camel && camel.length > 1
                ? camel.slice(0, 2).map((w) => w[0])
                : clean.slice(0, 2).split('')
    }
    return letters.join('').toUpperCase()
}

export default function Experience() {
    return (
        <Section id="experience">
            <SectionHeading
                eyebrow="Career path"
                title={experience.heading}
                subtitle={experience.subheading}
            />

            <motion.ol
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="relative mt-12 border-l border-white/10 pl-8"
            >
                {experience.timeline.map((job) => (
                    <motion.li
                        key={`${job.company}-${job.period}`}
                        variants={staggerItem}
                        className="relative mb-10 last:mb-0"
                    >
                        {/* Timeline node */}
                        <span
                            className={`absolute -left-[41px] flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-base-900 ${job.current ? 'bg-accent' : 'bg-slate-600'
                                }`}
                        >
                            {job.current && (
                                <span className="absolute h-4 w-4 animate-ping rounded-full bg-accent/60" />
                            )}
                        </span>

                        <div className="rounded-2xl border border-white/10 bg-base-800/50 p-6">
                            <div className="flex items-start gap-4">
                                {/* Company logo badge */}
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-accent/20 to-glow/10 font-display text-sm font-bold tracking-tight text-white">
                                    {companyInitials(job.company)}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <h3 className="font-display text-lg font-semibold text-white">
                                            {job.role}
                                        </h3>
                                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">
                                            {job.period}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-accent-soft">
                                        {job.company} · {job.type}
                                    </p>
                                </div>
                            </div>
                            <ul className="mt-4 space-y-2">
                                {job.points.map((point, i) => (
                                    <li
                                        key={i}
                                        className="flex gap-2 text-sm leading-relaxed text-slate-400"
                                    >
                                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.li>
                ))}
            </motion.ol>
        </Section>
    )
}
