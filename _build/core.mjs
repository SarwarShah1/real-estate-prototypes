// Shared static-site generator: real URLs, EN + AR (RTL), SEO tags, JSON-LD, sitemap.
import fs from "node:fs";
import path from "node:path";

export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
export const ORIGIN = "https://sarwarshah1.github.io";
export const REPO = "/real-estate-prototypes";

export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
export const fmt = (n) => Math.round(n).toLocaleString("en-US");
const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";
export const toAr = (s) => String(s).replace(/[0-9]/g, (d) => AR_DIGITS[d]);

/** Unsplash image with responsive srcset. */
export function img(id, alt, { w = 1600, sizes = "100vw", cls = "", eager = false, ratio = "" } = {}) {
  const u = (x) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${x}&q=70`;
  const set = [480, 800, 1200, 1600, 2200].filter((x) => x <= w * 1.4).map((x) => `${u(x)} ${x}w`).join(", ");
  return `<img src="${u(w)}" srcset="${set}" sizes="${sizes}" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ""}${ratio ? ` style="aspect-ratio:${ratio}"` : ""} ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}
export const imgUrl = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

/** Create a site builder. pages: [{ path: "/communities/x/", render(ctx) -> {title, description, body, jsonld?, image?} }] */
export function site(cfg) {
  const out = path.join(ROOT, cfg.slug);
  const base = `${REPO}/${cfg.slug}`;
  const pages = [];
  const add = (p, render, opts = {}) => pages.push({ p, render, ...opts });

  function ctx(lang) {
    const ar = lang === "ar";
    const t = (en, a) => (ar ? a : en);
    const L = (o) => (o && typeof o === "object" ? (ar ? o.ar : o.en) : o);
    const n = (x) => (ar ? toAr(x) : String(x));
    const url = (p) => `${base}${ar ? "/ar" : ""}${p}`;
    const sar = (v) => (ar ? `${toAr(fmt(v))} ر.س` : `SAR ${fmt(v)}`);
    return { lang, ar, t, L, n, url, sar, base, cfg };
  }

  function build() {
    fs.rmSync(out, { recursive: true, force: true });
    const urls = [];
    for (const lang of ["en", "ar"]) {
      const c = ctx(lang);
      for (const pg of pages) {
        const r = pg.render(c);
        const html = cfg.layout(c, pg.p, r);
        const file = path.join(out, lang === "ar" ? "ar" : "", pg.p, "index.html");
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, html);
        if (!pg.noindex) urls.push(ORIGIN + c.url(pg.p));
      }
    }
    // 404 page
    const c = ctx("en");
    const nf = cfg.notFound ? cfg.layout(c, "/404/", cfg.notFound(c)) : null;
    if (nf) fs.writeFileSync(path.join(out, "404.html"), nf);
    fs.writeFileSync(path.join(out, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}\n</urlset>\n`);
    fs.writeFileSync(path.join(out, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${ORIGIN}${base}/sitemap.xml\n`);
    for (const [src, dst] of cfg.assets || []) {
      fs.mkdirSync(path.dirname(path.join(out, dst)), { recursive: true });
      fs.copyFileSync(src, path.join(out, dst));
    }
    console.log(`${cfg.slug}: ${pages.length * 2} pages`);
  }
  return { add, build, base, ctx };
}

/** Standard <head> pieces shared by every page. */
export function head(c, p, r, extra = "") {
  const { cfg } = c;
  const canon = ORIGIN + c.url(p);
  const alt = (l) => `${ORIGIN}${c.base}${l === "ar" ? "/ar" : ""}${p}`;
  const title = r.title ? `${r.title} | ${c.L(cfg.name)}` : `${c.L(cfg.name)} | ${c.L(cfg.tagline)}`;
  const ld = [].concat(r.jsonld || []);
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(r.description)}">
<link rel="canonical" href="${canon}">
<link rel="alternate" hreflang="en" href="${alt("en")}">
<link rel="alternate" hreflang="ar" href="${alt("ar")}">
<link rel="alternate" hreflang="x-default" href="${alt("en")}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(c.L(cfg.name))}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(r.description)}">
<meta property="og:url" content="${canon}">
<meta property="og:locale" content="${c.ar ? "ar_SA" : "en_US"}">
${r.image ? `<meta property="og:image" content="${imgUrl(r.image, 1200)}">\n<meta name="twitter:card" content="summary_large_image">` : ""}
<meta name="theme-color" content="${cfg.themeColor}">
<link rel="icon" href="${c.base}/assets/icon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://images.unsplash.com">
<link rel="stylesheet" href="${cfg.fonts}">
<link rel="stylesheet" href="${c.base}/assets/site.css?v=${cfg.v}">
${ld.map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join("\n")}
${extra}`;
}

const ICONS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  heart: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/>',
  bed: '<path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/>',
  bath: '<path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.7 3 4 3.7 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5M2 12h20M7 19v2M17 19v2"/>',
  area: '<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h6V3M15 21v-6h6"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  whatsapp: '<path d="M3 21l1.7-4.4A9 9 0 1 1 8 19.6L3 21z"/><path d="M9 9.5c.3 1.8 2.7 4.3 4.6 4.8l1.2-1.2 2 1-.4 1.4c-3 .5-7.6-3.7-7.5-6.7L10.3 8l1 2z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  compare: '<path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3M12 2v20"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/>',
  tool: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z"/>',
  building: '<rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.9-5.4 5.1-6"/>',
  chart: '<path d="M3 3v18h18M7 15l4-4 3 3 6-6"/>',
  key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/>',
  play: '<path d="m6 3 14 9-14 9z"/>', pause: '<path d="M7 4h3v16H7zM14 4h3v16h-3z"/>'
};
export const icon = (k, cls = "i") => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[k] || ""}</svg>`;

/** Lead form with Saudi mobile validation and PDPL consent. fields: extra html. */
export function leadForm(c, { id = "lead", kind = "interest", ref = "", submit, extra = "", compact = false } = {}) {
  const { t } = c;
  const f = (name, label, attrs = "", type = "text") => `<div class="fld"><label for="${id}-${name}">${label}</label><input id="${id}-${name}" name="${name}" type="${type}" ${attrs} aria-describedby="${id}-${name}-err"><span class="err" id="${id}-${name}-err" role="alert"></span></div>`;
  return `<form class="lead${compact ? " compact" : ""}" data-lead="${kind}" data-ref="${esc(ref)}" novalidate>
  <div class="fgrid">${f("name", t("Full name", "الاسم الكامل"), 'required autocomplete="name"')}${f("phone", t("Mobile number", "رقم الجوال"), 'required inputmode="tel" autocomplete="tel" dir="ltr" placeholder="05XXXXXXXX" data-sa-mobile', "tel")}${compact ? "" : f("email", t("Email (optional)", "البريد الإلكتروني (اختياري)"), 'autocomplete="email" dir="ltr"', "email")}${extra}</div>
  <fieldset class="pref"><legend>${t("Preferred contact", "طريقة التواصل المفضلة")}</legend>
    <label><input type="radio" name="via" value="whatsapp" checked> WhatsApp</label><label><input type="radio" name="via" value="call"> ${t("Phone call", "اتصال")}</label><label><input type="radio" name="via" value="email"> ${t("Email", "بريد")}</label></fieldset>
  <label class="consent"><input type="checkbox" name="consent" required aria-describedby="${id}-consent-err"> <span>${t(`I agree that ${c.L(c.cfg.name)} may process my details to contact me about this enquiry, as set out in the <a href="${c.url("/privacy/")}">privacy notice</a> (Saudi PDPL).`, `أوافق على معالجة ${c.L(c.cfg.name)} لبياناتي للتواصل معي بشأن هذا الطلب، وفق <a href="${c.url("/privacy/")}">إشعار الخصوصية</a> (نظام حماية البيانات الشخصية).`)}</span></label>
  <span class="err" id="${id}-consent-err" role="alert"></span>
  <button class="btn btn-primary" type="submit">${submit || t("Register interest", "سجّل اهتمامك")}</button>
  <div class="ok" role="status" hidden></div>
</form>`;
}
