import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrambleText from './ScrambleText'

const lines = ['Hi there!', "Welcome to Aron's Portfolio.", "Let's build something great."]

export default function Preloader({ onDone }) {
  const [percent, setPercent] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    // Lock scroll while the preloader is up
    document.body.style.overflow = 'hidden'

    const start = performance.now()
    const duration = 3600 // ms to reach 100% — matches the scramble text finishing

    let raf
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      setPercent(Math.floor(progress * 100))
      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setExiting(true), 350)
        setTimeout(() => {
          document.body.style.overflow = ''
          onDone()
        }, 350 + 700)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center px-6"
        >
          <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.08] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_40%,transparent_100%)]" />

          <div className="relative flex flex-col items-center text-center">
            {lines.map((line, i) => (
              <p
                key={line}
                className={`font-mono text-xl sm:text-2xl min-h-[1.6em] ${
                  i === 0
                    ? 'text-muted'
                    : i === lines.length - 1
                    ? 'gradient-text font-semibold mt-1'
                    : 'text-text mt-1'
                }`}
              >
                <ScrambleText text={line} delay={300 + i * 750} lockSpeed={2} tickMs={30} />
              </p>
            ))}

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 220, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="h-px bg-border mt-10 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-brand-gradient"
                style={{ width: `${percent}%` }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="font-mono text-xs text-muted mt-4 tabular-nums"
            >
              {percent}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}