import { motion } from 'framer-motion'
import Section from '../common/Section'
import { contact, personal, socials } from '../../data/portfolio'
import { fadeInUp, staggerContainer, staggerItem, viewportOnce } from '../../utils/animations'

export default function Contact() {
    return (
        <Section id="contact">
            <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-base-800 to-base-900 px-8 py-16 text-center sm:px-16"
            >
                <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]" />

                <div className="relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={viewportOnce}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="mx-auto mb-8 w-fit"
                    >
                        <motion.div
                            className="group relative mx-auto w-fit cursor-pointer"
                            whileHover={{ scale: 1.06, rotate: 2 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                        >
                            {/* Spinning gradient halo */}
                            <motion.div
                                aria-hidden="true"
                                className="absolute -inset-1.5 rounded-full opacity-60 blur-[6px] transition-opacity duration-300 group-hover:opacity-95"
                                style={{
                                    background:
                                        'conic-gradient(from 0deg, rgb(var(--c-accent)), rgb(var(--c-glow)), rgb(var(--c-accent-soft)), rgb(var(--c-accent)))',
                                }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, ease: 'linear', repeat: Infinity }}
                            />
                            {/* Pulsing outline ring on hover */}
                            <span className="pointer-events-none absolute -inset-1.5 rounded-full ring-1 ring-white/20 transition-transform duration-500 group-hover:scale-110 group-hover:ring-accent/40" />
                            <img
                                src={personal.profileImage}
                                alt={personal.name}
                                className="relative h-28 w-28 rounded-full border-2 border-white/10 object-cover shadow-2xl shadow-accent/20 sm:h-32 sm:w-32"
                            />
                        </motion.div>
                        <p className="mt-4 font-display text-lg font-semibold text-white">
                            {personal.name}
                        </p>
                        <p className="text-sm text-slate-400">{personal.role}</p>
                    </motion.div>

                    <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-accent-soft">
                        Contact
                    </span>
                    <h2 className="font-display text-3xl font-bold text-white sm:text-5xl">
                        {contact.heading}
                    </h2>
                    <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg">
                        {contact.subheading}
                    </p>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
                    >
                        {contact.channels.map(({ label, href, icon: Icon }) => (
                            <motion.a
                                key={label}
                                variants={staggerItem}
                                href={href}
                                className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-accent hover:bg-accent/10"
                            >
                                <Icon size={18} className="text-accent-soft" />
                                {label}
                            </motion.a>
                        ))}
                    </motion.div>

                    <ul className="mt-10 flex items-center justify-center gap-4">
                        {socials.map(({ label, href, icon: Icon }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:border-accent hover:text-white"
                                >
                                    <Icon size={18} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </Section>
    )
}
