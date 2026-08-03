import { forwardRef } from 'react'

/**
 * Consistent section wrapper: full-width, generous vertical rhythm, and an
 * inner container that centers content. The `id` powers scroll navigation.
 */
const Section = forwardRef(function Section(
    { id, className = '', children, ...rest },
    ref
) {
    return (
        <section
            id={id}
            ref={ref}
            className={`relative scroll-mt-20 py-24 sm:py-28 ${className}`}
            {...rest}
        >
            <div className="container mx-auto max-w-6xl">{children}</div>
        </section>
    )
})

export default Section
