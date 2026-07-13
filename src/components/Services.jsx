import { motion } from 'framer-motion'
import { services } from '../data'

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="eyebrow mb-3">what I do</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold">Services</h2>
        </motion.div>

        <div className="divide-y divide-border border-t border-b border-border">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="grid md:grid-cols-[80px_1fr] gap-4 md:gap-10 py-8 group"
            >
              <span className="font-mono text-sm text-accent2">
                0{i + 1}
              </span>
              <div>
                <h3 className="font-display text-2xl font-semibold group-hover:gradient-text transition-colors">
                  {s.title}
                </h3>
                <p className="text-muted mt-2 max-w-2xl leading-relaxed">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
