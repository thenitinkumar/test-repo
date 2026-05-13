import { API_URL, TOTAL_GAMES } from './config.js';
import { state } from './state.js';

export async function fetchLive() {
  const res = await fetch(API_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const data = await res.json();
  const rows = (data && data.table) || [];
  const ars  = rows.find(r => /arsenal/i.test(r.strTeam));
  const city = rows.find(r => /man.*city/i.test(r.strTeam));
  if (!ars || !city) throw new Error('Teams not found in standings');

  state.data.arsenal = parseRow(ars);
  state.data.city    = parseRow(city);
  state.lastUpdate   = new Date();
}

function parseRow(r) {
  const p = parseInt(r.intPlayed) || 0;
  return {
    pts:  parseInt(r.intPoints) || 0,
    p,
    w:    parseInt(r.intWin)            || 0,
    d:    parseInt(r.intDraw)           || 0,
    l:    parseInt(r.intLoss)           || 0,
    gd:   parseInt(r.intGoalDifference) || 0,
    gs:   parseInt(r.intGoalsFor)       || 0,
    left: Math.max(0, TOTAL_GAMES - p),
  };
}
