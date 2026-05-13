import { FALLBACK_DATA } from './config.js';

export const state = {
  data: structuredClone(FALLBACK_DATA),
  lastUpdate: null,
};
