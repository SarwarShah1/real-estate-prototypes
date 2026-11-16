import { site, head, img, imgUrl, esc, icon, leadForm, fmt, toAr, ROOT } from "./core.mjs";
import { P, CITIES, STATUS, TYPES, COMMUNITIES, AMEN, DESIGNS, FEATURES, FINISHES, READY, EVENTS } from "./dhilal-data.mjs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname);

const cfg = {
  slug: "dhilal", v: "1", themeColor: "#0C223F",
  name: { en: "Dhilal Communities", ar: "ظلال للمجتمعات السكنية" }, tagline: { en: "Family villas and townhouses in Saudi Arabia", ar: "فلل وتاون هاوس عائلية في المملكة" },
  fonts: "https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&family=Montserrat:wght@300;400;500;600&family=Noto+Naskh+Arabic:wght@500;600&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600&display=swap",
  phone: "920012345", wa: "966550000000",
  assets: [[path.join(HERE, "dhilal.css"), "assets/site.css"], [path.join(HERE, "common.js"), "assets/common.js"], [path.join(HERE, "dhilal.js"), "assets/site.js"], [path.join(HERE, "dhilal-icon.svg"), "assets/icon.svg"]]
};
const S = site(cfg);
const comm = (slug) => COMMUNITIES.find((c) => c.slug === slug);
const designsOf = (slug) => DESIGNS.filter((d) => d.c === slug);
const ph = (k) => P[k] || k;
const waLink = (c, msg) => `https://wa.me/${cfg.wa}?text=${encodeURIComponent(msg)}`;

/* ---------- layout ---------- */
const NAV = [["/communities/", "Communities", "المجتمعات"], ["/find/", "Find a home", "ابحث عن منزل"], ["/ready-homes/", "Ready homes", "منازل جاهزة"], ["/buying/", "Buying guide", "دليل الشراء"], ["/events/", "Events", "الفعاليات"], ["/care/", "Homeowner care", "خدمة الملاك"]];
const logo = (c) => `<a class="logo" href="${c.url("/")}" aria-label="${esc(c.L(cfg.name))}, ${c.t("home", "الرئيسية")}"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 4c-7 6-12 11-12 18a12 12 0 0 0 24 0c0-7-5-12-12-18Z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M20 12v24M20 22l-5-4M20 27l5-4" stroke="currentColor" stroke-width="1.6" fill="none"/></svg><span><b>${c.t("DHILAL", "ظِلال")}</b><small>${c.t("COMMUNITIES", "للمجتمعات السكنية")}</small></span></a>`;

function layout(c, p, r) {
  const other = c.ar ? `${c.base}${p}` : `${c.base}/ar${p}`;
  const isActive = (u) => p === u || (u !== "/" && p.startsWith(u)) || (u === "/communities/" && p.startsWith("/homes/"));
  return `<!doctype html>
<html lang="${c.lang}" dir="${c.ar ? "rtl" : "ltr"}">
<head>
${head(c, p, r)}
</head>
<body class="${r.bodyClass || ""}">
<a class="skip" href="#main">${c.t("Skip to content", "تخطَّ إلى المحتوى")}</a>
<div class="topbar"><div class="wrap"><span>${c.t("Off-plan sales licensed under REGA's Wafi programme", "البيع على الخارطة مرخّص ضمن برنامج وافي من الهيئة العامة للعقار")}</span><span class="tb-r"><a href="tel:${cfg.phone}">${icon("phone")} ${c.n(cfg.phone)}</a><a href="${c.url("/my-home/")}">${icon("user")} ${c.t("My Home", "منزلي")}</a></span></div></div>
<header class="site-header"><div class="wrap hd">
  ${logo(c)}
  <nav id="site-nav" aria-label="${c.t("Main", "الرئيسية")}"><ul>${NAV.map(([u, e, a]) => `<li><a href="${c.url(u)}"${isActive(u) ? ' aria-current="page"' : ""}>${c.t(e, a)}</a></li>`).join("")}</ul>
    <a class="btn btn-primary nav-cta" href="${c.url("/register/")}">${c.t("Register interest", "سجّل اهتمامك")}</a></nav>
  <div class="hd-r"><a class="lang" href="${other}" hreflang="${c.ar ? "en" : "ar"}" lang="${c.ar ? "en" : "ar"}">${c.ar ? "English" : "العربية"}</a>
    <a class="btn btn-primary hd-cta" href="${c.url("/register/")}">${c.t("Register interest", "سجّل اهتمامك")}</a>
    <button class="menu-btn" data-menu aria-expanded="false" aria-controls="site-nav" aria-label="${c.t("Menu", "القائمة")}">${icon("menu")}</button></div>
</div></header>
<main id="main" tabindex="-1">
${r.body}
</main>
<footer class="site-footer"><div class="wrap">
  <div class="ft-top">${logo(c)}<p>${c.t("Shaded, walkable communities for Saudi families, designed around the majlis, the courtyard and the park.", "مجتمعات مظللة وصديقة للمشي للعائلات السعودية، مصممة حول المجلس والفناء والمنتزه.")}</p></div>
  <div class="ft-cols">
    <div><h2>${c.t("Communities", "المجتمعات")}</h2>${COMMUNITIES.map((m) => `<a href="${c.url(`/communities/${m.slug}/`)}">${c.L(m.name)}</a>`).join("")}</div>
    <div><h2>${c.t("Buying", "الشراء")}</h2><a href="${c.url("/find/")}">${c.t("Find a home", "ابحث عن منزل")}</a><a href="${c.url("/ready-homes/")}">${c.t("Ready homes", "منازل جاهزة")}</a><a href="${c.url("/calculator/")}">${c.t("Payment calculator", "حاسبة الدفعات")}</a><a href="${c.url("/compare/")}">${c.t("Compare homes", "قارن المنازل")}</a><a href="${c.url("/buying/")}">${c.t("Buying guide", "دليل الشراء")}</a></div>
    <div><h2>${c.t("Company", "الشركة")}</h2><a href="${c.url("/about/")}">${c.t("About Dhilal", "عن ظلال")}</a><a href="${c.url("/events/")}">${c.t("Events", "الفعاليات")}</a><a href="${c.url("/care/")}">${c.t("Homeowner care", "خدمة الملاك")}</a><a href="${c.url("/contact/")}">${c.t("Contact", "تواصل معنا")}</a><a href="${c.url("/privacy/")}">${c.t("Privacy notice", "إشعار الخصوصية")}</a></div>
    <div><h2>${c.t("Talk to sales", "تحدث إلى المبيعات")}</h2><a href="tel:${cfg.phone}">${icon("phone")} ${c.n(cfg.phone)}</a><a href="${waLink(c, c.t("Hello Dhilal, I'd like to know more about your communities.", "مرحباً ظلال، أرغب بمعرفة المزيد عن مجتمعاتكم."))}" target="_blank" rel="noopener">${icon("whatsapp")} WhatsApp</a><a href="mailto:sales@dhilal.example">${icon("mail")} sales@dhilal.example</a></div>
  </div>
  <p class="legal">${c.t("Sample brand for demonstration. Prices, licence numbers (Wafi, FAL, CR) and availability are examples only. Photos: Unsplash.", "علامة تجريبية للعرض. الأسعار وأرقام التراخيص (وافي، فال، السجل التجاري) والتوفر أمثلة فقط. الصور: Unsplash.")} · ${c.t("FAL", "فال")} ${c.n("1200001234")} · ${c.t("CR", "س.ت")} ${c.n("1010123456")} · © ${c.n(2026)}</p>
</div></footer>
<a class="wa-float" href="${waLink(c, c.t("Hello Dhilal, I have a question.", "مرحباً ظلال، لدي سؤال."))}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon("whatsapp")}</a>
<div id="consent" class="consent-bar" role="region" aria-label="${c.t("Privacy", "الخصوصية")}" hidden><p>${c.t("We only use essential storage to remember your language, saved homes and form entries on this device. No tracking or advertising cookies.", "نستخدم التخزين الضروري فقط لتذكر اللغة والمنازل المحفوظة وبيانات النماذج على جهازك. لا نستخدم ملفات تتبع أو إعلانات.")} <a href="${c.url("/privacy/")}">${c.t("Privacy notice", "إشعار الخصوصية")}</a></p><button class="btn btn-sm btn-primary" data-consent-ok>${c.t("OK", "حسناً")}</button></div>
${r.data ? `<script type="application/json" id="page-data">${JSON.stringify(r.data).replace(/</g, "\\u003c")}</script>` : ""}
<script src="${c.base}/assets/common.js?v=${cfg.v}" defer></script>
<script src="${c.base}/assets/site.js?v=${cfg.v}" defer></script>
</body></html>`;
}
cfg.layout = layout;
cfg.notFound = (c) => ({ title: "Page not found", description: "This page could not be found.", body: `<section class="wrap pad center"><h1 class="h1">Page not found</h1><p>The page you're looking for has moved or no longer exists.</p><p><a class="btn btn-primary" href="${c.url("/")}">Go to the home page</a> <a class="btn btn-line" href="${c.url("/find/")}">Find a home</a></p></section>` });

/* ---------- shared bits ---------- */
const crumbs = (c, items) => `<nav class="crumbs" aria-label="${c.t("Breadcrumb", "مسار التنقل")}"><ol><li><a href="${c.url("/")}">${c.t("Home", "الرئيسية")}</a></li>${items.map(([u, l], i) => `<li>${i === items.length - 1 ? `<span aria-current="page">${l}</span>` : `<a href="${c.url(u)}">${l}</a>`}</li>`).join("")}</ol></nav>`;
const crumbLd = (c, items) => ({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [["/", c.t("Home", "الرئيسية")], ...items].map(([u, l], i) => ({ "@type": "ListItem", position: i + 1, name: l, item: "https://sarwarshah1.github.io" + c.url(u) })) });
const priceTxt = (c, v, from = true) => (v ? `${from ? c.t("From ", "ابتداءً من ") : ""}${c.sar(v)}` : c.t("Prices on registration", "الأسعار للمسجلين"));
const badge = (c, s) => `<span class="badge b-${s}">${c.L(STATUS[s].short)}</span>`;
function commCard(c, m) {
  return `<article class="card ccard"><a href="${c.url(`/communities/${m.slug}/`)}" class="card-link"><div class="ph r43">${img(ph(m.hero), c.L(m.name), { w: 900, sizes: "(max-width:700px) 100vw, 33vw" })}${badge(c, m.status)}</div>
  <div class="card-b"><p class="eyebrow">${c.L(CITIES[m.city])} · ${m.types.map((x) => c.L(TYPES[x])).join(c.t(" & ", " و"))}</p><h3>${c.L(m.name)}</h3><p class="muted">${c.L(m.district)}</p><p class="price">${priceTxt(c, m.from)}</p></div></a>
  <button class="fav" data-fav="c:${m.slug}" aria-pressed="false" aria-label="${c.t("Save", "احفظ")} ${esc(c.L(m.name))}">${icon("heart")}</button></article>`;
}
function designCard(c, d) {
  const m = comm(d.c);
  return `<article class="card dcard"><a href="${c.url(`/homes/${d.slug}/`)}" class="card-link"><div class="ph r32">${img(ph(d.ph[0]), c.L(d.name), { w: 800, sizes: "(max-width:700px) 100vw, 33vw" })}</div>
  <div class="card-b"><p class="eyebrow">${c.L(TYPES[d.type])} · ${c.L(m.name)}</p><h3>${c.L(d.name)}</h3>
  <ul class="specs"><li>${icon("bed")} ${c.n(d.beds)} ${c.t("beds", "غرف")}</li><li>${icon("bath")} ${c.n(d.baths)} ${c.t("baths", "دورات")}</li><li>${icon("area")} ${c.n(d.built)} ${c.t("m²", "م²")}</li></ul>
  <p class="price">${priceTxt(c, d.price)}</p></div></a>
  <button class="fav" data-fav="d:${d.slug}" aria-pressed="false" aria-label="${c.t("Save", "احفظ")} ${esc(c.L(d.name))}">${icon("heart")}</button></article>`;
}
const regBand = (c, ref = "", title, tag = "h2") => `<section class="reg-band" id="register"><div class="wrap reg-grid"><div><p class="eyebrow light">${c.t("Register interest", "سجّل اهتمامك")}</p><${tag} class="h2">${title || c.t("Be first to hear about prices, plots and launch events", "كن أول من يعرف عن الأسعار والقطع وفعاليات الإطلاق")}</${tag}><p>${c.t("A sales adviser replies within one working hour, on WhatsApp if you prefer.", "يرد عليك مستشار المبيعات خلال ساعة عمل، وعبر واتساب إن رغبت.")}</p></div><div class="reg-card">${leadForm(c, { id: "reg-" + (ref || "x").replace(/\W/g, ""), ref, extra: `<div class="fld"><label for="ri-${ref || "x"}">${c.t("Community", "المجتمع")}</label><select id="ri-${ref || "x"}" name="community">${COMMUNITIES.map((m) => `<option ${m.slug === ref ? "selected" : ""} value="${m.slug}">${c.L(m.name)}</option>`).join("")}<option value="any">${c.t("Not sure yet", "لم أقرر بعد")}</option></select></div>` })}</div></div></section>`;

/* ---------- pages ---------- */
S.add("/", (c) => ({
  description: c.t("Shaded family villas and townhouses in Riyadh, Al Khobar and Jeddah. Explore communities, home designs, ready homes and Wafi-licensed off-plan payment plans.", "فلل وتاون هاوس عائلية في الرياض والخبر وجدة. استكشف المجتمعات والتصاميم والمنازل الجاهزة وخطط الدفع على الخارطة المرخصة من وافي."),
  image: P.hero, bodyClass: "home",
  jsonld: [{ "@context": "https://schema.org", "@type": "Organization", name: c.L(cfg.name), url: "https://sarwarshah1.github.io" + c.url("/"), telephone: cfg.phone, areaServed: "SA" }, { "@context": "https://schema.org", "@type": "WebSite", name: c.L(cfg.name), url: "https://sarwarshah1.github.io" + c.url("/") }],
  body: `<section class="hero">
  ${img(P.hero, c.t("Villa with pool at dusk in a Dhilal community", "فيلا ومسبح وقت الغروب في أحد مجتمعات ظلال"), { w: 2200, eager: true, cls: "hero-img" })}
  <div class="hero-in wrap"><h1 class="display">${c.t("Your family's next home starts here", "منزل عائلتك القادم يبدأ هنا")}</h1>
  <form class="search" action="${c.url("/find/")}" role="search" aria-label="${c.t("Find a home", "ابحث عن منزل")}">
    <label><span>${c.t("City", "المدينة")}</span><select name="city"><option value="">${c.t("All cities", "كل المدن")}</option>${Object.entries(CITIES).map(([k, v]) => `<option value="${k}">${c.L(v)}</option>`).join("")}</select></label>
    <label><span>${c.t("Home type", "نوع المنزل")}</span><select name="type"><option value="">${c.t("Any", "الكل")}</option>${Object.entries(TYPES).map(([k, v]) => `<option value="${k}">${c.L(v)}</option>`).join("")}</select></label>
    <label><span>${c.t("Status", "الحالة")}</span><select name="status"><option value="">${c.t("Any", "الكل")}</option>${Object.entries(STATUS).map(([k, v]) => `<option value="${k}">${c.L(v.short)}</option>`).join("")}</select></label>
    <label><span>${c.t("Bedrooms", "غرف النوم")}</span><select name="beds"><option value="">${c.t("Any", "الكل")}</option>${[3, 4, 5].map((b) => `<option value="${b}">${c.n(b)}+</option>`).join("")}</select></label>
    <button class="btn btn-primary" type="submit">${icon("search")} ${c.t("Search homes", "ابحث")}</button></form></div>
  <p class="hero-cap">${c.t("Narjis Gardens, North Riyadh", "حدائق النرجس، شمال الرياض")}</p></section>

<section class="wrap pad"><div class="sec-head center"><h2 class="h2">${c.t("The Dhilal difference", "ما يميز ظلال")}</h2></div>
  <div class="pillars">${[["leaf", "Shade by design", "الظل في التصميم", "Tree-lined streets, shaded walks and courtyards keep homes cooler and streets usable most of the year.", "شوارع مشجرة وممرات مظللة وأفنية تبقي المنازل أبرد والشوارع صالحة للمشي أغلب العام."], ["user", "Built for Saudi families", "مصممة للعائلة السعودية", "Separate majlis entrances, maid's and driver's rooms, and ladies' facilities in every community.", "مداخل مستقلة للمجالس وغرف للخادمة والسائق ومرافق للسيدات في كل مجتمع."], ["shield", "Your money protected", "أموالك محمية", "Every off-plan payment goes into a Wafi escrow account, released only as construction is certified.", "كل دفعة على الخارطة تودع في حساب ضمان وافي، ولا تُصرف إلا مع اعتماد مراحل الإنشاء."], ["key", "Care after handover", "رعاية بعد التسليم", "Structural warranty, a 12-month snagging service and an on-site maintenance team.", "ضمان إنشائي، وخدمة ملاحظات لمدة ١٢ شهراً، وفريق صيانة في الموقع."]].map(([i, e, a, de, da]) => `<div class="pillar">${icon(i, "i lg")}<h3>${c.t(e, a)}</h3><p>${c.t(de, da)}</p></div>`).join("")}</div></section>

<section class="sand pad"><div class="wrap"><div class="sec-head"><div><p class="eyebrow">${c.t("Our communities", "مجتمعاتنا")}</p><h2 class="h2">${c.t("Four neighbourhoods, three cities", "أربعة أحياء في ثلاث مدن")}</h2></div><a class="link" href="${c.url("/communities/")}">${c.t("All communities", "جميع المجتمعات")} ${icon("arrow")}</a></div>
  <div class="grid g4">${COMMUNITIES.map((m) => commCard(c, m)).join("")}</div></div></section>

<section class="wrap pad split">
  <div class="ph r54">${img(P.living, c.t("Living room in The Yasmin show villa", "غرفة المعيشة في فيلا الياسمين النموذجية"), { w: 1200, sizes: "(max-width:900px) 100vw, 50vw" })}</div>
  <div class="split-t"><p class="eyebrow">${c.t("Ready homes", "منازل جاهزة")}</p><h2 class="h2">${c.t("Move in within 30 days", "انتقل خلال ٣٠ يوماً")}</h2><p class="lead">${c.t("Completed townhouses in Qurtuba Courtyards, plus Khobar Grove homes ready next June. See the exact plot, price and handover date.", "تاون هاوس مكتملة في أفنية قرطبة، ومنازل بستان الخبر الجاهزة في يونيو القادم. اطلع على القطعة والسعر وموعد التسليم بدقة.")}</p>
  <ul class="ticks">${[c.t("Sakani support can be used towards the price", "يمكن استخدام دعم سكني في السعر"), c.t("Mortgage pre-approval in 48 hours with partner banks", "موافقة مبدئية على التمويل خلال ٤٨ ساعة مع البنوك الشريكة"), c.t("No agency fees when you buy direct", "لا عمولة وساطة عند الشراء المباشر")].map((x) => `<li>${icon("check")} ${x}</li>`).join("")}</ul>
  <a class="btn btn-primary" href="${c.url("/ready-homes/")}">${c.t("See ready homes", "شاهد المنازل الجاهزة")}</a></div></section>

<section class="navy pad"><div class="wrap"><div class="sec-head"><div><p class="eyebrow light">${c.t("How buying works", "كيف تتم عملية الشراء")}</p><h2 class="h2">${c.t("From first visit to your keys", "من الزيارة الأولى حتى المفاتيح")}</h2></div><a class="link light" href="${c.url("/buying/")}">${c.t("Read the buying guide", "اقرأ دليل الشراء")} ${icon("arrow")}</a></div>
  <ol class="steps">${[["Register and visit", "سجّل وزر", "Book a sales-centre or show-home visit, in person or by video call.", "احجز زيارة لمركز المبيعات أو المنزل النموذجي، حضورياً أو بمكالمة فيديو."], ["Reserve your plot", "احجز قطعتك", "A refundable deposit holds the plot for 14 days.", "عربون مسترد يحفظ القطعة ١٤ يوماً."], ["Sign the Wafi contract", "وقّع عقد وافي", "Payments go to the project escrow account, tied to construction stages.", "تودع الدفعات في حساب ضمان المشروع وترتبط بمراحل الإنشاء."], ["Choose your finishes", "اختر تشطيباتك", "Pick a design palette and options with our interiors studio.", "اختر نمط التصميم والإضافات مع استوديو التصميم الداخلي."], ["Handover", "التسليم", "Inspect with us, receive your keys and title deed.", "عاين المنزل معنا، واستلم المفاتيح والصك."]].map(([e, a, de, da], i) => `<li><span class="num">${c.n(i + 1)}</span><h3>${c.t(e, a)}</h3><p>${c.t(de, da)}</p></li>`).join("")}</ol></div></section>

<section class="wrap pad"><div class="sec-head"><div><p class="eyebrow">${c.t("Home designs", "تصاميم المنازل")}</p><h2 class="h2">${c.t("Designed around how families live", "مصممة حول طريقة عيش العائلة")}</h2></div><a class="link" href="${c.url("/compare/")}">${c.t("Compare designs", "قارن التصاميم")} ${icon("arrow")}</a></div>
  <div class="grid g3">${DESIGNS.filter((d) => ["yasmin", "rihan", "lulu"].includes(d.slug)).map((d) => designCard(c, d)).join("")}</div></section>

<section class="sand pad"><div class="wrap split">
  <div class="split-t"><p class="eyebrow">${c.t("Upcoming events", "الفعاليات القادمة")}</p><h2 class="h2">${c.t("Open days and launches", "أيام مفتوحة وإطلاقات")}</h2>
  <ul class="evlist">${EVENTS.map((e) => { const d = new Date(e.date); return `<li><time datetime="${e.date}"><b>${c.n(d.getUTCDate())}</b>${d.toLocaleString(c.ar ? "ar-SA-u-ca-gregory" : "en-GB", { month: "short", timeZone: "UTC" })}</time><div><h3>${c.L(e.title)}</h3><p class="muted">${c.L(comm(e.c).name)}</p></div></li>`; }).join("")}</ul>
  <a class="btn btn-line" href="${c.url("/events/")}">${c.t("All events", "جميع الفعاليات")}</a></div>
  <div class="ph r54">${img(P.garden, c.t("Shaded seating in the community park", "جلسات مظللة في منتزه المجتمع"), { w: 1200, sizes: "(max-width:900px) 100vw, 50vw" })}</div></div></section>
${regBand(c)}`
}));

/* Communities index */
S.add("/communities/", (c) => ({
  title: c.t("Our communities", "مجتمعاتنا"), description: c.t("Dhilal villa and townhouse communities in Riyadh, Al Khobar and Jeddah, with status, prices and handover dates.", "مجتمعات ظلال للفلل والتاون هاوس في الرياض والخبر وجدة، مع الحالة والأسعار ومواعيد التسليم."), image: P.aerial,
  jsonld: crumbLd(c, [["/communities/", c.t("Communities", "المجتمعات")]]),
  body: `<section class="page-hero">${img(P.aerial, "", { w: 2000, eager: true, cls: "hero-img" })}<div class="wrap">${crumbs(c, [["/communities/", c.t("Communities", "المجتمعات")]])}<h1 class="display">${c.t("Our communities", "مجتمعاتنا")}</h1></div></section>
  <section class="wrap pad"><div class="grid g2 big">${COMMUNITIES.map((m) => `<article class="card wide"><a class="card-link" href="${c.url(`/communities/${m.slug}/`)}"><div class="ph r169">${img(ph(m.hero), c.L(m.name), { w: 1200, sizes: "(max-width:900px) 100vw, 50vw" })}${badge(c, m.status)}</div><div class="card-b"><p class="eyebrow">${c.L(m.district)}</p><h2 class="h3">${c.L(m.name)}</h2><p>${c.L(m.tag)}</p>
  <dl class="facts"><div><dt>${c.t("Homes", "المنازل")}</dt><dd>${c.n(m.homes)}</dd></div><div><dt>${c.t("Price", "السعر")}</dt><dd>${priceTxt(c, m.from)}</dd></div><div><dt>${c.t("Handover", "التسليم")}</dt><dd>${c.L(m.handover)}</dd></div></dl></div></a>
  <button class="fav" data-fav="c:${m.slug}" aria-pressed="false" aria-label="${c.t("Save", "احفظ")} ${esc(c.L(m.name))}">${icon("heart")}</button></article>`).join("")}</div></section>${regBand(c)}`
}));

/* Find a home */
S.add("/find/", (c) => {
  const items = DESIGNS.map((d) => { const m = comm(d.c); return { slug: d.slug, c: m.slug, city: m.city, type: d.type, status: m.status, beds: d.beds, price: d.price || 0, built: d.built }; });
  return {
    title: c.t("Find a home", "ابحث عن منزل"), description: c.t("Search Dhilal homes by city, type, status, bedrooms and budget.", "ابحث في منازل ظلال حسب المدينة والنوع والحالة وعدد الغرف والميزانية."),
    jsonld: crumbLd(c, [["/find/", c.t("Find a home", "ابحث عن منزل")]]), data: { items },
    body: `<section class="wrap pad-s">${crumbs(c, [["/find/", c.t("Find a home", "ابحث عن منزل")]])}<h1 class="h1">${c.t("Find a home", "ابحث عن منزل")}</h1></section>
  <section class="wrap finder"><form class="filters" id="filters" aria-label="${c.t("Filters", "الفلاتر")}">
    <fieldset><legend>${c.t("City", "المدينة")}</legend>${Object.entries(CITIES).map(([k, v]) => `<label class="chk"><input type="checkbox" name="city" value="${k}"> ${c.L(v)}</label>`).join("")}</fieldset>
    <fieldset><legend>${c.t("Home type", "نوع المنزل")}</legend>${Object.entries(TYPES).map(([k, v]) => `<label class="chk"><input type="checkbox" name="type" value="${k}"> ${c.L(v)}</label>`).join("")}</fieldset>
    <fieldset><legend>${c.t("Status", "الحالة")}</legend>${Object.entries(STATUS).map(([k, v]) => `<label class="chk"><input type="checkbox" name="status" value="${k}"> ${c.L(v.short)}</label>`).join("")}</fieldset>
    <fieldset><legend>${c.t("Bedrooms", "غرف النوم")}</legend><div class="seg">${["", 3, 4, 5].map((b) => `<label><input type="radio" name="beds" value="${b}" ${b === "" ? "checked" : ""}><span>${b ? c.n(b) + "+" : c.t("Any", "الكل")}</span></label>`).join("")}</div></fieldset>
    <fieldset><legend>${c.t("Maximum budget", "الحد الأعلى للميزانية")}</legend><label class="sr" for="maxp">${c.t("Maximum budget", "الحد الأعلى للميزانية")}</label><input type="range" id="maxp" name="max" min="1300000" max="3500000" step="50000" value="3500000"><output for="maxp" id="maxp-out"></output></fieldset>
    <button type="reset" class="btn btn-line btn-sm">${c.t("Clear filters", "مسح الفلاتر")}</button></form>
  <div class="results"><div class="res-head"><p id="res-count" role="status" aria-live="polite"></p><label class="sort">${c.t("Sort", "الترتيب")} <select id="sort"><option value="price">${c.t("Price: low to high", "السعر: من الأقل")}</option><option value="-price">${c.t("Price: high to low", "السعر: من الأعلى")}</option><option value="-built">${c.t("Largest first", "الأكبر أولاً")}</option></select></label></div>
    <div class="grid g2" id="res">${DESIGNS.map((d) => `<div data-item="${d.slug}">${designCard(c, d)}</div>`).join("")}</div>
    <div class="empty" id="res-empty" hidden><h2 class="h3">${c.t("No homes match these filters", "لا توجد منازل تطابق هذه الفلاتر")}</h2><p>${c.t("Try a higher budget or another city. Obhur Shores in Jeddah has prices on registration.", "جرّب ميزانية أعلى أو مدينة أخرى. أسعار شواطئ أبحر في جدة متاحة للمسجلين.")}</p><button class="btn btn-line" type="button" data-clear>${c.t("Clear filters", "مسح الفلاتر")}</button></div></div></section>`
  };
});

/* Community pages */
for (const m of COMMUNITIES) {
  S.add(`/communities/${m.slug}/`, (c) => {
    const ds = designsOf(m.slug), ready = READY.filter((r) => comm(DESIGNS.find((d) => d.slug === r.d).c).slug === m.slug);
    const sec = [["overview", c.t("Overview", "نظرة عامة")], ready.length && ["ready", c.t("Ready homes", "منازل جاهزة")], ["designs", c.t("Home designs", "التصاميم")], ["gallery", c.t("Gallery", "الصور")], m.lots && ["siteplan", c.t("Site plan", "المخطط")], m.progressLog && ["progress", c.t("Progress", "سير العمل")], ["payment", c.t("Payment plan", "خطة الدفع")], ["location", c.t("Location", "الموقع")], ["register", c.t("Register", "سجّل")]].filter(Boolean);
    const lots = [...(m.lots || "")].map((s, i) => ({ n: i + 1, s, d: ds[i % ds.length].slug }));
    return {
      title: c.L(m.name) + " · " + c.L(m.district), description: c.L(m.tag), image: ph(m.hero),
      jsonld: [crumbLd(c, [["/communities/", c.t("Communities", "المجتمعات")], [`/communities/${m.slug}/`, c.L(m.name)]]), { "@context": "https://schema.org", "@type": "Residence", name: c.L(m.name), address: { "@type": "PostalAddress", addressLocality: c.L(CITIES[m.city]), addressCountry: "SA" }, description: c.L(m.intro) }],
      data: { lots, designs: Object.fromEntries(ds.map((d) => [d.slug, { name: c.L(d.name), price: d.price, beds: d.beds, built: d.built, url: c.url(`/homes/${d.slug}/`) }])), community: m.slug, name: c.L(m.name) },
      body: `<section class="c-hero">${img(ph(m.hero), c.L(m.name), { w: 2200, eager: true, cls: "hero-img" })}<div class="wrap c-hero-in">${crumbs(c, [["/communities/", c.t("Communities", "المجتمعات")], [`/communities/${m.slug}/`, c.L(m.name)]])}
      <div class="c-hero-t"><p>${c.L(m.district)} · ${c.L(STATUS[m.status])}</p><h1 class="display">${c.L(m.name)}</h1><p class="c-price">${m.from ? `${c.t("Homes from", "المنازل ابتداءً من")} <b>${c.sar(m.from)}</b>` : c.t("Prices released to registered buyers first", "تُعلن الأسعار للمسجلين أولاً")}</p></div>
      <div class="c-hero-b"><a class="btn btn-white" href="#register">${c.t("Register interest", "سجّل اهتمامك")}</a><a class="btn btn-outline-white" href="${c.url("/contact/")}?visit=${m.slug}">${c.t("Book a visit", "احجز زيارة")}</a><button class="fav light" data-fav="c:${m.slug}" aria-pressed="false" aria-label="${c.t("Save this community", "احفظ هذا المجتمع")}">${icon("heart")}</button></div></div></section>
  <div class="contact-bar"><div class="wrap cb">
    <div class="cb-i">${icon("chat", "i lg")}<div><b>${c.t("Online sales team", "فريق المبيعات الإلكتروني")}</b><span>${c.t("Replies in under an hour", "الرد خلال أقل من ساعة")}</span></div><div class="pills"><a href="${waLink(c, `${c.t("Hello, I'm interested in", "مرحباً، أنا مهتم بـ")} ${c.L(m.name)}`)}" target="_blank" rel="noopener">WhatsApp</a><a href="tel:${cfg.phone}">${c.t("Call", "اتصال")}</a><a href="mailto:sales@dhilal.example?subject=${encodeURIComponent(c.L(m.name))}">${c.t("Email", "بريد")}</a></div></div>
    <div class="cb-i">${icon("pin", "i lg")}<div><b>${c.L(m.sales)}</b><span>${c.L(m.hours)}</span></div><div class="pills"><a href="#location">${c.t("Directions", "الاتجاهات")}</a><a href="${c.url("/contact/")}?visit=${m.slug}">${c.t("Book a visit", "احجز زيارة")}</a></div></div></div></div>
  <nav class="subnav" aria-label="${c.t("On this page", "في هذه الصفحة")}"><div class="wrap"><ul>${sec.map(([id, l]) => `<li><a href="#${id}">${l}</a></li>`).join("")}</ul></div></nav>

  <section id="overview" class="wrap pad center-col"><p class="eyebrow">${c.L(m.name)}</p><h2 class="h2">${c.t("Home starts here", "هنا يبدأ المنزل")}</h2><p class="lead">${c.L(m.intro)}</p>
    <div class="table-wrap"><table class="coll"><caption class="sr">${c.t("Home designs in this community", "تصاميم المنازل في هذا المجتمع")}</caption><thead><tr><th scope="col">${c.t("Design", "التصميم")}</th><th scope="col">${c.t("Type", "النوع")}</th><th scope="col">${c.t("Bedrooms", "الغرف")}</th><th scope="col">${c.t("Built area", "مساحة البناء")}</th><th scope="col">${c.t("Price", "السعر")}</th></tr></thead><tbody>${ds.map((d) => `<tr><th scope="row"><a href="${c.url(`/homes/${d.slug}/`)}">${c.L(d.name)}</a></th><td>${c.L(TYPES[d.type])}</td><td>${c.n(d.beds)}</td><td>${c.n(d.built)} ${c.t("m²", "م²")}</td><td>${priceTxt(c, d.price)}</td></tr>`).join("")}</tbody></table></div>
    <ul class="amen">${m.amenities.map((a) => `<li>${icon("check")} ${c.L(AMEN[a])}</li>`).join("")}</ul>
    ${m.wafi ? `<aside class="wafi" aria-label="${c.t("Buyer protection", "حماية المشتري")}">${icon("shield", "i lg")}<div><b>${c.t("Wafi-licensed off-plan project", "مشروع على الخارطة مرخص من وافي")}</b><p>${c.t("Licence", "الترخيص")} ${c.n(m.wafi)} · ${c.L(m.escrow)}. ${c.t("Your payments are released to the developer only after REGA-approved engineering reports confirm each stage.", "لا تُصرف دفعاتك للمطور إلا بعد تقارير هندسية معتمدة من الهيئة تؤكد إنجاز كل مرحلة.")} <a href="${c.url("/buying/off-plan-wafi/")}">${c.t("How Wafi protects you", "كيف يحميك وافي")}</a></p></div><div class="qr" aria-hidden="true"><span>REGA</span><span>QR</span></div></aside>` : ""}
  </section>

  ${ready.length ? `<section id="ready" class="sand pad"><div class="wrap"><h2 class="h2">${c.t("Ready homes", "منازل جاهزة")}</h2><div class="table-wrap"><table class="coll"><thead><tr><th scope="col">${c.t("Plot", "القطعة")}</th><th scope="col">${c.t("Design", "التصميم")}</th><th scope="col">${c.t("Availability", "التوفر")}</th><th scope="col">${c.t("Price", "السعر")}</th><th><span class="sr">${c.t("Action", "إجراء")}</span></th></tr></thead><tbody>${ready.map((r) => { const d = DESIGNS.find((x) => x.slug === r.d); return `<tr><th scope="row">${c.n(r.id)}</th><td><a href="${c.url(`/homes/${d.slug}/`)}">${c.L(d.name)}</a> · ${c.n(d.beds)} ${c.t("beds", "غرف")}</td><td>${c.L(r.when)}</td><td>${c.sar(r.price)}</td><td><a class="btn btn-sm btn-primary" href="${c.url("/register/")}?ref=${r.id}">${c.t("Enquire", "استفسر")}</a></td></tr>`; }).join("")}</tbody></table></div></div></section>` : ""}

  <section id="designs" class="wrap pad"><div class="sec-head"><div><p class="eyebrow">${c.t("Designer-planned", "تصاميم مدروسة")}</p><h2 class="h2">${c.t("Home designs", "تصاميم المنازل")}</h2></div><a class="link" href="${c.url("/compare/")}">${c.t("Compare", "قارن")} ${icon("arrow")}</a></div><div class="grid g3">${ds.map((d) => designCard(c, d)).join("")}</div></section>

  <section id="gallery" class="pad sand"><div class="wrap"><h2 class="h2">${c.t("Gallery", "الصور")}</h2><div class="gallery">${m.photos.map((k, i) => `<button class="g-item${i === 0 ? " g-big" : ""}" data-open="lightbox" data-src="${imgUrl(ph(k), 1800)}" aria-label="${c.t("Open photo", "افتح الصورة")} ${c.n(i + 1)}">${img(ph(k), "", { w: i === 0 ? 1400 : 700, sizes: i === 0 ? "(max-width:900px) 100vw, 60vw" : "(max-width:900px) 50vw, 25vw" })}</button>`).join("")}</div><p class="muted small">${c.t("Photography is illustrative.", "الصور توضيحية.")}</p></div></section>

  ${m.lots ? `<section id="siteplan" class="wrap pad"><div class="sec-head"><div><p class="eyebrow">${c.t("Live availability", "التوفر المباشر")}</p><h2 class="h2">${c.t("Site plan", "مخطط الموقع")}</h2></div><div class="legend"><span><i class="sw a"></i>${c.t("Available", "متاحة")}</span><span><i class="sw r"></i>${c.t("Reserved", "محجوزة")}</span><span><i class="sw s"></i>${c.t("Sold", "مباعة")}</span></div></div>
    <div class="siteplan"><div class="sp-map" id="sp-map" role="group" aria-label="${c.t("Plots", "القطع")}"></div><aside class="sp-panel" id="sp-panel" aria-live="polite"><p class="muted">${c.t("Select an available plot to see its home design, price and reserve it.", "اختر قطعة متاحة لعرض تصميمها وسعرها وحجزها.")}</p></aside></div></section>` : ""}

  ${m.progressLog ? `<section id="progress" class="navy pad"><div class="wrap"><div class="sec-head"><div><p class="eyebrow light">${c.t("Construction progress", "سير الإنشاء")}</p><h2 class="h2">${c.n(m.progress)}% ${c.t("complete", "مكتمل")}</h2></div><p>${c.t("Handover", "التسليم")} ${c.L(m.handover)}</p></div>
    <div class="bar" role="progressbar" aria-valuenow="${m.progress}" aria-valuemin="0" aria-valuemax="100" aria-label="${c.t("Construction progress", "نسبة الإنجاز")}"><span style="width:${m.progress}%"></span></div>
    <ol class="timeline">${m.progressLog.map((p) => `<li class="${p.done ? "done" : ""}">${p.ph ? `<div class="ph r43">${img(ph(p.ph), "", { w: 600, sizes: "(max-width:700px) 100vw, 20vw" })}</div>` : `<div class="ph r43 tbd"><span>${c.t("Upcoming", "قادم")}</span></div>`}<time datetime="${p.d}">${new Date(p.d + "-01").toLocaleString(c.ar ? "ar-SA-u-ca-gregory" : "en-GB", { month: "long", year: "numeric" })}</time><p>${c.L(p)}</p></li>`).join("")}</ol></div></section>` : ""}

  <section id="payment" class="wrap pad"><h2 class="h2">${c.t("Payment plan", "خطة الدفع")}</h2>
  ${m.plan ? `<p class="lead">${c.t("Pay in five stages, each linked to certified construction progress. Example for the entry home at", "ادفع على خمس مراحل، كل منها مرتبطة بإنجاز إنشائي معتمد. مثال لأقل سعر")} ${c.sar(m.from)}.</p>
    <ol class="plan">${m.plan.map((s) => `<li><span class="pct">${c.n(s.pct)}%</span><span class="pl">${c.L(s)}</span><span class="amt">${c.sar(m.from * s.pct / 100)}</span></li>`).join("")}</ol>` : m.status === "ready" ? `<div class="grid g3 payopts">${[["Cash", "نقداً", "Pay in full and receive keys and title deed on transfer.", "ادفع كامل المبلغ واستلم المفاتيح والصك عند الإفراغ."], ["Mortgage", "تمويل عقاري", "Finance up to 90% with partner banks. Pre-approval in 48 hours.", "تمويل حتى ٩٠٪ مع البنوك الشريكة. موافقة مبدئية خلال ٤٨ ساعة."], ["Sakani support", "دعم سكني", "Eligible Saudi families can apply their Sakani support to the price.", "يمكن للعائلات السعودية المستحقة استخدام دعم سكني في السعر."]].map(([e, a, de, da]) => `<div class="pcard"><h3>${c.t(e, a)}</h3><p>${c.t(de, da)}</p></div>`).join("")}</div>` : `<p class="lead">${c.t("Launch payment plans will be shared with registered buyers before public release.", "ستُشارك خطط الدفع للإطلاق مع المسجلين قبل الطرح العام.")}</p>`}
  <p><a class="btn btn-line" href="${c.url("/calculator/")}${m.from ? `?price=${m.from}` : ""}">${c.t("Work out monthly payments", "احسب الدفعات الشهرية")}</a></p></section>

  <section id="location" class="sand pad"><div class="wrap split"><div class="split-t"><h2 class="h2">${c.t("Location", "الموقع")}</h2><p class="lead">${c.L(m.district)}</p><ul class="near">${m.nearby.map(([n, min]) => `<li><span>${c.L(n)}</span><b>${c.n(min)} ${c.t("min", "د")}</b></li>`).join("")}</ul></div>
    <div class="map" role="img" aria-label="${c.t("Map of", "خريطة")} ${esc(c.L(m.name))}"><svg viewBox="0 0 400 300" aria-hidden="true"><rect width="400" height="300" fill="#E9E3D8"/><path d="M0 210 C120 190 220 240 400 200" stroke="#fff" stroke-width="14" fill="none"/><path d="M150 0 L190 300" stroke="#fff" stroke-width="10"/><path d="M0 90 L400 120" stroke="#fff" stroke-width="6"/><rect x="215" y="120" width="90" height="60" rx="6" fill="#0C223F" opacity=".12" stroke="#0C223F"/><circle cx="260" cy="150" r="9" fill="#0C223F"/></svg><p class="small">${c.t("Indicative map. Exact pin shared on WhatsApp.", "خريطة توضيحية. يُرسل الموقع الدقيق عبر واتساب.")}</p></div></div></section>
  ${regBand(c, m.slug, c.t(`Register for ${c.L(m.name)}`, `سجّل اهتمامك في ${c.L(m.name)}`))}
  <dialog id="lightbox" class="lightbox" aria-label="${c.t("Photo", "صورة")}"><button class="x" data-close aria-label="${c.t("Close", "إغلاق")}">${icon("close")}</button><img alt=""></dialog>
  <dialog id="reserve" class="dlg" aria-labelledby="reserve-h"><button class="x" data-close aria-label="${c.t("Close", "إغلاق")}">${icon("close")}</button><h2 id="reserve-h" class="h3">${c.t("Reserve plot", "حجز القطعة")} <span data-plot-no></span></h2><p class="muted">${c.t("A refundable SAR 10,000 deposit holds the plot for 14 days while we prepare your Wafi contract. This demo takes no payment.", "عربون مسترد بقيمة ١٠٬٠٠٠ ريال يحفظ القطعة ١٤ يوماً حتى تجهيز عقد وافي. هذا عرض تجريبي ولا يتم أي دفع.")}</p>${leadForm(c, { id: "rsv", kind: "reserve", ref: m.slug, compact: true, submit: c.t("Request reservation", "اطلب الحجز") })}</dialog>`
    };
  });
}
export { S, cfg, comm, designsOf, ph, waLink, layout, crumbs, crumbLd, priceTxt, designCard, commCard, regBand, badge };
