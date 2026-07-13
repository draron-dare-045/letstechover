import { motion } from 'framer-motion'
import { ArrowUpRight, Trophy } from 'lucide-react'
import { achievements } from '../data'

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="eyebrow mb-3">recognition</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold">Wall of Fame</h2>
          <p className="text-muted mt-3 max-w-xl">
            Wins, talks and features from building things that shipped, not just things that shipped.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((a, i) => (
            <motion.a
              key={a.title}
              href={a.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card glow-border group p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-9 h-9 rounded-lg bg-brand-gradient flex items-center justify-center">
                    <Trophy size={16} className="text-bg" />
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-muted group-hover:text-accent2 transition-colors"
                  />
                </div>
                <p className="font-mono text-xs text-accent2 mb-2">{a.date}</p>
                <h3 className="font-display text-lg font-semibold leading-snug">{a.title}</h3>
                <p className="text-sm text-muted mt-1">{a.org}</p>
                <p className="text-sm text-muted mt-3 leading-relaxed">{a.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
