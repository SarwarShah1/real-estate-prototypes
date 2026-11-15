# Nakhla Residences — luxury compound site prototype

Static site: HTML + CSS + vanilla JS. No build step.

- `js/content.js` — all content: photos, contacts, licence numbers, villas, facilities. Edit this to re-skin for a client.
- `js/site.js` — pages, language switch (EN/AR), buy/rent toggle, forms.
- `css/site.css` — colours and fonts are variables at the top.

Photos: paste an image address into each slot of `PHOTOS` in `js/content.js`. Empty slots show a labelled placeholder.

Run locally: `python3 -m http.server 8080`, then open http://localhost:8080
GitHub Pages: push this folder to a repo, then Settings > Pages > deploy from branch `main`, folder `/`.

All figures, licence numbers and contacts are sample values. Forms do not send anything.
