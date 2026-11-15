# Sakan Realty — real estate agency website prototype

Static site (HTML + CSS + vanilla JS, no build step, no dependencies).

- `index.html` — shell
- `css/styles.css` — design tokens at the top (`:root`) — change colours/fonts per agency
- `js/data.js` — brand, licences, contacts, districts, listings, projects, agents (edit this to re-skin for a client)
- `js/art.js` — generated SVG illustrations (placeholders for real photos)
- `js/app.js` — pages, filters, calculators, forms, language switch

Run locally: `python3 -m http.server 8080` in this folder, open http://localhost:8080

Deploy: copy the folder to any web root (nginx/Apache), e.g. `/var/www/sakan/`.
All content is SAMPLE data. Forms store leads in the browser only (demo).
