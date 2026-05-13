import { state } from './state.js';

export function sim(el, team) {
  const max = team === 'ars' ? state.data.arsenal.left : state.data.city.left;
  updateSliderTrack(el, Math.max(1, max));
  document.getElementById(team === 'ars' ? 'ars-wins-v' : 'city-wins-v').textContent = el.value;

  const aw = parseInt(document.getElementById('ars-wins').value)  || 0;
  const cw = parseInt(document.getElementById('city-wins').value) || 0;
  const af = state.data.arsenal.pts + aw * 3 + Math.max(0, state.data.arsenal.left - aw);
  const cf = state.data.city.pts    + cw * 3 + Math.max(0, state.data.city.left    - cw);

  const r = document.getElementById('sim-result');
  if      (af > cf) r.innerHTML = `<span style="color:var(--red)">Arsenal win the title</span>&nbsp;&nbsp;·&nbsp;&nbsp;${af} pts vs ${cf} pts`;
  else if (cf > af) r.innerHTML = `<span style="color:var(--blue)">Man City win the title</span>&nbsp;&nbsp;·&nbsp;&nbsp;${cf} pts vs ${af} pts`;
  else              r.innerHTML = `<span style="color:var(--t2)">Dead level on ${af} pts — tiebreakers decide</span>`;
}

export function updateSliderTrack(el, max) {
  const m = Math.max(1, max);
  const pct = (parseInt(el.value) / m * 100).toFixed(0);
  const color = el.classList.contains('r-red') ? '#ff3b4e' : '#3b82f6';
  el.style.background = `linear-gradient(to right, ${color} 0%, ${color} ${pct}%, #222228 ${pct}%)`;
}

export function bindSliders() {
  const arsSl  = document.getElementById('ars-wins');
  const citySl = document.getElementById('city-wins');
  arsSl.addEventListener('input',  () => sim(arsSl,  'ars'));
  citySl.addEventListener('input', () => sim(citySl, 'city'));
}
