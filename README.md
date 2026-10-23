# Gita Moments — NFC Gift Website Starter

A mobile-first static PWA prototype for a personalized Bhagavad Gita companion.

## Run locally
Open `index.html` in a browser for basic interactions. For service-worker/offline testing, serve this folder over localhost or HTTPS, for example with Python's built-in HTTP server.

## Included in this first development pass
- Daily wisdom reveal and manual reveal-another fallback
- Gita Moments: short story, sloka reflection, insight, modern application
- Mood-based reflections
- 18-chapter theme guide (starter descriptions; verified chapter summaries still to be authored)
- Local-browser favourites and reflection diary
- Basic PWA manifest and service worker
- Optional preferred-name setting stored locally

## Not implemented yet
- Secure accounts/cloud sync
- Private messaging, access requests, approval workflow, Telegram bot integration
- Server-side puzzle verification / lockout
- Birthday unlocks, scheduled messages, full journey milestones
- Complete verified verse library, audio, downloadable status cards, full offline content pack

## Important
This is a prototype, not a production-ready secure messaging service. Private diary data is stored in the current browser's local storage and may be lost if browser data is cleared. The existing NFC URL has not been changed or embedded because it has not yet been supplied/verified. Do not write any secrets or bot tokens into frontend files or a public repository.

Before publishing, review Sanskrit and Telugu verse meanings with a trusted source, check artwork/audio rights, and test on the target phone and NFC card.
