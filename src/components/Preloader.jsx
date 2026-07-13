import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrambleText from './ScrambleText'

const greetingLines = ['Hi there', 'Welcome to my Personal Portfolio', 'LETS TECH OVER']

function GreetingStage({ onLineDone, onComplete }) {
  const [lineIndex, setLineIndex] = useState(0)

  const handleLineDone = (i) => {
    if (i !== lineIndex) return
    if (i < greetingLines.length - 1) {
      onLineDone(i)
      setTimeout(() => setLineIndex(i + 1), 300)
    } else {
      onLineDone(i)
      setTimeout(onComplete, 600)
    }
  }

  return (
    <div className="flex flex-col items-center text-center gap-2">
      {greetingLines.slice(0, lineIndex + 1).map((line, i) => (
        <p
          key={line}
          className="font-mono text-lg sm:text-2xl font-light tracking-wide text-muted min-h-[1.6em]"
        >
          <ScrambleText
            text={line}
            lockSpeed={2}
            tickMs={30}
            onDone={() => handleLineDone(i)}
          />
        </p>
      ))}
    </div>
  )
}

function NameStage({ onComplete }) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">
        <ScrambleText text="Presenting" lockSpeed={2} tickMs={25} />
      </p>
      <h1 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight gradient-text">
        <ScrambleText
          text="ARON ONKWARE"
          lockSpeed={2}
          tickMs={35}
          delay={250}
          onDone={() => setTimeout(onComplete, 700)}
        />
      </h1>
    </div>
  )
}

export default function Preloader({ onDone }) {
  const [stage, setStage] = useState('greeting') // 'greeting' | 'name'
  const [exiting, setExiting] = useState(false)
  const [percent, setPercent] = useState(5)

  const finish = () => {
    setPercent(100)
    setExiting(true)
    setTimeout(() => {
      document.body.style.overflow = ''
      onDone()
    }, 700)
  }

  useState(() => {
    document.body.style.overflow = 'hidden'
  })

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

          <div className="relative">
            <AnimatePresence mode="wait">
              {stage === 'greeting' ? (
                <motion.div
                  key="greeting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -12, transition: { duration: 0.4 } }}
                >
                  <GreetingStage
                    onLineDone={(i) => setPercent(25 + i * 20)}
                    onComplete={() => {
                      setPercent(85)
                      setStage('name')
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="name"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <NameStage onComplete={finish} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute bottom-14 w-[220px] h-px bg-border overflow-hidden">
            <motion.div
              className="h-full bg-brand-gradient"
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          <p className="absolute bottom-10 font-mono text-xs text-muted tabular-nums">
            {percent}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}