/* Shared browser behaviour for the developer sites. No dependencies. */
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const AR = document.documentElement.lang === "ar";
  const T = (en, ar) => (AR ? ar : en);
  const store = { get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
  window.DEV = { $, $$, AR, T, store };

  // Mobile menu
  const mb = $("[data-menu]"), nav = $("#site-nav");
  if (mb && nav) mb.addEventListener("click", () => { const o = nav.classList.toggle("open"); mb.setAttribute("aria-expanded", o); document.body.classList.toggle("menu-open", o); });
  addEventListener("keydown", (e) => { if (e.key === "Escape" && nav && nav.classList.contains("open")) { nav.classList.remove("open"); mb.setAttribute("aria-expanded", false); document.body.classList.remove("menu-open"); mb.focus(); } });

  // Header shadow on scroll
  const hd = $(".site-header"); const onS = () => hd && hd.classList.toggle("scrolled", scrollY > 8); addEventListener("scroll", onS, { passive: true }); onS();

  // Consent / cookie notice (PDPL): only essential storage is used.
  const cn = $("#consent");
  if (cn && !store.get("consent-ok", false)) { cn.hidden = false; $("[data-consent-ok]", cn).addEventListener("click", () => { store.set("consent-ok", true); cn.hidden = true; }); }

  // Lead forms
  const saMobile = (v) => /^(?:\+?966|00966|0)?5\d{8}$/.test(v.replace(/[\s-]/g, ""));
  const setErr = (inp, msg) => { const e = document.getElementById(inp.getAttribute("aria-describedby")); if (e) e.textContent = msg || ""; inp.setAttribute("aria-invalid", msg ? "true" : "false"); };
  document.addEventListener("input", (e) => { if (e.target.matches("[aria-invalid=true]")) setErr(e.target, ""); });
  document.addEventListener("submit", (e) => {
    const f = e.target.closest("form[data-lead]"); if (!f) return; e.preventDefault();
    let bad = null;
    $$("[required]", f).forEach((i) => {
      let m = "";
      if (i.type === "checkbox" && !i.checked) m = T("Please tick to agree before sending.", "يرجى الموافقة قبل الإرسال.");
      else if (i.type !== "checkbox" && !i.value.trim()) m = T("This field is required.", "هذا الحقل مطلوب.");
      else if (i.hasAttribute("data-sa-mobile") && !saMobile(i.value)) m = T("Enter a Saudi mobile number, e.g. 0551234567.", "أدخل رقم جوال سعودي، مثل 0551234567.");
      setErr(i, m); if (m && !bad) bad = i;
    });
    const em = $("[type=email]", f); if (em && em.value && !/^\S+@\S+\.\S+$/.test(em.value)) { setErr(em, T("Enter a valid email.", "أدخل بريداً صحيحاً.")); bad = bad || em; }
    if (bad) { bad.focus(); return; }
    const d = Object.fromEntries(new FormData(f)); d.kind = f.dataset.lead; d.ref = f.dataset.ref; d.at = new Date().toISOString();
    const leads = store.get("leads", []); leads.unshift(d); store.set("leads", leads.slice(0, 50));
    const ok = $(".ok", f); ok.hidden = false;
    ok.innerHTML = `<strong>${T("Thank you, " + (d.name || "").split(" ")[0] + ".", "شكراً " + (d.name || "").split(" ")[0] + ".")}</strong> ${f.dataset.success || T("A sales adviser will contact you within one working hour. This is a demo, so nothing has been sent.", "سيتواصل معك مستشار المبيعات خلال ساعة عمل. هذا عرض تجريبي ولم يُرسل أي شيء.")}`;
    $$("input,select,textarea,button", f).forEach((x) => { if (!x.closest(".ok")) x.disabled = true; });
    ok.focus?.(); f.dispatchEvent(new CustomEvent("lead:done", { bubbles: true, detail: d }));
  });

  // Favourites (heart buttons)
  const favs = () => store.get("favs", []);
  const paintFav = () => $$("[data-fav]").forEach((b) => { const on = favs().includes(b.dataset.fav); b.setAttribute("aria-pressed", on); b.classList.toggle("on", on); });
  document.addEventListener("click", (e) => { const b = e.target.closest("[data-fav]"); if (!b) return; e.preventDefault(); const f = favs(), i = f.indexOf(b.dataset.fav); i < 0 ? f.push(b.dataset.fav) : f.splice(i, 1); store.set("favs", f); paintFav(); document.dispatchEvent(new Event("favs:change")); });
  paintFav();

  // Tabs (role=tablist)
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[role=tab]"); if (!t) return; const list = t.closest("[role=tablist]");
    $$("[role=tab]", list).forEach((x) => { const on = x === t; x.setAttribute("aria-selected", on); x.tabIndex = on ? 0 : -1; const p = document.getElementById(x.getAttribute("aria-controls")); if (p) p.hidden = !on; });
  });
  document.addEventListener("keydown", (e) => {
    const t = e.target.closest && e.target.closest("[role=tab]"); if (!t || !["ArrowLeft", "ArrowRight"].includes(e.key)) return;
    const tabs = $$("[role=tab]", t.closest("[role=tablist]")), i = tabs.indexOf(t), dir = (e.key === "ArrowRight") !== AR ? 1 : -1;
    const n = tabs[(i + dir + tabs.length) % tabs.length]; n.focus(); n.click();
  });

  // Dialogs
  document.addEventListener("click", (e) => { const o = e.target.closest("[data-open]"); if (o) { const d = document.getElementById(o.dataset.open); if (d) { d.showModal(); d.dispatchEvent(new CustomEvent("dlg:open", { detail: o.dataset })); } } const c = e.target.closest("[data-close]"); if (c) c.closest("dialog").close(); });
  document.addEventListener("click", (e) => { if (e.target.tagName === "DIALOG") e.target.close(); });

  // Sticky sub-nav: highlight current section
  const sub = $(".subnav");
  if (sub && "IntersectionObserver" in window) {
    const links = $$("a[href^='#']", sub), map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { links.forEach((a) => a.removeAttribute("aria-current")); const a = map.get(en.target.id); if (a) { a.setAttribute("aria-current", "true"); a.scrollIntoView({ block: "nearest", inline: "center" }); } } }), { rootMargin: "-45% 0px -50% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  // Number formatting helper
  window.DEV.fmt = (n) => { const s = Math.round(n).toLocaleString("en-US"); return AR ? s.replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]) : s; };
  window.DEV.sar = (n) => (AR ? window.DEV.fmt(n) + " ر.س" : "SAR " + window.DEV.fmt(n));
})();
