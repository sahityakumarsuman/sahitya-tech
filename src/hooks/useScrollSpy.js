import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in view and returns its id.
 * Used by the Navbar to highlight the active link.
 *
 * @param {string[]} sectionIds - ids of the sections to observe
 * @param {number} rootMarginTop - offset (px) to account for the fixed navbar
 */
export function useScrollSpy(sectionIds, rootMarginTop = 80) {
    const [activeId, setActiveId] = useState(sectionIds[0] ?? '')

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

                if (visible[0]) {
                    setActiveId(visible[0].target.id)
                }
            },
            {
                rootMargin: `-${rootMarginTop}px 0px -55% 0px`,
                threshold: [0.15, 0.5, 0.85],
            }
        )

        sectionIds.forEach((id) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [sectionIds, rootMarginTop])

    return activeId
}
