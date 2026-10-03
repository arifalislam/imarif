# Project Notes

- Theming: the portfolio's accent color is centralized in `--accent-red` / `--accent-red-rgb` / `--accent-glow` in `src/styles.css` — retheme by editing those variables only.
- Theme toggle: dark is the base design; light mode is implemented as `html.light` utility overrides appended at the end of `src/styles.css` (components keep their dark-mode Tailwind classes). The nav keeps `theme-blend` (white ink + mix-blend-difference) so it self-inverts on any background; anything that sits on imagery gets an `img-layer` class so it stays white. Add new white/black utility overrides to that block when introducing new components.
- The chosen theme persists in localStorage key `arif-theme` and is applied pre-hydration by an inline script in `src/routes/__root.tsx` (`suppressHydrationWarning` on `<html>` is required for it).
- GSAP animations must respect `prefers-reduced-motion` everywhere; smooth scrolling is driven by Lenis through GSAP's ticker (`src/hooks/use-smooth-scroll.ts`) — don't add independent scroll listeners that fight it.
