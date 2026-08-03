import { useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeProvider'

/**
 * Interactive galaxy / constellation background.
 * - Fixed behind all content, pointer-events-none (never blocks clicks).
 * - Drifting stars linked by faint lines; the mouse gently pushes nearby
 *   stars and draws links to the cursor, so every section feels alive.
 * - Subtle + semi-transparent so foreground text stays perfectly readable.
 * - Re-themes automatically for light & dark; respects reduced-motion.
 */
export default function BackgroundGalaxy() {
    const canvasRef = useRef(null)
    const { theme, isDark } = useTheme()

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        // Read the active theme's colors straight from its CSS variables so the
        // constellation always matches the palette the user picked.
        const triplet = (raw, fallback) => {
            const parts = raw.split(/[\s,]+/).map(Number)
            return parts.length === 3 && parts.every((n) => !Number.isNaN(n))
                ? parts
                : fallback
        }

        // Theme-aware palette (RGB triplets). LINK/GLOW are `let` so they can be
        // refreshed on the next frame — the [data-theme] attribute is set by the
        // ThemeProvider effect, which runs *after* this child effect, so a same-
        // tick read would lag one theme behind.
        const STAR = isDark ? [203, 213, 225] : [71, 85, 105] // slate-300 / slate-600
        let LINK = [99, 102, 241] // theme accent
        let GLOW = [34, 211, 238] // theme glow
        const starAlpha = isDark ? 0.55 : 0.45
        const linkAlpha = isDark ? 0.18 : 0.14

        const readThemeColors = () => {
            const styles = getComputedStyle(document.documentElement)
            LINK = triplet(styles.getPropertyValue('--c-accent').trim(), LINK)
            GLOW = triplet(styles.getPropertyValue('--c-glow').trim(), GLOW)
        }
        readThemeColors()
        const colorRaf = requestAnimationFrame(readThemeColors)

        const prefersReduced = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches

        let width = 0
        let height = 0
        let dpr = Math.min(window.devicePixelRatio || 1, 2)
        let particles = []
        let animationId = 0

        const mouse = { x: -9999, y: -9999, active: false }
        const LINK_DIST = 130
        const MOUSE_DIST = 170

        function resize() {
            width = window.innerWidth
            height = window.innerHeight
            dpr = Math.min(window.devicePixelRatio || 1, 2)
            canvas.width = width * dpr
            canvas.height = height * dpr
            canvas.style.width = `${width}px`
            canvas.style.height = `${height}px`
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

            // Particle count scales with screen area (capped for performance).
            const count = Math.min(Math.floor((width * height) / 12000), 140)
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                r: Math.random() * 1.6 + 0.6,
            }))
        }

        function draw() {
            ctx.clearRect(0, 0, width, height)

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i]

                // Drift.
                p.x += p.vx
                p.y += p.vy

                // Wrap around the edges.
                if (p.x < -10) p.x = width + 10
                if (p.x > width + 10) p.x = -10
                if (p.y < -10) p.y = height + 10
                if (p.y > height + 10) p.y = -10

                // Mouse repulsion.
                if (mouse.active) {
                    const dx = p.x - mouse.x
                    const dy = p.y - mouse.y
                    const dist = Math.hypot(dx, dy)
                    if (dist < MOUSE_DIST && dist > 0) {
                        const force = (MOUSE_DIST - dist) / MOUSE_DIST
                        p.x += (dx / dist) * force * 1.4
                        p.y += (dy / dist) * force * 1.4
                    }
                }

                // Star.
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${STAR[0]}, ${STAR[1]}, ${STAR[2]}, ${starAlpha})`
                ctx.fill()

                // Links to nearby stars.
                for (let j = i + 1; j < particles.length; j++) {
                    const q = particles[j]
                    const dx = p.x - q.x
                    const dy = p.y - q.y
                    const dist = Math.hypot(dx, dy)
                    if (dist < LINK_DIST) {
                        const a = (1 - dist / LINK_DIST) * linkAlpha
                        ctx.beginPath()
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(q.x, q.y)
                        ctx.strokeStyle = `rgba(${LINK[0]}, ${LINK[1]}, ${LINK[2]}, ${a})`
                        ctx.lineWidth = 1
                        ctx.stroke()
                    }
                }

                // Links to the cursor (glow color).
                if (mouse.active) {
                    const dx = p.x - mouse.x
                    const dy = p.y - mouse.y
                    const dist = Math.hypot(dx, dy)
                    if (dist < MOUSE_DIST) {
                        const a = (1 - dist / MOUSE_DIST) * (linkAlpha + 0.15)
                        ctx.beginPath()
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(mouse.x, mouse.y)
                        ctx.strokeStyle = `rgba(${GLOW[0]}, ${GLOW[1]}, ${GLOW[2]}, ${a})`
                        ctx.lineWidth = 1
                        ctx.stroke()
                    }
                }
            }

            animationId = requestAnimationFrame(draw)
        }

        function drawStatic() {
            // Reduced-motion: paint a single calm frame, no animation loop.
            ctx.clearRect(0, 0, width, height)
            for (const p of particles) {
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${STAR[0]}, ${STAR[1]}, ${STAR[2]}, ${starAlpha})`
                ctx.fill()
            }
        }

        function onMove(e) {
            mouse.x = e.clientX
            mouse.y = e.clientY
            mouse.active = true
        }
        function onLeave() {
            mouse.active = false
            mouse.x = -9999
            mouse.y = -9999
        }
        function onTouch(e) {
            if (e.touches && e.touches[0]) {
                mouse.x = e.touches[0].clientX
                mouse.y = e.touches[0].clientY
                mouse.active = true
            }
        }

        resize()
        window.addEventListener('resize', resize)
        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseout', onLeave)
        window.addEventListener('touchmove', onTouch, { passive: true })
        window.addEventListener('touchend', onLeave)

        if (prefersReduced) {
            drawStatic()
        } else {
            animationId = requestAnimationFrame(draw)
        }

        return () => {
            cancelAnimationFrame(animationId)
            cancelAnimationFrame(colorRaf)
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseout', onLeave)
            window.removeEventListener('touchmove', onTouch)
            window.removeEventListener('touchend', onLeave)
        }
    }, [theme, isDark])

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-0 h-full w-full"
        />
    )
}
