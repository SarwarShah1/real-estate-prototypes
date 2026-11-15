# Nakhla Residences — luxury compound site prototype

Static site: HTML + CSS + vanilla JS. No build step.

- `js/content.js` — all content: photos, contacts, licence numbers, villas, facilities, plot statuses (`PLOT_STATUS`), calculator settings (`PAYMENT`) and the FAQ. Edit this to re-skin for a client.
- `js/site.js` — pages, language switch (EN/AR), buy/rent toggle, forms.

Pages: home, villas, one page per villa (with payment calculator), masterplan (`#masterplan`, or `#masterplan-ghaf` to open filtered), life here, location, gallery, FAQ, brochure (`#brochure`, unlocked by name and mobile, then saved as PDF from the browser's print dialog), contact.

Masterplan: change a letter in `PLOT_STATUS` (A available, R reserved, S sold). The available counts on the villa pages follow it automatically.
- `css/site.css` — colours and fonts are variables at the top.

Photos: paste an image address into each slot of `PHOTOS` in `js/content.js`. Empty slots show a labelled placeholder.

Run locally: `python3 -m http.server 8080`, then open http://localhost:8080
GitHub Pages: push this folder to a repo, then Settings > Pages > deploy from branch `main`, folder `/`.

All figures, licence numbers and contacts are sample values. Forms do not send anything.

Home page video: `media/nakhla-hero.mp4` (desktop) and `media/nakhla-hero-sm.mp4` (phones), a 17-second muted loop cut from free Pexels clips. Set `VIDEO.src` to "" in `js/content.js` to show the hero photo instead.
