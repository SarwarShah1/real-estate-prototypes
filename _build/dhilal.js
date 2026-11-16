/* Dhilal page behaviour. Relies on common.js (window.DEV). */
(() => {
  const { $, $$, AR, T, store, sar, fmt } = window.DEV;
  const data = (() => { const s = $("#page-data"); try { return s ? JSON.parse(s.textContent) : {}; } catch (e) { return {}; } })();
  const qs = new URLSearchParams(location.search);
  const pmt = (P, ratePct, years) => { const r = ratePct / 100 / 12, n = years * 12; return r ? (P * r) / (1 - Math.pow(1 + r, -n)) : P / n; };

  /* Lightbox */
  const lb = $("#lightbox"); if (lb) lb.addEventListener("dlg:open", (e) => { $("img", lb).src = e.detail.src; });

  /* Finder */
  const ff = $("#filters");
  if (ff && data.items) {
    const out = $("#maxp-out"), range = $("#maxp");
    ["city", "type", "status"].forEach((k) => qs.getAll(k).forEach((v) => v && $$(`[name=${k}][value="${v}"]`, ff).forEach((i) => (i.checked = true))));
    if (qs.get("beds")) { const b = $(`[name=beds][value="${qs.get("beds")}"]`, ff); if (b) b.checked = true; }
    if (qs.get("max")) range.value = qs.get("max");
    const run = () => {
      const fd = new FormData(ff), get = (k) => fd.getAll(k).filter(Boolean), beds = +(fd.get("beds") || 0), max = +range.value;
      out.textContent = sar(max);
      const city = get("city"), type = get("type"), status = get("status");
      let shown = data.items.filter((x) => (!city.length || city.includes(x.city)) && (!type.length || type.includes(x.type)) && (!status.length || status.includes(x.status)) && x.beds >= beds && (!x.price || x.price <= max));
      const s = $("#sort").value, key = s.replace("-", ""), dir = s[0] === "-" ? -1 : 1;
      shown.sort((a, b) => ((a[key] || 9e9) - (b[key] || 9e9)) * dir);
      const grid = $("#res");
      $$("[data-item]", grid).forEach((el) => (el.hidden = true));
      shown.forEach((x) => { const el = $(`[data-item="${x.slug}"]`, grid); el.hidden = false; grid.appendChild(el); });
      $("#res-count").textContent = AR ? `${fmt(shown.length)} منزل` : `${shown.length} home design${shown.length === 1 ? "" : "s"}`;
      $("#res-empty").hidden = shown.length > 0;
      const p = new URLSearchParams(); ["city", "type", "status"].forEach((k) => get(k).forEach((v) => p.append(k, v))); if (beds) p.set("beds", beds); if (max < +range.max) p.set("max", max);
      history.replaceState(null, "", location.pathname + (p.toString() ? "?" + p : ""));
    };
    ff.addEventListener("input", run); $("#sort").addEventListener("change", run);
    ff.addEventListener("reset", () => setTimeout(run)); $("[data-clear]").addEventListener("click", () => { ff.reset(); });
    run();
  }

  /* Site plan */
  const map = $("#sp-map");
  if (map && data.lots) {
    const lots = data.lots, n = lots.length, perRow = Math.ceil(n / 4), W = 760, lw = (W - 40) / perRow, lh = 54;
    const rowsY = [20, 20 + lh + 4, 20 + 2 * lh + 4 + 96, 20 + 3 * lh + 8 + 96];
    let svg = `<svg class="sp-svg" viewBox="0 0 ${W} ${rowsY[3] + lh + 20}"><rect class="road" x="0" y="${rowsY[1] + lh}" width="${W}" height="96"/><rect class="park" x="${W * 0.3}" y="${rowsY[1] + lh + 16}" width="${W * 0.4}" height="64" rx="10"/><text x="${W / 2}" y="${rowsY[1] + lh + 54}" text-anchor="middle" style="font:500 13px var(--sans);fill:#3F5A36">${T("Park", "المنتزه")}</text>`;
    lots.forEach((l, i) => {
      const r = Math.floor(i / perRow), c = i % perRow, x0 = 20 + c * lw, x = AR ? W - x0 - lw : x0, y = rowsY[r];
      const st = { A: T("available", "متاحة"), R: T("reserved", "محجوزة"), S: T("sold", "مباعة") }[l.s];
      svg += `<g class="lot ${l.s}" data-lot="${i}" ${l.s === "A" ? 'tabindex="0" role="button"' : 'role="img"'} aria-label="${T("Plot", "قطعة")} ${l.n}, ${data.designs[l.d].name}, ${st}"><rect x="${x + 1}" y="${y}" width="${lw - 2}" height="${lh}" rx="2"/><text x="${x + lw / 2}" y="${y + lh / 2 + 4}" text-anchor="middle">${AR ? fmt(l.n) : l.n}</text></g>`;
    });
    map.innerHTML = svg + "</svg>";
    const panel = $("#sp-panel");
    const pick = (i) => {
      const l = lots[i], d = data.designs[l.d];
      $$(".lot", map).forEach((g) => g.classList.toggle("sel", +g.dataset.lot === i));
      panel.innerHTML = `<p class="eyebrow">${T("Plot", "قطعة")} ${AR ? fmt(l.n) : l.n} · ${T("Available", "متاحة")}</p><h3 class="h3">${d.name}</h3><p>${AR ? fmt(d.beds) : d.beds} ${T("bedrooms", "غرف نوم")} · ${AR ? fmt(d.built) : d.built} ${T("m²", "م²")}</p><p class="price">${d.price ? sar(d.price) : T("Price on registration", "السعر للمسجلين")}</p><p><button class="btn btn-primary" data-open="reserve" data-plot="${l.n}">${T("Reserve this plot", "احجز هذه القطعة")}</button></p><p><a class="link" href="${d.url}">${T("View home design", "شاهد التصميم")}</a></p>`;
    };
    map.addEventListener("click", (e) => { const g = e.target.closest(".lot.A"); if (g) pick(+g.dataset.lot); });
    map.addEventListener("keydown", (e) => { const g = e.target.closest(".lot.A"); if (g && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); pick(+g.dataset.lot); } });
    const rd = $("#reserve"); if (rd) rd.addEventListener("dlg:open", (e) => { $("[data-plot-no]", rd).textContent = AR ? fmt(e.detail.plot) : e.detail.plot; $("form", rd).dataset.ref = `${data.community} plot ${e.detail.plot}`; });
  }

  /* Design studio total */
  const studio = $("#studio");
  if (studio && data.price) {
    const tot = $("#studio-total"), price = $("#d-price");
    const run = () => { const f = data.finishes.find((x) => x.k === $("[name=finish]:checked", studio).value); let t = data.price + f.add; $$("[name=opt]:checked", studio).forEach((o) => (t += +o.dataset.add)); tot.textContent = sar(t); const enq = $("#enquire form"); if (enq) enq.dataset.ref = `${data.slug} · ${f.name} · ${$$("[name=opt]:checked", studio).map((o) => o.value).join(",") || "no options"} · ${t}`; };
    studio.addEventListener("change", run); run();
  }
  /* Mini calc */
  const mc = $(".mini-calc");
  if (mc) { const p = +mc.dataset.price, down = p * 0.1; $("[data-mc=down]", mc).textContent = sar(down); $("[data-mc=monthly]", mc).textContent = sar(pmt(p - down, 4.9, 25)) + T(" / month", " / شهرياً"); }

  /* Compare toggles */
  const cmpGet = () => store.get("cmp", []);
  const paintCmp = () => $$("[data-compare]").forEach((b) => b.setAttribute("aria-pressed", cmpGet().includes(b.dataset.compare)));
  document.addEventListener("click", (e) => { const b = e.target.closest("[data-compare]"); if (!b) return; let c = cmpGet(); const k = b.dataset.compare; c = c.includes(k) ? c.filter((x) => x !== k) : [...c, k].slice(-3); store.set("cmp", c); paintCmp(); });
  paintCmp();
  const cmpOut = $("#cmp-out");
  if (cmpOut && data.designs) {
    const picks = $$("[data-cmp-pick]");
    const render = () => {
      const sel = cmpGet(); picks.forEach((p) => (p.checked = sel.includes(p.value)));
      const ds = sel.map((s) => data.designs.find((d) => d.slug === s)).filter(Boolean);
      if (!ds.length) { cmpOut.innerHTML = `<p class="muted">${T("Choose designs above to compare them.", "اختر تصاميم من الأعلى لمقارنتها.")}</p>`; return; }
      const row = (l, f) => `<tr><th scope="row">${l}</th>${ds.map((d) => `<td>${f(d)}</td>`).join("")}</tr>`, n = (x) => (AR ? fmt(x) : x);
      cmpOut.innerHTML = `<table class="cmp-t"><thead><tr><td></td>${ds.map((d) => `<th scope="col"><img src="${d.img}" alt=""><a href="${d.url}">${d.name}</a><div class="muted small">${d.comm}</div></th>`).join("")}</tr></thead><tbody>${row(T("Type", "النوع"), (d) => d.type)}${row(T("Bedrooms", "غرف النوم"), (d) => n(d.beds))}${row(T("Bathrooms", "دورات المياه"), (d) => n(d.baths))}${row(T("Built area", "مساحة البناء"), (d) => n(d.built) + T(" m²", " م²"))}${row(T("Plot", "الأرض"), (d) => n(d.plot) + T(" m²", " م²"))}${row(T("Price", "السعر"), (d) => (d.price ? sar(d.price) : T("On registration", "للمسجلين")))}${row(T("Price per m²", "سعر المتر"), (d) => (d.price ? sar(d.price / d.built) : "—"))}${row(T("Features", "المزايا"), (d) => `<ul>${d.feats.map((f) => `<li>${f}</li>`).join("")}</ul>`)}</tbody></table>`;
    };
    picks.forEach((p) => p.addEventListener("change", () => { let c = cmpGet(); c = p.checked ? [...c.filter((x) => x !== p.value), p.value].slice(-3) : c.filter((x) => x !== p.value); store.set("cmp", c); render(); }));
    render();
  }

  /* Calculator */
  const calc = $("#calc");
  if (calc) {
    const f = $("form", calc), g = (n) => +f.elements[n].value;
    if (qs.get("price")) f.elements.price.value = qs.get("price");
    const run = () => {
      const price = g("price") || 0, downPct = g("down"), sak = Math.min(g("sakani") || 0, price), yrs = g("years"), rate = g("rate");
      $("#cd-o").textContent = (AR ? fmt(downPct) : downPct) + "%"; $("#cy-o").textContent = (AR ? fmt(yrs) : yrs) + T(" years", " سنة"); $("#cr-o").textContent = (AR ? fmt(rate.toFixed(1)).replace(".", "٫") : rate.toFixed(1)) + "%";
      const down = price * downPct / 100, loan = Math.max(price - down - sak, 0), m = pmt(loan, rate, yrs);
      $("#c-monthly").textContent = sar(m); $("#c-down").textContent = sar(down); $("#c-loan").textContent = sar(loan); $("#c-total").textContent = sar(m * yrs * 12 + down);
      $("#c-plan").innerHTML = [[10, T("On signing", "عند التوقيع")], [20, T("Foundations", "الأساسات")], [20, T("Structure", "الهيكل")], [20, T("Finishes", "التشطيبات")], [30, T("Handover", "التسليم")]].map(([p, l]) => `<li><span class="pct">${AR ? fmt(p) : p}%</span><span>${l}</span><span class="amt">${sar(price * p / 100)}</span></li>`).join("");
    };
    f.addEventListener("input", run); run();
  }

  /* Events RSVP */
  const rs = $("#rsvp"); if (rs) rs.addEventListener("dlg:open", (e) => { $("[data-event-name]", rs).textContent = e.detail.event; $("form", rs).dataset.ref = e.detail.event; });

  /* Contact: preselect community, date min */
  const vs = $("[data-visit-select]"); if (vs && qs.get("visit")) vs.value = qs.get("visit");
  $$("[data-min-today]").forEach((i) => (i.min = new Date().toISOString().slice(0, 10)));
  /* Register page: carry ?ref */
  if (qs.get("ref")) $$("form[data-lead]").forEach((f) => (f.dataset.ref = qs.get("ref")));

  /* My Home */
  const saved = $("#my-saved");
  if (saved && data.comms) {
    const draw = () => {
      const fav = store.get("favs", []).map((k) => { const [t, id] = k.split(":"); return (t === "c" ? data.comms : t === "d" ? data.designs : data.ready)[id]; }).filter(Boolean);
      saved.innerHTML = fav.map((x) => `<article class="card"><a class="card-link" href="${x.url}"><div class="ph r32"><img src="${x.img}" alt="" loading="lazy"></div><div class="card-b"><h3 class="h3">${x.name}</h3><p class="muted">${x.sub}</p></div></a></article>`).join("");
      $("#my-empty").hidden = fav.length > 0;
      const leads = store.get("leads", []);
      $("#my-leads").innerHTML = leads.length ? leads.map((l) => `<li><b>${l.kind}</b> · ${l.ref || "—"} · ${new Date(l.at).toLocaleString(AR ? "ar-SA-u-ca-gregory" : "en-GB")}</li>`).join("") : `<li class="muted">${T("No enquiries yet.", "لا توجد طلبات بعد.")}</li>`;
    };
    document.addEventListener("favs:change", draw); draw();
  }
})();
