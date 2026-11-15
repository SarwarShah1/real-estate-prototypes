/* =========================================================
   SAKAN REALTY prototype — app logic (no dependencies)
   ========================================================= */
const S = {
  lang: "ar", favs: new Set(), cmp: [], leads: [], rentMonthly: false, mapSel: null, heroTab: "sale",
  f: { purpose: "", cat: "", type: "", district: "", min: "", max: "", beds: "", areaMin: "", tenant: "", amen: [], sort: "new", q: "" }
};
const SAMPLE_LEADS = [
  { kind: "viewing", name: "عبدالله ق.", phone: "05•••••321", ref: "RY1024", note: "السبت 5:00 م", t: "2026-11-13 18:42", sample: true },
  { kind: "owner",   name: "أم سلطان",   phone: "05•••••878", ref: "فيلا – الياسمين", note: "طلب تقييم مجاني", t: "2026-11-13 11:05", sample: true },
  { kind: "request", name: "James W.",   phone: "05•••••410", ref: "Compound villa, 4 bed, rent", note: "Relocating in January", t: "2026-11-12 09:17", sample: true }
];

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const T = (ar, en) => (S.lang === "ar" ? ar : en);
const L = (o) => (o ? o[S.lang] : "");
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmt = (n) => Math.round(n).toLocaleString("en-US");
const num = (n) => `<span class="num">${n}</span>`;
const money = (n) => `${num(fmt(n))} ${T("ر.س", "SAR")}`;
const arrow = () => T("←", "→");
const dist = (id) => DISTRICTS.find((d) => d.id === id);
const byId = (id) => LISTINGS.find((l) => l.id === id);
const title = (l) => T(l.titleAr, l.titleEn);
const isCom = (l) => ["office", "shop", "building"].includes(l.type);
const wa = (msg, n = BRAND.whatsapp) => `https://wa.me/${n}?text=${encodeURIComponent(msg)}`;
const short = (n) => (n >= 1e6 ? (n / 1e6).toFixed(n % 1e6 ? 2 : 0).replace(/0$/, "") + "M" : Math.round(n / 1000) + "K");
const route = () => (location.hash.replace("#", "") || "home");
const go = (r) => { if (route() === r) render(); else location.hash = r; };

function save() { try { localStorage.setItem("sakan-demo", JSON.stringify({ lang: S.lang, favs: [...S.favs], cmp: S.cmp, leads: S.leads })); } catch (e) {} }
function load() { try { const d = JSON.parse(localStorage.getItem("sakan-demo") || "{}"); if (d.lang) S.lang = d.lang; S.favs = new Set(d.favs || []); S.cmp = d.cmp || []; S.leads = d.leads || []; } catch (e) {} }
function toast(m) { const t = $("#toast"); t.textContent = m; t.classList.add("on"); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("on"), 2600); }

function priceHTML(l) {
  if (l.purpose === "sale") return `${money(l.price)}`;
  return S.rentMonthly ? `${money(l.price / 12)} <small>${T("/ شهرياً", "/ month")}</small>` : `${money(l.price)} <small>${T("/ سنوياً", "/ year")}</small>`;
}
function specs(l) {
  const a = [];
  if (l.beds) a.push(`🛏 ${num(l.beds)} ${T("غرف", "beds")}`);
  if (l.baths) a.push(`🚿 ${num(l.baths)} ${T("حمامات", "baths")}`);
  a.push(`📐 ${num(fmt(l.area))} ${T("م²", "m²")}`);
  if (l.type === "land") a.push(`↔ ${T("شارع", "street")} ${num(l.street)}${T("م", " m")}`);
  return a.map((x) => `<span>${x}</span>`).join("");
}
function card(l) {
  return `<article class="card">
    <button class="fav ${S.favs.has(l.id) ? "on" : ""}" data-act="fav" data-id="${l.id}" aria-label="${T("حفظ في المفضلة", "Save to favourites")}" aria-pressed="${S.favs.has(l.id)}">${S.favs.has(l.id) ? "♥" : "♡"}</button>
    <a class="card-img" href="#p-${l.id}" aria-label="${esc(title(l))}">
      <div class="tags"><span class="tag ${l.purpose}">${l.purpose === "sale" ? T("للبيع", "For sale") : T("للإيجار", "For rent")}</span>${l.isNew ? `<span class="tag new">${T("جديد", "New")}</span>` : ""}</div>
      ${art(l.art, l.tod)}
    </a>
    <div class="card-b">
      <div class="price">${priceHTML(l)}</div>
      <h3><a href="#p-${l.id}">${esc(title(l))}</a></h3>
      <div class="loc">📍 ${L(dist(l.district))}، ${T("الرياض", "Riyadh")} · ${L(TYPES[l.type])}</div>
      <div class="specs">${specs(l)}</div>
      <div class="card-f">
        <span class="lic">${T("ترخيص الإعلان", "Ad licence")} ${num(l.adLicense)}</span>
        <label><input type="checkbox" data-act="cmp" data-id="${l.id}" ${S.cmp.includes(l.id) ? "checked" : ""}> ${T("قارن", "Compare")}</label>
      </div>
    </div></article>`;
}
const opt = (v, label, sel) => `<option value="${v}" ${String(sel) === String(v) ? "selected" : ""}>${label}</option>`;
const typeOpts = (sel) => opt("", T("كل الأنواع", "All types"), sel) + Object.entries(TYPES).map(([k, v]) => opt(k, L(v), sel)).join("");
const distOpts = (sel) => opt("", T("كل الأحياء", "All districts"), sel) + DISTRICTS.map((d) => opt(d.id, L(d), sel)).join("");
const field = (label, inner) => `<label class="f"><span>${label}</span>${inner}</label>`;
const leadFields = (extra = "") => `
  ${field(T("الاسم", "Name"), `<input name="name" required autocomplete="name">`)}
  ${field(T("رقم الجوال", "Mobile number"), `<input name="phone" required inputmode="tel" dir="ltr" placeholder="05XXXXXXXX" autocomplete="tel">`)}
  ${extra}`;

/* ---------- chrome ---------- */
const NAV = [["home", "الرئيسية", "Home"], ["listings", "العقارات", "Properties"], ["map", "الخريطة", "Map"], ["projects", "المشاريع", "Projects"], ["services", "خدماتنا", "Services"], ["tools", "الحاسبات", "Calculators"], ["contact", "تواصل معنا", "Contact"]];
const WA_ICON = `<svg viewBox="0 0 32 32" fill="#fff" aria-hidden="true"><path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.8 2 6.800L3 29l6.700-2c1.900 1 4 1.600 6.300 1.600 7.200 0 13-5.700 13-12.800S23.200 3 16 3zm0 23.300c-2 0-3.900-.6-5.500-1.600l-.4-.2-4 1.200 1.200-3.800-.3-.4a10.300 10.300 0 0 1-1.700-5.700C5.300 10 10.100 5.300 16 5.300S26.700 10 26.700 15.800 21.900 26.300 16 26.300zm5.900-7.800c-.3-.2-1.900-.9-2.200-1s-.5-.2-.7.2-.8 1-1 1.200-.4.2-.7 0a8.700 8.700 0 0 1-2.600-1.600 9.600 9.600 0 0 1-1.800-2.200c-.2-.3 0-.5.100-.7l.5-.6c.2-.2.2-.3.3-.5s0-.4 0-.6l-1-2.400c-.3-.6-.5-.5-.7-.5h-.6a1.200 1.200 0 0 0-.9.400 3.600 3.600 0 0 0-1.100 2.700c0 1.600 1.200 3.100 1.300 3.300s2.300 3.500 5.600 4.900c.8.3 1.400.5 1.900.7.8.2 1.500.2 2.100.1.600-.1 1.900-.8 2.200-1.500s.3-1.400.2-1.500-.3-.2-.6-.4z"/></svg>`;

function chrome() {
  const r = route();
  $("#demo-bar").innerHTML = T(`<b>نموذج تجريبي</b> — العلامة والأرقام والتراخيص والعقارات كلها أمثلة توضيحية`, `<b>Demo prototype</b> — brand, numbers, licences and listings are all sample content`);
  $("#header").innerHTML = `<div class="wrap hd">
    <a class="logo" href="#home"><i><svg viewBox="0 0 24 24" fill="none" stroke="#d9b272" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11 12 4l9 7"/><path d="M6 10v9h12v-9"/><path d="M12 19v-5"/></svg></i>
      <span>${T(BRAND.nameAr, BRAND.nameEn)}<small>${T("وساطة وتسويق عقاري", "Brokerage & marketing")}</small></span></a>
    <nav class="nav" id="nav" aria-label="Main">${NAV.map(([k, a, e]) => `<a href="#${k}" class="${r === k || (k === "listings" && r.startsWith("p-")) ? "on" : ""}">${T(a, e)}</a>`).join("")}</nav>
    <div class="hd-tools">
      <a class="icon-btn" href="#favorites" aria-label="${T("المفضلة", "Favourites")}">♡${S.favs.size ? `<span class="badge">${S.favs.size}</span>` : ""}</a>
      <button class="lang" data-act="lang" aria-label="Switch language">${T("English", "العربية")}</button>
      <a class="btn btn-g btn-sm" href="#list-property">${T("اعرض عقارك", "List your property")}</a>
      <button class="icon-btn burger" data-act="burger" aria-label="Menu">☰</button>
    </div></div>`;
  $("#footer").innerHTML = `<div class="wrap">
    <div class="ft">
      <div><div class="logo" style="color:#fff">${T(BRAND.nameAr, BRAND.nameEn)}</div>
        <p style="margin-top:10px">${T("مكتب وساطة عقارية مرخّص في الرياض: بيع، إيجار، إدارة أملاك وتسويق مشاريع.", "A licensed Riyadh brokerage: sales, leasing, property management and project marketing.")}</p>
        <div class="licrow"><span>${T("رخصة فال", "FAL licence")} ${num(BRAND.fal)}</span><span>${T("سجل تجاري", "CR")} ${num(BRAND.cr)}</span><span>${T("الرقم الضريبي", "VAT")} ${num(BRAND.vat)}</span></div></div>
      <div><h4>${T("روابط سريعة", "Quick links")}</h4>${NAV.slice(1, 6).map(([k, a, e]) => `<a href="#${k}">${T(a, e)}</a>`).join("")}<a href="#about">${T("من نحن", "About us")}</a></div>
      <div><h4>${T("للملاك والمكاتب", "Owners & staff")}</h4><a href="#list-property">${T("اعرض عقارك", "List your property")}</a><a href="#services">${T("إدارة الأملاك", "Property management")}</a><a href="#compare">${T("المقارنة", "Compare")}</a><a href="#dashboard">${T("لوحة المكتب (تجريبي)", "Agency dashboard (demo)")}</a></div>
      <div><h4>${T("تواصل", "Contact")}</h4><a href="tel:+${BRAND.phoneRaw}">${num(BRAND.phone)}</a><a href="mailto:${BRAND.email}">${BRAND.email}</a><p style="margin:6px 0 0">${T(BRAND.addressAr, BRAND.addressEn)}<br>${T(BRAND.hoursAr, BRAND.hoursEn)}</p></div>
    </div>
    <div class="warn" style="margin-top:26px;background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.18);color:#e9d9b8">⚠️ ${T("تنبيه: لا نطلب أي عربون أو تحويل عبر روابط أو حسابات شخصية. جميع المدفوعات تتم عبر الحساب الرسمي للمكتب وعقود موثقة.", "Fraud notice: we never ask for deposits through links or personal accounts. All payments go to the office's official account under documented contracts.")}</div>
    <div class="copy"><span>© ${num(2026)} ${T(BRAND.nameAr, BRAND.nameEn)} — ${T("نموذج تجريبي", "demo prototype")}</span><span>${T("سياسة الخصوصية · الشروط والأحكام", "Privacy policy · Terms")}</span></div></div>`;
  $("#floaters").innerHTML = `
    <a class="wa-float" href="${wa(T("السلام عليكم، أرغب بالاستفسار عن عقار", "Hello, I'd like to ask about a property"))}" target="_blank" rel="noopener" aria-label="WhatsApp">${WA_ICON}</a>
    ${S.cmp.length && r !== "compare" ? `<div class="cmp-bar"><span>${T("للمقارنة", "To compare")}: ${num(S.cmp.length)}/3</span><span style="display:flex;gap:8px"><button class="btn btn-sm btn-l" data-act="cmp-clear">${T("مسح", "Clear")}</button><a class="btn btn-sm btn-g" href="#compare">${T("قارن الآن", "Compare now")}</a></span></div>` : ""}
    <div class="mbar"><a class="btn-o btn" href="tel:+${BRAND.phoneRaw}">📞 ${T("اتصال", "Call")}</a><a class="btn btn-w" href="${wa(T("السلام عليكم", "Hello"))}" target="_blank" rel="noopener">${T("واتساب", "WhatsApp")}</a><button class="btn btn-p" data-act="callback">${T("اطلب عقارك", "Request")}</button></div>`;
}

/* ---------- pages ---------- */
function pageHome() {
  const feat = LISTINGS.filter((l) => l.featured).slice(0, 6);
  const counts = (id) => LISTINGS.filter((l) => l.district === id).length;
  const top = [...DISTRICTS].sort((a, b) => counts(b.id) - counts(a.id)).slice(0, 8);
  return `
  <section class="hero"><div class="hero-art">${art("villa", 3)}</div><div class="wrap">
    <div class="eyebrow">${T("وسيط عقاري مرخّص · الرياض", "Licensed brokerage · Riyadh")}</div>
    <h1>${T("عقارك القادم في الرياض.. بثقة ووضوح", "Find your next Riyadh property with confidence")}</h1>
    <p class="lead">${T("أسعار معلنة، تراخيص إعلان موثقة لكل عقار، ورد خلال دقائق على الواتساب. بيع، إيجار، ومشاريع على الخارطة.", "Published prices, a verified advertising licence on every listing, and replies within minutes on WhatsApp. Sales, rentals and off-plan projects.")}</p>
  </div></section>
  <div class="wrap search"><div class="search-card">
    <div class="tabs" role="tablist">${[["sale", "شراء", "Buy"], ["rent", "إيجار", "Rent"], ["com", "تجاري", "Commercial"]].map(([k, a, e]) => `<button role="tab" aria-selected="${S.heroTab === k}" class="${S.heroTab === k ? "on" : ""}" data-act="herotab" data-v="${k}">${T(a, e)}</button>`).join("")}</div>
    <form class="search-grid" data-form="search">
      ${field(T("نوع العقار", "Property type"), `<select name="type">${typeOpts("")}</select>`)}
      ${field(T("الحي", "District"), `<select name="district">${distOpts("")}</select>`)}
      ${field(T("الغرف", "Bedrooms"), `<select name="beds">${opt("", T("أي عدد", "Any"), "")}${[1, 2, 3, 4, 5].map((n) => opt(n, n + "+", "")).join("")}</select>`)}
      ${field(T("أقصى سعر (ر.س)", "Max price (SAR)"), `<input name="max" inputmode="numeric" dir="ltr" placeholder="${S.heroTab === "rent" ? "80,000" : "2,000,000"}">`)}
      <button class="btn btn-p" type="submit">🔍 ${T("ابحث", "Search")}</button>
    </form>
    <div class="chips">${[["villa", "sale", "فلل للبيع", "Villas for sale"], ["apartment", "rent", "شقق للإيجار", "Apartments for rent"], ["land", "sale", "أراضي", "Land"], ["compound", "rent", "كمبوندات", "Compounds"], ["office", "rent", "مكاتب", "Offices"]].map(([t, p, a, e]) => `<button class="chip" data-act="quick" data-type="${t}" data-purpose="${p}">${T(a, e)}</button>`).join("")}</div>
  </div>
  <div class="trust">
    <div><i>🪪</i><span><b>${T("رخصة فال", "FAL licensed")} ${num(BRAND.fal)}</b><small>${T("الهيئة العامة للعقار", "Real Estate General Authority")}</small></span></div>
    <div><i>✅</i><span><b>${T("ترخيص إعلان لكل عقار", "Ad licence on every listing")}</b><small>${T("رقم الترخيص ورمز QR ظاهر", "Number and QR shown")}</small></span></div>
    <div><i>📄</i><span><b>${T("عقود موثقة في إيجار", "Ejar-registered leases")}</b><small>${T("دفعات شهرية أو سنوية", "Monthly or yearly payments")}</small></span></div>
    <div><i>⚡</i><span><b>${T("رد خلال ١٠ دقائق", "Reply in 10 minutes")}</b><small>${T("واتساب · اتصال · نموذج", "WhatsApp · call · form")}</small></span></div>
  </div></div>

  <section class="s"><div class="wrap">
    <div class="s-head"><div><h2>${T("عقارات مميزة", "Featured properties")}</h2><p>${T("مختارة من فريقنا هذا الأسبوع", "Hand-picked by our team this week")}</p></div><a class="more" href="#listings">${T("كل العقارات", "All properties")} ${arrow()}</a></div>
    <div class="grid">${feat.map(card).join("")}</div></div></section>

  <section class="s alt"><div class="wrap">
    <div class="s-head"><div><h2>${T("تصفح حسب الحي", "Browse by district")}</h2><p>${T("أكثر أحياء الرياض طلباً", "Riyadh's most requested neighbourhoods")}</p></div><a class="more" href="#map">${T("افتح الخريطة", "Open the map")} ${arrow()}</a></div>
    <div class="dist">${top.map((d) => `<a href="#listings" data-act="district" data-id="${d.id}"><b>${L(d)}</b><small>${num(counts(d.id))} ${T("عقار", "listings")}</small></a>`).join("")}</div></div></section>

  <section class="s"><div class="wrap">
    <div class="s-head"><div><h2>${T("مشاريع على الخارطة", "Off-plan projects")}</h2><p>${T("خطط سداد مرنة ونسب إنجاز محدثة", "Flexible payment plans and live construction progress")}</p></div><a class="more" href="#projects">${T("كل المشاريع", "All projects")} ${arrow()}</a></div>
    ${projectCard(PROJECTS[0])}</div></section>

  <section class="s dark"><div class="wrap"><div class="grid" style="grid-template-columns:1fr 1fr;align-items:center;gap:40px">
    <div><div class="eyebrow">${T("ما لقيت طلبك؟", "Can't find it?")}</div><h2>${T("اكتب طلبك ونبحث عنك", "Tell us what you need — we'll search for you")}</h2>
      <p>${T("كثير من العقارات تُباع قبل أن تُعلن. اترك مواصفاتك ونرسل لك الخيارات المطابقة على الواتساب.", "Many properties are sold before they are advertised. Leave your brief and we'll send matching options on WhatsApp.")}</p>
      <div class="grid" style="grid-template-columns:1fr 1fr;gap:12px;margin-top:18px">
        <div class="feat"><h3>${num("1,200+")}</h3><p>${T("صفقة مكتملة (مثال)", "deals closed (sample)")}</p></div>
        <div class="feat"><h3>${num("14")}</h3><p>${T("سنة خبرة (مثال)", "years in market (sample)")}</p></div></div></div>
    <form class="box stack" data-form="request" style="color:var(--ink);margin:0">
      <h3>${T("طلب عقار", "Property request")}</h3>
      <div class="two">${field(T("الغرض", "I want to"), `<select name="purpose">${opt("sale", T("شراء", "Buy"), "")}${opt("rent", T("استئجار", "Rent"), "")}</select>`)}${field(T("النوع", "Type"), `<select name="type">${typeOpts("")}</select>`)}</div>
      <div class="two">${field(T("الحي المفضل", "Preferred district"), `<select name="district">${distOpts("")}</select>`)}${field(T("الميزانية (ر.س)", "Budget (SAR)"), `<input name="budget" inputmode="numeric" dir="ltr">`)}</div>
      <div class="two">${leadFields()}</div>
      <button class="btn btn-g btn-block">${T("أرسل الطلب", "Send request")}</button>
      <p class="note">${T("بإرسال الطلب توافق على سياسة الخصوصية.", "By sending you agree to the privacy policy.")}</p></form>
  </div></div></section>

  <section class="s"><div class="wrap">
    <div class="s-head"><div><h2>${T("لماذا يختارنا العملاء", "Why clients choose us")}</h2></div><a class="more" href="#services">${T("كل الخدمات", "All services")} ${arrow()}</a></div>
    <div class="grid c4">${[["💬", "رد فوري", "Instant replies", "كل عقار له زر واتساب برسالة جاهزة فيها رقم الإعلان.", "Every listing has a WhatsApp button with the listing number pre-filled."], ["🧮", "حاسبات واضحة", "Clear calculators", "تمويل، رسوم، وعائد استثماري قبل ما تتصل.", "Mortgage, fees and ROI before you even call."], ["🗺️", "بحث بالخريطة", "Map search", "شوف الأسعار حسب الحي وقارن بين ٣ عقارات.", "See prices by district and compare up to 3 properties."], ["🌍", "عربي / English", "Arabic / English", "واجهة كاملة باللغتين للمقيمين والمستثمرين الأجانب.", "Full bilingual site for residents and foreign investors."]].map(([i, a, e, da, de]) => `<div class="feat"><div class="ic">${i}</div><h3>${T(a, e)}</h3><p>${T(da, de)}</p></div>`).join("")}</div></div></section>

  <section class="s alt"><div class="wrap">
    <div class="s-head"><div><h2>${T("قالوا عنا", "What clients say")}</h2><p>${T("آراء توضيحية — تُستبدل بتقييمات المكتب الحقيقية من خرائط قوقل", "Sample placeholders — replaced with the agency's real Google reviews")}</p></div></div>
    <div class="grid">${[["استلمت الشقة خلال أسبوع، والعقد كان موثق في إيجار من أول يوم.", "Got the keys within a week, and the lease was on Ejar from day one.", "مستأجر – الياسمين", "Tenant – Al Yasmin"], ["عرضوا فيلتي بتصوير احترافي وانباعت خلال ٤٠ يوم.", "They listed my villa with professional photos and it sold in 40 days.", "مالك – حطين", "Owner – Hittin"], ["The English site and WhatsApp replies made relocating to Riyadh easy.", "The English site and WhatsApp replies made relocating to Riyadh easy.", "مقيم – الدرعية", "Expat – Diriyah"]].map(([a, e, wa2, we]) => `<div class="quote"><div style="color:var(--gold)">★★★★★</div><p>“${T(a, e)}”</p><small>${T(wa2, we)} · ${T("مثال", "sample")}</small></div>`).join("")}</div></div></section>

  <section class="s"><div class="wrap" style="max-width:860px">
    <div class="s-head"><h2>${T("أسئلة شائعة", "Frequently asked questions")}</h2></div>${faq()}</div></section>`;
}
function faq() {
  return [
    ["كيف أتأكد أن الإعلان نظامي؟", "How do I know a listing is legitimate?", "كل عقار في الموقع يعرض رقم ترخيص الإعلان الصادر من الهيئة العامة للعقار ورقم رخصة فال للمكتب، ويمكنك التحقق منهما عبر خدمات الهيئة.", "Every listing shows its REGA advertising licence number and the office's FAL licence, which you can verify through REGA's services."],
    ["كم تكلفة السعي؟", "What is the brokerage commission?", "تُحدد العمولة في عقد الوساطة، والمتعارف عليه ٢٫٥٪. استخدم حاسبة الرسوم لتقدير إجمالي التكاليف.", "The commission is set in the brokerage contract; 2.5% is customary. Use the fees calculator to estimate total costs."],
    ["هل أستطيع دفع الإيجار شهرياً؟", "Can I pay rent monthly?", "نعم لكثير من العقارات، عبر منصة إيجار. زر (شهري/سنوي) في صفحة العقارات يعرض السعر بالطريقتين.", "Yes for many units, through Ejar. The monthly/yearly switch on the listings page shows both."],
    ["هل يمكن لغير السعوديين التملك؟", "Can non-Saudis buy property?", "نظام تملك غير السعوديين للعقار دخل حيز النفاذ في يناير ٢٠٢٦ ضمن نطاقات وشروط محددة. فريقنا يشرح لك المناطق المتاحة والإجراءات.", "The non-Saudi property ownership law took effect in January 2026, within designated zones and conditions. Our team will walk you through eligible areas and the process."],
    ["أنا مالك، كيف أعرض عقاري؟", "I'm an owner — how do I list?", "عبّئ نموذج (اعرض عقارك) وسنتواصل معك للتقييم المجاني، وتوقيع عقد الوساطة وإصدار ترخيص الإعلان.", "Fill in the “List your property” form. We'll call you for a free valuation, sign the brokerage contract and issue the advertising licence."]
  ].map(([qa, qe, aa, ae]) => `<details><summary>${T(qa, qe)}</summary><p>${T(aa, ae)}</p></details>`).join("");
}

function projectCard(p) {
  return `<div class="proj"><div class="pi">${art(p.art, 2)}<div class="tags"><span class="tag sale">${T("بيع على الخارطة", "Off-plan")}</span><span class="tag">${T("التسليم", "Handover")} ${num(p.handover)}</span></div></div>
    <div class="pb"><h3 style="font-size:1.5rem">${L(p)}</h3><div class="loc">📍 ${L(dist(p.district))}، ${T("الرياض", "Riyadh")}</div>
      <p style="margin-top:10px">${T(p.descAr, p.descEn)}</p>
      <div class="kv"><div><small>${T("يبدأ من", "From")}</small><b>${money(p.from)}</b></div><div><small>${T("الوحدات", "Units")}</small><b>${num(p.units)}</b></div><div><small>${T("المتاح", "Available")}</small><b>${num(p.units - p.sold)}</b></div></div>
      <small class="note">${T("نسبة الإنجاز", "Construction progress")} ${num(p.progress + "%")}</small><div class="bar"><i style="width:${p.progress}%"></i></div>
      <div class="plan"><span><b>${num(p.plan[0] + "%")}</b>${T("حجز", "Booking")}</span><span><b>${num(p.plan[1] + "%")}</b>${T("أثناء البناء", "During build")}</span><span><b>${num(p.plan[2] + "%")}</b>${T("عند الاستلام", "On handover")}</span></div>
      <ul class="clean">${(S.lang === "ar" ? p.typesAr : p.typesEn).map((t) => `<li>${t}</li>`).join("")}</ul>
      <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap"><button class="btn btn-p" data-act="callback" data-ref="${esc(p.en)}">${T("سجّل اهتمامك", "Register interest")}</button><a class="btn btn-w" target="_blank" rel="noopener" href="${wa(T(`أرغب بمعرفة تفاصيل مشروع ${p.ar}`, `I'd like details about ${p.en}`))}">${T("البروشور على الواتساب", "Brochure on WhatsApp")}</a></div>
    </div></div>`;
}
const head = (t, sub, crumb) => `<div class="page-head"><div class="wrap"><div class="crumb"><a href="#home">${T("الرئيسية", "Home")}</a> / ${crumb || t}</div><h1>${t}</h1>${sub ? `<p>${sub}</p>` : ""}</div></div>`;

function filtered() {
  const f = S.f, n = (v) => Number(String(v).replace(/[^\d.]/g, "")) || 0;
  let r = LISTINGS.filter((l) =>
    (!f.purpose || l.purpose === f.purpose) && (!f.cat || (f.cat === "com") === isCom(l)) && (!f.type || l.type === f.type) &&
    (!f.district || l.district === f.district) && (!n(f.min) || l.price >= n(f.min)) && (!n(f.max) || l.price <= n(f.max)) &&
    (!f.beds || l.beds >= +f.beds) && (!n(f.areaMin) || l.area >= n(f.areaMin)) && (!f.tenant || l.tenant === f.tenant || l.tenant === "any") &&
    f.amen.every((a) => l.amen.includes(a)) &&
    (!f.q || (l.id + l.titleAr + l.titleEn + dist(l.district).ar + dist(l.district).en).toLowerCase().includes(f.q.toLowerCase())));
  const s = { new: (a, b) => b.posted.localeCompare(a.posted), low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, area: (a, b) => b.area - a.area }[f.sort];
  return r.sort(s);
}
function resultsHTML() {
  const r = filtered();
  return `<div class="toolbar"><b>${num(r.length)} ${T("عقار مطابق", "matching properties")}</b>
    <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
      <button class="btn btn-sm btn-l filter-toggle" data-act="filters">⚙ ${T("الفلاتر", "Filters")}</button>
      ${S.f.purpose !== "sale" ? `<div class="seg" style="min-width:170px"><button class="${!S.rentMonthly ? "on" : ""}" data-act="rentmode" data-v="0">${T("سنوي", "Yearly")}</button><button class="${S.rentMonthly ? "on" : ""}" data-act="rentmode" data-v="1">${T("شهري", "Monthly")}</button></div>` : ""}
      <select data-f="sort" aria-label="${T("الترتيب", "Sort")}" style="padding:9px 12px;border-radius:10px;border:1px solid var(--line);background:#fff">${opt("new", T("الأحدث", "Newest"), S.f.sort)}${opt("low", T("السعر: الأقل", "Price: low to high"), S.f.sort)}${opt("high", T("السعر: الأعلى", "Price: high to low"), S.f.sort)}${opt("area", T("المساحة", "Largest area"), S.f.sort)}</select>
      <a class="btn btn-sm btn-o" href="#map">🗺 ${T("الخريطة", "Map")}</a></div></div>
    ${r.length ? `<div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(270px,1fr))">${r.map(card).join("")}</div>` : `<div class="empty"><h3>${T("لا توجد نتائج مطابقة", "No matching properties")}</h3><p>${T("جرّب توسيع البحث، أو اترك طلبك ونبحث لك.", "Try widening the search, or leave a request and we'll search for you.")}</p><button class="btn btn-p" data-act="callback">${T("اترك طلبك", "Leave a request")}</button> <button class="btn btn-o" data-act="reset">${T("مسح الفلاتر", "Clear filters")}</button></div>`}`;
}
function pageListings() {
  const f = S.f;
  return head(T("العقارات", "Properties"), T("بيع وإيجار في الرياض — كل إعلان برقم ترخيصه", "For sale and rent in Riyadh — every ad with its licence number")) + `
  <div class="wrap layout">
    <aside class="filters" id="filters">
      <h3>${T("تصفية النتائج", "Filter results")}</h3>
      <div class="seg">${[["", "الكل", "All"], ["sale", "بيع", "Buy"], ["rent", "إيجار", "Rent"]].map(([v, a, e]) => `<button class="${f.purpose === v ? "on" : ""}" data-act="purpose" data-v="${v}">${T(a, e)}</button>`).join("")}</div>
      ${field(T("بحث برقم الإعلان أو الكلمة", "Search by ref or keyword"), `<input data-f="q" value="${esc(f.q)}" placeholder="RY1024">`)}
      ${field(T("نوع العقار", "Property type"), `<select data-f="type">${typeOpts(f.type)}</select>`)}
      ${field(T("الحي", "District"), `<select data-f="district">${distOpts(f.district)}</select>`)}
      <div class="two">${field(T("أقل سعر", "Min price"), `<input data-f="min" value="${esc(f.min)}" inputmode="numeric" dir="ltr">`)}${field(T("أعلى سعر", "Max price"), `<input data-f="max" value="${esc(f.max)}" inputmode="numeric" dir="ltr">`)}</div>
      <div class="two">${field(T("الغرف", "Bedrooms"), `<select data-f="beds">${opt("", T("الكل", "Any"), f.beds)}${[1, 2, 3, 4, 5].map((n) => opt(n, n + "+", f.beds)).join("")}</select>`)}${field(T("أقل مساحة م²", "Min area m²"), `<input data-f="areaMin" value="${esc(f.areaMin)}" inputmode="numeric" dir="ltr">`)}</div>
      ${f.purpose === "rent" ? field(T("فئة المستأجر", "Tenant type"), `<select data-f="tenant">${opt("", T("الكل", "Any"), f.tenant)}${["families", "singles", "company"].map((k) => opt(k, L(TENANTS[k]), f.tenant)).join("")}</select>`) : ""}
      <div><span class="note">${T("المزايا", "Amenities")}</span><div class="checks" style="margin-top:6px">${["pool", "elevator", "maid", "driver", "majlis", "garden", "furnished", "parking", "smart"].map((a) => `<label><input type="checkbox" data-amen="${a}" ${f.amen.includes(a) ? "checked" : ""}>${L(AMENITIES[a])}</label>`).join("")}</div></div>
      <button class="btn btn-o btn-sm" data-act="reset">${T("مسح الفلاتر", "Clear filters")}</button>
    </aside>
    <div id="results">${resultsHTML()}</div>
  </div>`;
}

function mapSVG(list, sel) {
  const road = (d, w = 9) => `<path d="${d}" fill="none" stroke="#fff" stroke-width="${w}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#d8c9a8" stroke-width="1.5" stroke-dasharray="10 12"/>`;
  return `<svg viewBox="0 0 1000 720" role="img" aria-label="${T("خريطة عقارات الرياض", "Riyadh property map")}">
    <rect width="1000" height="720" fill="#efe6d3"/>
    <path d="M60 0 Q 150 200 90 380 T 210 720" fill="none" stroke="#cfe1d4" stroke-width="34" stroke-linecap="round"/>
    <path d="M60 0 Q 150 200 90 380 T 210 720" fill="none" stroke="#a9cdb6" stroke-width="6"/>
    ${road("M440 0 L450 720", 12)}${road("M0 130 L1000 110")}${road("M0 330 Q 500 300 1000 340", 12)}${road("M650 0 Q 640 380 820 720")}${road("M250 720 Q 300 480 250 330 T 320 0", 7)}${road("M0 560 Q 500 520 1000 600", 8)}
    <g font-size="15" fill="#a1957e" letter-spacing="1"><text x="462" y="702">${T("طريق الملك فهد", "King Fahd Rd")}</text><text x="820" y="100">${T("طريق الملك سلمان", "King Salman Rd")}</text><text x="820" y="322">${T("الدائري الشمالي", "Northern Ring Rd")}</text><text x="100" y="250" fill="#6f9a80">${T("وادي حنيفة", "Wadi Hanifa")}</text></g>
    <circle cx="465" cy="395" r="26" fill="#17605d" opacity=".12"/><text x="465" y="402" text-anchor="middle" font-size="15" fill="#17605d">KAFD</text>
    ${DISTRICTS.map((d) => `<text x="${d.x}" y="${d.y + 44}" text-anchor="middle" font-size="19" fill="#6b6257" opacity=".8">${L(d)}</text>`).join("")}
    ${list.map((l) => { const w = short(l.price).length * 12 + 26; return `<g class="pin ${l.purpose} ${sel === l.id ? "on" : ""}" data-act="pin" data-id="${l.id}" tabindex="0" role="button" aria-label="${esc(title(l))}" transform="translate(${l.mx} ${l.my})"><rect x="${-w / 2}" y="-17" width="${w}" height="34" rx="17"/><text y="7" text-anchor="middle">${short(l.price)}</text></g>`; }).join("")}
  </svg>`;
}
function pageMap() {
  const list = filtered(), sel = byId(S.mapSel) || list[0];
  return head(T("البحث بالخريطة", "Map search"), T("اضغط على السعر لعرض العقار — الأخضر للبيع والذهبي للإيجار", "Tap a price to see the property — green is for sale, gold is for rent")) + `
  <div class="wrap map-wrap"><div><div class="map">${mapSVG(list, sel && sel.id)}</div>
    <p class="note" style="margin-top:8px">${T("خريطة توضيحية للنموذج. في النسخة الفعلية تُستخدم خرائط قوقل أو Mapbox بالموقع الدقيق لكل عقار.", "Illustrative map for the prototype. The live build uses Google Maps or Mapbox with each listing's exact location.")}</p></div>
    <div class="map-side">
      <div class="seg">${[["", "الكل", "All"], ["sale", "بيع", "Buy"], ["rent", "إيجار", "Rent"]].map(([v, a, e]) => `<button class="${S.f.purpose === v ? "on" : ""}" data-act="purpose" data-v="${v}">${T(a, e)}</button>`).join("")}</div>
      ${sel ? card(sel) : `<div class="empty">${T("لا توجد عقارات", "No properties")}</div>`}
      <a class="btn btn-o" href="#listings">${T("عرض كقائمة", "View as list")} (${num(list.length)})</a></div></div>`;
}

function mortBox(price) {
  return `<div data-calcbox="mort" class="stack">
    <div class="two">${field(T("سعر العقار (ر.س)", "Property price (SAR)"), `<input name="price" value="${price}" inputmode="numeric" dir="ltr">`)}${field(T("الدفعة الأولى %", "Down payment %"), `<input name="down" value="10" inputmode="decimal" dir="ltr">`)}</div>
    <div class="two">${field(T("هامش الربح السنوي %", "Annual profit rate %"), `<input name="rate" value="4.5" inputmode="decimal" dir="ltr">`)}${field(T("المدة (سنة)", "Term (years)"), `<input name="years" value="20" inputmode="numeric" dir="ltr">`)}</div>
    <div class="result" data-out></div><p class="note">${T("تقدير استرشادي فقط؛ النسبة مثال والعرض النهائي من جهة التمويل.", "Indicative only; the rate is an example and the final offer comes from the lender.")}</p></div>`;
}
function roiBox() {
  return `<div data-calcbox="roi" class="stack">
    <div class="two">${field(T("سعر الشراء", "Purchase price"), `<input name="price" value="945000" dir="ltr" inputmode="numeric">`)}${field(T("الإيجار السنوي المتوقع", "Expected annual rent"), `<input name="rent" value="62000" dir="ltr" inputmode="numeric">`)}</div>
    <div class="two">${field(T("المصاريف السنوية", "Annual expenses"), `<input name="exp" value="6000" dir="ltr" inputmode="numeric">`)}${field(T("مدة الاحتفاظ (سنة)", "Holding period (years)"), `<input name="years" value="10" dir="ltr" inputmode="numeric">`)}</div>
    <div class="result" data-out></div></div>`;
}
function feesBox() {
  return `<div data-calcbox="fees" class="stack">
    <div class="two">${field(T("نوع العملية", "Transaction"), `<select name="kind">${opt("sale", T("شراء", "Purchase"), "")}${opt("rent", T("إيجار سكني", "Residential rent"), "")}${opt("crent", T("إيجار تجاري", "Commercial rent"), "")}</select>`)}${field(T("المبلغ (السعر أو الإيجار السنوي)", "Amount (price or annual rent)"), `<input name="amount" value="1500000" dir="ltr" inputmode="numeric">`)}</div>
    <div class="two">${field(T("نسبة السعي %", "Commission %"), `<input name="pct" value="2.5" dir="ltr" inputmode="decimal">`)}<label class="f" style="align-self:end;padding-bottom:10px"><input type="checkbox" name="first" style="width:auto;min-height:0"> ${T("المسكن الأول لمواطن (إعفاء حتى مليون)", "Citizen's first home (exemption up to 1M)")}</label></div>
    <div class="result" data-out></div><p class="note">${T("أرقام تقديرية للتوضيح وليست استشارة ضريبية؛ راجع الجهات الرسمية للتأكد.", "Illustrative estimates, not tax advice; confirm with the official authorities.")}</p></div>`;
}
function runCalcs(root = document) {
  root.querySelectorAll("[data-calcbox]").forEach((b) => {
    const v = (n) => Number(String((b.querySelector(`[name=${n}]`) || {}).value || "").replace(/[^\d.]/g, "")) || 0, out = b.querySelector("[data-out]"), k = b.dataset.calcbox;
    const row = (a, c) => `<tr><td>${a}</td><td>${c}</td></tr>`;
    if (k === "mort") {
      const P = v("price") * (1 - v("down") / 100), r = v("rate") / 1200, n = v("years") * 12;
      const m = n ? (r ? (P * r) / (1 - Math.pow(1 + r, -n)) : P / n) : 0;
      out.innerHTML = `<small class="note">${T("القسط الشهري التقريبي", "Estimated monthly payment")}</small><div class="big">${money(m)}</div><table>${row(T("الدفعة الأولى", "Down payment"), money(v("price") * v("down") / 100))}${row(T("مبلغ التمويل", "Financed amount"), money(P))}${row(T("إجمالي السداد", "Total repaid"), money(m * n))}</table>`;
    } else if (k === "roi") {
      const p = v("price"), net = v("rent") - v("exp");
      out.innerHTML = `<small class="note">${T("صافي العائد السنوي", "Net annual yield")}</small><div class="big">${num((p ? (net / p) * 100 : 0).toFixed(2) + "%")}</div><table>${row(T("العائد الإجمالي", "Gross yield"), num((p ? (v("rent") / p) * 100 : 0).toFixed(2) + "%"))}${row(T("صافي الدخل السنوي", "Net annual income"), money(net))}${row(T("إجمالي الدخل خلال المدة", "Income over the period"), money(net * v("years")))}${row(T("فترة الاسترداد", "Payback period"), num(net > 0 ? (p / net).toFixed(1) : "—") + " " + T("سنة", "years"))}</table>`;
    } else {
      const kind = b.querySelector("[name=kind]").value, a = v("amount"), com = (a * v("pct")) / 100, vat = com * 0.15, first = b.querySelector("[name=first]").checked;
      let rows = "", total = com + vat;
      if (kind === "sale") { const tax = 0.05 * (first ? Math.max(0, a - 1e6) : a); total += tax; rows += row(T("ضريبة التصرفات العقارية ٥٪", "Real estate transaction tax 5%"), money(tax)); }
      if (kind === "crent") { const rv = a * 0.15; total += rv; rows += row(T("ضريبة القيمة المضافة على الإيجار ١٥٪", "VAT on rent 15%"), money(rv)); }
      rows += row(T("السعي", "Brokerage commission"), money(com)) + row(T("ضريبة القيمة المضافة على السعي ١٥٪", "VAT on commission 15%"), money(vat)) + row(T("إجمالي التكاليف الإضافية", "Total additional costs"), money(total));
      out.innerHTML = `<table>${rows}</table>`;
    }
  });
}

function pageDetail(id) {
  const l = byId(id);
  if (!l) return head(T("العقار غير موجود", "Property not found")) + `<div class="wrap" style="padding:50px 20px"><a class="btn btn-p" href="#listings">${T("كل العقارات", "All properties")}</a></div>`;
  const d = dist(l.district), ag = AGENTS.find((a) => a.id === l.agent), ppm = l.price / l.area;
  const msg = T(`السلام عليكم، مهتم بالعقار رقم ${l.id} (${l.titleAr}). هل ما زال متاحاً؟`, `Hello, I'm interested in listing ${l.id} (${l.titleEn}). Is it still available?`);
  const sim = LISTINGS.filter((x) => x.id !== l.id && x.purpose === l.purpose && (x.type === l.type || x.district === l.district)).slice(0, 3);
  const fact = (k, v) => `<div><small>${k}</small><b>${v}</b></div>`;
  return `<div class="wrap">
    <div class="crumb" style="color:var(--mute);margin-top:22px"><a href="#home">${T("الرئيسية", "Home")}</a> / <a href="#listings">${T("العقارات", "Properties")}</a> / ${num(l.id)}</div>
    <div class="s-head" style="margin:8px 0 0;align-items:start"><div>
      <div style="display:flex;gap:6px;margin-bottom:8px"><span class="tag ${l.purpose}">${l.purpose === "sale" ? T("للبيع", "For sale") : T("للإيجار", "For rent")}</span>${l.isNew ? `<span class="tag new" style="border:1px solid var(--line)">${T("جديد", "New")}</span>` : ""}<span class="tag" style="border:1px solid var(--line)">${T("رقم الإعلان", "Ref")} ${num(l.id)}</span></div>
      <h1 style="font-size:clamp(1.5rem,3vw,2.2rem)">${esc(title(l))}</h1><div class="loc">📍 ${L(d)}، ${T("الرياض", "Riyadh")}</div></div>
      <div style="text-align:end"><div class="price" style="font-size:2rem">${priceHTML(l)}</div>${l.purpose === "sale" ? `<small class="note">${money(ppm)} / ${T("م²", "m²")}</small>` : `<small class="note">${T("≈", "≈")} ${money(l.price / 12)} ${T("شهرياً", "per month")}</small>`}
        <div style="display:flex;gap:8px;margin-top:8px;justify-content:flex-end"><button class="btn btn-sm btn-l" data-act="fav" data-id="${l.id}">${S.favs.has(l.id) ? "♥ " + T("محفوظ", "Saved") : "♡ " + T("حفظ", "Save")}</button><button class="btn btn-sm btn-l" data-act="copy">🔗 ${T("نسخ الرابط", "Copy link")}</button><a class="btn btn-sm btn-l" target="_blank" rel="noopener" href="${wa(T(`شاهد هذا العقار: ${l.titleAr} — رقم ${l.id}`, `Have a look at this property: ${l.titleEn} — ref ${l.id}`), "")}">${T("مشاركة", "Share")}</a></div></div></div>
    <div class="gallery"><div>${art(l.art, l.tod)}<span class="cap">${T("صور توضيحية — تُستبدل بصور العقار و جولة ٣٦٠°", "Illustrations — replaced by real photos and a 360° tour")}</span></div><div>${art(l.art, l.tod, 1)}</div><div>${art(l.art, l.tod, 2)}<span class="cap">${T("المخطط", "Floor plan")}</span></div></div>
    <div class="detail"><div>
      <div class="facts">${fact(T("النوع", "Type"), L(TYPES[l.type]))}${fact(T("المساحة", "Area"), num(fmt(l.area)) + " " + T("م²", "m²"))}${l.beds ? fact(T("غرف النوم", "Bedrooms"), num(l.beds)) : ""}${l.baths ? fact(T("دورات المياه", "Bathrooms"), num(l.baths)) : ""}${fact(T("الواجهة", "Facade"), L(FACADES[l.facade]))}${fact(T("عرض الشارع", "Street width"), num(l.street) + T(" م", " m"))}${l.age != null ? fact(T("عمر العقار", "Building age"), l.age ? num(l.age) + " " + T("سنة", "yrs") : T("جديد", "New")) : ""}${l.floor != null ? fact(T("الدور", "Floor"), l.floor ? num(l.floor) : T("أرضي", "Ground")) : ""}${l.tenant ? fact(T("فئة المستأجر", "Tenant type"), L(TENANTS[l.tenant])) : ""}</div>
      <div class="box"><h3>${T("الوصف", "Description")}</h3><p style="margin:0">${T(l.descAr, l.descEn)}</p></div>
      ${l.amen.length ? `<div class="box"><h3>${T("المزايا", "Features & amenities")}</h3><div class="amen">${l.amen.map((a) => `<span>${AMENITIES[a].i} ${L(AMENITIES[a])}</span>`).join("")}</div></div>` : ""}
      <div class="box rega"><div><h3>🛡 ${T("بيانات الترخيص النظامية", "Regulatory licence details")}</h3>
        <dl><dt>${T("رقم ترخيص الإعلان", "Advertising licence no.")}</dt><dd>${num(l.adLicense)}</dd><dt>${T("تاريخ انتهاء الترخيص", "Licence expiry")}</dt><dd>${num(l.adExpiry)}</dd><dt>${T("رخصة فال للمكتب", "Office FAL licence")}</dt><dd>${num(BRAND.fal)}</dd><dt>${T("المعلن", "Advertiser")}</dt><dd>${T(BRAND.nameAr, BRAND.nameEn)} — ${T("وسيط مفوّض", "authorised broker")}</dd><dt>${T("تاريخ النشر", "Posted")}</dt><dd>${num(l.posted)}</dd></dl>
        <p class="note" style="margin:10px 0 0">${T("أرقام تجريبية. في الموقع الفعلي تظهر بيانات ترخيص الهيئة العامة للعقار ورمز QR الرسمي للتحقق.", "Sample numbers. On the live site this shows the real REGA licence data and the official verification QR code.")}</p></div>${fakeQR(l.id)}</div>
      <div class="box"><h3>${T("الموقع", "Location")}</h3><div class="map" style="aspect-ratio:1000/520">${mapSVG([l], l.id)}</div></div>
      <div class="box"><h3>${l.purpose === "sale" ? T("حاسبة التمويل العقاري", "Mortgage calculator") : T("خيارات الدفع", "Payment options")}</h3>
        ${l.purpose === "sale" ? mortBox(l.price) : `<div class="kv" style="grid-template-columns:repeat(4,1fr)">${[1, 2, 4, 12].map((n) => `<div><small>${n === 12 ? T("شهري", "Monthly") : n === 1 ? T("دفعة واحدة", "1 payment") : num(n) + " " + T("دفعات", "payments")}</small><b>${money(l.price / n)}</b></div>`).join("")}</div><p class="note">${T("حسب موافقة المالك؛ تُوثق الدفعات في عقد إيجار.", "Subject to owner approval; instalments are recorded in the Ejar contract.")}</p>`}</div>
      ${sim.length ? `<h3 style="margin:26px 0 14px">${T("عقارات مشابهة", "Similar properties")}</h3><div class="grid">${sim.map(card).join("")}</div>` : ""}
    </div>
    <aside class="side">
      <div class="box" style="margin:0"><div class="agent"><div class="avatar" style="background:${ag.color}">${L(ag).charAt(0)}</div><div><b>${L(ag)}</b><div class="note">${T(ag.roleAr, ag.roleEn)}</div><div class="note">${num(ag.langs)}</div></div></div>
        <div class="stack"><a class="btn btn-w btn-block" target="_blank" rel="noopener" href="${wa(msg, ag.wa)}">${T("واتساب – استفسر عن العقار", "WhatsApp about this property")}</a><a class="btn btn-o btn-block" href="tel:+${BRAND.phoneRaw}">📞 ${num(BRAND.phone)}</a></div></div>
      <form class="box stack" data-form="viewing" data-ref="${l.id}" style="margin:0"><h3 style="margin:0">${T("احجز موعد معاينة", "Book a viewing")}</h3>
        <div class="two">${field(T("التاريخ", "Date"), `<input type="date" name="date" required>`)}${field(T("الوقت", "Time"), `<select name="time">${["10:00", "12:00", "16:30", "18:00", "20:00"].map((t) => opt(t, t, "16:30")).join("")}</select>`)}</div>
        ${leadFields()}<button class="btn btn-p btn-block">${T("تأكيد الحجز", "Confirm booking")}</button></form>
    </aside></div></div>`;
}

function pageProjects() { return head(T("مشاريعنا", "Our projects"), T("مشاريع البيع على الخارطة والمشاريع الجاهزة التي نسوّقها", "Off-plan and ready projects we market")) + `<div class="wrap" style="padding:30px 20px 60px">${PROJECTS.map(projectCard).join("")}</div>`; }

function pageServices() {
  const sv = [["🤝", "الوساطة في البيع والشراء", "Sales brokerage", "تسعير واقعي، تسويق احترافي، وتفاوض حتى الإفراغ.", "Realistic pricing, professional marketing and negotiation through to title transfer."], ["🔑", "التأجير", "Leasing", "فرز المستأجرين، توثيق العقود في إيجار وتحصيل الدفعات.", "Tenant screening, Ejar contracts and payment collection."], ["🏢", "إدارة الأملاك", "Property management", "صيانة، تحصيل، وتقارير شهرية للمالك.", "Maintenance, collection and monthly owner reports."], ["📊", "التقييم والاستشارات", "Valuation & advisory", "تقدير القيمة السوقية ودراسات جدوى للمستثمرين.", "Market valuations and feasibility studies for investors."], ["📣", "تسويق المشاريع", "Project marketing", "صفحات مشاريع، حملات إعلانية وإدارة مبيعات للمطورين.", "Project pages, ad campaigns and sales management for developers."], ["✈️", "خدمات الانتقال", "Relocation", "مساعدة الشركات والمقيمين الجدد في السكن والمدارس.", "Housing and school support for companies and new residents."]];
  return head(T("خدماتنا", "Our services")) + `<section class="s"><div class="wrap"><div class="grid">${sv.map(([i, a, e, da, de]) => `<div class="feat"><div class="ic">${i}</div><h3>${T(a, e)}</h3><p>${T(da, de)}</p><button class="btn btn-sm btn-o" style="margin-top:14px" data-act="callback" data-ref="${e}">${T("اطلب الخدمة", "Request service")}</button></div>`).join("")}</div>
    <div class="s-head" style="margin-top:56px"><h2>${T("كيف نعمل", "How it works")}</h2></div>
    <div class="grid c4">${[["١", "1", "أخبرنا بطلبك", "Tell us your brief"], ["٢", "2", "نرشح لك الخيارات", "We shortlist options"], ["٣", "3", "معاينة وتفاوض", "View and negotiate"], ["٤", "4", "عقد موثق واستلام", "Documented contract & handover"]].map(([na, ne, a, e]) => `<div class="feat"><div class="ic" style="font-family:var(--display);font-weight:700;color:var(--teal)">${T(na, ne)}</div><h3>${T(a, e)}</h3></div>`).join("")}</div></div></section>`;
}

function pageTools() {
  return head(T("الحاسبات العقارية", "Property calculators"), T("اعرف التكلفة والعائد قبل أن تقرر", "Know the cost and the return before you decide")) + `<div class="wrap" style="padding:30px 20px 60px"><div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(320px,1fr));align-items:start">
    <div class="box"><h3>🏦 ${T("حاسبة التمويل", "Mortgage calculator")}</h3>${mortBox(1500000)}</div>
    <div class="box"><h3>🧾 ${T("حاسبة الرسوم والسعي", "Fees & commission calculator")}</h3>${feesBox()}</div>
    <div class="box"><h3>📈 ${T("حاسبة العائد الاستثماري", "ROI calculator")}</h3>${roiBox()}</div></div></div>`;
}

function pageOwner() {
  return head(T("اعرض عقارك معنا", "List your property with us"), T("تقييم مجاني خلال ٢٤ ساعة، وتسويق بترخيص إعلان نظامي", "Free valuation within 24 hours, marketed under a proper advertising licence")) + `<div class="wrap" style="padding:30px 20px 60px"><div class="grid" style="grid-template-columns:1.2fr 1fr;align-items:start">
    <form class="box stack" data-form="owner"><h3>${T("بيانات العقار", "Property details")}</h3>
      <div class="two">${field(T("الغرض", "Purpose"), `<select name="purpose">${opt("sale", T("بيع", "Sell"), "")}${opt("rent", T("تأجير", "Rent out"), "")}${opt("manage", T("إدارة أملاك", "Management"), "")}</select>`)}${field(T("نوع العقار", "Type"), `<select name="type">${typeOpts("villa")}</select>`)}</div>
      <div class="two">${field(T("الحي", "District"), `<select name="district">${distOpts("")}</select>`)}${field(T("المساحة م²", "Area m²"), `<input name="area" inputmode="numeric" dir="ltr">`)}</div>
      <div class="two">${field(T("السعر المطلوب (اختياري)", "Asking price (optional)"), `<input name="price" inputmode="numeric" dir="ltr">`)}${field(T("صفة مقدم الطلب", "You are the"), `<select name="cap">${opt("owner", T("المالك", "Owner"), "")}${opt("agent", T("وكيل شرعي", "Legal representative"), "")}</select>`)}</div>
      ${field(T("صور العقار (اختياري)", "Photos (optional)"), `<input type="file" name="photos" accept="image/*" multiple>`)}
      <div class="two">${leadFields()}</div>${field(T("ملاحظات", "Notes"), `<textarea name="note"></textarea>`)}
      <button class="btn btn-g btn-block">${T("اطلب تقييماً مجانياً", "Request a free valuation")}</button></form>
    <div class="stack">${[["📸", "تصوير احترافي", "Professional photography", "صور، فيديو وجولة ٣٦٠°", "Photos, video and a 360° tour"], ["🪪", "إجراءات نظامية", "Compliance handled", "عقد وساطة وترخيص إعلان باسمك", "Brokerage contract and ad licence handled for you"], ["📢", "وصول أوسع", "Wider reach", "موقعنا + المنصات العقارية + حملات مدفوعة", "Our site + property portals + paid campaigns"], ["📈", "تقرير أسبوعي", "Weekly report", "عدد المشاهدات والاستفسارات والمعاينات", "Views, enquiries and viewings"]].map(([i, a, e, da, de]) => `<div class="feat" style="display:flex;gap:14px"><div class="ic" style="margin:0;flex:none">${i}</div><div><h3 style="margin:0">${T(a, e)}</h3><p>${T(da, de)}</p></div></div>`).join("")}</div></div></div>`;
}

function pageFavs() {
  const r = LISTINGS.filter((l) => S.favs.has(l.id));
  return head(T("المفضلة", "Favourites")) + `<div class="wrap" style="padding:30px 20px 60px">${r.length ? `<div class="grid">${r.map(card).join("")}</div><div style="margin-top:22px"><a class="btn btn-w" target="_blank" rel="noopener" href="${wa(T("أرغب بمعاينة العقارات: ", "I'd like to view these listings: ") + r.map((l) => l.id).join(", "))}">${T("أرسل القائمة للمستشار على الواتساب", "Send this shortlist to an advisor on WhatsApp")}</a></div>` : `<div class="empty"><h3>${T("لم تحفظ أي عقار بعد", "No saved properties yet")}</h3><p>${T("اضغط ♡ على أي عقار لحفظه هنا.", "Tap ♡ on any property to save it here.")}</p><a class="btn btn-p" href="#listings">${T("تصفح العقارات", "Browse properties")}</a></div>`}</div>`;
}

function pageCompare() {
  const r = S.cmp.map(byId).filter(Boolean);
  const rowf = (k, fn) => `<tr><th>${k}</th>${r.map((l) => `<td>${fn(l)}</td>`).join("")}</tr>`;
  return head(T("مقارنة العقارات", "Compare properties")) + `<div class="wrap" style="padding:30px 20px 60px">${r.length ? `<table class="cmp">
    <tr><th></th>${r.map((l) => `<td><div style="height:120px;border-radius:12px;overflow:hidden;margin-bottom:8px">${art(l.art, l.tod)}</div><a href="#p-${l.id}"><b>${esc(title(l))}</b></a></td>`).join("")}</tr>
    ${rowf(T("السعر", "Price"), priceHTML)}${rowf(T("سعر المتر", "Price per m²"), (l) => money(l.price / l.area))}${rowf(T("الحي", "District"), (l) => L(dist(l.district)))}${rowf(T("النوع", "Type"), (l) => L(TYPES[l.type]))}${rowf(T("المساحة", "Area"), (l) => num(fmt(l.area)) + " " + T("م²", "m²"))}${rowf(T("الغرف", "Bedrooms"), (l) => num(l.beds || "—"))}${rowf(T("الحمامات", "Bathrooms"), (l) => num(l.baths || "—"))}${rowf(T("الواجهة", "Facade"), (l) => L(FACADES[l.facade]))}${rowf(T("العمر", "Age"), (l) => (l.age == null ? "—" : l.age ? num(l.age) : T("جديد", "New")))}${rowf(T("المزايا", "Amenities"), (l) => l.amen.map((a) => L(AMENITIES[a])).join("، ") || "—")}
    ${rowf("", (l) => `<a class="btn btn-sm btn-p" href="#p-${l.id}">${T("التفاصيل", "Details")}</a>`)}</table>` : `<div class="empty"><h3>${T("اختر حتى ٣ عقارات للمقارنة", "Pick up to 3 properties to compare")}</h3><a class="btn btn-p" href="#listings">${T("تصفح العقارات", "Browse properties")}</a></div>`}</div>`;
}

function pageAbout() {
  return head(T("من نحن", "About us")) + `<section class="s"><div class="wrap"><div class="grid" style="grid-template-columns:1.2fr 1fr;align-items:center;gap:40px">
    <div><h2>${T("مكتب عقاري بمعايير واضحة", "A brokerage built on clear standards")}</h2><p>${T("سكن العقارية مكتب وساطة وتسويق عقاري في الرياض. نؤمن أن العميل يستحق سعراً معلناً، معلومة صحيحة، ورداً سريعاً. (نص توضيحي يُستبدل بقصة المكتب.)", "Sakan Realty is a Riyadh brokerage and marketing office. We believe clients deserve published prices, accurate information and fast answers. (Placeholder copy — replaced with the agency's own story.)")}</p>
      <div class="kv"><div><small>${T("رخصة فال", "FAL licence")}</small><b>${num(BRAND.fal)}</b></div><div><small>${T("السجل التجاري", "Commercial reg.")}</small><b>${num(BRAND.cr)}</b></div><div><small>${T("الرقم الضريبي", "VAT no.")}</small><b style="font-size:.85rem">${num(BRAND.vat)}</b></div></div></div>
    <div style="border-radius:20px;overflow:hidden;height:300px">${art("office", 2)}</div></div>
    <div class="s-head" style="margin-top:56px"><h2>${T("فريق المستشارين", "Our advisors")}</h2></div>
    <div class="grid c4">${AGENTS.map((a) => `<div class="feat"><div class="agent"><div class="avatar" style="background:${a.color}">${L(a).charAt(0)}</div><div><b>${L(a)}</b><div class="note">${num(a.langs)}</div></div></div><p>${T(a.roleAr, a.roleEn)}</p><p style="margin-top:6px"><b>${num(a.deals + "+")}</b> ${T("صفقة (مثال)", "deals (sample)")}</p><a class="btn btn-sm btn-w" style="margin-top:12px" target="_blank" rel="noopener" href="${wa(T("السلام عليكم", "Hello"), a.wa)}">${T("واتساب", "WhatsApp")}</a></div>`).join("")}</div></div></section>`;
}

function pageContact() {
  return head(T("تواصل معنا", "Contact us")) + `<div class="wrap" style="padding:30px 20px 60px"><div class="grid" style="grid-template-columns:1fr 1fr;align-items:start">
    <form class="box stack" data-form="contact"><h3>${T("أرسل رسالة", "Send a message")}</h3><div class="two">${leadFields()}</div>
      ${field(T("الموضوع", "Topic"), `<select name="topic">${["شراء|Buying", "استئجار|Renting", "عرض عقار|Listing a property", "إدارة أملاك|Property management", "أخرى|Other"].map((x) => { const [a, e] = x.split("|"); return opt(e, T(a, e), ""); }).join("")}</select>`)}
      ${field(T("رسالتك", "Your message"), `<textarea name="note"></textarea>`)}<button class="btn btn-p btn-block">${T("إرسال", "Send")}</button></form>
    <div class="stack"><div class="box" style="margin:0"><h3>${T("بيانات المكتب", "Office details")}</h3><ul class="clean">
      <li>📞 <a href="tel:+${BRAND.phoneRaw}">${num(BRAND.phone)}</a></li><li>✉️ <a href="mailto:${BRAND.email}">${BRAND.email}</a></li><li>📍 ${T(BRAND.addressAr, BRAND.addressEn)}</li><li>🕘 ${T(BRAND.hoursAr, BRAND.hoursEn)}</li></ul>
      <div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap"><a class="btn btn-w" target="_blank" rel="noopener" href="${wa(T("السلام عليكم", "Hello"))}">${T("واتساب", "WhatsApp")}</a>${["X", "Instagram", "Snapchat", "TikTok"].map((s) => `<a class="btn btn-l btn-sm" href="#contact">${s}</a>`).join("")}</div></div>
      <div class="map" style="aspect-ratio:1000/560">${mapSVG([], null).replace("</svg>", `<g transform="translate(450 450)"><circle r="20" fill="#b8894a"/><circle r="7" fill="#fff"/></g><text x="450" y="420" text-anchor="middle" font-size="22" fill="#0d3b3a" font-weight="600">${T("مكتبنا", "Our office")}</text></svg>`)}</div></div></div></div>`;
}

function pageDash() {
  const leads = [...S.leads].reverse().concat(SAMPLE_LEADS), now = new Date("2026-11-14");
  const days = (d) => Math.round((new Date(d) - now) / 864e5), soon = LISTINGS.filter((l) => days(l.adExpiry) < 90);
  const kinds = { viewing: T("حجز معاينة", "Viewing"), request: T("طلب عقار", "Property request"), owner: T("مالك – عرض عقار", "Owner lead"), contact: T("رسالة", "Message"), callback: T("طلب اتصال", "Callback") };
  return head(T("لوحة المكتب (عرض تجريبي)", "Agency dashboard (demo)"), T("هذا ما يراه صاحب المكتب: كل طلب من الموقع يصل هنا وعلى الواتساب فوراً", "What the agency owner sees: every enquiry from the site lands here and on WhatsApp instantly")) + `<div class="wrap" style="padding:30px 20px 60px">
    <div class="grid c4"><div class="stat"><b>${num(LISTINGS.length)}</b><small>${T("عقار منشور", "live listings")}</small></div><div class="stat"><b>${num(leads.length)}</b><small>${T("طلب وارد", "leads received")}</small></div><div class="stat"><b>${num(S.favs.size)}</b><small>${T("عقار محفوظ في هذه الجلسة", "saves this session")}</small></div><div class="stat"><b style="color:var(--red)">${num(soon.length)}</b><small>${T("تراخيص إعلان تنتهي خلال ٩٠ يوماً", "ad licences expiring in 90 days")}</small></div></div>
    <div class="box" style="margin-top:22px;overflow-x:auto"><h3>${T("الطلبات الواردة", "Incoming leads")}</h3><p class="note">${T("جرّب: أرسل أي نموذج في الموقع ثم ارجع هنا.", "Try it: submit any form on the site, then come back here.")}</p>
      <table class="tbl"><tr><th>${T("الوقت", "Time")}</th><th>${T("النوع", "Type")}</th><th>${T("العميل", "Client")}</th><th>${T("الجوال", "Mobile")}</th><th>${T("المرجع", "Reference")}</th><th>${T("ملاحظات", "Notes")}</th></tr>
      ${leads.map((l) => `<tr><td>${num(esc(l.t))}</td><td><span class="pill">${kinds[l.kind] || l.kind}</span></td><td>${esc(l.name)}${l.sample ? ` <small class="note">(${T("مثال", "sample")})</small>` : ""}</td><td>${num(esc(l.phone))}</td><td>${esc(l.ref || "—")}</td><td>${esc(l.note || "")}</td></tr>`).join("")}</table></div>
    <div class="grid" style="grid-template-columns:1.3fr 1fr;align-items:start">
      <div class="box" style="overflow-x:auto"><h3>${T("العقارات وصلاحية التراخيص", "Listings & licence validity")}</h3><table class="tbl"><tr><th>${T("الرقم", "Ref")}</th><th>${T("العقار", "Listing")}</th><th>${T("السعر", "Price")}</th><th>${T("انتهاء الترخيص", "Licence expiry")}</th></tr>
        ${LISTINGS.slice(0, 9).map((l) => `<tr><td>${num(l.id)}</td><td><a href="#p-${l.id}">${esc(title(l))}</a></td><td>${num(short(l.price))}</td><td>${num(l.adExpiry)} ${days(l.adExpiry) < 90 ? `<span class="pill" style="background:#fdeae6;color:var(--red)">${T("قريب", "soon")}</span>` : ""}</td></tr>`).join("")}</table></div>
      <form class="box stack" data-form="addlisting"><h3>${T("إضافة عقار سريع", "Quick add listing")}</h3><p class="note" style="margin:0">${T("يظهر فوراً في الموقع (في النسخة الفعلية: دخول آمن ورفع صور).", "Appears on the site immediately (live build: secure login and photo upload).")}</p>
        ${field(T("العنوان", "Title"), `<input name="title" required>`)}
        <div class="two">${field(T("الغرض", "Purpose"), `<select name="purpose">${opt("sale", T("بيع", "Sale"), "")}${opt("rent", T("إيجار", "Rent"), "")}</select>`)}${field(T("النوع", "Type"), `<select name="type">${Object.entries(TYPES).filter(([k]) => k !== "land").map(([k, v]) => opt(k, L(v), "")).join("")}</select>`)}</div>
        <div class="two">${field(T("الحي", "District"), `<select name="district">${DISTRICTS.map((d) => opt(d.id, L(d), "")).join("")}</select>`)}${field(T("السعر", "Price"), `<input name="price" required inputmode="numeric" dir="ltr">`)}</div>
        <div class="two">${field(T("المساحة م²", "Area m²"), `<input name="area" required inputmode="numeric" dir="ltr">`)}${field(T("رقم ترخيص الإعلان", "Ad licence no."), `<input name="lic" required dir="ltr">`)}</div>
        <button class="btn btn-p btn-block">${T("نشر العقار", "Publish listing")}</button></form></div></div>`;
}

/* ---------- render ---------- */
function render() {
  const r = route();
  document.documentElement.lang = S.lang; document.documentElement.dir = S.lang === "ar" ? "rtl" : "ltr";
  document.title = T("سكن العقارية — عقارات الرياض", "Sakan Realty — Riyadh properties");
  chrome();
  const pages = { home: pageHome, listings: pageListings, map: pageMap, projects: pageProjects, services: pageServices, tools: pageTools, "list-property": pageOwner, favorites: pageFavs, compare: pageCompare, about: pageAbout, contact: pageContact, dashboard: pageDash };
  $("#app").innerHTML = r.startsWith("p-") ? pageDetail(r.slice(2)) : (pages[r] || pageHome)();
  runCalcs();
}
function refreshResults() { const el = $("#results"); if (el) el.innerHTML = resultsHTML(); else render(); }

function modal(html) { $("#modal-root").innerHTML = `<div class="modal" data-act="close-bg"><div role="dialog" aria-modal="true"><button class="x" data-act="close" aria-label="Close">✕</button>${html}</div></div>`; const f = $("#modal-root input,#modal-root a.btn"); if (f) f.focus(); }
function closeModal() { $("#modal-root").innerHTML = ""; }
function callbackModal(ref) {
  modal(`<form class="stack" data-form="callback" data-ref="${esc(ref || "")}"><h3>${T("اطلب اتصالاً من مستشار", "Request a call from an advisor")}</h3>${ref ? `<p class="note">${T("بخصوص", "Regarding")}: ${esc(ref)}</p>` : ""}${leadFields(field(T("ماذا تبحث عنه؟", "What are you looking for?"), `<textarea name="note"></textarea>`))}<button class="btn btn-p btn-block">${T("أرسل", "Send")}</button></form>`);
}
function addLead(kind, fd, ref) {
  const phone = String(fd.get("phone") || "").replace(/[\s-]/g, "");
  if (!/^(?:\+?966|0)?5\d{8}$/.test(phone)) { toast(T("رقم الجوال غير صحيح — مثال: 05XXXXXXXX", "Invalid Saudi mobile — e.g. 05XXXXXXXX")); return false; }
  const extra = ["purpose", "type", "district", "budget", "date", "time", "topic", "area", "price", "note"].map((k) => fd.get(k)).filter(Boolean).join(" · ");
  const lead = { kind, name: String(fd.get("name") || ""), phone, ref: ref || "", note: extra, t: new Date().toISOString().slice(0, 16).replace("T", " ") };
  S.leads.push(lead); save();
  const msg = T(`طلب جديد من الموقع (${kind})\nالاسم: ${lead.name}\nالجوال: ${phone}\n${ref ? "المرجع: " + ref + "\n" : ""}${extra}`, `New website enquiry (${kind})\nName: ${lead.name}\nMobile: ${phone}\n${ref ? "Ref: " + ref + "\n" : ""}${extra}`);
  modal(`<div class="ok"><div class="tick">✓</div><h3>${T("تم استلام طلبك", "Request received")}</h3><p>${T("سيتواصل معك أحد مستشارينا خلال دقائق.", "One of our advisors will contact you within minutes.")}</p>
    <p class="note">${T("عرض تجريبي: لم يُرسل شيء فعلياً. في الموقع الحقيقي يصل الطلب لواتساب وبريد المكتب ولوحة التحكم.", "Demo: nothing was actually sent. On the live site this goes to the agency's WhatsApp, email and dashboard.")}</p>
    <div class="stack"><a class="btn btn-w" target="_blank" rel="noopener" href="${wa(msg)}">${T("أكمل عبر الواتساب", "Continue on WhatsApp")}</a><a class="btn btn-o" href="#dashboard" data-act="close">${T("شاهد الطلب في لوحة المكتب", "See it in the agency dashboard")}</a></div></div>`);
  return true;
}

/* ---------- events ---------- */
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-act]"); if (!el) return;
  const a = el.dataset.act, id = el.dataset.id;
  if (a === "close-bg") { if (e.target === el) closeModal(); return; }
  if (a === "cmp") return; // handled on change
  switch (a) {
    case "lang": S.lang = S.lang === "ar" ? "en" : "ar"; save(); render(); break;
    case "burger": $("#nav").classList.toggle("open"); break;
    case "fav": e.preventDefault(); S.favs.has(id) ? S.favs.delete(id) : S.favs.add(id); save(); toast(S.favs.has(id) ? T("تم الحفظ في المفضلة", "Saved to favourites") : T("أزيل من المفضلة", "Removed from favourites")); render(); break;
    case "herotab": S.heroTab = el.dataset.v; render(); break;
    case "quick": Object.assign(S.f, { purpose: el.dataset.purpose, type: el.dataset.type, cat: "", district: "", max: "", min: "", beds: "", amen: [] }); go("listings"); break;
    case "district": Object.assign(S.f, { district: id, purpose: "", type: "", cat: "" }); break;
    case "purpose": S.f.purpose = el.dataset.v; if (S.f.purpose !== "rent") S.f.tenant = ""; S.mapSel = null; render(); break;
    case "reset": S.f = { purpose: "", cat: "", type: "", district: "", min: "", max: "", beds: "", areaMin: "", tenant: "", amen: [], sort: "new", q: "" }; render(); break;
    case "rentmode": S.rentMonthly = el.dataset.v === "1"; refreshResults(); break;
    case "filters": $("#filters").classList.toggle("open"); break;
    case "pin": S.mapSel = id; if (route() === "map") render(); else go("p-" + id); break;
    case "callback": callbackModal(el.dataset.ref); break;
    case "close": closeModal(); break;
    case "cmp-clear": S.cmp = []; save(); render(); break;
    case "copy": (navigator.clipboard ? navigator.clipboard.writeText(location.href) : Promise.reject()).then(() => toast(T("تم نسخ الرابط", "Link copied")), () => toast(location.href)); break;
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
  if ((e.key === "Enter" || e.key === " ") && e.target.matches(".pin")) { e.preventDefault(); e.target.dispatchEvent(new MouseEvent("click", { bubbles: true })); }
});
document.addEventListener("change", (e) => {
  const t = e.target;
  if (t.dataset.act === "cmp") {
    const id = t.dataset.id;
    if (t.checked) { if (S.cmp.length >= 3) { t.checked = false; toast(T("الحد الأقصى ٣ عقارات", "Maximum 3 properties")); return; } S.cmp.push(id); } else S.cmp = S.cmp.filter((x) => x !== id);
    save(); chrome(); return;
  }
  if (t.dataset.amen) { const a = t.dataset.amen; S.f.amen = t.checked ? [...S.f.amen, a] : S.f.amen.filter((x) => x !== a); refreshResults(); }
});
document.addEventListener("input", (e) => {
  const t = e.target;
  if (t.dataset.f) { S.f[t.dataset.f] = t.value; refreshResults(); }
  const box = t.closest("[data-calcbox]"); if (box) runCalcs(box.parentElement);
});
document.addEventListener("submit", (e) => {
  const form = e.target.closest("[data-form]"); if (!form) return;
  e.preventDefault();
  const fd = new FormData(form), k = form.dataset.form;
  if (k === "search") {
    Object.assign(S.f, { purpose: S.heroTab === "com" ? "" : S.heroTab, cat: S.heroTab === "com" ? "com" : "", type: fd.get("type"), district: fd.get("district"), beds: fd.get("beds"), max: fd.get("max"), min: "", amen: [], q: "" });
    go("listings"); return;
  }
  if (k === "addlisting") {
    const d = dist(fd.get("district")), n = (v) => Number(String(v).replace(/[^\d.]/g, "")) || 0, t = String(fd.get("title"));
    const l = { id: "RY" + (1100 + LISTINGS.length), purpose: fd.get("purpose"), type: fd.get("type"), district: d.id, price: n(fd.get("price")), area: n(fd.get("area")) || 1, beds: 3, baths: 2, age: 0, facade: "north", street: 15, floor: null, tenant: fd.get("purpose") === "rent" ? "any" : null, amen: [], featured: false, isNew: true, agent: "a1", art: ["office", "shop", "building", "apartment", "villa", "duplex", "townhouse", "compound", "floor"].includes(fd.get("type")) ? fd.get("type") : "villa", tod: 1, titleAr: t, titleEn: t, descAr: t, descEn: t, adLicense: String(fd.get("lic")), adExpiry: "2027-11-14", posted: "2026-11-14", mx: d.x + 30, my: d.y - 26 };
    LISTINGS.unshift(l); toast(T("تم نشر العقار", "Listing published")); go("p-" + l.id); return;
  }
  const ref = form.dataset.ref || (k === "owner" ? T("عرض عقار", "Owner listing") : "");
  if (addLead(k, fd, ref)) form.reset();
});
window.addEventListener("hashchange", () => { closeModal(); render(); window.scrollTo(0, 0); $("#app").focus({ preventScroll: true }); });

load(); render();
