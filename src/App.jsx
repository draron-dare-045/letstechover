import { useState } from 'react'
import { motion } from 'framer-motion'
import Preloader from './components/Preloader'
import LiveClock from './components/LiveClock'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Achievements from './components/Achievements'
import Projects from './components/Projects'
import Services from './components/Services'
import GithubActivity from './components/GithubActivity'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="min-h-screen bg-bg text-text font-body selection:bg-accent1">
      {loading && <Preloader onDone={() => setLoading(false)} />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <LiveClock />
        <Navbar />
        <main>
          <Hero />
          <Achievements />
          <Projects />
          <Services />
          <GithubActivity />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </div>
  )
}