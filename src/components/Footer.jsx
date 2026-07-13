import { profile } from '../data'

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted font-mono">
        <p>© {new Date().getFullYear()} Aron Onkware. All rights reserved.</p>
        <p>Built with React, Tailwind & Framer Motion.</p>
      </div>
    </footer>
  )
}
