/**
 * Reusable Framer Motion variants.
 * Keeping these centralized ensures consistent motion across the whole site
 * and makes global timing/easing tweaks a one-line change.
 */

const EASE = [0.22, 1, 0.36, 1] // "easeOutExpo"-ish, feels premium

export const fadeInUp = {
    hidden: { opacity: 0, y: 32 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: EASE },
    },
}

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
}

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: EASE },
    },
}

/**
 * Parent container that staggers its children.
 * Pair with `staggerItem` on each child.
 */
export const staggerContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
}

export const staggerItem = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: EASE },
    },
}

// Shared viewport config so animations trigger consistently on scroll.
export const viewportOnce = { once: true, amount: 0.2 }
