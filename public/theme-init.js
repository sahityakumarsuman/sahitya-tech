/*
 * Pre-paint theme bootstrap (kept external so the production CSP can use
 * script-src 'self' without inline-script exceptions).
 * Applies the saved/system theme before React mounts to avoid a flash.
 */
(function () {
    try {
        var PALETTES = ['indigo', 'emerald', 'forest', 'stone', 'mono']
        var LEGACY = {
            midnight: 'indigo-dark',
            daylight: 'indigo-light',
            emerald: 'emerald-dark',
            mint: 'emerald-light',
            graphite: 'stone-dark',
            dark: 'indigo-dark',
            light: 'indigo-light',
        }

        var t = localStorage.getItem('theme')
        if (LEGACY[t]) t = LEGACY[t]

        var parts = (t || '').split('-')
        var palette = parts[0]
        var mode = parts[1]
        if (PALETTES.indexOf(palette) === -1 || (mode !== 'dark' && mode !== 'light')) {
            palette = 'mono'
            mode = 'light'
        }

        var el = document.documentElement
        el.setAttribute('data-theme', palette + '-' + mode)
        if (mode === 'dark') el.classList.add('dark')
    } catch (e) { }
})()
