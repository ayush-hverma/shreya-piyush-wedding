# Piyush weds Shreya — Luxury Indian Wedding Invitation

A mobile-first React + TypeScript + Vite + Tailwind CSS + Framer Motion wedding invitation.

## Run locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Where to customise the wedding

All event content lives in `src/data/weddingData.ts` — couple names, date, city, family names, functions, couple photos, video, hashtag and Things to Know copy.

Replace the remote photo URLs and YouTube embed URL with the final couple photos/video before launch.

The supplied temple artwork is at `public/assets/temple.png`. A transparent-background version was prepared from the supplied artwork so the sky shows through cleanly.

## Notes

- The RSVP form validates the required fields and keeps the UI confirmation in-session; connect its submit handler to your preferred backend/form service for production delivery.
- Wishes are persisted in the visitor's browser via `localStorage` as requested. For a shared public wishes wall, replace that storage layer with a backend.
- Music is intentionally user-triggered because browsers generally block autoplay audio.
- The hero portal is scroll-driven without pinning or a fake scroll runway. `prefers-reduced-motion` renders a static temple.
