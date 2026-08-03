import { motion } from 'framer-motion'
import { FiAward } from 'react-icons/fi'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { achievements } from '../../data/portfolio'
import { staggerContainer, staggerItem, viewportOnce } from '../../utils/animations'

export default function Achievements() {
    return (
        <Section id="achievements" className="bg-base-800/30">
            <SectionHeading
                eyebrow="Recognition"
                title={achievements.heading}
                subtitle={achievements.subheading}
            />

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
                {achievements.items.map((item) => (
                    <motion.article
                        key={item.title}
                        variants={staggerItem}
                        whileHover={{ y: -4 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-base-800/50 p-7"
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-glow/10 text-glow">
                            <FiAward size={22} />
                        </div>

                        <h3 className="mt-5 font-display text-base font-semibold text-white">
                            {item.title}
                        </h3>
                        {item.org && (
                            <p className="mt-1 text-sm font-medium text-accent-soft">{item.org}</p>
                        )}
                        <p className="mt-3 text-sm leading-relaxed text-slate-400">
                            {item.detail}
                        </p>
                    </motion.article>
                ))}
            </motion.div>
        </Section>
    )
}
