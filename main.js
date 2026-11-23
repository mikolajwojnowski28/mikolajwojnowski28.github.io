/* Portfolio Mikołaja Wojnowskiego. Bez bibliotek, działa wprost na GitHub Pages. */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;
const L = () => (root.dataset.lang === 'en' ? 1 : 0);
const tx = v => (Array.isArray(v) ? v[L()] : v);

/* ---------- PROJEKTY ---------- */
const PROJECTS = [
  {
    id: 'hub', name: 'PUTM Aero Hub', kind: ['Narzędzie zespołu', 'Team tool'],
    c: '#ffe45c', fg: '#0a0f3d', art: 'hub',
    shots: ['img/hub_kadr.png', 'img/hub_kolejka.png', 'img/hub_wykresy.png'], side: 'img/hub_siatka.png',
    short: ['Kolejka obliczeń dla całego działu aerodynamiki. Zlecasz symulację, a skrypty na maszynach liczących same przygotowują geometrię, tworzą siatkę i liczą.',
            'A simulation queue for the whole aero department. You submit a case, and scripts on the compute machines prepare the geometry, build the mesh and solve it on their own.'],
    long: ['Zanim powstał Hub, maszyny liczące często stały bez pracy. Każdą symulację przygotowywaliśmy ręcznie, a każdy ręczny krok to ryzyko błędu. Z pomocą Claude zbudowałem system dla całego działu. Na stronie zespołu rezerwujesz symulację: wgrywasz model, opisujesz zmianę i hipotezę. Program na maszynach liczących sam przechodzi przez SpaceClaim, siatkę i Ansys Fluent, a wynik wraca na stronę. Każdy krok sprawdzałem we Fluencie i w innych programach Ansys.',
           'Before Hub, our compute machines often sat idle. We prepared every simulation by hand, and every manual step was a chance for a mistake. With help from Claude I built a system for the whole department. On the team website you book a simulation: upload the model and describe the change and your hypothesis. A program on the compute machines goes through SpaceClaim, meshing and Ansys Fluent by itself, and the result comes back to the website. I checked every step in Fluent and other Ansys tools.'],
    did: [['Przygotowanie geometrii trwało 20 minut. Teraz dzieje się samo.', 'Geometry prep used to take 20 minutes. Now it happens by itself.'],
          ['Przeszliśmy z formatu STEP na Parasolid, żeby poprawić import geometrii.', 'We moved from STEP to Parasolid to make geometry import more reliable.'],
          ['Każda symulacja ma hipotezę, ocenę zbieżności i porównanie z wersją bazową.', 'Every simulation has a hypothesis, a convergence check and a comparison with the baseline.'],
          ['Automatyczny raport jakości siatki: liczba komórek, jakość ortogonalna, niekątowość i y+.', 'An automatic mesh quality report: cell count, orthogonal quality, non-orthogonality and y+.'],
          ['Paczka wyników: siły, balans, y+, oderwania i wiry, każda liczba ze źródłem.', 'A results package: forces, balance, y+, separation and vortices, every number with its source.'],
          ['W ostatnich 2 tygodniach maszyny policzyły 50 symulacji. Przy arkuszu średnia wynosiła 6 na 2 tygodnie.', 'In the last 2 weeks the machines solved 50 simulations. With the old spreadsheet the average was 6 per 2 weeks.'],
          ['Maszyny liczą bez przerwy, także w nocy.', 'The machines compute non-stop, nights included.']],
  },
  {
    id: 'sim', name: 'PUTM Sim', kind: ['Symulator', 'Simulator'],
    c: '#ffb8a8', fg: '#0a0f3d', art: 'tyre', shots: ['img/sim_hud.jpg'],
    short: ['Symulator bolidu, w którym zespół sprawdzi to, na co nie pozwalają gotowe gry.',
            'A race car simulator where the team can test what off-the-shelf sims do not allow.'],
    long: ['Gotowe symulatory mają swoje ograniczenia. rFactor 2 nie pozwala dodać rozdziału momentu między koła, a Assetto Corsa ma zbyt prosty model opony. Dlatego z pomocą Claude zbudowałem własny symulator w Ruście, jako platformę dla zespołu na kolejne lata. W porównaniu z jazdą prawdziwym bolidem daje mi najbliższe wrażenia ze wszystkich symulatorów, które sprawdziłem, a jego telemetria jest najbliżej danych z prawdziwego bolidu. Ciągle go poprawiam na podstawie kolejnych testów i nowych danych.',
           'Off-the-shelf simulators have limits. rFactor 2 does not let you add torque vectoring, and Assetto Corsa has a tyre model that is too simple. So with help from Claude I built my own simulator in Rust, as a platform for the team for years to come. Compared with driving the real car, it feels the closest of all the simulators I have tried, and its telemetry is the closest to the real car data. I keep improving it with every new test and new data.'],
    did: [['Opona na pełnym modelu Pacejki, fizyka 1000 razy na sekundę.', 'Full Pacejka tyre model, physics at 1000 Hz.'],
          ['Symulacja baterii i czterech silników elektrycznych.', 'Battery and four electric motors simulated.'],
          ['Tor Poznań ze skanu laserowego.', 'Tor Poznań from a laser scan.'],
          ['Tor Słomczyn odtworzony z danych LIDAR z Geoportalu, z trasą z zawodów.', 'The Słomczyn track rebuilt from Geoportal LIDAR data, with the competition layout.'],
          ['W budowie: zawieszenie, mapy aerodynamiczne i nowe tory.', 'In progress: suspension, aero maps and new tracks.']],
  },
  {
    id: 'valid', name: ['Walidacja aerodynamiczna bolidu', 'Aero validation on track'], kind: ['Testy na torze', 'Track testing'],
    c: '#b8f0c8', fg: '#0a0f3d', art: 'wing', shots: ['img/nitki.jpg', 'img/nitki_zespol.jpg', 'img/skan_skaner.jpg', 'img/skan_program.jpg', 'img/skan_odchylki.jpg'], cover: true, grid: true,
    short: ['Sprawdzam na torze, czy bolid zachowuje się tak, jak pokazują obliczenia.',
            'I check on track whether the car behaves the way the simulations say.'],
    long: ['Obliczenia są warte tyle, ile ich zgodność z rzeczywistością. Dlatego wyniki z CFD porównuję z pomiarami na prawdziwym bolidzie. Robię test wybiegu, czyli pomiar zwalniania bolidu bez napędu, z którego wyznaczam opór. Nitki naklejone na nadwozie pokazują na filmie, jak naprawdę płynie powietrze. Niepewność wyników liczę metodą bootstrap.',
           'Simulations are only as good as their match with reality. So I compare CFD results with measurements on the real car. I run coast-down tests, measuring how the car slows down with no drive, to get its drag. Tufts taped to the bodywork show on video how the air really flows. I estimate the uncertainty with bootstrapping.'],
    did: [['Docisk obecnego pakietu aerodynamicznego jest o 45% większy niż na początku i nadal rośnie, bo pakiet jest jeszcze w pracy.', 'Downforce of the current aero package is 45% higher than at the start and still rising, as the package is still in development.'],
          ['Opór z testu wybiegu zgadza się z obliczeniami w granicach błędu pomiaru.', 'Drag from the coast-down test matches the simulation within the measurement error.'],
          ['Film nitek w 4K i 120 klatkach na sekundę, porównany z liniami prądu z CFD.', 'Tuft video in 4K at 120 fps, compared with CFD streamlines.'],
          ['Skan 3D wykonanych elementów, zrobiony razem z Politechniką Poznańską. Mapa odchyłek pokazuje, gdzie część różni się od modelu CAD, w milimetrach.', 'A 3D scan of the manufactured parts, done with Poznań University of Technology. The deviation map shows where each part differs from the CAD model, in millimetres.']],
  },
  {
    id: 'viewer', name: 'PUTM Aero Viewer', kind: ['Przeglądarka wyników', 'Results viewer'],
    c: '#9fd8ff', fg: '#0a0f3d', art: 'wing',
    shots: ['img/viewer_ui.jpg'], compare: null,
    short: ['Wyniki obliczeń przepływu w 3D, 5 razy szybciej niż w CFD-Post.',
            '3D airflow results, 5 times faster than CFD-Post.'],
    long: ['Viewer pokazuje te same widoki co CFD-Post od Ansys, ale działa 5 razy szybciej i jest dużo prostszy w obsłudze. Dzięki temu wyniki przegląda cały dział, a nie tylko osoby, które znają program Ansys. Zbudowałem go z pomocą Claude.',
           'Viewer shows the same views as Ansys CFD-Post, but it is 5 times faster and much easier to use. So the whole department reviews results, not only people who know the Ansys tool. I built it with help from Claude.'],
    did: [['Przekroje, linie prądu, wiry i siły w jednym oknie.', 'Sections, streamlines, vortices and forces in one window.'],
          ['5 razy szybciej niż CFD-Post.', '5 times faster than CFD-Post.'],
          ['Eksport do Excela, raport i zrzut jednym kliknięciem.', 'Excel export, report and screenshot in one click.']],
  },
];
const MORE = [
  [['Simracing', 'Sim racing'],
   ['Ponad 3000 godzin w symulatorach. Telemetrię analizuję w MoTeC, a ustawienia auta robię sam. Ścigałem się dla zespołu w wirtualnych zawodach FS Alpe Adria.', 'More than 3000 hours in simulators. I analyse telemetry in MoTeC and do my own car setups. I raced for the team in virtual FS Alpe Adria.']],
]

/* ---------- GRAFIKI SVG (ogólne kształty, bez danych zespołu) ---------- */
const NS = 'http://www.w3.org/2000/svg';
function naca4412() {
  const m = .04, p = .4, t = .12, up = [], lo = [];
  for (let i = 0; i <= 60; i++) {
    const x = (1 - Math.cos(Math.PI * i / 60)) / 2;
    const yt = 5 * t * (.2969 * Math.sqrt(x) - .126 * x - .3516 * x * x + .2843 * x ** 3 - .1015 * x ** 4);
    const yc = x < p ? m / p / p * (2 * p * x - x * x) : m / (1 - p) ** 2 * (1 - 2 * p + 2 * p * x - x * x);
    up.push([x, yc + yt]); lo.push([x, yc - yt]);
  }
  return [...up, ...lo.reverse()];
}
function artSVG(type, bg) {
  const W = 640, H = 560;
  let s = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><rect width="${W}" height="${H}" fill="${bg}"/>`;
  if (type === 'wing') {
    // odwrócony profil (docisk), strugi płyną wokół
    const pts = naca4412().map(([x, y]) => [110 + x * 420, 292 - y * 420]);
    s += `<path d="M${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join('L')}Z" fill="#fff"/>`;
    for (let k = -7; k <= 7; k++) {
      if (Math.abs(k) < 2) continue;
      const y0 = 280 + k * 34, d = [];
      for (let x = -20; x <= 660; x += 20) {
        const u = (x - 110) / 420, inf = Math.exp(-((u - .3) ** 2) / .1) * 40 / (1 + Math.abs(k) * .35);
        d.push(`${x},${(y0 - inf * (k < 0 ? 1 : .5)).toFixed(1)}`);
      }
      s += `<path class="flow" d="M${d.join('L')}" fill="none" stroke="#fff" stroke-opacity="${(1 - Math.abs(k) * .1).toFixed(2)}" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="22 14" style="animation-duration:${(2.2 + Math.abs(k) * .25).toFixed(2)}s"/>`;
    }
  } else if (type === 'tyre') {
    // krzywa Pacejki: siła boczna w funkcji kąta poślizgu (ogólne współczynniki)
    const B = 10, C = 1.9, E = .97, d = [];
    for (let i = 0; i <= 160; i++) {
      const a = -.32 + .64 * i / 160, x = B * a, F = Math.sin(C * Math.atan(x - E * (x - Math.atan(x))));
      d.push(`${(80 + i * 3).toFixed(1)},${(280 - F * 170).toFixed(1)}`);
    }
    s += `<line x1="50" y1="280" x2="590" y2="280" stroke="#fff" stroke-opacity=".35" stroke-width="2"/><line x1="320" y1="80" x2="320" y2="480" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>`;
    s += `<path id="pj" d="M${d.join('L')}" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>`;
    s += `<circle r="13" fill="#ffe45c"><animateMotion dur="4s" repeatCount="indefinite" keyPoints="0;1;0" keyTimes="0;.5;1" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1"><mpath href="#pj"/></animateMotion></circle>`;
  } else if (type === 'hub') {
    // kolejka obliczeń: zadania płyną do maszyn i wracają jako raport
    const nodes = [[100, 280, 32], [320, 170, 44], [320, 390, 44], [540, 280, 32]];
    const links = [[0, 1], [0, 2], [1, 3], [2, 3]];
    links.forEach(([a, b], i) => {
      const [x1, y1] = nodes[a], [x2, y2] = nodes[b];
      s += `<path id="l${i}" d="M${x1},${y1} C${(x1 + x2) / 2},${y1} ${(x1 + x2) / 2},${y2} ${x2},${y2}" fill="none" stroke="#fff" stroke-width="3" stroke-opacity=".7"/>`;
      s += `<circle r="8" fill="#ffe45c"><animateMotion dur="${2.6 + i * .4}s" begin="${i * .5}s" repeatCount="indefinite"><mpath href="#l${i}"/></animateMotion></circle>`;
    });
    nodes.forEach(([x, y, r]) => { s += `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/>`; });
  }
  return s + '</svg>';
}
const style = document.createElement('style');
style.textContent = '.flow{animation:flow linear infinite}@keyframes flow{to{stroke-dashoffset:-72}}@media (prefers-reduced-motion:reduce){.flow{animation:none}}';
document.head.appendChild(style);

function compareHTML(a, b) {
  return `<div class="cmp" style="--s:50%"><img src="${a}" alt=""><img class="top" src="${b}" alt="">
    <span class="bar"></span><input type="range" min="0" max="100" value="50" aria-label="${L() ? 'Compare' : 'Porównaj'}"></div>`;
}
function artHTML(p, big) {
  if (p.compare && big) return `<div class="art light">${compareHTML(p.compare[0], p.compare[1])}</div>`;
  // w oknie projektu obok tekstu może stać inny obrazek niż na karcie (np. raport siatki)
  if (p.side && big) return `<div class="art side"><img src="${p.side}" alt=""></div>`;
  const s = p.shots && p.shots[0];
  if (s) return `<div class="art shot${p.light ? ' light' : ''}${p.cover ? ' cover' : ''}"><img src="${s}" alt="${tx(p.name)}"></div>`;
  return `<div class="art">${artSVG(p.art, '#1f3dff')}</div>`;
}
function galleryHTML(p) {
  // szeroki projekt: wszystkie zrzuty pod tekstem; pozostałe: zrzuty od drugiego
  const list = (p.shots || []).slice(p.wide || p.compare ? 0 : 1);
  return list.length ? `<div class="gallery${p.grid ? ' grid' : ''}">${list.map(s => `<img src="${s}" alt="" loading="lazy">`).join('')}</div>` : '';
}
function wireCompare(scope) {
  scope.querySelectorAll('.cmp').forEach(c => {
    const r = c.querySelector('input'); let user = false;
    r.addEventListener('input', () => { user = true; c.style.setProperty('--s', r.value + '%'); });
    if (reduce) return;
    const t0 = performance.now();
    (function sweep(now) { if (user || !c.isConnected) return; const v = 50 + 40 * Math.sin((now - t0) / 1400); c.style.setProperty('--s', v + '%'); r.value = v; requestAnimationFrame(sweep); })(t0);
  });
}
/* ---------- RENDER ---------- */
const stack = document.getElementById('work');
function render() {
  stack.innerHTML = PROJECTS.map((p, i) => `
    <article class="card${p.wide ? ' wide' : ''}" style="background:${p.c}" data-i="${i}" tabindex="-1">
      <div class="card-text">
        <div><span class="kind">${tx(p.kind)}</span>
          <h3>${tx(p.name)}</h3>
          <p>${tx(p.short)}</p></div>
        <button class="open" data-i="${i}">${L() ? 'Open project' : 'Otwórz projekt'}</button>
      </div>
      ${artHTML(p)}
    </article>`).join('');
  document.getElementById('more').innerHTML = MORE.map(([n, d]) => `<li><b>${tx(n)}</b><span>${tx(d)}</span></li>`).join('');
  stack.querySelectorAll('.card').forEach(c => c.addEventListener('click', e => openPanel(+c.dataset.i, e)));
  document.getElementById('lang').textContent = L() ? 'PL' : 'EN';
  onScroll();
}

/* ---------- PANEL: koło od miejsca kliknięcia ---------- */
const panel = document.getElementById('panel'), pin = document.getElementById('panel-in');
let lastFocus = null;
function openPanel(i, e) {
  const p = PROJECTS[i];
  lastFocus = document.activeElement;
  const x = e && e.clientX ? e.clientX : innerWidth / 2, y = e && e.clientY ? e.clientY : innerHeight / 2;
  panel.style.setProperty('--x', x + 'px'); panel.style.setProperty('--y', y + 'px');
  panel.style.setProperty('--c', p.c); panel.style.setProperty('--fg', p.fg);
  pin.innerHTML = `<button class="close" id="close">${L() ? 'Close' : 'Zamknij'}</button>
    <h2 id="panel-title">${tx(p.name)}</h2>
    <div class="panel-cols${p.wide ? ' one' : ''}">
      <div><p>${tx(p.long)}</p>
        <h3>${L() ? 'What I did' : 'Co zrobiłem'}</h3>
        <ul class="did">${p.did.map(d => `<li>${tx(d)}</li>`).join('')}</ul></div>
      ${p.wide ? '' : artHTML(p, true)}
    </div>
    ${galleryHTML(p)}`;
  wireCompare(pin);
  panel.hidden = false; panel.scrollTop = 0;
  requestAnimationFrame(() => requestAnimationFrame(() => panel.classList.add('open')));
  document.body.style.overflow = 'hidden';
  document.getElementById('close').addEventListener('click', closePanel);
  document.getElementById('close').focus({ preventScroll: true });
}
function closePanel() {
  panel.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { panel.hidden = true; }, reduce ? 0 : 950);
  if (lastFocus) lastFocus.focus({ preventScroll: true });
}
addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) closePanel(); });

/* ---------- JĘZYK ---------- */
function setLang(l) {
  root.dataset.lang = l; root.lang = l;
  try { localStorage.setItem('lang', l); } catch (_) {}
  render();
  if (typeof contact !== 'undefined') contact.build();
}
document.getElementById('lang').addEventListener('click', () => setLang(L() ? 'pl' : 'en'));
let start = 'pl';
try { start = localStorage.getItem('lang') || (navigator.language.startsWith('pl') ? 'pl' : 'en'); } catch (_) {}
root.dataset.lang = start; root.lang = start;

/* ---------- PRZEWIJANIE ---------- */
const nav = document.querySelector('.nav');
const reveals = document.querySelectorAll('[data-reveal]');
const road = document.querySelector('.road ol'), roadItems = document.querySelectorAll('.road li');
function onScroll() {
  nav.classList.toggle('solid', scrollY > innerHeight * .7);
  reveals.forEach(el => { if (el.getBoundingClientRect().top < innerHeight * .78) el.classList.add('on'); });
  const cards = [...stack.querySelectorAll('.card')];
  cards.forEach((c, i) => {
    const n = cards[i + 1]; if (!n || reduce) return;
    const r = n.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, 1 - (r.top - innerHeight * .11) / (innerHeight * .76)));
    c.style.transform = `scale(${1 - p * .06})`; c.style.filter = `brightness(${1 - p * .3})`;
  });
  const rr = road.getBoundingClientRect(), rp = Math.min(1, Math.max(0, (innerHeight * .8 - rr.top) / (innerHeight * .5)));
  road.style.setProperty('--p', rp.toFixed(3));
  roadItems.forEach((li, i) => li.classList.toggle('on', rp >= i / roadItems.length || reduce));
}
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);

/* ---------- CZĄSTKI: napis z punktów, kursor rozwiewa je jak wiatr ---------- */
function Field(cv, lines, layout) {
  const cx = cv.getContext('2d'), dpr = Math.min(2, devicePixelRatio || 1);
  const mouse = { x: -9999, y: -9999, vx: 0, vy: 0 };
  let W = 0, H = 0, pts = [], running = false, t = 0;
  function build() {
    W = cv.clientWidth; H = cv.clientHeight;
    if (!W || !H) { setTimeout(build, 300); return; }
    cv.width = W * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const off = document.createElement('canvas'), o = off.getContext('2d');
    off.width = W; off.height = H;
    const g = layout(W, H), txt = lines();
    o.font = `400 ${g.fs}px "Instrument Serif", Georgia, serif`;
    // każda linia zaczyna się dokładnie od g.x (lewa krawędź liter, nie punkt startu czcionki)
    txt.forEach((s, i) => o.fillText(s, g.x + (o.measureText(s).actualBoundingBoxLeft || 0), g.y + i * g.fs * .92));
    const data = o.getImageData(0, 0, W, H).data, step = g.step;
    const old = pts; pts = [];
    for (let y = 0; y < H; y += step) for (let x = 0; x < W; x += step) {
      if (data[(y * W + x) * 4 + 3] > 128) {
        const p = old[pts.length] || { x: Math.random() * W, y: H + Math.random() * H * .4, vx: 0, vy: 0 };
        p.tx = x; p.ty = y; p.s = Math.random() * .9 + 1.1; pts.push(p);
      }
    }
    if (reduce) { pts.forEach(p => { p.x = p.tx; p.y = p.ty; }); draw(); }
  }
  function draw() {
    cx.clearRect(0, 0, W, H);
    for (const p of pts) {
      const sp = Math.min(1, Math.hypot(p.vx, p.vy) / 6);
      cx.globalAlpha = .6 + .4 * (1 - sp);
      if (sp > .15) {
        cx.strokeStyle = sp > .5 ? '#ffe45c' : '#fff'; cx.lineWidth = p.s;
        cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3); cx.stroke();
      } else { cx.fillStyle = '#fff'; cx.fillRect(p.x, p.y, p.s * 1.5, p.s * 1.5); }
    }
  }
  function pointer(px, py) {
    const r = cv.getBoundingClientRect(), nx = px - r.left, ny = py - r.top;
    const cl = v => Math.max(-18, Math.min(18, v));
    if (mouse.x > -999) { mouse.vx = cl(nx - mouse.x); mouse.vy = cl(ny - mouse.y); }
    mouse.x = nx; mouse.y = ny;
  }
  addEventListener('mousemove', e => pointer(e.clientX, e.clientY));
  cv.addEventListener('touchmove', e => { const t0 = e.touches[0]; pointer(t0.clientX, t0.clientY); }, { passive: true });
  cv.addEventListener('touchend', () => { mouse.x = -9999; });
  document.addEventListener('mouseleave', () => { mouse.x = -9999; });
  function frame() {
    if (running) {
      t += .01;
      for (const p of pts) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 15000) { const f = (15000 - d2) / 15000; p.vx += mouse.vx * .06 * f + dx * .004 * f; p.vy += mouse.vy * .06 * f + dy * .004 * f; }
        p.vx += Math.sin(p.ty * .02 + t) * .02;
        p.vx += (p.tx - p.x) * .012; p.vy += (p.ty - p.y) * .012;
        p.vx *= .88; p.vy *= .88; p.x += p.vx; p.y += p.vy;
      }
      mouse.vx *= .8; mouse.vy *= .8;
      draw();
    }
    requestAnimationFrame(frame);
  }
  new IntersectionObserver(([e]) => { running = e.isIntersecting; }).observe(cv);
  let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(build, 200); });
  return { build, start() { build(); if (!reduce) frame(); }, settle() { pts.forEach(p => { p.x = p.tx; p.y = p.ty; p.vx = p.vy = 0; }); draw(); } };
}
const hero = Field(document.getElementById('field'), () => ['Mikołaj', 'Wojnowski'], (W, H) => {
  const narrow = W < 700, fs = narrow ? W * .2 : Math.min(W * .115, H * .27);
  const pad = parseFloat(getComputedStyle(document.querySelector('.hero-sub')).left) || 40;
  return { fs, x: pad, y: narrow ? H * .36 : H * .42, step: narrow ? 2 : Math.max(3, Math.round(W / 420)) };
});
const contactCv = document.getElementById('field-contact');
const contact = Field(contactCv, () => [L() ? 'Contact' : 'Kontakt'], (W, H) => {
  const fs = Math.min(W * .16, H * .9), pad = parseFloat(getComputedStyle(root).getPropertyValue('--pad')) || 40;
  return { fs, x: 0, y: H * .82, step: W < 700 ? 2 : Math.max(3, Math.round(W / 480)) };
});
document.fonts.load('400 100px "Instrument Serif"').catch(() => {}).finally(() => { hero.start(); contact.start(); });
render();
