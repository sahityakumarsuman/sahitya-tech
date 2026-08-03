import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { projects } from '../../data/portfolio'
import { staggerContainer, staggerItem, viewportOnce } from '../../utils/animations'

/** Two-letter monogram from a project name (used when there's no screenshot). */
function monogram(title) {
    return title
        .split('—')[0]
        .trim()
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase()
}

/** Resolve the links to show: explicit `links`, else a single "Visit" if a real URL exists. */
function projectLinks(project) {
    if (project.links?.length) return project.links
    if (project.liveUrl && project.liveUrl !== '#')
        return [{ label: 'Visit', href: project.liveUrl }]
    return []
}

/** Preview area: auto-sliding screenshot carousel, single image, logo, or monogram. */
function ProjectPreview({ project }) {
    const contain = project.imageFit === 'contain'
    const images = project.images?.length
        ? project.images
        : project.image
            ? [project.image]
            : []
    const [index, setIndex] = useState(0)

    useEffect(() => {
        if (images.length < 2) return undefined
        const id = setInterval(
            () => setIndex((i) => (i + 1) % images.length),
            2800,
        )
        return () => clearInterval(id)
    }, [images.length])

    const fit = contain ? 'object-contain p-3' : 'object-cover object-top'

    return (
        <div
            className={`relative aspect-[16/10] overflow-hidden ${contain ? 'bg-gradient-to-br from-base-900 to-base-700' : ''
                }`}
        >
            {images.length > 0 ? (
                <>
                    <AnimatePresence initial={false} mode="popLayout">
                        <motion.img
                            key={images[index]}
                            src={images[index]}
                            alt={project.title}
                            loading="lazy"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.7, ease: 'easeInOut' }}
                            className={`absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105 ${fit}`}
                        />
                    </AnimatePresence>
                    {images.length > 1 && (
                        <div className="absolute bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                            {images.map((src, i) => (
                                <button
                                    key={src}
                                    type="button"
                                    aria-label={`Show screenshot ${i + 1}`}
                                    onClick={() => setIndex(i)}
                                    className={`h-1.5 rounded-full transition-all ${i === index
                                        ? 'w-4 bg-white'
                                        : 'w-1.5 bg-white/40 hover:bg-white/70'
                                        }`}
                                />
                            ))}
                        </div>
                    )}
                </>
            ) : project.icon ? (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/25 via-base-800 to-glow/10 p-6">
                    {project.iconWordmark ? (
                        <img
                            src={project.icon}
                            alt={project.title}
                            loading="lazy"
                            className="max-h-14 w-auto max-w-[78%] object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <img
                            src={project.icon}
                            alt={project.title}
                            loading="lazy"
                            className="h-20 w-20 rounded-2xl object-contain shadow-lg shadow-black/20 ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110"
                        />
                    )}
                </div>
            ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/25 via-base-800 to-glow/10">
                    <span className="font-display text-5xl font-bold text-white/80">
                        {monogram(project.title)}
                    </span>
                </div>
            )}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-base-800 to-transparent" />
        </div>
    )
}

export default function Projects() {
    return (
        <Section id="projects" className="bg-base-800/30">
            <SectionHeading
                eyebrow="Selected work"
                title={projects.heading}
                subtitle={projects.subheading}
            />

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
                {projects.items.map((project) => {
                    const links = projectLinks(project)

                    return (
                        <motion.article
                            key={project.title}
                            variants={staggerItem}
                            whileHover={{ y: -6 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-base-800/50"
                        >
                            <ProjectPreview project={project} />

                            {/* Body */}
                            <div className="flex flex-1 flex-col p-6">
                                <h3 className="font-display text-lg font-semibold text-white">
                                    {project.title}
                                </h3>

                                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                                    {project.description}
                                </p>

                                <ul className="mt-4 flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <li
                                            key={tag}
                                            className="rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300"
                                        >
                                            {tag}
                                        </li>
                                    ))}
                                </ul>

                                {links.length > 0 && (
                                    <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/5 pt-4">
                                        {links.map((link) => (
                                            <a
                                                key={link.label}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs font-semibold text-accent-soft transition-colors hover:text-accent"
                                            >
                                                {link.label}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.article>
                    )
                })}
            </motion.div>
        </Section>
    )
}
