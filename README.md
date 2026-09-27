# Veno — Study Companion App (prototype)

A functioning front-end prototype of Veno, an AI-powered personalized study
platform for university students, built with React + hand-authored CSS using
the Veno brand system (colors, logo, "Glow" mascot).

## What's included

- `app.jsx` — the entire React application: all 10 screens (onboarding,
  upload materials, prioritization check-in, home/dashboard, study session
  Q&A, progress/mastery view, schedule, wellbeing check-in, pricing, and
  profile/settings), plus the brand logo/mascot components and mock data.
- `styles.css` — design tokens (colors, radii, shadows) and all component
  styles.
- `index.html` — loads React, ReactDOM, and Babel Standalone from cdnjs, then
  transpiles and runs `app.jsx` directly in the browser. No build step
  needed.

## Running it locally

Because the browser needs to fetch `app.jsx` over HTTP (not `file://`),
serve the folder with any static server, for example:

```
npx serve .
```

or

```
python3 -m http.server 8080
```

Then open the printed local URL.

## Data

All data (courses, questions, schedule, mood/plan state, mastery, coins,
subscription, etc.) is mocked and kept in React state — nothing persists
or calls a real backend. Refreshing the page resets everything to the
initial demo state, as requested.

## Notes for turning this into a real product

- Swap the mock data structures (`COURSES`, `QUESTION_BANK`, `TODAY_PLAN`,
  `INITIAL_SCHEDULE`, `PLANS`, etc., near the top of `app.jsx`) for real API
  calls.
- The onboarding, upload, and prioritization flows currently just set local
  state — wire them up to your auth/user-profile and file-upload backend.
- For production you'll likely want a real build step (Vite/Next.js) rather
  than in-browser Babel; the component structure carries over directly.
