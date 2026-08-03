# Portfolio

A single-page, animated personal portfolio built with **React + Vite**, **Tailwind CSS**, and **Framer Motion**.

## Tech Stack

- **React 18** + **Vite** — fast dev server & optimized builds
- **Tailwind CSS** — utility-first styling with centralized design tokens
- **Framer Motion** — declarative, reusable animations
- **react-icons** — crisp iconography

## Project Structure

```
src/
├── components/
│   ├── common/       # Reusable UI primitives (Section, SectionHeading)
│   ├── layout/       # Navbar, Footer
│   └── sections/     # Page sections (Hero, About, Skills, Experience, Projects, Contact)
├── data/
│   └── portfolio.js  # ⭐ ALL your content lives here — edit this to update the site
├── hooks/            # Custom hooks (useScrollSpy, useScrolled)
├── utils/
│   └── animations.js # Shared Framer Motion variants
├── App.jsx           # Composes the page
├── main.jsx          # App entry
└── index.css         # Global styles + Tailwind layers
```

## How to Customize

- **Content:** Edit `src/data/portfolio.js` — name, bio, skills, experience, projects, contact. No JSX needed.
- **Colors / theme:** Edit the `colors` tokens in `tailwind.config.js`.
- **Animations:** Tweak the shared variants in `src/utils/animations.js`.
- **Sections:** Add/remove sections in `src/App.jsx` and add a matching entry to `navLinks` in the data file.

## Getting Started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Deployment

The `dist/` folder is static and can be deployed to Vercel, Netlify, GitHub Pages, or any static host.

## Author

Your Name — replace with your details in `src/data/portfolio.js`.
