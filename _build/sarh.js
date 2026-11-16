(() => {
  const { $, $$, AR, T, store, sar, fmt } = window.DEV;
  const data = (() => { try { return JSON.parse($("#page-data")?.textContent || "{}"); } catch (e) { return {}; } })();
  const qs = new URLSearchParams(location.search), n = (x) => (AR ? fmt(x) : x);
  const lb = $("#lightbox"); if (lb) lb.addEventListener("dlg:open", (e) => { $("img", lb).src = e.detail.src; });

  /* Projects filter */
  const pf = $("#pfilter");
  if (pf && data.projects) {
    if (qs.get("sector")) { const r = $(`[name=sector][value="${qs.get("sector")}"]`, pf); if (r) r.checked = true; }
    const run = () => { const s = $("[name=sector]:checked", pf).value, c = pf.elements.city.value; let k = 0; data.projects.forEach((p) => { const on = (!s || p.sector === s) && (!c || p.city === c); $(`[data-p="${p.slug}"]`).hidden = !on; k += on; }); $("#pcount").textContent = AR ? `${fmt(k)} مشروع` : `${k} project${k === 1 ? "" : "s"}`; const u = new URLSearchParams(); if (s) u.set("sector", s); if (c) u.set("city", c); history.replaceState(null, "", location.pathname + (u.toString() ? "?" + u : "")); };
    pf.addEventListener("change", run); run();
  }

  /* Unit floor plan sketch by bedrooms */
  const planSVG = (u) => {
    const rooms = u.type === "ph" ? [["Living", "معيشة", 0, 0, 46, 40], ["Dining", "طعام", 46, 0, 26, 40], ["Kitchen", "مطبخ", 72, 0, 28, 40], ["Master", "رئيسية", 0, 40, 30, 30], ["Bed 2", "نوم ٢", 30, 40, 22, 30], ["Bed 3", "نوم ٣", 52, 40, 22, 30], ["Bed 4", "نوم ٤", 74, 40, 26, 30]]
      : u.beds === 1 ? [["Living", "معيشة", 0, 0, 60, 40], ["Kitchen", "مطبخ", 60, 0, 40, 40], ["Bedroom", "نوم", 0, 40, 60, 30], ["Bath", "حمام", 60, 40, 40, 30]]
      : u.beds === 2 ? [["Living", "معيشة", 0, 0, 55, 40], ["Kitchen", "مطبخ", 55, 0, 45, 40], ["Master", "رئيسية", 0, 40, 40, 30], ["Bed 2", "نوم ٢", 40, 40, 32, 30], ["Bath", "حمام", 72, 40, 28, 30]]
      : [["Living", "معيشة", 0, 0, 50, 40], ["Dining", "طعام", 50, 0, 22, 40], ["Kitchen", "مطبخ", 72, 0, 28, 40], ["Master", "رئيسية", 0, 40, 34, 30], ["Bed 2", "نوم ٢", 34, 40, 24, 30], ["Bed 3", "نوم ٣", 58, 40, 22, 30], ["Maid", "خادمة", 80, 40, 20, 30]];
    return `<svg class="u-plan" viewBox="-2 -2 104 74" role="img" aria-label="${T("Floor plan", "المخطط")}">${rooms.map(([e, a, x, y, w, h]) => { const X = AR ? 100 - x - w : x; return `<rect x="${X}" y="${y}" width="${w}" height="${h}"/><text x="${X + w / 2}" y="${y + h / 2}" text-anchor="middle" dominant-baseline="middle">${T(e, a)}</text>`; }).join("")}</svg>`;
  };
  const compass = (v) => { const ang = { N: 0, E: 90, S: 180, W: 270, SEA: 270 }[v]; return `<span class="compass"><svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="20" fill="none" stroke="#8A6D46"/><text x="22" y="9" text-anchor="middle" font-size="7" fill="#8A6D46">N</text><path d="M22 22 L22 6" stroke="#1E1C1A" stroke-width="3" transform="rotate(${ang} 22 22)"/></svg>${data.views[v]}</span>`; };
  const bedTxt = (u) => (u.type === "ph" ? T("Penthouse", "بنتهاوس") + " · " + n(u.beds) + T(" beds", " غرف") : n(u.beds) + T(" bed", " غرف"));

  /* Residential project: stack + table + dialog */
  const stack = $("#stack");
  if (stack && data.units) {
    const U = data.units, dlg = $("#unit"), body = $("#unit-body"), tb = $("#ubody"), af = $("#afilter");
    const floors = [...new Set(U.map((u) => u.f))].sort((a, b) => b - a);
    stack.innerHTML = floors.map((f) => { const us = U.filter((u) => u.f === f); return `<div class="fl${us[0].type === "ph" ? " ph" : ""}"><span>${T("L", "ط")}${n(f)}</span><div class="cells">${us.map((u) => `<button class="cell ${u.s}" data-u="${u.id}" ${u.s === "S" ? 'disabled aria-disabled="true"' : ""} aria-label="${T("Residence", "الوحدة")} ${u.id}, ${bedTxt(u)}, ${u.s === "A" ? T("available", "متاحة") : u.s === "R" ? T("reserved", "محجوزة") : T("sold", "مباعة")}"></button>`).join("")}</div></div>`; }).join("");
    const open = (id) => {
      const u = U.find((x) => x.id === id); if (!u) return;
      $$(".cell", stack).forEach((c) => c.classList.toggle("sel", c.dataset.u === id));
      const st = { A: T("Available", "متاحة"), R: T("Reserved: join the waiting list", "محجوزة: انضم لقائمة الانتظار"), S: T("Sold", "مباعة") }[u.s];
      body.innerHTML = `<p class="eyebrow">${data.name} · ${T("Level", "الطابق")} ${n(u.f)}</p><h2 id="unit-h" class="h2">${T("Residence", "الوحدة")} ${u.id}</h2>${planSVG(u)}<dl class="u-facts"><div><dt>${T("Bedrooms", "الغرف")}</dt><dd>${bedTxt(u)}</dd></div><div><dt>${T("Size", "المساحة")}</dt><dd>${n(u.size)} ${T("m²", "م²")}</dd></div><div><dt>${T("Status", "الحالة")}</dt><dd>${st}</dd></div></dl>${compass(u.view)}<p class="h3" style="margin:16px 0 4px">${sar(u.price)}</p><p class="muted small">${sar(u.price / u.size)} ${T("per m²", "للمتر")}</p><h3 class="h3" style="font-size:19px;margin-top:18px">${T("Payment schedule", "جدول الدفعات")}</h3><ul class="u-pay">${data.plan.map(([p, l]) => `<li><span>${n(p)}% · ${l}</span><b>${sar(u.price * p / 100)}</b></li>`).join("")}</ul>`;
      $(".unit-form form", dlg).dataset.ref = `${data.slug} ${u.id} ${u.price}`;
      if (!dlg.open) dlg.showModal();
    };
    stack.addEventListener("click", (e) => { const c = e.target.closest(".cell"); if (c && !c.disabled) open(c.dataset.u); });
    document.addEventListener("click", (e) => { const b = e.target.closest("[data-unit]"); if (b) open(b.dataset.unit); });
    const run = () => {
      const beds = $("[name=beds]:checked", af).value, only = af.elements.avail.checked;
      const ok = (u) => (!beds || (beds === "4" ? u.type === "ph" : u.beds === +beds && u.type !== "ph")) && (!only || u.s === "A");
      $$(".cell", stack).forEach((c) => c.classList.toggle("dim", !ok(U.find((u) => u.id === c.dataset.u))));
      const list = U.filter(ok).sort((a, b) => b.f - a.f);
      $("#ucount").textContent = AR ? `${fmt(list.length)} وحدة` : `${list.length} residence${list.length === 1 ? "" : "s"}`;
      tb.innerHTML = list.slice(0, 60).map((u) => `<tr><th scope="row">${u.id}</th><td>${n(u.f)}</td><td>${bedTxt(u)}</td><td>${n(u.size)} ${T("m²", "م²")}</td><td>${data.views[u.view]}</td><td>${u.s === "S" ? T("Sold", "مباعة") : sar(u.price)}</td><td>${u.s === "S" ? "" : `<button class="btn btn-sm btn-dark" data-unit="${u.id}">${T("Details", "التفاصيل")}</button>`}</td></tr>`).join("") + (list.length > 60 ? `<tr><td colspan="7" class="muted">${T("Showing the highest 60. Use the filters or the tower to narrow down.", "يُعرض أعلى ٦٠. استخدم الفلاتر أو البرج للتضييق.")}</td></tr>` : "");
    };
    af.addEventListener("change", run); run();
  }

  /* Residences search across towers */
  const rf = $("#rfilter");
  if (rf && data.units) {
    let shown = 12; const grid = $("#rgrid"), more = $("#rmore");
    const run = () => {
      const e = rf.elements, beds = e.beds.value, max = +e.max.value || Infinity, sort = e.sort.value, key = sort.replace("-", ""), dir = sort[0] === "-" ? -1 : 1;
      const list = data.units.filter((u) => (!e.city.value || u.city === e.city.value) && (!beds || (beds === "4" ? u.type === "ph" : u.beds === +beds && u.type !== "ph")) && u.price <= max).sort((a, b) => (a[key] - b[key]) * dir);
      $("#rcount").textContent = AR ? `${fmt(list.length)} وحدة متاحة` : `${list.length} available residence${list.length === 1 ? "" : "s"}`;
      grid.innerHTML = list.slice(0, shown).map((u) => `<article class="rcard"><p class="eyebrow">${u.pn} · ${T("Level", "الطابق")} ${n(u.f)}</p><h2 class="h3">${T("Residence", "الوحدة")} ${u.id}</h2><p class="muted">${bedTxt(u)} · ${n(u.size)} ${T("m²", "م²")} · ${data.views[u.view]}</p><p class="price">${sar(u.price)}</p><a class="btn btn-sm btn-line" href="${data.urls[u.p]}#availability">${T("View in tower", "شاهدها في البرج")}</a><button class="btn btn-sm btn-line" data-fav="u:${u.p}:${u.id}" aria-pressed="false">${T("Save", "احفظ")}</button></article>`).join("");
      more.hidden = list.length <= shown;
    };
    rf.addEventListener("change", () => { shown = 12; run(); }); more.addEventListener("click", () => { shown += 12; run(); }); run();
  }

  /* Retail enquire ref */
  document.addEventListener("click", (e) => { const a = e.target.closest("[data-unit-ref]"); if (a) { const f = $("#enquire form"); if (f) f.dataset.ref = "arcade " + a.dataset.unitRef; } });

  /* Sales gallery slots */
  const days = $("#days");
  if (days) {
    const times = $("#times"), picked = $("#picked"), form = $("form[data-lead]"), d0 = new Date(); let sel = {};
    const ds = Array.from({ length: 14 }, (_, i) => { const d = new Date(d0); d.setDate(d0.getDate() + i + 1); return d; });
    days.innerHTML = ds.map((d, i) => `<button type="button" role="radio" aria-checked="false" data-day="${i}" ${d.getDay() === 5 ? "disabled" : ""}>${d.toLocaleDateString(AR ? "ar-SA-u-ca-gregory" : "en-GB", { weekday: "short" })}<br><b>${d.toLocaleDateString(AR ? "ar-SA-u-ca-gregory" : "en-GB", { day: "numeric", month: "short" })}</b></button>`).join("");
    const slots = ["10:00", "11:00", "12:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
    const drawTimes = (i) => { const sat = ds[i].getDay() === 6; times.innerHTML = slots.map((s, k) => `<button type="button" role="radio" aria-checked="false" data-time="${s}" ${(sat && +s.slice(0, 2) < 16) || (i * 7 + k) % 5 === 0 ? "disabled" : ""}>${AR ? fmt(s.slice(0, 2)) + ":" + fmt(s.slice(3)) : s}</button>`).join(""); };
    const show = () => { picked.textContent = sel.d != null && sel.t ? `${T("Selected:", "الموعد:")} ${ds[sel.d].toLocaleDateString(AR ? "ar-SA-u-ca-gregory" : "en-GB", { weekday: "long", day: "numeric", month: "long" })} · ${sel.t}` : T("Choose a date, then a time.", "اختر التاريخ ثم الوقت."); if (form) form.dataset.ref = sel.t ? `${ds[sel.d].toISOString().slice(0, 10)} ${sel.t}` : ""; };
    days.addEventListener("click", (e) => { const b = e.target.closest("[data-day]"); if (!b || b.disabled) return; $$("[data-day]", days).forEach((x) => x.setAttribute("aria-checked", x === b)); sel = { d: +b.dataset.day }; drawTimes(sel.d); show(); });
    times.addEventListener("click", (e) => { const b = e.target.closest("[data-time]"); if (!b || b.disabled) return; $$("[data-time]", times).forEach((x) => x.setAttribute("aria-checked", x === b)); sel.t = b.dataset.time; show(); });
    if (form) form.addEventListener("submit", (e) => { if (!sel.t) { e.stopImmediatePropagation(); e.preventDefault(); picked.textContent = T("Please choose a date and time first.", "يرجى اختيار التاريخ والوقت أولاً."); picked.focus?.(); days.querySelector("button:not([disabled])").focus(); } }, true);
    const ps = $("[data-proj-select]"); if (ps && qs.get("project")) ps.value = qs.get("project");
    show();
  }
})();
