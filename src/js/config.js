export const API_URL     = 'https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=4328&s=2025-2026';
export const REFRESH_MS  = 60_000;
export const TOTAL_GAMES = 38;

export const TICKERS = [
  'Live standings via TheSportsDB — refreshes every 60 seconds',
  'Arsenal vs Manchester City — the title race comes down to the final stretch',
  'Goal difference is the first tiebreaker if level on points',
  "City hold the H2H edge — 4 pts vs Arsenal's 1 in head-to-heads",
  'Watch the points gap, GD, and games remaining for the full picture',
];

export const FALLBACK_DATA = {
  arsenal: { pts: 71, p: 33, w: 22, d: 5, l: 6, gd: 37, gs: 63, left: 5 },
  city:    { pts: 71, p: 33, w: 22, d: 5, l: 6, gd: 36, gs: 65, left: 6 },
};
