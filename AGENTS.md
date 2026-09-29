# Agent Guide

Instructions for AI agents (and humans) working on this site: Shoolpani Dubey's CV, a Vite + React + TypeScript app published on GitHub Pages.

## Design system

- **Use the Tokyo Paper design system for all UI:** https://github.com/shoolpani-dubey/tokyo-paper-design-system
- Its `Design.md` is the source of truth for design decisions; its `README.md` explains them. Read them before changing the look of the site.
- Use Tokyo Paper's components and classes (`tp-button`, `tp-card`, `tp-field`, `tp-alert`, …) with the markup from each component's reference page (`src/components/<name>/<name>.html` in that repo). Don't write new components when one already exists there.
- The site vendors the CSS it uses into `src/styles/tokyo-paper/`, so the build doesn't depend on another repo. Don't edit those files; to update or add a component, copy its CSS from the design system repo and add an `@import` for it to `src/styles/tokyo-paper/tokyo-paper.css`.
- Site-specific layout lives in `src/styles/site.css` with `site-` class names. Take every color, size, space and duration from design tokens (CSS custom properties); no literal values.
- Keep both themes (Paper and Night follow `prefers-color-scheme`), 44px targets, visible focus, and no horizontal scroll down to 320px wide.
- `@tokyo-paper/react` needs React 19; this site is on React 18, so it uses the plain CSS classes instead.

## Content

- CV data lives in `src/data/experienceData.ts`; the summary is in `src/components/summary-component/`.
- The contact form (`src/components/contact-component/`) posts to a Google Form. Its entry IDs (`entry.…`) come from the form's public page and must be updated if the form's questions change. The email goes in the form's built-in `emailAddress` field, which only works while the form collects email addresses as **Responder input**. **Verified** requires a Google sign-in, so Google rejects the site's posts. The response is opaque (`no-cors`), so the site can't detect that. The sender's name and email are also written at the top of the Body field.

## Checks

Run `npm run build` and `npm run lint` before committing.
