import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { profile } from '../data'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Wire this up to Formspree, EmailJS, or your own API endpoint.
    // Quick option: https://formspree.io — no backend needed.
    const subject = encodeURIComponent(`Inquiry from ${form.name || 'your portfolio'}`)
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-surface/40">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-3">let's collaborate</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">Get in touch.</h2>
          <p className="text-muted max-w-md leading-relaxed">
            Have a project in mind or just want to say hello? I'm always open to new
            opportunities and interesting conversations.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-surfaceAlt border border-border flex items-center justify-center">
                <MapPin size={16} className="text-accent2" />
              </span>
              <div>
                <p className="text-xs text-muted font-mono">Location</p>
                <p className="text-sm">{profile.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-surfaceAlt border border-border flex items-center justify-center">
                <Phone size={16} className="text-accent2" />
              </span>
              <div>
                <p className="text-xs text-muted font-mono">Phone</p>
                <a href={`tel:${profile.phone}`} className="text-sm hover:text-accent2">
                  {profile.phone}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-surfaceAlt border border-border flex items-center justify-center">
                <Mail size={16} className="text-accent2" />
              </span>
              <div>
                <p className="text-xs text-muted font-mono">Email</p>
                <a href={`mailto:${profile.email}`} className="text-sm hover:text-accent2">
                  {profile.email}
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="card p-6 md:p-8 space-y-5"
        >
          <div>
            <label className="text-xs font-mono text-muted">Full Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full mt-1.5 bg-surfaceAlt border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-accent2 transition-colors"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="text-xs font-mono text-muted">Email Address</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full mt-1.5 bg-surfaceAlt border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-accent2 transition-colors"
              placeholder="jane@company.com"
            />
          </div>
          <div>
            <label className="text-xs font-mono text-muted">Your Message</label>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full mt-1.5 bg-surfaceAlt border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-accent2 transition-colors resize-none"
              placeholder="Tell me about your project..."
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-brand-gradient text-bg font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <Send size={16} /> {sent ? 'Opening your email client...' : 'Send Me Message'}
          </button>
        </motion.form>
      </div>
    </section>
  )
}
