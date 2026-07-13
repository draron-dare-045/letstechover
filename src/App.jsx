import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Achievements from './components/Achievements'
import Projects from './components/Projects'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text font-body selection:bg-accent1">
      <Navbar />
      <main>
        <Hero />
        <Achievements />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
