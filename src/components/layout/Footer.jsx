import { socials, personal } from '../../data/portfolio'

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="relative z-10 border-t border-white/5 bg-base-900">
            <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 py-10 sm:flex-row">
                <p className="text-sm text-slate-500">
                    © {year} {personal.name}. All rights reserved.
                </p>
                <ul className="flex items-center gap-3">
                    {socials.map(({ label, href, icon: Icon }) => (
                        <li key={label}>
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:border-accent hover:text-white"
                            >
                                <Icon size={18} />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    )
}
