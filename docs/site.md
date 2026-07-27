# www.abdulaziz.cv

One page, statically generated, no third-party scripts.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # all routes prerender
npm start
```

## Structure

```
src/
  app/
    layout.tsx             metadata, Person JSON-LD, pre-paint theme script
    page.tsx               the single page
    opengraph-image.tsx    OG card, generated at build time
    robots.ts sitemap.ts
    globals.css            Tailwind v4 theme + CSS-variable colour system
  content/
    site.ts                name, contact, services, how-I-work
    work.ts                the three case studies
  components/              one per section
public/
  cv/                      CV PDFs (EN / RU / UZ) — kept at their original URLs
```

**All copy lives in `src/content/`.** Editing the site means editing two typed files, not
hunting through JSX.

## Decisions worth knowing

- **No client components.** The theme toggle is server-rendered with a few lines of inline
  vanilla JS rather than a React island for one boolean. Both icons ship in the HTML and CSS
  picks one, so the correct icon is present on first paint.
- **Colours are CSS custom properties** swapped by a `.dark` class on `<html>`, set before
  first paint by an inline script. Components almost never need a `dark:` variant.
- **System font stack.** No font request, no FOUT, no CDN.
- **No contact form.** A `mailto:` with a prefilled subject, plus the address as selectable
  text. A form needs a backend and silently loses messages.

## Deploying

Vercel. **`www.abdulaziz.cv`** is the primary domain; the apex issues a 308 to `www`, which
is what the canonical URL in `src/content/site.ts` assumes.
