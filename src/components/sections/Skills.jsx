import { motion } from 'framer-motion'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { skills } from '../../data/portfolio'
import { getSkillIcon } from '../../utils/skillIcons'
import { staggerContainer, staggerItem, viewportOnce } from '../../utils/animations'

export default function Skills() {
    return (
        <Section id="skills" className="bg-base-800/30">
            <SectionHeading
                eyebrow="Expertise"
                title={skills.heading}
                subtitle={skills.subheading}
            />

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="mt-12 grid gap-6 md:grid-cols-3"
            >
                {skills.groups.map((group) => (
                    <motion.div
                        key={group.title}
                        variants={staggerItem}
                        className="group rounded-2xl border border-white/10 bg-base-800/50 p-7 transition-colors hover:border-accent/40"
                    >
                        <h3 className="font-display text-lg font-semibold text-white">
                            {group.title}
                        </h3>
                        <ul className="mt-5 flex flex-wrap gap-2">
                            {group.items.map((item) => {
                                const { icon: Icon, color } = getSkillIcon(item)
                                return (
                                    <li
                                        key={item}
                                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-300 transition-colors group-hover:border-accent/30"
                                    >
                                        <Icon
                                            size={16}
                                            className="shrink-0"
                                            style={color ? { color } : undefined}
                                            aria-hidden="true"
                                        />
                                        {item}
                                    </li>
                                )
                            })}
                        </ul>
                    </motion.div>
                ))}
            </motion.div>
        </Section>
    )
}
