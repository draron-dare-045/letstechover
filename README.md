# Aron Onkware — Portfolio

A fast, dark-themed personal portfolio built with React, Vite, Tailwind CSS, and Framer Motion. Features a terminal-style hero, a live GitHub contribution graph, and content that's fully editable from a single file.

**Live site:** _add your deployed URL here_

---

## Features

- **Animated preloader** — scrambling greeting text before the site reveals itself
- **Terminal-style hero** — typewriter effect cycling through your roles
- **Wall of Fame** — a grid of achievements, talks, and features
- **Filterable projects grid** — tag-based category filtering with animated transitions
- **Services section**
- **Live GitHub activity graph** — pulls your real contribution data client-side and renders it in GitHub's own layout and colors, with year tabs
- **Contact section** — opens a pre-filled email via `mailto:`
- **Fully responsive** — collapsible mobile nav, single-column layouts on small screens, no fixed-position elements that can overlap on any breakpoint
- **One file to edit** — all real content (bio, projects, achievements, services, socials) lives in `src/data.js`

## Tech stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) for animation
- [Lucide React](https://lucide.dev/) for icons

## Getting started

\`\`\`bash
# install dependencies
npm install

# start the dev server
npm run dev

# build for production
npm run build

# preview the production build locally
npm run preview
\`\`\`

The dev server runs at `http://localhost:5173` by default.

## Project structure

\`\`\`
src/
├── App.jsx              # page layout / section order
├── data.js               # <-- EDIT ME: all real content lives here
├── index.css              # Tailwind base + custom utility classes
├── main.jsx
└── components/
    ├── Preloader.jsx
    ├── Navbar.jsx
    ├── LiveClock.jsx      # rendered inline inside Navbar (desktop only)
    ├── Hero.jsx
    ├── Achievements.jsx
    ├── Projects.jsx
    ├── Services.jsx
    ├── GithubActivity.jsx # live contribution graph
    ├── Contact.jsx
    ├── Footer.jsx
    └── ScrambleText.jsx
\`\`\`

## Customizing content

Nearly everything on the site is driven by `src/data.js`. You shouldn't need to touch any component to update your content — just edit the exported objects/arrays:

| Export               | Controls                                          |
| --------------------- | -------------------------------------------------- |
| `profile`             | Name, roles, tagline, location, stats, social links, resume URL, contact info, GitHub username |
| `achievements`        | Wall of Fame cards                                |
| `projectCategories`   | Filter tabs on the Projects section               |
| `projects`             | Project cards (title, description, tags, links, image) |
| `services`             | Services list                                     |

### GitHub activity graph

The graph pulls live data for whichever username is set in `profile.githubUsername`:

\`\`\`js
export const profile = {
  ...
  githubUsername: 'draron-dare-045',
  ...
}
\`\`\`

It fetches contribution data from the public [`github-contributions-api.jogruber.de`](https://github.com/grubersjoe/github-contributions-api) service — no API key or backend required. If the request fails (wrong username, service down, etc.), the section falls back to a link straight to your GitHub profile instead of showing broken data.

### Project screenshots

Each entry in `projects` has an `image` field. Leave it empty to show a "preview image" placeholder, or point it at:
- a static image you add under `public/`, or
- an auto-generated live screenshot, e.g. using [thum.io](https://www.thum.io/) (`https://image.thum.io/get/width/800/<your-live-url>`)

### Contact form

The form builds a `mailto:` link on submit — no backend needed. If you'd rather have messages land in an inbox without opening the visitor's email client, wire it up to a service like [Formspree](https://formspree.io/) instead (see the comment in `Contact.jsx`).

## Deployment

This is a static Vite build, so it deploys anywhere that serves static files — Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.

\`\`\`bash
npm run build
\`\`\`

outputs to `dist/`, which you can upload/point your host at directly.

## License

MIT — see [LICENSE](./LICENSE).