<img width="1280" height="800" alt="preview (2)" src="https://github.com/user-attachments/assets/ba48268c-ddb1-4fbf-9c9f-b32589dc416c" />

# Aurelis Partners — Corporate Advisory Website

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![No Framework](https://img.shields.io/badge/Framework-None%20(Vanilla)-333333?style=flat)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

A multi-page corporate advisory website concept built with vanilla HTML, CSS and JavaScript. The design targets a premium strategy/transformation consulting firm ("Aurelis Partners"), with smooth scroll-based motion, a custom cursor, and a fully responsive layout — no frameworks or build tools required.

**Live demo:** enable GitHub Pages on this repo (Settings → Pages → Deploy from `main`) and add the link here.

## Features

- **Four full pages** — Home, About, Services, Contact, sharing one design system
- **Scroll-driven motion** — reveal-on-scroll animations, parallax media, animated stat counters
- **Custom interface details** — custom cursor, magnetic buttons, page-transition overlay, scroll-progress bar
- **Responsive navigation** — sticky header that hides on scroll-down, animated mobile menu
- **Accessible by default** — skip-to-content link, `aria` attributes on nav/menu, honors `prefers-reduced-motion`
- **Working contact form markup** — ready to wire up to a form backend (Formspree, Netlify Forms, etc.)
- **Zero dependencies** — pure HTML/CSS/JS, only Ionicons loaded via CDN for icons

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | Semantic HTML5 |
| Styling | CSS3 (custom properties, Grid, Flexbox, media queries) |
| Behavior | Vanilla JavaScript (ES6, IIFE module pattern) |
| Icons | [Ionicons](https://ionic.io/ionicons) via CDN |
| Images | Unsplash (placeholder imagery) |

## Project Structure

```
ai-corporate-site/
├── index.html          # Home page
├── about.html           # About / firm page
├── services.html        # Services & capabilities page
├── contact.html          # Contact page
└── assets/
    ├── css/
    │   └── styles.css    # Full design system & layout
    └── js/
        └── main.js       # Header, menu, cursor, parallax, reveal, form logic
```

## Getting Started

No build step is required — this is a static site.

```bash
git clone https://github.com/NSniha/ai-corporate-site.git
cd ai-corporate-site
```

Open `index.html` directly in a browser, or serve it locally:

```bash
npx serve .
```

## Pages

| Page | Description |
|---|---|
| `index.html` | Hero, client marquee, about preview, services overview, stats, process, leadership, insights, CTA |
| `about.html` | Firm story and philosophy |
| `services.html` | Detailed breakdown of the four core service lines |
| `contact.html` | Contact form and office locations |

## Customization

- Update copy, imagery, and office locations directly in the HTML files
- Design tokens (colors, spacing, type scale) are defined as CSS custom properties at the top of `styles.css`
- Replace the Unsplash image URLs with your own assets for production use

## License

Released under the [MIT License](LICENSE).
