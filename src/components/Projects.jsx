import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { projects, projectCategories } from '../data'

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="relative py-24 md:py-32 bg-surface/40">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="eyebrow mb-3">selected work</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold">Projects</h2>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-10">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-mono transition-colors border ${
                filter === cat
                  ? 'bg-brand-gradient text-bg border-transparent'
                  : 'border-border text-muted hover:text-text hover:border-accent2'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                layout
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="card glow-border overflow-hidden group"
              >
                <div className="aspect-video bg-surfaceAlt flex items-center justify-center overflow-hidden">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <span className="font-mono text-xs text-muted">preview image</span>
                  )}
                </div>
                <div className="p-6">
                  <p className="font-mono text-xs text-accent2 mb-2">{p.category}</p>
                  <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                  <p className="text-sm text-muted mt-2 leading-relaxed">{p.description}</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full bg-surfaceAlt border border-border text-xs text-muted font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-5 pt-5 border-t border-border">
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-accent2 transition-colors"
                    >
                      <ExternalLink size={14} /> Live
                    </a>
                    <a
                      href={p.codeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-accent2 transition-colors"
                    >
                      <Github size={14} /> Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
