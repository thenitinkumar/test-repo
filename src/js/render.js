import { state } from './state.js';
import { sim } from './simulator.js';

export const fmtGd = (n) => (n >= 0 ? '+' : '') + n;

export function render() {
  const a = state.data.arsenal;
  const c = state.data.city;

  document.getElementById('ars-pts').textContent  = a.pts;
  document.getElementById('city-pts').textContent = c.pts;
  document.getElementById('ars-mw').textContent   = 'Matchweek ' + a.p;
  document.getElementById('city-mw').textContent  = 'Matchweek ' + c.p;
  document.getElementById('ars-stats').innerHTML  = teamStatsHTML(a);
  document.getElementById('city-stats').innerHTML = teamStatsHTML(c);

  renderGapBadge(a, c);
  renderMaxPts(a, c);
  renderGamesInHand(a, c);
  renderGdBar(a, c);
  renderGdEdge(a, c);
  renderTiebreakers(a, c);
  renderSimSliders(a, c);
}

function teamStatsHTML(t) {
  return `
    <div class="stat-line"><span class="sk">Record</span><span class="sv">W${t.w} D${t.d} L${t.l}</span></div>
    <div class="stat-line"><span class="sk">Goal diff</span><span class="sv">${fmtGd(t.gd)}</span></div>
    <div class="stat-line"><span class="sk">Goals scored</span><span class="sv">${t.gs}</span></div>
    <div class="stat-line"><span class="sk">Games left</span><span class="sv">${t.left}</span></div>
  `;
}

function renderGapBadge(a, c) {
  const diff = a.pts - c.pts;
  const badge = document.getElementById('gap-badge');
  if      (diff === 0) { badge.innerHTML  = 'Level on<br>points';        badge.className = 'status-badge'; }
  else if (diff > 0)   { badge.textContent = `Arsenal +${diff}`;          badge.className = 'status-badge red'; }
  else                 { badge.textContent = `City +${Math.abs(diff)}`;   badge.className = 'status-badge blue'; }
}

function renderMaxPts(a, c) {
  document.getElementById('ars-max').textContent       = a.pts + a.left * 3;
  document.getElementById('city-max').textContent      = c.pts + c.left * 3;
  document.getElementById('ars-left-sub').textContent  = `${a.left} game${a.left === 1 ? '' : 's'} remaining`;
  document.getElementById('city-left-sub').textContent = `${c.left} game${c.left === 1 ? '' : 's'} remaining`;
}

function renderGamesInHand(a, c) {
  const diff = c.left - a.left;
  const val  = document.getElementById('gih-val');
  const sub  = document.getElementById('gih-sub');
  if      (diff > 0) { val.textContent = '+' + (diff * 3); sub.textContent = `City has ${diff} more game${diff === 1 ? '' : 's'} to play`; }
  else if (diff < 0) { const m = Math.abs(diff); val.textContent = '+' + (m * 3); sub.textContent = `Arsenal has ${m} more game${m === 1 ? '' : 's'} to play`; }
  else               { val.textContent = '0'; sub.textContent = 'Same games remaining'; }
}

function renderGdBar(a, c) {
  const minGd = Math.min(a.gd, c.gd, 0);
  const aMag  = a.gd - minGd;
  const cMag  = c.gd - minGd;
  const tot   = aMag + cMag;
  const aw    = tot ? (aMag / tot * 100) : 50;
  document.getElementById('gd-bar-ars').style.width  = aw + '%';
  document.getElementById('gd-bar-city').style.width = (100 - aw) + '%';
  document.getElementById('gd-leg-ars').textContent  = `Arsenal ${fmtGd(a.gd)}`;
  document.getElementById('gd-leg-city').textContent = `City ${fmtGd(c.gd)}`;
}

function renderGdEdge(a, c) {
  const gd  = a.gd - c.gd;
  const val = document.getElementById('gd-adv');
  const sub = document.getElementById('gd-adv-sub');
  if      (gd > 0) { val.textContent = `+${gd}`;            val.className = 'stat-card-val red';     sub.textContent = 'Arsenal ahead'; }
  else if (gd < 0) { val.textContent = `+${Math.abs(gd)}`;  val.className = 'stat-card-val blue';    sub.textContent = 'City ahead'; }
  else             { val.textContent = '0';                 val.className = 'stat-card-val neutral'; sub.textContent = 'Identical GD'; }
}

function renderTiebreakers(a, c) {
  document.getElementById('tie-gd-detail').textContent = `Arsenal ${fmtGd(a.gd)} vs City ${fmtGd(c.gd)}`;
  document.getElementById('tie-gs-detail').textContent = `City ${c.gs} vs Arsenal ${a.gs}`;
}

function renderSimSliders(a, c) {
  const arsSl  = document.getElementById('ars-wins');
  const citySl = document.getElementById('city-wins');
  arsSl.max  = a.left;
  citySl.max = c.left;
  if (parseInt(arsSl.value)  > a.left) arsSl.value  = a.left;
  if (parseInt(citySl.value) > c.left) citySl.value = c.left;
  document.querySelector('.sim-team-label.red').textContent  = `Arsenal wins (of ${a.left})`;
  document.querySelector('.sim-team-label.blue').textContent = `City wins (of ${c.left})`;
  sim(arsSl, 'ars');
}

export function setLive(ok) {
  const chip = document.querySelector('.live-chip');
  const lbl  = document.getElementById('live-label');
  const dot  = chip && chip.querySelector('.live-dot');
  if (!chip) return;
  if (ok) {
    chip.style.color       = 'var(--green)';
    chip.style.background  = 'rgba(34, 197, 94, 0.1)';
    chip.style.borderColor = 'rgba(34, 197, 94, 0.25)';
    if (dot) dot.style.background = 'var(--green)';
    if (lbl) lbl.textContent = 'Live';
  } else {
    chip.style.color       = 'var(--amber)';
    chip.style.background  = 'rgba(245, 158, 11, 0.1)';
    chip.style.borderColor = 'rgba(245, 158, 11, 0.25)';
    if (dot) dot.style.background = 'var(--amber)';
    if (lbl) lbl.textContent = 'Cached';
  }
}
