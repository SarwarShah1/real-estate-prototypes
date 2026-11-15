/* NAKHLA RESIDENCES — site logic (no dependencies) */
const S = { lang: "en", mode: "sale", floor: 0, gfilter: "all", mtype: "all", mavail: false, plot: null, down: PAYMENT.minDown, years: PAYMENT.years, rate: PAYMENT.rate, split: 2, bro: false };
try { S.bro = localStorage.getItem("nakhla-brochure") === "1"; } catch (e) {}
try { S.lang = localStorage.getItem("nakhla-lang") || "en"; } catch (e) {}

const $ = (s, r = document) => r.querySelector(s);
const T = (en, ar) => (S.lang === "ar" ? ar : en);
const L = (o) => (Array.isArray(o) ? o[S.lang === "ar" ? 1 : 0] : o[S.lang]);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const num = (n) => `<span class="num">${n}</span>`;
const fmt = (n) => Math.round(n).toLocaleString("en-US");
const sar = (n) => `${num(fmt(n))} ${T("SAR", "ر.س")}`;
const wa = (msg) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
const route = () => location.hash.replace("#", "") || "home";
const villa = (id) => VILLAS.find((v) => v.id === id);

function ph(slot, label, cls = "", tag = "div", attrs = "") {
  const url = PHOTOS[slot];
  return `<${tag} class="ph ${cls} ${url ? "has" : ""}" ${attrs}>${url ? `<img src="${esc(url)}" alt="${esc(label)}" loading="lazy" onerror="this.parentNode.classList.remove('has');this.remove()">` : ""}<span class="cap">${T("Photo", "صورة")} · ${esc(label)}</span></${tag}>`;
}
const priceOf = (v) => (S.mode === "sale" ? sar(v.sale) : `${sar(v.rent)} <span class="mute" style="font-size:.5em;font-family:var(--body)">${T("/ year", "/ سنوياً")}</span>`);
const seg = () => `<div class="seg" role="group" aria-label="${T("Buy or rent", "شراء أو إيجار")}"><button data-mode="sale" class="${S.mode === "sale" ? "on" : ""}" aria-pressed="${S.mode === "sale"}">${T("Buy", "شراء")}</button><button data-mode="rent" class="${S.mode === "rent" ? "on" : ""}" aria-pressed="${S.mode === "rent"}">${T("Rent", "إيجار")}</button></div>`;

function vcard(v) {
  return `<a class="vcard" href="#villa-${v.id}">${ph(v.id, L(v.name))}
    <div class="t"><h3>${L(v.name)}</h3><span>${T("from", "من")} ${S.mode === "sale" ? sar(v.sale) : sar(v.rent)}</span></div>
    <div class="f"><span>${num(v.beds)} ${T("bedrooms", "غرف نوم")}</span><span>${num(v.built)} ${T("m²", "م²")}</span><span>${L(v.extra)}</span></div></a>`;
}

function visitForm(ref, compact) {
  return `<form class="f" data-form novalidate data-ref="${esc(ref || "")}">
    <label>${T("Name", "الاسم")}<input name="name" required autocomplete="name"></label>
    <label>${T("Mobile", "رقم الجوال")}<input name="phone" required inputmode="tel" dir="ltr" autocomplete="tel" placeholder="05XXXXXXXX"></label>
    ${compact ? "" : `<label>${T("Interested in", "مهتم بـ")}<select name="mode"><option value="rent">${T("Renting", "الإيجار")}</option><option value="sale">${T("Buying", "الشراء")}</option></select></label>`}
    <label>${T("Preferred day", "اليوم المفضل")}<input type="date" name="day"></label>
    <button class="btn btn-brass full">${T("Request my viewing", "اطلب موعد المعاينة")}</button></form>`;
}
function visitSection() {
  return `<section class="sec visit" id="visit"><div class="cols" style="align-items:start">
    <div class="stack"><h2>${T("Come and walk the grounds", "تفضل بزيارة المجمع")}</h2>
      <p class="soft" style="max-width:440px">${T("Choose a day and our leasing team will meet you at the gate. Prefer to talk first? We answer on WhatsApp within minutes.", "اختر اليوم المناسب وسيستقبلك فريق التأجير عند البوابة. تفضّل الحديث أولاً؟ نرد على الواتساب خلال دقائق.")}</p>
      <div class="row"><a class="btn btn-ivory" target="_blank" rel="noopener" href="${wa(T("Hello, I would like to visit Nakhla Residences.", "السلام عليكم، أرغب بزيارة نخلة ريزيدنس."))}">${T("WhatsApp us", "راسلنا واتساب")}</a><a class="btn btn-line" href="tel:${SITE.phone.replace(/\s/g, "")}">${num(SITE.phone)}</a></div></div>
    ${visitForm("")}</div></section>`;
}

/* ---------- pages ---------- */
function heroMedia() {
  if (!VIDEO.src) return ph("hero", T("villa and pool at dusk", "فيلا ومسبح وقت الغروب"));
  return `<div class="ph has hv-poster"><img src="${esc(VIDEO.poster || PHOTOS.hero)}" alt="" onerror="this.src='${esc(PHOTOS.hero)}'"></div>
    <video class="hv" muted loop playsinline preload="none" aria-hidden="true" data-src="${esc(VIDEO.src)}" data-src-sm="${esc(VIDEO.srcMobile || VIDEO.src)}"></video>`;
}
function pageHome() {
  return `<section class="hero hero-v">${heroMedia()}
    <div class="hero-c"><div class="eyebrow hv-in" style="--d:.1s">${T("Welcome to", "أهلاً بكم في")}</div>
      <h1 class="hv-in" style="--d:.25s">${L(SITE.name)}</h1>
      <div class="hv-rule hv-in" style="--d:.4s"></div>
      <p class="hv-in" style="--d:.5s">${T("Villas for sale and rent in a gated garden community, North Riyadh", "فلل للبيع والإيجار في مجمع مسوّر تحيط به الحدائق، شمال الرياض")}</p>
      <div class="row hv-in" style="--d:.65s;justify-content:center"><a class="btn btn-brass" href="#contact">${T("Book a private viewing", "احجز معاينة خاصة")}</a><a class="btn btn-line" href="#villas">${T("See the villas", "شاهد الفلل")}</a></div></div>
    ${VIDEO.src ? `<button class="hv-btn" data-hv aria-label="${T("Pause the video", "إيقاف الفيديو")}"><span class="hv-ico"></span></button>` : ""}
    <a class="hv-down" href="#intro" data-scroll aria-label="${T("Scroll down", "انزل للأسفل")}"><span></span></a></section>
  <section class="sec intro" id="intro"><div class="eyebrow">${T("A gated villa community · North Riyadh", "مجمع فلل مسوّر · شمال الرياض")}</div>
    <h2>${T("A garden behind the walls of the city", "حديقة خلف أسوار المدينة")}</h2>
    <p class="soft">${T("Eighty-nine villas around a shaded central park, managed and maintained by a team that lives on site.", "تسع وثمانون فيلا حول منتزه مظلل، يديرها ويصونها فريق يقيم في المجمع.")}</p></section>
  <section class="stats">
    <div><b>${num(89)}</b><span class="caps mute">${T("Villas, three layouts", "فيلا بثلاثة نماذج")}</span></div>
    <div><b>${num("30,600")} ${T("m²", "م²")}</b><span class="caps mute">${T("Of landscaped grounds", "من المساحات المنسقة")}</span></div>
    <div><b>${num("24 / 7")}</b><span class="caps mute">${T("Security and maintenance", "أمن وصيانة")}</span></div>
    <div><b>${num(SITE.fal)}</b><span class="caps mute">${T("FAL licence · REGA", "رخصة فال · الهيئة العامة للعقار")}</span></div></section>
  <section class="sec"><div class="sec-head"><div><div class="eyebrow">${T("The collection", "المجموعة")}</div><h2>${T("Three villas, for sale or rent", "ثلاثة نماذج للبيع أو الإيجار")}</h2></div>${seg()}</div>
    <div class="cards">${VILLAS.map(vcard).join("")}</div></section>
  ${mpTeaser()}
  <section class="split paper">${ph("life", T("shaded seating in the central park", "جلسة مظللة في المنتزه"), "light")}
    <div class="txt"><div class="eyebrow">${T("Life here", "الحياة هنا")}</div><h2>${T("Your home does not end at your front door", "بيتك لا ينتهي عند باب الدار")}</h2>
      <p class="soft">${T("Step outside to a pool, a gym, tennis and padel courts, a children's club and a café, all inside the walls and all looked after for you.", "خارج باب بيتك مسبح ونادٍ رياضي وملاعب تنس وبادل ونادٍ للأطفال ومقهى، كلها داخل الأسوار ونحن نعتني بها.")}</p>
      <div class="list2">${FACILITIES.map((f) => `<div>${L(f.t)}</div>`).join("")}</div>
      <a class="link" href="#life">${T("Explore the facilities", "استكشف المرافق")}</a></div></section>
  ${locationBlock()}${broStrip()}${visitSection()}`;
}
function locationBlock() {
  return `<section class="sec"><div class="cols"><div class="stack"><div class="eyebrow">${T("Location", "الموقع")}</div>
    <h2>${T("Fifteen minutes from the financial district", "ربع ساعة عن المركز المالي")}</h2>
    <div class="rows">${NEARBY.map(([n, m]) => `<div><span>${L(n)}</span><span>${num(m)} ${T("min", "دقيقة")}</span></div>`).join("")}</div>
    <a class="link" target="_blank" rel="noopener" href="https://www.google.com/maps?q=${SITE.mapQuery}">${T("Open in Google Maps", "افتح في خرائط قوقل")}</a></div>
    <div class="map"><span class="cap">${T("Map · sample location in North Riyadh", "خريطة · موقع تجريبي في شمال الرياض")}</span><iframe title="${T("Map", "الخريطة")}" loading="lazy" src="https://www.google.com/maps?q=${SITE.mapQuery}&z=13&output=embed"></iframe></div></div></section>`;
}
const pageHead = (eyebrow, h, p) => `<section class="page-head"><div class="eyebrow">${eyebrow}</div><h1 style="font-size:clamp(42px,6vw,80px)">${h}</h1>${p ? `<p class="soft">${p}</p>` : ""}</section>`;

function pageVillas() {
  return pageHead(T("The collection", "المجموعة"), T("Three villas, for sale or rent", "ثلاثة نماذج للبيع أو الإيجار"), T("Every villa comes with full use of the compound's facilities and on-site maintenance.", "كل فيلا تشمل استخدام جميع مرافق المجمع والصيانة في الموقع.")) +
    `<section class="sec"><div class="sec-head"><span class="caps mute">${num(VILLAS.reduce((a, v) => a + v.available, 0))} ${T("villas available now", "فيلا متاحة الآن")}</span>${seg()}</div><div class="cards">${VILLAS.map(vcard).join("")}</div>
    <div class="row" style="margin-top:40px;gap:28px"><a class="link" href="#masterplan">${T("See every plot on the masterplan", "شاهد جميع القطع على المخطط العام")}</a><a class="link" href="#brochure">${T("Get the brochure", "احصل على الكتيّب")}</a></div></section>${visitSection()}`;
}

function planSVG(rooms) {
  const total = rooms.reduce((a, r) => a + r[2], 0), half = total / 2; let acc = 0, split = rooms.length;
  for (let i = 0; i < rooms.length; i++) { acc += rooms[i][2]; if (acc >= half) { split = i + 1; break; } }
  const rowsArr = [rooms.slice(0, split), rooms.slice(split)].filter((r) => r.length), W = 400, H = 280, P = 14; let y = P, out = "", n = 0;
  rowsArr.forEach((row) => { const sum = row.reduce((a, r) => a + r[2], 0), h = ((H - 2 * P) * sum) / total; let x = P;
    row.forEach((r) => { const w = ((W - 2 * P) * r[2]) / sum; n++;
      out += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="${n % 2 ? "#F2EDE3" : "#E6DFD0"}" stroke="#10201B" stroke-width="2"/><text x="${(x + w / 2).toFixed(1)}" y="${(y + h / 2 + 6).toFixed(1)}" text-anchor="middle" font-size="17" font-family="Georgia,serif" fill="#10201B">${n}</text>`; x += w; }); y += h; });
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${T("Schematic floor plan", "مخطط توضيحي للدور")}">${out}</svg>`;
}

function pageVilla(id) {
  const v = villa(id); if (!v) return pageVillas();
  const fl = v.floors[Math.min(S.floor, v.floors.length - 1)], fi = v.floors.indexOf(fl);
  const others = VILLAS.filter((x) => x.id !== v.id);
  const g = (slot, label, cls) => ph(slot, label, cls, "button", `data-zoom="${slot}" data-label="${esc(label)}" aria-label="${T("Enlarge photo", "تكبير الصورة")}: ${esc(label)}"`);
  return `<section class="vhead"><div class="stack" style="gap:14px"><div class="eyebrow">${T("The collection", "المجموعة")} · ${num(v.count)} ${T("villas of this type", "فيلا من هذا النموذج")}</div>
      <h1>${L(v.name)}</h1><p class="soft" style="font-size:19px">${L(v.tag)}</p></div>
    <div class="stack" style="gap:10px;align-items:flex-start">${seg()}<div class="price">${priceOf(v)}</div><div class="mute" style="font-size:14px">${num(v.available)} ${T("of", "من")} ${num(v.count)} ${T("available · ready to move in", "متاحة · جاهزة للسكن")} · <a class="ulink" href="#masterplan-${v.id}">${T("see the plots", "شاهد القطع")}</a></div></div></section>
  <section class="gal">${g(v.id, T("exterior", "الواجهة"), "big")}<div class="sm">${g(v.id + "2", T("living room", "صالة المعيشة"))}${g(v.id + "3", T("interior", "من الداخل"))}</div></section>
  <section class="facts">${[[v.beds, T("Bedrooms", "غرف النوم")], [v.baths, T("Bathrooms", "دورات المياه")], [v.built + " " + T("m²", "م²"), T("Built area", "مسطح البناء")], [v.plot + " " + T("m²", "م²"), T("Plot", "مساحة الأرض")], [v.parking, T("Covered parking", "مواقف مظللة")]].map(([a, b]) => `<div><b>${num(a)}</b><span class="caps mute">${b}</span></div>`).join("")}</section>
  <section class="body"><div class="main">
    <div class="stack" style="gap:18px"><h2 style="font-size:42px">${L(v.headline)}</h2><p class="soft" style="max-width:640px">${L(v.desc)}</p></div>
    <div class="stack"><div class="sec-head" style="margin:0;align-items:center"><h2 style="font-size:42px">${T("Floor plans", "مخططات الأدوار")}</h2>
      <div class="seg" role="group">${v.floors.map((f, i) => `<button data-floor="${i}" class="${i === fi ? "on" : ""}" aria-pressed="${i === fi}">${T(f.en, f.ar)}</button>`).join("")}</div></div>
      <div class="plan"><div>${planSVG(fl.rooms)}<p class="mute" style="font-size:13px;margin-top:8px">${T("Schematic, not to scale. Architect's drawings replace this on a client site.", "مخطط توضيحي ليس بمقياس رسم. يُستبدل بمخططات المعماري في موقع العميل.")}</p></div>
        <div class="rows">${fl.rooms.map((rm, i) => `<div><span>${num(i + 1)}. ${T(rm[0], rm[1])}</span><span class="mute" style="color:var(--mute)">${num(rm[2])} ${T("m²", "م²")}</span></div>`).join("")}</div></div></div>
    <div class="stack"><h2 style="font-size:42px">${T("Inside the villa", "داخل الفيلا")}</h2><div class="list2">${v.features.map((f) => `<div>${L(f)}</div>`).join("")}</div></div>
    ${calcBlock(v)}
    <div class="lic"><div class="stack" style="gap:6px"><span class="eyebrow" style="letter-spacing:.14em">${T("Licence details (sample)", "بيانات الترخيص (تجريبية)")}</span><span>${T("Advertising licence", "ترخيص الإعلان")} ${num(v.adLicense)} · ${T("valid to", "ساري حتى")} ${num(v.adExpiry)}</span><span>${T("FAL licence", "رخصة فال")} ${num(SITE.fal)} · ${T("Advertiser", "المعلن")}: ${L(SITE.name)}</span></div><div class="qr">REGA<br>QR</div></div>
  </div>
  <aside class="aside"><h3 style="font-size:34px">${T("Visit", "زيارة")} ${L(v.name)}</h3><p class="soft" style="font-size:15px">${T("A show villa is open every day. Choose a day and we will meet you at the gate.", "فيلا العرض مفتوحة يومياً. اختر اليوم وسنستقبلك عند البوابة.")}</p>
    ${visitForm(v.name.en, true)}
    <a class="btn btn-line" target="_blank" rel="noopener" href="${wa(T(`Hello, I am interested in ${v.name.en} at Nakhla Residences. Is it still available?`, `السلام عليكم، مهتم بفيلا ${v.name.ar} في نخلة ريزيدنس. هل ما زالت متاحة؟`))}">${T("Ask on WhatsApp", "اسأل عبر واتساب")}</a>
    <div class="stack" style="gap:10px;border-top:1px solid var(--line);padding-top:16px"><span class="caps mute">${T("Available plots", "القطع المتاحة")}</span><div class="pbtns">${plots().filter((p) => p.type === v.id && p.st === "A").map((p) => `<a class="pbtn" href="#masterplan-${v.id}" data-goplot="${p.no}">${num(p.no)}</a>`).join("")}</div></div>
    <a class="link" href="#brochure">${T("Get the brochure", "احصل على الكتيّب")}</a>
    <div class="mute" style="font-size:14px;border-top:1px solid var(--line);padding-top:16px">${T("Or call", "أو اتصل على")} ${num(SITE.phone)} · ${L(SITE.hours)}</div></aside></section>
  <section class="sec" style="padding-top:0"><h2 style="font-size:42px;margin-bottom:30px">${T("The other villas", "النماذج الأخرى")}</h2><div class="cards">${others.map(vcard).join("")}</div></section>`;
}

function pageLife() {
  return pageHead(T("Life here", "الحياة هنا"), T("Everything is inside the gate", "كل شيء داخل البوابة"), T("Every resident, owner or tenant, has full use of the facilities below.", "جميع السكان، ملاكاً ومستأجرين، يستخدمون المرافق التالية كاملة.")) +
    `<section class="sec"><div class="tiles">${FACILITIES.map((f) => `<div class="tile">${ph(f.ph, L(f.t))}<h3>${L(f.t)}</h3><p class="soft" style="font-size:16px">${L(f.d)}</p></div>`).join("")}</div></section>${visitSection()}`;
}
function pageLocation() { return pageHead(T("Location", "الموقع"), T("North Riyadh, close to everything", "شمال الرياض، قريب من كل شيء"), L(SITE.address)) + locationBlock() + visitSection(); }

const GALLERY = [["hero", "ext"], ["sidr", "ext"], ["ghaf", "ext"], ["talh", "ext"], ["sidr2", "int"], ["sidr3", "int"], ["ghaf2", "int"], ["talh2", "int"], ["life", "grounds"], ["pool", "grounds"], ["courts", "grounds"], ["cafe", "grounds"]];
function pageGallery() {
  const names = { all: T("All", "الكل"), ext: T("Exteriors", "الواجهات"), int: T("Interiors", "من الداخل"), grounds: T("Grounds", "المرافق") };
  return pageHead(T("Gallery", "معرض الصور"), T("See the compound", "شاهد المجمع")) + `<section class="sec"><div class="sec-head" style="margin-bottom:30px"><div class="seg">${Object.entries(names).map(([k, v]) => `<button data-gf="${k}" class="${S.gfilter === k ? "on" : ""}">${v}</button>`).join("")}</div></div>
    <div class="ggrid">${GALLERY.filter(([, c]) => S.gfilter === "all" || c === S.gfilter).map(([s, c]) => ph(s, names[c], "", "button", `data-zoom="${s}" data-label="${esc(names[c])}" aria-label="${T("Enlarge photo", "تكبير الصورة")}"`)).join("")}</div></section>`;
}
function pageContact() {
  return pageHead(T("Contact", "تواصل معنا"), T("Book a viewing", "احجز معاينة"), T("The leasing office is at the main gate.", "مكتب التأجير عند البوابة الرئيسية.")) + visitSection() +
    `<section class="sec"><div class="rows" style="max-width:720px"><div><span>${T("Phone", "الهاتف")}</span><span>${num(SITE.phone)}</span></div><div><span>${T("Email", "البريد")}</span><span>${SITE.email}</span></div><div><span>${T("Address", "العنوان")}</span><span style="white-space:normal;text-align:end">${L(SITE.address)}</span></div><div><span>${T("Hours", "ساعات العمل")}</span><span style="white-space:normal;text-align:end">${L(SITE.hours)}</span></div></div></section>${broStrip()}`;
}

/* ---------- masterplan ---------- */
const STATUS = { A: ["Available", "متاحة"], R: ["Reserved", "محجوزة"], S: ["Sold", "مباعة"] };
const FACING = { sidr: ["Faces the park", "تطل على المنتزه"], ghaf: ["On a garden lane", "على ممر الحدائق"], talh: ["On the outer lane", "على الممر الخارجي"] };
let PLOTS_CACHE = null;
function plots() {
  if (PLOTS_CACHE) return PLOTS_CACHE;
  const out = [], seen = {};
  const add = (type, x, y, w, h) => { const i = (seen[type] = (seen[type] || 0) + 1) - 1; out.push({ type, x, y, w, h, st: (PLOT_STATUS[type] || "")[i] || "S" }); };
  /* The Sidr: around the central park */
  [300, 381, 545, 626].forEach((x) => add("sidr", x, 215, 74, 60));
  [290, 364].forEach((y) => add("sidr", 715, y, 85, 66));
  [626, 545, 381, 300].forEach((x) => add("sidr", x, 445, 74, 60));
  [364, 290].forEach((y) => add("sidr", 200, y, 85, 66));
  /* The Ghaf: the garden lanes */
  for (let k = 0; k < 6; k++) add("ghaf", 50 + k * 68, 135, 64, 62);
  for (let k = 0; k < 6; k++) add("ghaf", 546 + k * 68, 135, 64, 62);
  [225, 305, 385].forEach((y) => add("ghaf", 870, y, 80, 70));
  for (let k = 5; k >= 0; k--) add("ghaf", 546 + k * 68, 523, 64, 62);
  for (let k = 5; k >= 0; k--) add("ghaf", 50 + k * 68, 523, 64, 62);
  [345, 265].forEach((y) => add("ghaf", 50, y, 80, 70));
  /* The Talh: the outer lanes */
  for (let k = 0; k < 12; k++) add("talh", 50 + k * 34, 40, 31, 56);
  for (let k = 0; k < 12; k++) add("talh", 545 + k * 34, 40, 31, 56);
  for (let k = 11; k >= 0; k--) add("talh", 545 + k * 34, 624, 31, 56);
  for (let k = 11; k >= 0; k--) add("talh", 50 + k * 34, 624, 31, 56);
  out.forEach((p, i) => (p.no = i + 1));
  return (PLOTS_CACHE = out);
}
const plotNo = (n) => plots().find((p) => p.no === +n);
const plotLabel = (p) => `${T("Plot", "قطعة")} ${p.no}, ${L(villa(p.type).name)}, ${L(STATUS[p.st])}`;

function masterplanSVG(interactive) {
  const sel = S.plot, trees = [[330, 312], [345, 410], [400, 300], [600, 305], [655, 318], [670, 410], [610, 418], [390, 420]];
  const pl = plots().map((p) => {
    const dim = interactive && ((S.mtype !== "all" && p.type !== S.mtype) || (S.mavail && p.st !== "A"));
    const a = interactive ? `data-plot="${p.no}" tabindex="${dim ? -1 : 0}" role="button" aria-pressed="${sel === p.no}" aria-label="${esc(plotLabel(p))}"` : `aria-hidden="true"`;
    const fs = p.w < 40 ? 13 : 15;
    return `<g class="plot st-${p.st}${dim ? " dim" : ""}${sel === p.no ? " sel" : ""}" ${a}><rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="2"/><text x="${p.x + p.w / 2}" y="${p.y + p.h / 2 + fs / 3}" text-anchor="middle" font-size="${fs}">${p.no}</text></g>`;
  }).join("");
  return `<svg class="mp-svg" viewBox="0 0 1000 730" role="${interactive ? "group" : "img"}" aria-label="${T("Masterplan of Nakhla Residences", "المخطط العام لنخلة ريزيدنس")}">
    <rect x="20" y="20" width="960" height="680" rx="6" class="mp-ground"/>
    <rect x="300" y="290" width="400" height="140" rx="18" class="mp-park"/>
    ${trees.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="11" class="mp-tree"/>`).join("")}
    <rect x="440" y="328" width="120" height="58" rx="8" class="mp-pool"/>
    <text x="500" y="362" text-anchor="middle" class="mp-lbl">${T("Pool", "المسبح")}</text>
    <text x="500" y="312" text-anchor="middle" class="mp-lbl">${T("Central park", "المنتزه")}</text>
    <rect x="365" y="395" width="60" height="26" rx="3" class="mp-club"/><text x="395" y="413" text-anchor="middle" class="mp-lbl sm">${T("Club", "النادي")}</text>
    <rect x="575" y="395" width="60" height="26" rx="3" class="mp-club"/><text x="605" y="413" text-anchor="middle" class="mp-lbl sm">${T("Gym", "الرياضة")}</text>
    ${pl}
    <rect x="465" y="692" width="70" height="16" class="mp-gate"/>
    <text x="500" y="726" text-anchor="middle" class="mp-lbl">${T("Main gate", "البوابة الرئيسية")}</text>
    <g transform="translate(950 712)" aria-hidden="true"><path d="M0 -14 L6 4 L0 0 L-6 4 Z" class="mp-n"/><text x="0" y="16" text-anchor="middle" class="mp-lbl sm">N</text></g>
  </svg>`;
}
const legend = () => `<div class="mp-legend">${["A", "R", "S"].map((k) => `<span><i class="sw st-${k}"></i>${L(STATUS[k])}</span>`).join("")}</div>`;
const countOf = (type, st) => plots().filter((p) => (type === "all" || p.type === type) && (!st || p.st === st)).length;
const plotBtn = (p) => `<button class="pbtn" data-plot="${p.no}" aria-label="${esc(plotLabel(p))}">${num(p.no)}</button>`;

function plotPanel() {
  const p = S.plot && plotNo(S.plot);
  if (!p) {
    return `<div class="stack" style="gap:16px"><div class="eyebrow">${T("Availability", "التوفر")}</div>
      <h3>${num(countOf("all", "A"))} ${T("villas available now", "فيلا متاحة الآن")}</h3>
      <p class="soft" style="font-size:16px">${T("Select a plot on the plan to see the villa, its price and the next step.", "اختر قطعة من المخطط لعرض الفيلا وسعرها والخطوة التالية.")}</p>
      <div class="rows">${VILLAS.map((v) => `<div><span>${L(v.name)}</span><span>${num(countOf(v.id, "A"))} ${T("of", "من")} ${num(countOf(v.id))}</span></div>`).join("")}</div>${legend()}</div>`;
  }
  const v = villa(p.type), same = plots().filter((x) => x.type === p.type && x.st === "A" && x.no !== p.no);
  const facts = `<div class="pfacts"><div><b>${num(v.beds)}</b><span>${T("Bedrooms", "غرف النوم")}</span></div><div><b>${num(v.built)}</b><span>${T("m² built", "م² بناء")}</span></div><div><b>${num(v.plot)}</b><span>${T("m² plot", "م² أرض")}</span></div></div>`;
  let act;
  if (p.st === "A") {
    act = `<div class="price" style="font-size:34px">${priceOf(v)}</div>${seg()}
      <p class="mute" style="font-size:14px">${T(`A refundable deposit holds this plot for ${PAYMENT.reserveDays} days.`, `عربون مسترد يحفظ هذه القطعة ${PAYMENT.reserveDays} يوماً.`)}</p>
      ${visitForm(`Plot ${p.no}, ${v.name.en}`, true)}
      <a class="btn btn-line" target="_blank" rel="noopener" href="${wa(T(`Hello, I would like to hold plot ${p.no} (${v.name.en}) at Nakhla Residences.`, `السلام عليكم، أرغب بحجز القطعة ${p.no} (${v.name.ar}) في نخلة ريزيدنس.`))}">${T("Hold this plot on WhatsApp", "احجز القطعة عبر واتساب")}</a>`;
  } else {
    act = `<p class="soft" style="font-size:16px">${p.st === "R" ? T("Another buyer has reserved this plot. If the reservation lapses it returns to sale, and the waiting list is told first.", "حجز مشترٍ آخر هذه القطعة. إذا انتهى الحجز تعود للبيع ويُبلَّغ أصحاب قائمة الانتظار أولاً.") : T("This villa has been sold.", "تم بيع هذه الفيلا.")}</p>
      ${p.st === "R" ? `<a class="btn btn-line" target="_blank" rel="noopener" href="${wa(T(`Hello, please add me to the waiting list for plot ${p.no} (${v.name.en}).`, `السلام عليكم، أرجو إضافتي لقائمة الانتظار للقطعة ${p.no} (${v.name.ar}).`))}">${T("Join the waiting list", "انضم لقائمة الانتظار")}</a>` : ""}
      ${same.length ? `<div class="stack" style="gap:10px"><span class="caps mute">${T(`Available plots of ${v.name.en}`, `قطع ${v.name.ar} المتاحة`)}</span><div class="pbtns">${same.map(plotBtn).join("")}</div></div>` : ""}`;
  }
  return `<div class="stack" style="gap:18px"><div class="row" style="justify-content:space-between;align-items:center"><span class="eyebrow">${T("Plot", "قطعة")} ${num(p.no)}</span><span class="chip st-${p.st}">${L(STATUS[p.st])}</span></div>
    <h3>${L(v.name)}</h3><span class="mute" style="font-size:15px;margin-top:-10px">${L(FACING[p.type])}</span>${facts}${act}
    <div class="row" style="gap:22px"><a class="link" href="#villa-${v.id}">${T("View the villa", "شاهد الفيلا")}</a><button class="link" data-plot-clear>${T("All plots", "كل القطع")}</button></div></div>`;
}

function pageMasterplan() {
  const types = [["all", T("All villas", "جميع الفلل")], ...VILLAS.map((v) => [v.id, L(v.name)])];
  return pageHead(T("Masterplan", "المخطط العام"), T("Choose your plot", "اختر قطعتك"), T("Eighty-nine villas around one central park. Every plot shows whether it is available, reserved or sold.", "تسع وثمانون فيلا حول منتزه واحد. كل قطعة تبيّن إن كانت متاحة أو محجوزة أو مباعة.")) +
  `<section class="sec" style="padding-top:50px"><div class="sec-head" style="margin-bottom:28px;align-items:center">
      <div class="seg" role="group" aria-label="${T("Villa type", "نوع الفيلا")}">${types.map(([k, n]) => `<button data-mtype="${k}" class="${S.mtype === k ? "on" : ""}" aria-pressed="${S.mtype === k}">${n}</button>`).join("")}</div>
      <label class="tog"><input type="checkbox" data-mavail ${S.mavail ? "checked" : ""}> ${T("Show available only", "المتاح فقط")}</label></div>
    <div class="mp"><div class="mp-map"><span class="mp-hint">${T("Swipe the plan sideways to see every plot.", "اسحب المخطط جانباً لرؤية جميع القطع.")}</span><div class="mp-scroll">${masterplanSVG(true)}</div>${legend()}<p class="mute" style="font-size:13px">${T("Illustrative plan, not to scale. Statuses are sample data.", "مخطط توضيحي ليس بمقياس رسم. الحالات بيانات تجريبية.")}</p></div>
      <aside class="aside mp-panel" id="plot-panel" aria-live="polite">${plotPanel()}</aside></div></section>
  <section class="sec" style="padding-top:0"><h2 style="font-size:42px;margin-bottom:26px">${T("Available now", "المتاح الآن")}</h2>
    <div class="avail">${VILLAS.map((v) => { const ps = plots().filter((p) => p.type === v.id && p.st === "A"); return `<div class="stack" style="gap:12px"><div class="row" style="justify-content:space-between;align-items:baseline"><h3 style="font-size:28px">${L(v.name)}</h3><span class="mute" style="font-size:14px">${T("from", "من")} ${sar(S.mode === "sale" ? v.sale : v.rent)}</span></div><span class="mute" style="font-size:14px">${num(v.beds)} ${T("bedrooms", "غرف نوم")} · ${num(v.built)} ${T("m²", "م²")} · ${L(FACING[v.id])}</span><div class="pbtns">${ps.length ? ps.map(plotBtn).join("") : `<span class="mute">${T("None right now", "لا يوجد حالياً")}</span>`}</div></div>`; }).join("")}</div></section>${visitSection()}`;
}
function mpTeaser() {
  return `<section class="sec paper-soft"><div class="cols">${`<a href="#masterplan" class="mp-mini" aria-label="${T("Open the masterplan", "افتح المخطط العام")}">${masterplanSVG(false)}</a>`}
    <div class="stack"><div class="eyebrow">${T("Masterplan", "المخطط العام")}</div><h2>${T("Pick the plot, not just the villa", "اختر القطعة لا الفيلا فقط")}</h2>
      <p class="soft">${T("See exactly which villas are still free, which face the park and which sit on the quieter outer lanes.", "اعرف أي الفلل ما زالت متاحة، وأيها يطل على المنتزه، وأيها على الممرات الخارجية الأهدأ.")}</p>
      <div class="rows">${VILLAS.map((v) => `<div><span>${L(v.name)}</span><span>${num(countOf(v.id, "A"))} ${T("available", "متاحة")}</span></div>`).join("")}</div>
      <a class="btn btn-brass" href="#masterplan" style="align-self:flex-start">${T("Open the masterplan", "افتح المخطط العام")}</a></div></div></section>`;
}

/* ---------- payment calculator ---------- */
function calcNumbers(v) {
  const down = v.sale * S.down / 100, loan = v.sale - down, r = S.rate / 100 / 12, n = S.years * 12;
  const monthly = r ? (loan * r) / (1 - Math.pow(1 + r, -n)) : loan / n;
  return { down, loan, monthly, total: monthly * n + down, per: v.rent / S.split, deposit: v.rent * PAYMENT.deposit / 100 };
}
function calcOut(v) {
  const c = calcNumbers(v);
  if (S.mode === "sale") return `<div class="cbig"><span class="caps mute">${T("Monthly instalment", "القسط الشهري")}</span><b>${sar(c.monthly)}</b></div>
    <div class="rows"><div><span>${T("Down payment", "الدفعة الأولى")}</span><span>${sar(c.down)}</span></div><div><span>${T("Amount financed", "مبلغ التمويل")}</span><span>${sar(c.loan)}</span></div><div><span>${T("Total over the term", "الإجمالي طوال المدة")}</span><span>${sar(c.total)}</span></div><div><span>${T("Or buy outright", "أو شراء نقدي")}</span><span>${sar(v.sale)}</span></div></div>`;
  return `<div class="cbig"><span class="caps mute">${S.split === 1 ? T("One payment a year", "دفعة واحدة سنوياً") : T(`Each of ${S.split} payments`, `كل دفعة من ${S.split} دفعات`)}</span><b>${sar(c.per)}</b></div>
    <div class="rows"><div><span>${T("Yearly rent", "الإيجار السنوي")}</span><span>${sar(v.rent)}</span></div><div><span>${T(`Security deposit (${PAYMENT.deposit}%)`, `التأمين (${PAYMENT.deposit}٪)`)}</span><span>${sar(c.deposit)}</span></div><div><span>${T("Contract", "العقد")}</span><span>${T("Registered in Ejar", "موثق في إيجار")}</span></div></div>`;
}
function calcWa(v) {
  const c = calcNumbers(v);
  return S.mode === "sale"
    ? wa(T(`Hello, I am interested in ${v.name.en} at Nakhla Residences with a ${S.down}% down payment over ${S.years} years (about ${fmt(c.monthly)} SAR a month in the site's example). Can you send me the real figures?`, `السلام عليكم، مهتم بفيلا ${v.name.ar} في نخلة ريزيدنس بدفعة أولى ${S.down}٪ على ${S.years} سنة (قرابة ${fmt(c.monthly)} ريال شهرياً حسب مثال الموقع). أرجو إرسال الأرقام الفعلية.`))
    : wa(T(`Hello, I would like to rent ${v.name.en} at Nakhla Residences, paying in ${S.split} instalment(s) of about ${fmt(c.per)} SAR.`, `السلام عليكم، أرغب باستئجار فيلا ${v.name.ar} في نخلة ريزيدنس على ${S.split} دفعة بقيمة ${fmt(c.per)} ريال تقريباً.`));
}
function calcBlock(v) {
  const rng = (k, min, max, step, val, label, unit) => `<label class="rng"><span>${label}<b data-out="${k}">${num(val)}${unit}</b></span><input type="range" data-calc="${k}" min="${min}" max="${max}" step="${step}" value="${val}"></label>`;
  const controls = S.mode === "sale"
    ? rng("down", PAYMENT.minDown, PAYMENT.maxDown, 5, S.down, T("Down payment", "الدفعة الأولى"), "%") + rng("years", 5, PAYMENT.maxYears, 1, S.years, T("Years", "عدد السنوات"), "") + rng("rate", 2, 8, 0.25, S.rate, T("Example yearly rate", "نسبة سنوية كمثال"), "%")
    : `<div class="stack" style="gap:10px"><span class="caps mute">${T("Payments a year", "عدد الدفعات سنوياً")}</span><div class="seg" role="group">${PAYMENT.rentSplits.map((n) => `<button data-split="${n}" class="${S.split === n ? "on" : ""}" aria-pressed="${S.split === n}">${num(n)}</button>`).join("")}</div></div>`;
  return `<div class="stack"><div class="sec-head" style="margin:0;align-items:center"><h2 style="font-size:42px">${T("Ways to pay", "طرق الدفع")}</h2>${seg()}</div>
    <div class="calc" data-villa="${v.id}"><div class="stack" style="gap:22px">${controls}</div>
      <div class="stack" style="gap:18px"><div id="calc-out" aria-live="polite">${calcOut(v)}</div>
        <a class="btn btn-brass" id="calc-wa" target="_blank" rel="noopener" href="${calcWa(v)}">${T("Send me this plan on WhatsApp", "أرسل لي هذه الخطة عبر واتساب")}</a></div></div>
    <p class="mute" style="font-size:13px">${T("An illustration only, not a bank offer. The real rate and terms depend on the bank and your salary.", "للتوضيح فقط وليس عرضاً من بنك. النسبة والشروط الفعلية تعتمد على البنك وراتبك.")}</p></div>`;
}

/* ---------- brochure ---------- */
function pageBrochure() {
  if (!S.bro) {
    return pageHead(T("Brochure", "الكتيّب"), T("Take Nakhla home with you", "خذ نخلة معك"), T("Every villa, floor plan and price in one document you can save, print or share with your family.", "جميع الفلل والمخططات والأسعار في ملف واحد تحفظه أو تطبعه أو تشاركه مع عائلتك.")) +
    `<section class="sec"><div class="cols" style="align-items:start"><div class="bro-prev" aria-hidden="true">${ph("hero", "")}<div><b>${L(SITE.name)}</b><span>${T("Brochure", "الكتيّب")} · ${num(new Date().getFullYear())}</span></div></div>
      <div class="stack"><h2 style="font-size:42px">${T("Where should we send updates?", "أين نرسل لك المستجدات؟")}</h2>
        <p class="soft">${T("Leave your name and mobile and the brochure opens straight away. We will only call about Nakhla.", "اترك اسمك ورقم جوالك ويفتح الكتيّب مباشرة. لن نتصل إلا بخصوص نخلة.")}</p>
        <div class="rows">${[T("Three villa types with floor plans", "ثلاثة نماذج فلل مع المخططات"), T("Sale and rent prices", "أسعار البيع والإيجار"), T("Facilities, location and payment options", "المرافق والموقع وطرق الدفع")].map((x) => `<div><span>${x}</span><span>✓</span></div>`).join("")}</div>
        <form class="f" data-form data-kind="brochure" novalidate><label>${T("Name", "الاسم")}<input name="name" required autocomplete="name"></label><label>${T("Mobile", "رقم الجوال")}<input name="phone" required inputmode="tel" dir="ltr" autocomplete="tel" placeholder="05XXXXXXXX"></label>
          <button class="btn btn-brass full">${T("Open the brochure", "افتح الكتيّب")}</button></form></div></div></section>`;
  }
  const c = (v) => { const r = PAYMENT.rate / 100 / 12, n = PAYMENT.years * 12, P = v.sale * (1 - PAYMENT.minDown / 100); return (P * r) / (1 - Math.pow(1 + r, -n)); };
  return `<div class="bro-bar no-print"><span>${T("Your brochure is ready.", "كتيّبك جاهز.")}</span><div class="row"><button class="btn btn-brass btn-sm" data-print>${T("Save as PDF or print", "احفظ PDF أو اطبع")}</button><a class="btn btn-line btn-sm" target="_blank" rel="noopener" href="${wa(T("Hello, I have read the Nakhla Residences brochure and would like to know more.", "السلام عليكم، اطلعت على كتيّب نخلة ريزيدنس وأرغب بمعرفة المزيد."))}">${T("Ask on WhatsApp", "اسأل عبر واتساب")}</a></div></div>
  <div class="bro">
    <section class="bro-page bro-cover">${ph("hero", "")}<div class="bro-cover-in"><span class="eyebrow">${T("A gated villa community · North Riyadh", "مجمع فلل مسوّر · شمال الرياض")}</span><h1>${L(SITE.name)}</h1><p>${T("A garden behind the walls of the city", "حديقة خلف أسوار المدينة")}</p></div></section>
    <section class="bro-page"><span class="eyebrow">${T("At a glance", "لمحة سريعة")}</span><h2>${T("Eighty-nine villas around a shaded park", "تسع وثمانون فيلا حول منتزه مظلل")}</h2>
      <div class="bro-stats">${[[89, T("Villas", "فيلا")], [3, T("Villa types", "نماذج")], ["30,600 " + T("m²", "م²"), T("Landscaped grounds", "مساحات منسقة")], ["24 / 7", T("Security", "أمن")]].map(([a, b]) => `<div><b>${num(a)}</b><span>${b}</span></div>`).join("")}</div>
      <div class="bro-mp">${masterplanSVG(false)}${legend()}</div></section>
    ${VILLAS.map((v) => `<section class="bro-page"><div class="bro-v">${ph(v.id, L(v.name))}<div class="stack" style="gap:14px"><span class="eyebrow">${T("Villa type", "نموذج")}</span><h2>${L(v.name)}</h2><p class="soft">${L(v.tag)}</p>
        <div class="pfacts"><div><b>${num(v.beds)}</b><span>${T("Bedrooms", "غرف النوم")}</span></div><div><b>${num(v.baths)}</b><span>${T("Bathrooms", "دورات المياه")}</span></div><div><b>${num(v.built)}</b><span>${T("m² built", "م² بناء")}</span></div><div><b>${num(v.plot)}</b><span>${T("m² plot", "م² أرض")}</span></div></div>
        <div class="rows"><div><span>${T("Sale price", "سعر البيع")}</span><span>${sar(v.sale)}</span></div><div><span>${T("Yearly rent", "الإيجار السنوي")}</span><span>${sar(v.rent)}</span></div><div><span>${T("Available", "المتاح")}</span><span>${num(v.available)} ${T("of", "من")} ${num(v.count)}</span></div></div></div></div>
      <div class="bro-cols">${v.floors.map((f) => `<div><h4>${T(f.en + " floor", "الدور " + f.ar)}</h4>${f.rooms.map((rm) => `<div class="bro-r"><span>${T(rm[0], rm[1])}</span><span>${num(rm[2])} ${T("m²", "م²")}</span></div>`).join("")}</div>`).join("")}</div>
      <div class="list2">${v.features.map((f) => `<div>${L(f)}</div>`).join("")}</div></section>`).join("")}
    <section class="bro-page"><span class="eyebrow">${T("Life here", "الحياة هنا")}</span><h2>${T("Everything is inside the gate", "كل شيء داخل البوابة")}</h2>
      <div class="bro-fac">${FACILITIES.map((f) => `<div>${ph(f.ph, L(f.t))}<h4>${L(f.t)}</h4><p class="soft">${L(f.d)}</p></div>`).join("")}</div></section>
    <section class="bro-page"><div class="bro-cols2"><div class="stack"><span class="eyebrow">${T("Location", "الموقع")}</span><h2>${L(SITE.address)}</h2><div class="rows">${NEARBY.map(([n, m]) => `<div><span>${L(n)}</span><span>${num(m)} ${T("min", "دقيقة")}</span></div>`).join("")}</div></div>
      <div class="stack"><span class="eyebrow">${T("Ways to pay", "طرق الدفع")}</span><h2>${T("Buy or rent", "شراء أو إيجار")}</h2><div class="rows">
        <div><span>${T("Buy outright", "شراء نقدي")}</span><span>${T("Title deed on completion", "إفراغ الصك عند الإتمام")}</span></div>
        <div><span>${T("Mortgage example, The Talh", "مثال تمويل، الطلح")}</span><span>${sar(c(VILLAS[2]))} ${T("/ month", "/ شهرياً")}</span></div>
        <div><span>${T("Rent", "الإيجار")}</span><span>${T("1, 2 or 4 payments a year", "١ أو ٢ أو ٤ دفعات سنوياً")}</span></div>
        <div><span>${T("Contracts", "العقود")}</span><span>${T("Registered in Ejar", "موثقة في إيجار")}</span></div></div>
        <p class="mute" style="font-size:13px">${T(`Mortgage example: ${PAYMENT.minDown}% down, ${PAYMENT.years} years, ${PAYMENT.rate}% example rate. Not a bank offer.`, `مثال التمويل: دفعة ${PAYMENT.minDown}٪، ${PAYMENT.years} سنة، نسبة ${PAYMENT.rate}٪ كمثال. ليس عرضاً بنكياً.`)}</p></div></div>
      <div class="lic" style="margin-top:40px"><div class="stack" style="gap:6px"><b style="font-weight:500">${L(SITE.name)}</b><span>${num(SITE.phone)} · ${SITE.email}</span><span>${L(SITE.hours)}</span><span class="mute">${T("FAL licence", "رخصة فال")} ${num(SITE.fal)} · ${T("CR", "سجل تجاري")} ${num(SITE.cr)} · ${T("Sample figures for demonstration", "أرقام تجريبية للعرض")}</span></div><div class="qr">REGA<br>QR</div></div></section>
  </div>`;
}
const broStrip = () => `<section class="bro-strip"><div><h3>${T("The full brochure", "الكتيّب الكامل")}</h3><p class="soft">${T("Every villa, floor plan and price in one file to share with your family.", "جميع الفلل والمخططات والأسعار في ملف واحد تشاركه مع عائلتك.")}</p></div><a class="btn btn-line" href="#brochure">${T("Get the brochure", "احصل على الكتيّب")}</a></section>`;

/* ---------- FAQ ---------- */
function pageFaq() {
  return pageHead(T("Questions", "الأسئلة الشائعة"), T("Before you visit", "قبل زيارتك"), T("The questions families ask us most, answered in one place.", "أكثر الأسئلة التي تطرحها العائلات، مجابة في مكان واحد.")) +
  `<section class="sec"><div class="faq">${FAQ.map((g) => `<div class="faq-g"><h2 style="font-size:38px">${L(g.g)}</h2><div>${g.items.map(([q, a]) => `<details class="qa"><summary>${L(q)}</summary><p class="soft">${L(a)}</p></details>`).join("")}</div></div>`).join("")}</div>
    <div class="bro-strip" style="margin-top:70px"><div><h3>${T("Still have a question?", "لديك سؤال آخر؟")}</h3><p class="soft">${T("Message the leasing team and we usually answer within minutes.", "راسل فريق التأجير وغالباً نرد خلال دقائق.")}</p></div><a class="btn btn-brass" target="_blank" rel="noopener" href="${wa(T("Hello, I have a question about Nakhla Residences.", "السلام عليكم، لدي سؤال عن نخلة ريزيدنس."))}">${T("Ask on WhatsApp", "اسأل عبر واتساب")}</a></div></section>${visitSection()}`;
}

/* ---------- chrome + render ---------- */
const NAV = [["villas", "Villas", "الفلل"], ["masterplan", "Masterplan", "المخطط العام"], ["life", "Life here", "الحياة هنا"], ["location", "Location", "الموقع"], ["gallery", "Gallery", "الصور"], ["faq", "FAQ", "الأسئلة"], ["contact", "Contact", "تواصل"]];
function chrome() {
  const r = route();
  $("#header").innerHTML = `<div class="hd"><a class="brand" href="#home">${L(SITE.name)}</a>
    <nav class="nav caps" id="nav" aria-label="Main">${NAV.map(([k, e, a]) => `<a href="#${k}" class="${r === k || (k === "villas" && r.startsWith("villa-")) || (k === "masterplan" && r.startsWith("masterplan")) ? "on" : ""}" ${r === k ? `aria-current="page"` : ""}>${T(e, a)}</a>`).join("")}</nav>
    <div class="hd-r"><button class="lang" data-lang lang="${S.lang === "ar" ? "en" : "ar"}">${T("العربية", "English")}</button><a class="btn btn-ghost btn-sm" href="#contact">${T("Book a viewing", "احجز معاينة")}</a>
      <button class="menu-btn" data-menu aria-label="${T("Menu", "القائمة")}" aria-expanded="false"><span></span></button></div></div>`;
  $("#footer").innerHTML = `<div class="ft"><div><div class="brand" style="color:var(--ivory)">${L(SITE.name)}</div><p style="margin-top:10px">${L(SITE.address)}</p></div>
    <div><h4>${T("Explore", "استكشف")}</h4>${NAV.map(([k, e, a]) => `<a href="#${k}">${T(e, a)}</a>`).join("")}<a href="#brochure">${T("Brochure", "الكتيّب")}</a></div>
    <div><h4>${T("Villas", "الفلل")}</h4>${VILLAS.map((v) => `<a href="#villa-${v.id}">${L(v.name)}</a>`).join("")}</div>
    <div><h4>${T("Contact", "تواصل")}</h4><a href="tel:${SITE.phone.replace(/\s/g, "")}">${num(SITE.phone)}</a><a href="mailto:${SITE.email}">${SITE.email}</a><span>${L(SITE.hours)}</span></div></div>
    <div class="ft-b"><span>${T("FAL licence", "رخصة فال")} ${num(SITE.fal)} · ${T("CR", "سجل تجاري")} ${num(SITE.cr)}</span><span>${T("Sample brand for demonstration. All figures and licence numbers are examples. Photos: Unsplash. Video: Pexels.", "علامة تجريبية للعرض. جميع الأرقام والتراخيص أمثلة. الصور من Unsplash والفيديو من Pexels.")}</span></div>`;
  $("#mbar").innerHTML = `<a href="tel:${SITE.phone.replace(/\s/g, "")}">${T("Call", "اتصال")}</a><a target="_blank" rel="noopener" href="${wa(T("Hello", "السلام عليكم"))}">${T("WhatsApp", "واتساب")}</a><a href="#contact">${T("Book a viewing", "احجز معاينة")}</a>`;
}
function render() {
  const r = route();
  document.documentElement.lang = S.lang; document.documentElement.dir = S.lang === "ar" ? "rtl" : "ltr";
  const key = r.startsWith("villa-") ? "villas" : r.startsWith("masterplan") ? "masterplan" : r, nv = NAV.find((n) => n[0] === key);
  const vv = r.startsWith("villa-") && villa(r.slice(6)), pname = vv ? L(vv.name) : key === "brochure" ? T("Brochure", "الكتيّب") : nv ? T(nv[1], nv[2]) : "";
  document.title = (pname ? pname + " · " : "") + T("Nakhla Residences — Villas in North Riyadh", "نخلة ريزيدنس — فلل في شمال الرياض");
  document.body.classList.toggle("is-bro", key === "brochure" && S.bro);
  chrome();
  const pages = { home: pageHome, villas: pageVillas, masterplan: pageMasterplan, life: pageLife, location: pageLocation, gallery: pageGallery, faq: pageFaq, brochure: pageBrochure, contact: pageContact };
  const oldVid = $("#app .hv");
  $("#app").innerHTML = r.startsWith("villa-") ? pageVilla(r.slice(6)) : (pages[key] || pageHome)();
  const isHome = !pages[key] || key === "home";
  document.body.classList.toggle("is-home", isHome && !r.startsWith("villa-"));
  const nv2 = $("#app .hv"); if (oldVid && nv2) nv2.replaceWith(oldVid);
  heroVideo(); headerState();
}

document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-lang],[data-menu],[data-mode],[data-floor],[data-gf],[data-zoom],[data-close],[data-plot],[data-plot-clear],[data-mtype],[data-split],[data-print],[data-goplot]"); if (!t) return;
  if (t.dataset.lang !== undefined) { S.lang = S.lang === "ar" ? "en" : "ar"; try { localStorage.setItem("nakhla-lang", S.lang); } catch (x) {} render(); }
  else if (t.dataset.menu !== undefined) { const o = $("#nav").classList.toggle("open"); t.setAttribute("aria-expanded", o); }
  else if (t.dataset.mode) { const y = scrollY; S.mode = t.dataset.mode; render(); scrollTo(0, y); }
  else if (t.dataset.floor) { const y = scrollY; S.floor = +t.dataset.floor; render(); scrollTo(0, y); }
  else if (t.dataset.gf) { S.gfilter = t.dataset.gf; render(); }
  else if (t.dataset.zoom) { const lb = $("#lightbox"); lb.innerHTML = `<button data-close>${T("Close", "إغلاق")}</button>${ph(t.dataset.zoom, t.dataset.label || "")}`; lb.hidden = false; $("#lightbox button").focus(); }
  else if (t.dataset.close !== undefined) $("#lightbox").hidden = true;
  else if (t.dataset.plot) selectPlot(+t.dataset.plot);
  else if (t.dataset.plotClear !== undefined) { S.plot = null; keep(render); }
  else if (t.dataset.mtype) { S.mtype = t.dataset.mtype; if (S.plot && S.mtype !== "all" && plotNo(S.plot).type !== S.mtype) S.plot = null; keep(render); }
  else if (t.dataset.split) { S.split = +t.dataset.split; keep(render); }
  else if (t.dataset.print !== undefined) window.print();
  else if (t.dataset.goplot) S.pendingPlot = +t.dataset.goplot;
});
function keep(fn) { const y = scrollY; fn(); scrollTo(0, y); }
function selectPlot(n) {
  S.plot = n; keep(render);
  const panel = $("#plot-panel");
  if (panel && matchMedia("(max-width:1080px)").matches) panel.scrollIntoView({ behavior: "smooth", block: "start" });
  const g = document.querySelector(`.mp-svg [data-plot="${n}"]`); if (g && !panel?.contains(document.activeElement)) g.focus({ preventScroll: true });
}
document.addEventListener("keydown", (e) => {
  const g = e.target.closest && e.target.closest("svg [data-plot]");
  if (g && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); selectPlot(+g.dataset.plot); }
});
document.addEventListener("change", (e) => { if (e.target.matches("[data-mavail]")) { S.mavail = e.target.checked; if (S.mavail && S.plot && plotNo(S.plot).st !== "A") S.plot = null; keep(render); } });
document.addEventListener("input", (e) => {
  const k = e.target.dataset && e.target.dataset.calc; if (!k) return;
  S[k] = +e.target.value; const v = villa(e.target.closest("[data-villa]").dataset.villa);
  const o = document.querySelector(`[data-out="${k}"]`); if (o) o.innerHTML = num(S[k]) + (k === "years" ? "" : "%");
  $("#calc-out").innerHTML = calcOut(v); $("#calc-wa").href = calcWa(v);
});
$("#lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") e.target.hidden = true; });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") $("#lightbox").hidden = true; });
document.addEventListener("submit", (e) => {
  const f = e.target.closest("[data-form]"); if (!f) return; e.preventDefault();
  f.querySelectorAll(".err,.msg").forEach((x) => x.remove());
  const d = new FormData(f), name = String(d.get("name") || "").trim(), phone = String(d.get("phone") || "").replace(/[\s-]/g, "");
  const fail = (m) => { f.insertAdjacentHTML("beforeend", `<div class="err" role="alert">${m}</div>`); };
  if (!name) return fail(T("Please enter your name.", "فضلاً أدخل اسمك."));
  if (!/^(?:\+?966|0)?5\d{8}$/.test(phone)) return fail(T("Please enter a Saudi mobile number, for example 05XXXXXXXX.", "فضلاً أدخل رقم جوال سعودي، مثال: 05XXXXXXXX."));
  if (f.dataset.kind === "brochure") { S.bro = true; try { localStorage.setItem("nakhla-brochure", "1"); } catch (x) {} render(); scrollTo(0, 0); return; }
  const ref = f.dataset.ref, day = d.get("day"), mode = d.get("mode");
  const text = T(`Viewing request${ref ? " for " + ref : ""}\nName: ${name}\nMobile: ${phone}${day ? "\nDay: " + day : ""}${mode ? "\nInterested in: " + mode : ""}`, `طلب معاينة${ref ? " – " + ref : ""}\nالاسم: ${name}\nالجوال: ${phone}${day ? "\nاليوم: " + day : ""}`);
  f.insertAdjacentHTML("beforeend", `<div class="msg" role="status"><strong style="font-weight:500">${T("Thank you. Your request is ready.", "شكراً لك. طلبك جاهز.")}</strong><span class="mute">${T("This is a demonstration site, so nothing has been sent. On a client site the request reaches the leasing team by email and WhatsApp.", "هذا موقع تجريبي ولم يُرسل شيء. في موقع العميل يصل الطلب لفريق التأجير بالبريد والواتساب.")}</span><a class="link" target="_blank" rel="noopener" href="${wa(text)}">${T("Send it on WhatsApp", "أرسله عبر واتساب")}</a></div>`);
});
/* ---------- hero video ---------- */
const quiet = () => matchMedia("(prefers-reduced-motion: reduce)").matches || (navigator.connection && navigator.connection.saveData);
function heroVideo() {
  const v = $("#app .hv"); if (!v) return;
  const btn = $("[data-hv]");
  if (!v.src && !S.vidPaused && !quiet()) { v.src = innerWidth < 760 ? v.dataset.srcSm : v.dataset.src; v.preload = "auto"; }
  if (!v.dataset.wired) {
    v.dataset.wired = 1;
    v.addEventListener("playing", () => v.closest(".hero").classList.add("playing"));
    v.addEventListener("error", () => { v.remove(); $("[data-hv]")?.remove(); });
  }
  if (v.src && !S.vidPaused) { const p = v.play(); if (p) p.catch(() => {}); }
  if (btn) { const paused = S.vidPaused || quiet(); btn.classList.toggle("paused", paused); btn.setAttribute("aria-label", paused ? T("Play the video", "تشغيل الفيديو") : T("Pause the video", "إيقاف الفيديو")); }
  if (v.src && v.readyState > 2 && !v.paused) v.closest(".hero").classList.add("playing");
}
function headerState() { document.body.classList.toggle("over", document.body.classList.contains("is-home") && scrollY < 40); }
addEventListener("scroll", headerState, { passive: true });
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-hv]");
  if (b) { const v = $("#app .hv"); S.vidPaused = !S.vidPaused;
    if (S.vidPaused) v && v.pause(); else { if (v && !v.src) { v.src = innerWidth < 760 ? v.dataset.srcSm : v.dataset.src; } v && v.play().catch(() => {}); }
    heroVideo(); return; }
  const d = e.target.closest("[data-scroll]");
  if (d) { e.preventDefault(); document.getElementById(d.getAttribute("href").slice(1)).scrollIntoView({ behavior: "smooth" }); }
});
document.addEventListener("visibilitychange", () => { const v = $("#app .hv"); if (v && v.src && !S.vidPaused) document.hidden ? v.pause() : v.play().catch(() => {}); });

function applyRoute() {
  const r = route();
  if (r.startsWith("masterplan-")) { const t = r.slice(11); if (villa(t)) { S.mtype = t; S.mavail = false; } }
  if (r.startsWith("masterplan")) { S.plot = S.pendingPlot || null; S.pendingPlot = null; }
}
window.addEventListener("hashchange", () => { S.floor = 0; $("#lightbox").hidden = true; $("#nav")?.classList.remove("open"); applyRoute(); render(); scrollTo(0, 0); $("#app").focus({ preventScroll: true }); });
applyRoute(); render();
