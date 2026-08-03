import { motion } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { pricing } from '../../data/portfolio'
import { staggerContainer, staggerItem, viewportOnce } from '../../utils/animations'

export default function Pricing() {
    return (
        <Section id="pricing" className="bg-base-800/30">
            <SectionHeading
                eyebrow="Pricing"
                title={pricing.heading}
                subtitle={pricing.subheading}
            />

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="mt-12 grid items-stretch gap-6 lg:grid-cols-3"
            >
                {pricing.tiers.map((tier) => (
                    <motion.article
                        key={tier.name}
                        variants={staggerItem}
                        whileHover={{ y: -6 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className={`relative flex flex-col overflow-hidden rounded-2xl border p-7 ${tier.highlighted
                            ? 'border-accent/50 bg-accent/5 shadow-xl shadow-accent/10'
                            : 'border-white/10 bg-base-800/50'
                            }`}
                    >
                        {tier.highlighted && (
                            <span className="absolute right-5 top-6 rounded-full bg-accent px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide text-on-accent">
                                Most popular
                            </span>
                        )}

                        <h3 className="font-display text-lg font-semibold text-white">
                            {tier.name}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-400">
                            {tier.tagline}
                        </p>

                        <p className="mt-5 font-mono text-sm font-medium text-glow">
                            {tier.priceLabel}
                        </p>

                        <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                            {tier.features.map((feature) => (
                                <li
                                    key={feature}
                                    className="flex items-start gap-3 text-sm leading-relaxed text-slate-300"
                                >
                                    <FiCheck
                                        size={16}
                                        className={`mt-0.5 shrink-0 ${tier.highlighted ? 'text-accent-soft' : 'text-emerald-400'
                                            }`}
                                    />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() =>
                                document
                                    .getElementById('contact')
                                    ?.scrollIntoView({ behavior: 'smooth' })
                            }
                            className={`mt-8 w-full rounded-full px-6 py-3 font-semibold transition-all hover:-translate-y-0.5 ${tier.highlighted
                                ? 'bg-accent text-on-accent shadow-lg shadow-accent/25 hover:bg-accent-hover'
                                : 'border border-white/15 text-white hover:bg-white/5'
                                }`}
                        >
                            Get a quote
                        </button>
                    </motion.article>
                ))}
            </motion.div>

            {pricing.note && (
                <motion.p
                    variants={staggerItem}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-8 text-center text-sm text-slate-400"
                >
                    {pricing.note}
                </motion.p>
            )}
        </Section>
    )
}
