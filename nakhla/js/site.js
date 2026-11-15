/* NAKHLA RESIDENCES — site logic (no dependencies) */
const S = { lang: "en", mode: "sale", floor: 0, gfilter: "all" };
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
function pageHome() {
  return `<section class="hero">${ph("hero", T("villa and pool at dusk", "فيلا ومسبح وقت الغروب"))}
    <div class="hero-in"><div class="eyebrow">${T("A gated villa community · North Riyadh", "مجمع فلل مسوّر · شمال الرياض")}</div>
      <h1>${T("A garden behind the walls of the city", "حديقة خلف أسوار المدينة")}</h1>
      <p class="soft">${T("Eighty-nine villas around a shaded central park, managed and maintained by a team that lives on site.", "تسع وثمانون فيلا حول منتزه مظلل، يديرها ويصونها فريق يقيم في المجمع.")}</p>
      <div class="row"><a class="btn btn-brass" href="#contact">${T("Book a private viewing", "احجز معاينة خاصة")}</a><a class="btn btn-line" href="#villas">${T("See the villas", "شاهد الفلل")}</a></div></div></section>
  <section class="stats">
    <div><b>${num(89)}</b><span class="caps mute">${T("Villas, three layouts", "فيلا بثلاثة نماذج")}</span></div>
    <div><b>${num("30,600")} ${T("m²", "م²")}</b><span class="caps mute">${T("Of landscaped grounds", "من المساحات المنسقة")}</span></div>
    <div><b>${num("24 / 7")}</b><span class="caps mute">${T("Security and maintenance", "أمن وصيانة")}</span></div>
    <div><b>${num(SITE.fal)}</b><span class="caps mute">${T("FAL licence · REGA", "رخصة فال · الهيئة العامة للعقار")}</span></div></section>
  <section class="sec"><div class="sec-head"><div><div class="eyebrow">${T("The collection", "المجموعة")}</div><h2>${T("Three villas, for sale or rent", "ثلاثة نماذج للبيع أو الإيجار")}</h2></div>${seg()}</div>
    <div class="cards">${VILLAS.map(vcard).join("")}</div></section>
  <section class="split paper">${ph("life", T("shaded seating in the central park", "جلسة مظللة في المنتزه"), "light")}
    <div class="txt"><div class="eyebrow">${T("Life here", "الحياة هنا")}</div><h2>${T("Your home does not end at your front door", "بيتك لا ينتهي عند باب الدار")}</h2>
      <p class="soft">${T("Step outside to a pool, a gym, tennis and padel courts, a children's club and a café, all inside the walls and all looked after for you.", "خارج باب بيتك مسبح ونادٍ رياضي وملاعب تنس وبادل ونادٍ للأطفال ومقهى، كلها داخل الأسوار ونحن نعتني بها.")}</p>
      <div class="list2">${FACILITIES.map((f) => `<div>${L(f.t)}</div>`).join("")}</div>
      <a class="link" href="#life">${T("Explore the facilities", "استكشف المرافق")}</a></div></section>
  ${locationBlock()}${visitSection()}`;
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
    `<section class="sec"><div class="sec-head"><span class="caps mute">${num(VILLAS.reduce((a, v) => a + v.available, 0))} ${T("villas available now", "فيلا متاحة الآن")}</span>${seg()}</div><div class="cards">${VILLAS.map(vcard).join("")}</div></section>${visitSection()}`;
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
  const r = 0.045 / 12, n = 240, P = v.sale * 0.9, monthly = (P * r) / (1 - Math.pow(1 + r, -n));
  const others = VILLAS.filter((x) => x.id !== v.id);
  const g = (slot, label, cls) => ph(slot, label, cls, "button", `data-zoom="${slot}" data-label="${esc(label)}" aria-label="${T("Enlarge photo", "تكبير الصورة")}: ${esc(label)}"`);
  return `<section class="vhead"><div class="stack" style="gap:14px"><div class="eyebrow">${T("The collection", "المجموعة")} · ${num(v.count)} ${T("villas of this type", "فيلا من هذا النموذج")}</div>
      <h1>${L(v.name)}</h1><p class="soft" style="font-size:19px">${L(v.tag)}</p></div>
    <div class="stack" style="gap:10px;align-items:flex-start">${seg()}<div class="price">${priceOf(v)}</div><div class="mute" style="font-size:14px">${num(v.available)} ${T("of", "من")} ${num(v.count)} ${T("available · ready to move in", "متاحة · جاهزة للسكن")}</div></div></section>
  <section class="gal">${g(v.id, T("exterior", "الواجهة"), "big")}<div class="sm">${g(v.id + "2", T("living room", "صالة المعيشة"))}${g(v.id + "3", T("interior", "من الداخل"))}</div></section>
  <section class="facts">${[[v.beds, T("Bedrooms", "غرف النوم")], [v.baths, T("Bathrooms", "دورات المياه")], [v.built + " " + T("m²", "م²"), T("Built area", "مسطح البناء")], [v.plot + " " + T("m²", "م²"), T("Plot", "مساحة الأرض")], [v.parking, T("Covered parking", "مواقف مظللة")]].map(([a, b]) => `<div><b>${num(a)}</b><span class="caps mute">${b}</span></div>`).join("")}</section>
  <section class="body"><div class="main">
    <div class="stack" style="gap:18px"><h2 style="font-size:42px">${L(v.headline)}</h2><p class="soft" style="max-width:640px">${L(v.desc)}</p></div>
    <div class="stack"><div class="sec-head" style="margin:0;align-items:center"><h2 style="font-size:42px">${T("Floor plans", "مخططات الأدوار")}</h2>
      <div class="seg" role="group">${v.floors.map((f, i) => `<button data-floor="${i}" class="${i === fi ? "on" : ""}" aria-pressed="${i === fi}">${T(f.en, f.ar)}</button>`).join("")}</div></div>
      <div class="plan"><div>${planSVG(fl.rooms)}<p class="mute" style="font-size:13px;margin-top:8px">${T("Schematic, not to scale. Architect's drawings replace this on a client site.", "مخطط توضيحي ليس بمقياس رسم. يُستبدل بمخططات المعماري في موقع العميل.")}</p></div>
        <div class="rows">${fl.rooms.map((rm, i) => `<div><span>${num(i + 1)}. ${T(rm[0], rm[1])}</span><span class="mute" style="color:var(--mute)">${num(rm[2])} ${T("m²", "م²")}</span></div>`).join("")}</div></div></div>
    <div class="stack"><h2 style="font-size:42px">${T("Inside the villa", "داخل الفيلا")}</h2><div class="list2">${v.features.map((f) => `<div>${L(f)}</div>`).join("")}</div></div>
    <div class="stack"><h2 style="font-size:42px">${T("Ways to pay", "طرق الدفع")}</h2><div class="pay">
      <div><span class="eyebrow" style="letter-spacing:.14em">${T("Buy outright", "شراء نقدي")}</span><b>${sar(v.sale)}</b><span class="mute" style="font-size:14px">${T("Title deed transferred on completion", "إفراغ الصك عند إتمام البيع")}</span></div>
      <div><span class="eyebrow" style="letter-spacing:.14em">${T("Mortgage", "تمويل عقاري")}</span><b>${sar(monthly)}</b><span class="mute" style="font-size:14px">${T("A month. Illustration only: 10% down, 20 years, 4.5% example rate", "شهرياً. للتوضيح فقط: دفعة ١٠٪، ٢٠ سنة، نسبة ٤٫٥٪ كمثال")}</span></div>
      <div><span class="eyebrow" style="letter-spacing:.14em">${T("Rent", "إيجار")}</span><b>${sar(v.rent)}</b><span class="mute" style="font-size:14px">${T("A year, in one, two or four payments, with an Ejar contract", "سنوياً، بدفعة أو دفعتين أو أربع، بعقد موثق في إيجار")}</span></div></div></div>
    <div class="lic"><div class="stack" style="gap:6px"><span class="eyebrow" style="letter-spacing:.14em">${T("Licence details (sample)", "بيانات الترخيص (تجريبية)")}</span><span>${T("Advertising licence", "ترخيص الإعلان")} ${num(v.adLicense)} · ${T("valid to", "ساري حتى")} ${num(v.adExpiry)}</span><span>${T("FAL licence", "رخصة فال")} ${num(SITE.fal)} · ${T("Advertiser", "المعلن")}: ${L(SITE.name)}</span></div><div class="qr">REGA<br>QR</div></div>
  </div>
  <aside class="aside"><h3 style="font-size:34px">${T("Visit", "زيارة")} ${L(v.name)}</h3><p class="soft" style="font-size:15px">${T("A show villa is open every day. Choose a day and we will meet you at the gate.", "فيلا العرض مفتوحة يومياً. اختر اليوم وسنستقبلك عند البوابة.")}</p>
    ${visitForm(v.name.en, true)}
    <a class="btn btn-line" target="_blank" rel="noopener" href="${wa(T(`Hello, I am interested in ${v.name.en} at Nakhla Residences. Is it still available?`, `السلام عليكم، مهتم بفيلا ${v.name.ar} في نخلة ريزيدنس. هل ما زالت متاحة؟`))}">${T("Ask on WhatsApp", "اسأل عبر واتساب")}</a>
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
    `<section class="sec"><div class="rows" style="max-width:720px"><div><span>${T("Phone", "الهاتف")}</span><span>${num(SITE.phone)}</span></div><div><span>${T("Email", "البريد")}</span><span>${SITE.email}</span></div><div><span>${T("Address", "العنوان")}</span><span style="white-space:normal;text-align:end">${L(SITE.address)}</span></div><div><span>${T("Hours", "ساعات العمل")}</span><span style="white-space:normal;text-align:end">${L(SITE.hours)}</span></div></div></section>`;
}

/* ---------- chrome + render ---------- */
const NAV = [["villas", "Villas", "الفلل"], ["life", "Life here", "الحياة هنا"], ["location", "Location", "الموقع"], ["gallery", "Gallery", "الصور"], ["contact", "Contact", "تواصل"]];
function chrome() {
  const r = route();
  $("#header").innerHTML = `<div class="hd"><a class="brand" href="#home">${L(SITE.name)}</a>
    <nav class="nav caps" id="nav" aria-label="Main">${NAV.map(([k, e, a]) => `<a href="#${k}" class="${r === k || (k === "villas" && r.startsWith("villa-")) ? "on" : ""}">${T(e, a)}</a>`).join("")}</nav>
    <div class="hd-r"><button class="lang" data-lang lang="${S.lang === "ar" ? "en" : "ar"}">${T("العربية", "English")}</button><a class="btn btn-ghost btn-sm" href="#contact">${T("Book a viewing", "احجز معاينة")}</a>
      <button class="menu-btn" data-menu aria-label="${T("Menu", "القائمة")}" aria-expanded="false"><span></span></button></div></div>`;
  $("#footer").innerHTML = `<div class="ft"><div><div class="brand" style="color:var(--ivory)">${L(SITE.name)}</div><p style="margin-top:10px">${L(SITE.address)}</p></div>
    <div><h4>${T("Explore", "استكشف")}</h4>${NAV.map(([k, e, a]) => `<a href="#${k}">${T(e, a)}</a>`).join("")}</div>
    <div><h4>${T("Villas", "الفلل")}</h4>${VILLAS.map((v) => `<a href="#villa-${v.id}">${L(v.name)}</a>`).join("")}</div>
    <div><h4>${T("Contact", "تواصل")}</h4><a href="tel:${SITE.phone.replace(/\s/g, "")}">${num(SITE.phone)}</a><a href="mailto:${SITE.email}">${SITE.email}</a><span>${L(SITE.hours)}</span></div></div>
    <div class="ft-b"><span>${T("FAL licence", "رخصة فال")} ${num(SITE.fal)} · ${T("CR", "سجل تجاري")} ${num(SITE.cr)}</span><span>${T("Sample brand for demonstration. All figures and licence numbers are examples. Photos: Unsplash.", "علامة تجريبية للعرض. جميع الأرقام والتراخيص أمثلة. الصور من Unsplash.")}</span></div>`;
  $("#mbar").innerHTML = `<a href="tel:${SITE.phone.replace(/\s/g, "")}">${T("Call", "اتصال")}</a><a target="_blank" rel="noopener" href="${wa(T("Hello", "السلام عليكم"))}">${T("WhatsApp", "واتساب")}</a><a href="#contact">${T("Book a viewing", "احجز معاينة")}</a>`;
}
function render() {
  const r = route();
  document.documentElement.lang = S.lang; document.documentElement.dir = S.lang === "ar" ? "rtl" : "ltr";
  document.title = T("Nakhla Residences — Villas in North Riyadh", "نخلة ريزيدنس — فلل في شمال الرياض");
  chrome();
  const pages = { home: pageHome, villas: pageVillas, life: pageLife, location: pageLocation, gallery: pageGallery, contact: pageContact };
  $("#app").innerHTML = r.startsWith("villa-") ? pageVilla(r.slice(6)) : (pages[r] || pageHome)();
}

document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-lang],[data-menu],[data-mode],[data-floor],[data-gf],[data-zoom],[data-close]"); if (!t) return;
  if (t.dataset.lang !== undefined) { S.lang = S.lang === "ar" ? "en" : "ar"; try { localStorage.setItem("nakhla-lang", S.lang); } catch (x) {} render(); }
  else if (t.dataset.menu !== undefined) { const o = $("#nav").classList.toggle("open"); t.setAttribute("aria-expanded", o); }
  else if (t.dataset.mode) { const y = scrollY; S.mode = t.dataset.mode; render(); scrollTo(0, y); }
  else if (t.dataset.floor) { const y = scrollY; S.floor = +t.dataset.floor; render(); scrollTo(0, y); }
  else if (t.dataset.gf) { S.gfilter = t.dataset.gf; render(); }
  else if (t.dataset.zoom) { const lb = $("#lightbox"); lb.innerHTML = `<button data-close>${T("Close", "إغلاق")}</button>${ph(t.dataset.zoom, t.dataset.label || "")}`; lb.hidden = false; $("#lightbox button").focus(); }
  else if (t.dataset.close !== undefined) $("#lightbox").hidden = true;
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
  const ref = f.dataset.ref, day = d.get("day"), mode = d.get("mode");
  const text = T(`Viewing request${ref ? " for " + ref : ""}\nName: ${name}\nMobile: ${phone}${day ? "\nDay: " + day : ""}${mode ? "\nInterested in: " + mode : ""}`, `طلب معاينة${ref ? " – " + ref : ""}\nالاسم: ${name}\nالجوال: ${phone}${day ? "\nاليوم: " + day : ""}`);
  f.insertAdjacentHTML("beforeend", `<div class="msg" role="status"><strong style="font-weight:500">${T("Thank you. Your request is ready.", "شكراً لك. طلبك جاهز.")}</strong><span class="mute">${T("This is a demonstration site, so nothing has been sent. On a client site the request reaches the leasing team by email and WhatsApp.", "هذا موقع تجريبي ولم يُرسل شيء. في موقع العميل يصل الطلب لفريق التأجير بالبريد والواتساب.")}</span><a class="link" target="_blank" rel="noopener" href="${wa(text)}">${T("Send it on WhatsApp", "أرسله عبر واتساب")}</a></div>`);
});
window.addEventListener("hashchange", () => { S.floor = 0; $("#lightbox").hidden = true; render(); scrollTo(0, 0); $("#app").focus({ preventScroll: true }); });
render();
