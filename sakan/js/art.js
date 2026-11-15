/* =========================================================
   Generated illustrations (placeholders for real photos).
   Every picture on the demo is drawn here as SVG, so the
   site has zero image downloads. Swap for agency photos.
   ========================================================= */
let _artId = 0;
const SKIES = [
  ["#bfe3f2", "#f7ecd6", "#fff6d8"],   // morning
  ["#86c9ea", "#e6f4fb", "#ffffff"],   // midday
  ["#f3a868", "#fde6c4", "#fff1c9"],   // golden hour
  ["#27345f", "#e0916f", "#ffe9a8"]    // dusk
];
const WALLS = ["#f4efe6", "#e9dfcf", "#f7f3ec", "#e4d6c0"];

function palm(x, y, s) {
  const f = (a) => `<path d="M0 0 Q ${22 * Math.cos(a)} ${22 * Math.sin(a) - 16} ${42 * Math.cos(a)} ${42 * Math.sin(a) + 6}" stroke="#2f6b4f" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 Q 4 30 -2 70" stroke="#8a6a45" stroke-width="6" fill="none" stroke-linecap="round"/>${[-2.9, -2.3, -1.6, -0.9, -0.3, 0.2, 3.3].map(f).join("")}</g>`;
}
function win(x, y, w, h, glass) { return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.5" fill="${glass}"/>`; }

function building(kind, wall, glass, accent) {
  const G = 200; let s = "";
  const grid = (x, y, w, h, cols, rows, gw, gh) => {
    let o = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${wall}"/>`;
    const cx = (w - cols * gw) / (cols + 1), cy = (h - rows * gh) / (rows + 1);
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++)
      o += win(x + cx + c * (gw + cx), y + cy + r * (gh + cy), gw, gh, glass);
    return o;
  };
  switch (kind) {
    case "villa":
      s += `<rect x="96" y="118" width="170" height="82" fill="${wall}"/>
            <rect x="170" y="72" width="140" height="62" fill="#fbf8f2"/>
            <rect x="170" y="72" width="140" height="6" fill="${accent}"/>
            <rect x="266" y="134" width="44" height="66" fill="#fbf8f2"/>
            ${win(184, 88, 70, 34, glass)}${win(264, 88, 34, 34, glass)}
            ${win(112, 134, 60, 50, glass)}
            <rect x="188" y="146" width="26" height="54" fill="#6b4a2e"/>
            <g fill="#9b7448">${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${226 + i * 6}" y="140" width="3" height="60"/>`).join("")}</g>
            <rect x="276" y="150" width="26" height="50" fill="${glass}"/>
            <rect x="30" y="214" width="120" height="16" rx="8" fill="#63c5d6" opacity=".85"/>`;
      break;
    case "floor":
      s += `<rect x="100" y="80" width="200" height="120" fill="${wall}"/>
            <rect x="100" y="140" width="200" height="60" fill="${accent}" opacity=".28"/>
            <rect x="100" y="80" width="200" height="6" fill="#6b4a2e"/>
            ${win(118, 96, 44, 30, glass)}${win(178, 96, 44, 30, glass)}${win(238, 96, 44, 30, glass)}
            ${win(118, 152, 60, 34, glass)}${win(238, 152, 44, 34, glass)}
            <rect x="190" y="152" width="26" height="48" fill="#6b4a2e"/>`;
      break;
    case "duplex":
      [0, 1].forEach(i => {
        const x = 90 + i * 112;
        s += `<rect x="${x}" y="84" width="108" height="116" fill="${i ? "#fbf8f2" : wall}"/>
              <rect x="${x}" y="84" width="108" height="5" fill="${accent}"/>
              ${win(x + 14, 100, 80, 32, glass)}${win(x + (i ? 50 : 14), 148, 44, 36, glass)}
              <rect x="${x + (i ? 16 : 70)}" y="150" width="22" height="50" fill="#6b4a2e"/>`;
      });
      break;
    case "townhouse":
      [0, 1, 2, 3].forEach(i => {
        const x = 62 + i * 70, h = i % 2 ? 122 : 110;
        s += `<rect x="${x}" y="${G - h}" width="68" height="${h}" fill="${i % 2 ? "#fbf8f2" : wall}"/>
              ${win(x + 12, G - h + 16, 44, 28, glass)}${win(x + 12, G - h + 56, 44, 22, glass)}
              <rect x="${x + 24}" y="${G - 36}" width="20" height="36" fill="#6b4a2e"/>`;
      });
      break;
    case "apartment":
      s += grid(120, 46, 160, 154, 4, 5, 24, 18);
      s += `<rect x="120" y="46" width="160" height="6" fill="${accent}"/><rect x="186" y="170" width="28" height="30" fill="#3d3a36"/>
            <rect x="80" y="110" width="40" height="90" fill="#fbf8f2"/>${win(88, 122, 24, 16, glass)}${win(88, 150, 24, 16, glass)}`;
      break;
    case "building":
      s += grid(70, 66, 260, 96, 7, 3, 22, 18);
      s += `<rect x="70" y="162" width="260" height="38" fill="#3d3a36"/>
            ${[0, 1, 2, 3].map(i => `<rect x="${80 + i * 63}" y="168" width="52" height="32" fill="${glass}"/><rect x="${80 + i * 63}" y="164" width="52" height="7" fill="${accent}"/>`).join("")}
            <rect x="70" y="62" width="260" height="6" fill="${accent}"/>`;
      break;
    case "office":
      s += `<rect x="236" y="74" width="74" height="126" fill="#cfd9dd"/>${[0, 1, 2, 3, 4, 5].map(i => `<rect x="244" y="${84 + i * 19}" width="58" height="10" fill="${glass}"/>`).join("")}
            <rect x="140" y="18" width="100" height="182" fill="${glass}"/>
            ${[1, 2, 3].map(i => `<rect x="${140 + i * 25}" y="18" width="1.5" height="182" fill="#fff" opacity=".45"/>`).join("")}
            ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => `<rect x="140" y="${32 + i * 16}" width="100" height="1.5" fill="#fff" opacity=".35"/>`).join("")}
            <path d="M140 18 L190 4 L240 18Z" fill="${accent}"/>
            <rect x="92" y="120" width="48" height="80" fill="${wall}"/>${win(100, 132, 32, 14, glass)}${win(100, 156, 32, 14, glass)}`;
      break;
    case "shop":
      s += `<rect x="70" y="120" width="260" height="80" fill="${wall}"/>
            <rect x="70" y="112" width="260" height="14" fill="#3d3a36"/>
            ${[0, 1, 2].map(i => `<rect x="${84 + i * 84}" y="140" width="68" height="60" fill="${glass}"/>
              <path d="M${80 + i * 84} 126 h76 l6 14 h-88z" fill="${i % 2 ? "#fbf8f2" : accent}"/>`).join("")}
            <rect x="150" y="96" width="100" height="18" rx="3" fill="${accent}"/>`;
      break;
    case "compound":
      s += `<rect x="20" y="176" width="360" height="24" fill="#e9dfcf"/>`;
      [[50, 0], [140, 14], [230, 4], [310, 16]].forEach(([x, d], i) => {
        s += `<rect x="${x}" y="${120 + d}" width="66" height="${80 - d}" fill="${i % 2 ? "#fbf8f2" : wall}"/>
              <rect x="${x}" y="${120 + d}" width="66" height="4" fill="${accent}"/>
              ${win(x + 10, 132 + d, 46, 20, glass)}<rect x="${x + 24}" y="170" width="18" height="30" fill="#6b4a2e"/>`;
      });
      s += `<rect x="120" y="212" width="160" height="20" rx="10" fill="#63c5d6" opacity=".9"/>`;
      break;
    case "land":
      s += `<path d="M70 236 L150 190 L330 190 L370 236Z" fill="#e6c98f" stroke="#fff" stroke-width="3" stroke-dasharray="9 7"/>
            ${[[70, 236], [150, 190], [330, 190], [370, 236]].map(([x, y]) => `<rect x="${x - 3}" y="${y - 22}" width="6" height="22" fill="#c0392b"/>`).join("")}
            <rect x="196" y="130" width="6" height="66" fill="#6b4a2e"/><rect x="160" y="112" width="78" height="40" rx="4" fill="#fff"/>
            <rect x="170" y="122" width="58" height="6" rx="3" fill="${accent}"/><rect x="170" y="134" width="38" height="6" rx="3" fill="#c9c2b6"/>
            <path d="M0 196 Q 60 150 130 186 T 260 170 T 400 190 V200 H0Z" fill="#d8b77c" opacity=".7"/>`;
      break;
  }
  return s;
}

function art(kind, tod = 1, variant = 0) {
  const id = "g" + (++_artId), [s1, s2, sun] = SKIES[tod % 4];
  const dusk = tod % 4 === 3, glass = dusk ? "#ffd98a" : "#2f6f78";
  const wall = WALLS[(variant + tod) % 4], accent = "#b8894a";
  if (variant === 1) return interior(id, tod);
  if (variant === 2) return plan(kind);
  return `<svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s1}"/><stop offset="1" stop-color="${s2}"/></linearGradient></defs>
    <rect width="400" height="260" fill="url(#${id})"/>
    <circle cx="${dusk ? 330 : 70}" cy="${dusk ? 60 : 54}" r="${dusk ? 16 : 24}" fill="${sun}" opacity=".9"/>
    <path d="M0 190 Q 80 160 170 182 T 400 168 V260 H0Z" fill="${dusk ? "#8a6f66" : "#e8d5ad"}" opacity=".55"/>
    <rect y="200" width="400" height="60" fill="${dusk ? "#5d5148" : "#d9c7a3"}"/>
    <rect y="200" width="400" height="5" fill="#00000014"/>
    ${palm(44, 132, 0.95)}${kind === "office" ? "" : palm(352, 142, 0.8)}
    ${building(kind, wall, glass, accent)}
    <rect y="240" width="400" height="20" fill="#00000010"/>
  </svg>`;
}

function interior(id, tod) {
  const [s1, s2] = SKIES[tod % 4];
  return `<svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s1}"/><stop offset="1" stop-color="${s2}"/></linearGradient></defs>
    <rect width="400" height="260" fill="#f3ede2"/><rect y="186" width="400" height="74" fill="#c9a97c"/>
    <rect x="40" y="36" width="150" height="120" fill="url(#${id})" stroke="#fff" stroke-width="6"/><rect x="113" y="36" width="4" height="120" fill="#fff"/>
    <rect x="28" y="30" width="16" height="140" fill="#d9cdb8"/><rect x="186" y="30" width="16" height="140" fill="#d9cdb8"/>
    <ellipse cx="230" cy="226" rx="140" ry="22" fill="#0f4c4a" opacity=".18"/>
    <rect x="150" y="150" width="190" height="52" rx="12" fill="#0f4c4a"/><rect x="140" y="170" width="210" height="40" rx="12" fill="#17605d"/>
    <rect x="166" y="150" width="46" height="30" rx="8" fill="#b8894a"/><rect x="280" y="150" width="46" height="30" rx="8" fill="#e9dfcf"/>
    <rect x="352" y="96" width="4" height="110" fill="#3d3a36"/><path d="M336 96 h36 l-8 -30 h-20z" fill="#fbe7b6"/>
    <rect x="236" y="50" width="70" height="54" fill="#fff" stroke="#b8894a" stroke-width="3"/><path d="M244 96 l18 -24 l12 14 l10 -8 l16 18z" fill="#17605d" opacity=".6"/>
    <rect x="60" y="196" width="60" height="10" rx="5" fill="#8a6a45"/><rect x="84" y="172" width="12" height="26" fill="#2f6b4f"/><circle cx="90" cy="162" r="16" fill="#2f6b4f"/>
  </svg>`;
}

function plan(kind) {
  if (kind === "land") return `<svg viewBox="0 0 400 260" aria-hidden="true"><rect width="400" height="260" fill="#f6f1e7"/>
    <rect x="90" y="50" width="220" height="150" fill="#efe2c4" stroke="#0f4c4a" stroke-width="3" stroke-dasharray="10 6"/>
    <text x="200" y="130" text-anchor="middle" font-size="16" fill="#0f4c4a" font-family="sans-serif">PLOT</text>
    <rect x="60" y="212" width="280" height="18" fill="#cfc7b8"/><text x="200" y="225" text-anchor="middle" font-size="10" fill="#3d3a36" font-family="sans-serif">STREET</text>
    <text x="200" y="42" text-anchor="middle" font-size="11" fill="#6b6257" font-family="sans-serif">N ↑</text></svg>`;
  const rooms = [[60, 40, 120, 90, "MAJLIS"], [180, 40, 90, 60, "DINING"], [270, 40, 70, 60, "KITCHEN"], [180, 100, 160, 60, "LIVING"], [60, 130, 70, 90, "BED"], [130, 160, 100, 60, "MASTER"], [230, 160, 60, 60, "BATH"], [290, 160, 50, 60, "MAID"]];
  return `<svg viewBox="0 0 400 260" aria-hidden="true"><rect width="400" height="260" fill="#f6f1e7"/>
    ${rooms.map(([x, y, w, h, n], i) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${i % 3 === 0 ? "#e7f0ee" : "#fff"}" stroke="#0f4c4a" stroke-width="2.5"/><text x="${x + w / 2}" y="${y + h / 2 + 4}" text-anchor="middle" font-size="9.5" letter-spacing="1" fill="#0f4c4a" font-family="sans-serif">${n}</text>`).join("")}
    <path d="M60 110 a20 20 0 0 1 20 20" fill="none" stroke="#b8894a" stroke-width="2"/><text x="352" y="30" font-size="11" fill="#6b6257" font-family="sans-serif">N ↑</text></svg>`;
}

/* Decorative sample QR (not scannable — real one comes from REGA licence) */
function fakeQR(seed) {
  let h = 0; for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const n = 21; let o = "";
  const finder = (r, c) => (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    let on;
    if (finder(r, c)) {
      const rr = r >= n - 7 ? r - (n - 7) : r, cc = c >= n - 7 ? c - (n - 7) : c;
      on = rr === 0 || rr === 6 || cc === 0 || cc === 6 || (rr > 1 && rr < 5 && cc > 1 && cc < 5);
    } else { h = (h * 1103515245 + 12345) >>> 0; on = (h >> 16) % 2 === 0; }
    if (on) o += `<rect x="${c}" y="${r}" width="1" height="1"/>`;
  }
  return `<svg viewBox="-1 -1 23 23" class="qr" aria-hidden="true"><rect x="-1" y="-1" width="23" height="23" fill="#fff"/><g fill="#0d3b3a">${o}</g></svg>`;
}
