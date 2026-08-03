import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { SiMedium } from 'react-icons/si'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { blog } from '../../data/portfolio'
import { fadeInUp, staggerContainer, staggerItem, viewportOnce } from '../../utils/animations'

export default function Blog() {
    return (
        <Section id="blog">
            <SectionHeading
                eyebrow="Insights"
                title={blog.heading}
                subtitle={blog.subheading}
            />

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
                {blog.posts.map((post) => (
                    <motion.a
                        key={post.url}
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={staggerItem}
                        whileHover={{ y: -6 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-base-800/50 p-6"
                    >
                        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-accent to-glow opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />

                        <div className="relative flex flex-1 flex-col">
                            <div className="flex items-center justify-between text-xs text-slate-400">
                                <span className="rounded-md bg-white/5 px-2.5 py-1 font-medium text-slate-300">
                                    {post.tag}
                                </span>
                                <span>{post.date}</span>
                            </div>

                            <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-white">
                                {post.title}
                            </h3>

                            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                                {post.excerpt}
                            </p>

                            <div className="mt-5 flex items-center justify-between text-sm">
                                <span className="inline-flex items-center gap-1.5 text-slate-500">
                                    <SiMedium size={16} />
                                    {post.claps ? `${post.claps} claps` : 'Medium'}
                                </span>
                                <span className="inline-flex items-center gap-1 font-medium text-accent-soft transition-colors group-hover:text-white">
                                    Read
                                    <FiArrowUpRight size={16} />
                                </span>
                            </div>
                        </div>
                    </motion.a>
                ))}
            </motion.div>

            <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="mt-10 text-center"
            >
                <a
                    href={blog.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/5"
                >
                    <SiMedium size={18} />
                    Read more on Medium
                    <FiArrowUpRight size={18} />
                </a>
            </motion.div>
        </Section>
    )
}
