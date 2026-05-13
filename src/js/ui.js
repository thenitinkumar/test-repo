import { TICKERS } from './config.js';
import { state } from './state.js';

let tickerIndex = 0;

export function tickTicker() {
  const el = document.getElementById('ticker-text');
  el.style.opacity = 0;
  setTimeout(() => {
    el.textContent = TICKERS[tickerIndex++ % TICKERS.length];
    el.style.opacity = 1;
  }, 300);
}

export function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString('en-GB', {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
  const stamp = state.lastUpdate
    ? 'Updated ' + state.lastUpdate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : 'Awaiting first update…';
  document.getElementById('footer-stamp').textContent = stamp;
}
