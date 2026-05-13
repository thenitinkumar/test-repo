import { REFRESH_MS } from './config.js';
import { fetchLive } from './api.js';
import { render, setLive } from './render.js';
import { bindSliders } from './simulator.js';
import { tickTicker, updateClock } from './ui.js';

async function refresh() {
  try {
    await fetchLive();
    setLive(true);
    render();
  } catch (err) {
    console.warn('[live] fetch failed:', err.message);
    setLive(false);
  }
}

function init() {
  bindSliders();
  render();
  updateClock();
  tickTicker();
  refresh();

  setInterval(updateClock, 1000);
  setInterval(tickTicker, 8000);
  setInterval(refresh, REFRESH_MS);
}

init();
