import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import BackgroundGalaxy from './components/common/BackgroundGalaxy'
import ScrollToTop from './components/common/ScrollToTop'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Experience from './components/sections/Experience'
import Education from './components/sections/Education'
import Projects from './components/sections/Projects'
import Achievements from './components/sections/Achievements'
import Process from './components/sections/Process'
import Pricing from './components/sections/Pricing'
import Blog from './components/sections/Blog'
import Contact from './components/sections/Contact'

export default function App() {
    return (
        <div className="relative min-h-screen text-slate-200 antialiased">
            <BackgroundGalaxy />
            <Navbar />
            <main className="relative z-10">
                <Hero />
                <About />
                <Skills />
                <Experience />
                <Education />
                <Projects />
                <Achievements />
                <Process />
                <Pricing />
                <Blog />
                <Contact />
            </main>
            <Footer />
            <ScrollToTop />
        </div>
    )
}
