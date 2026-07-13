import { useEffect, useState } from 'react'

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}=+*^?#0123456789'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * Reveals `text` left to right, showing random characters for each
 * letter until that letter "locks in" — the classic decode/scramble effect.
 *
 * delay:      ms to wait before starting
 * lockSpeed:  ticks between each letter locking in (higher = slower reveal)
 * tickMs:     ms between animation frames (lower = faster flicker)
 */
export default function ScrambleText({
  text,
  className = '',
  delay = 0,
  lockSpeed = 2,
  tickMs = 35,
  onDone,
}) {
  const [display, setDisplay] = useState(
    prefersReducedMotion() ? text : text.replace(/\S/g, ' ')
  )

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDisplay(text)
      onDone?.()
      return
    }

    let interval
    let lockedCount = 0
    let tick = 0

    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        tick += 1
        if (tick % lockSpeed === 0 && lockedCount < text.length) {
          lockedCount += 1
        }

        setDisplay(
          text
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' '
              if (i < lockedCount) return char
              return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
            })
            .join('')
        )

        if (lockedCount >= text.length) {
          clearInterval(interval)
          setDisplay(text)
          onDone?.()
        }
      }, tickMs)
    }, delay)

    return () => {
      clearTimeout(startTimeout)
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay])

  return <span className={className}>{display}</span>
}