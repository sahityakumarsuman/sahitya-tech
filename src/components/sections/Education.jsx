import { motion } from 'framer-motion'
import { FiBookOpen } from 'react-icons/fi'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { education } from '../../data/portfolio'
import { staggerContainer, staggerItem, viewportOnce } from '../../utils/animations'

export default function Education() {
    return (
        <Section id="education">
            <SectionHeading
                eyebrow="Foundation"
                title={education.heading}
                subtitle={education.subheading}
            />

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="mt-12 grid gap-6 sm:grid-cols-2"
            >
                {education.items.map((item) => (
                    <motion.article
                        key={item.institution}
                        variants={staggerItem}
                        whileHover={{ y: -4 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-base-800/50 p-7"
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                            <FiBookOpen size={22} />
                        </div>

                        <h3 className="mt-5 font-display text-lg font-semibold text-white">
                            {item.institution}
                        </h3>
                        <p className="mt-1 text-sm text-slate-300">{item.degree}</p>

                        <div className="mt-4 text-xs text-slate-400">
                            <span className="font-medium text-accent-soft">{item.period}</span>
                        </div>
                    </motion.article>
                ))}
            </motion.div>
        </Section>
    )
}
