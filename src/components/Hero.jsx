import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Instagram, ArrowDown } from 'lucide-react'
import { profile } from '../data'

const iconMap = { github: Github, linkedin: Linkedin, twitter: Twitter, instagram: Instagram }

function Counter({ value, suffix = '', duration = 1.6 }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    let start = null
    let raf
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.floor(eased * value))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  return (
    <span className="font-display text-3xl md:text-4xl font-semibold text-text">
      {display}
      {suffix}
    </span>
  )
}

function TerminalRoles() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = profile.roles[roleIndex]
    const speed = deleting ? 35 : 65
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1))
        } else {
          setTimeout(() => setDeleting(true), 1200)
        }
      } else {
        if (text.length > 0) {
          setText(current.slice(0, text.length - 1))
        } else {
          setDeleting(false)
          setRoleIndex((i) => (i + 1) % profile.roles.length)
        }
      }
    }, speed)
    return () => clearTimeout(timeout)
  }, [text, deleting, roleIndex])

  return (
    <div className="card glow-border overflow-hidden shadow-2xl shadow-black/40">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-surfaceAlt">
        <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
        <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
        <span className="ml-3 font-mono text-xs text-muted">aron.jsx</span>
      </div>
      <div className="p-6 font-mono text-sm leading-relaxed">
        <p className="text-muted">
          <span className="text-accent2">const</span> developer <span className="text-text">=</span>{' '}
          <span className="text-text">&#123;</span>
        </p>
        <p className="pl-4 text-muted">
          name: <span className="text-accent1">'Aron Onkware'</span>,
        </p>
        <p className="pl-4 text-muted">
          role: <span className="text-accent1">'{text}</span>
          <span className="inline-block w-[2px] h-4 bg-accent2 align-middle animate-pulse ml-[1px]" />
          <span className="text-accent1">'</span>,
        </p>
        <p className="pl-4 text-muted">
          based_in: <span className="text-accent1">'{profile.location}'</span>,
        </p>
        <p className="pl-4 text-muted">
          available: <span className="text-accent2">true</span>,
        </p>
        <p className="text-muted">&#125;</p>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.15] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_40%,transparent_100%)]" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent1/20 blur-[120px]" />
      <div className="absolute top-60 -left-40 w-[400px] h-[400px] rounded-full bg-accent2/10 blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent2 animate-pulse" />
            <span className="font-mono text-xs text-muted">
              {profile.availability} · {profile.location}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-semibold leading-[0.95] text-5xl sm:text-6xl lg:text-7xl"
          >
            {profile.name}
            <br />
            <span className="gradient-text">{profile.surname}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-muted text-lg max-w-md"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href={profile.resumeUrl}
              className="px-5 py-3 rounded-full bg-brand-gradient text-bg font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Download CV
            </a>
            <a
              href="#projects"
              className="px-5 py-3 rounded-full border border-border font-medium text-sm hover:border-accent2 hover:text-accent2 transition-colors"
            >
              View Projects
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex items-center gap-5"
          >
            {Object.entries(profile.socials).map(([key, url]) => {
              const Icon = iconMap[key]
              if (!Icon) return null
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted hover:text-accent2 transition-colors"
                  aria-label={key}
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 grid grid-cols-3 gap-6 max-w-sm"
          >
            {profile.stats.map((s) => (
              <div key={s.label}>
                <Counter value={s.value} suffix={s.suffix} />
                <p className="text-xs text-muted mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <TerminalRoles />
        </motion.div>
      </div>

      <motion.a
        href="#achievements"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-accent2"
        aria-label="Scroll down"
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  )
}
