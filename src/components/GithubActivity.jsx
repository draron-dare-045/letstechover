import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, ArrowUpRight } from 'lucide-react'
import { profile } from '../data'

const username = profile.githubUsername
const API_URL = `https://github-contributions-api.jogruber.de/v4/${username}?y=all`

const LEVEL_CLASSES = [
  'bg-surfaceAlt',
  'bg-[#0e4429]',
  'bg-[#006d32]',
  'bg-[#26a641]',
  'bg-[#39d353]',
]

export default function GithubActivity() {
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [payload, setPayload] = useState(null)
  const [year, setYear] = useState('last')

  useEffect(() => {
    let cancelled = false

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub contributions request failed: ${res.status}`)
        return res.json()
      })
      .then((json) => {
        if (cancelled) return
        if (!json?.contributions) throw new Error('Unexpected response shape')
        setPayload(json)
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [])

  const years = useMemo(() => {
    if (!payload?.total) return []
    return Object.keys(payload.total)
      .filter((k) => k !== 'lastYear')
      .sort((a, b) => Number(b) - Number(a))
  }, [payload])

  const filteredDays = useMemo(() => {
    if (!payload?.contributions) return []
    if (year === 'last') {
      const cutoff = new Date()
      cutoff.setDate(cutoff.getDate() - 365)
      return payload.contributions.filter((d) => new Date(d.date) >= cutoff)
    }
    return payload.contributions.filter((d) => d.date.startsWith(String(year)))
  }, [payload, year])

  const total =
    year === 'last' ? payload?.total?.lastYear : payload?.total?.[year]

  const weeks = useMemo(() => {
    if (!filteredDays.length) return []
    const result = []
    let current = []
    filteredDays.forEach((day, i) => {
      const dow = new Date(day.date).getDay()
      if (i === 0) {
        for (let j = 0; j < dow; j++) current.push(null)
      }
      current.push(day)
      if (dow === 6) {
        result.push(current)
        current = []
      }
    })
    if (current.length) result.push(current)
    return result
  }, [filteredDays])

  const monthLabels = useMemo(() => {
    let lastMonth = null
    return weeks.map((week) => {
      const firstDay = week.find((d) => d)
      if (!firstDay) return ''
      const month = new Date(firstDay.date).toLocaleString('en-US', { month: 'short' })
      if (month !== lastMonth) {
        lastMonth = month
        return month
      }
      return ''
    })
  }, [weeks])

  const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', '']

  return (
    <section id="github" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="eyebrow mb-3">on github</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
            Building in public.
          </h2>
          <p className="text-muted max-w-2xl leading-relaxed">
            A live look at my open-source rhythm - every commit, pull request, and code
            review on{' '}
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noreferrer"
              className="text-accent2 hover:underline"
            >
              @{username}
            </a>
            .
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card p-6 md:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm hover:text-accent2 transition-colors"
            >
              <Github size={18} className="text-accent2" />
              @{username}
              <ArrowUpRight size={14} />
            </a>

            {years.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                {['last', ...years].map((y) => (
                  <button
                    key={y}
                    onClick={() => setYear(y)}
                    className={`px-3 py-1.5 rounded-full border transition-colors ${
                      String(year) === String(y)
                        ? 'border-accent1 text-accent2 bg-accent1/10'
                        : 'border-border text-muted hover:text-text hover:border-muted'
                    }`}
                  >
                    {y === 'last' ? 'Last 12 months' : y}
                  </button>
                ))}
              </div>
            )}
          </div>

          {status === 'loading' && (
            <div className="h-40 flex items-center justify-center text-muted font-mono text-sm">
              Loading contribution graph...
            </div>
          )}

          {status === 'error' && (
            <div className="h-40 flex flex-col items-center justify-center gap-2 text-center px-4">
              <p className="text-muted font-mono text-sm">
                Couldn't load live GitHub data right now.
              </p>

              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noreferrer"
                className="text-accent2 text-sm hover:underline"
              >
                View the profile directly {'>'}
              </a>
            </div>
          )}

          {status === 'ready' && weeks.length > 0 && (
            <>
              <div className="overflow-x-auto pb-2">
                <div className="flex gap-2 min-w-max">
                  <div className="flex flex-col gap-1 pt-4">
                    {dayLabels.map((label, i) => (
                      <span
                        key={i}
                        className="h-3 leading-3 text-[10px] font-mono text-muted"
                      >
                        {label}
                      </span>
                    ))}
                  </div>

                  <div>
                    <div className="flex gap-1 mb-1">
                      {weeks.map((_, wi) => (
                        <span
                          key={wi}
                          className="w-3 leading-3 text-[10px] font-mono text-muted"
                        >
                          {monthLabels[wi]}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-1">
                      {weeks.map((week, wi) => (
                        <div key={wi} className="flex flex-col gap-1">
                          {Array.from({ length: 7 }).map((_, di) => {
                            const day = week[di]
                            if (!day) {
                              return <div key={di} className="w-3 h-3 rounded-sm" />
                            }
                            return (
                              <div
                                key={di}
                                title={`${day.date}: ${day.count} contribution${
                                  day.count === 1 ? '' : 's'
                                }`}
                                className={`w-3 h-3 rounded-sm ${
                                  LEVEL_CLASSES[day.level] || LEVEL_CLASSES[0]
                                }`}
                              />
                            )
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-border font-mono text-xs text-muted">
                <span>
                  <span className="text-text font-semibold">{total ?? '-'}</span>{' '}
                  contributions {year === 'last' ? 'in the last 12 months' : `in ${year}`}
                </span>
                <div className="flex items-center gap-2">
                  <span>Less</span>
                  {LEVEL_CLASSES.map((c, i) => (
                    <span key={i} className={`w-3 h-3 rounded-sm ${c}`} />
                  ))}
                  <span>More</span>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}