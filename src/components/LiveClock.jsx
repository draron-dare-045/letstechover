import { useEffect, useState } from 'react'

export default function LiveClock() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const time = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  const date = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="hidden lg:flex flex-col items-end font-mono text-xs text-muted select-none leading-tight">
      <span className="text-text tracking-wider tabular-nums">{time}</span>
      <span className="mt-0.5 tracking-wide">{date}</span>
    </div>
  )
}