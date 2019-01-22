import { Measurement } from './measurement';
import { HttpError } from '../errors';

const store = [];

/**
 * Add new measurement
 * @param {Measurement} measurement to be added
 */
export function add(measurement) {
  store.push(measurement);
}

/**
 * Get existing measurement
 * @param {Date} timestamp when measurement was taken
 * @returns {Measurement} measurement for the particular date
 */
export function fetch(timestamp) {
  return store.find(e => e.timestamp.toISOString() === timestamp.toISOString());
}

/**
 * Get the measurements within the given date range
 * @param {Date} start Lower bound for the query, inclusive
 * @param {Date} end Upper bound for the query, exclusive
 */
export function queryDateRange(from, to) {
  const result = [];
  const start = store.findIndex(e => e.timestamp.toISOString() === from.toISOString());
  let i = start;
  
  while (store[i].timestamp.toISOString() !== to.toISOString()) {
      
  }

  for (let i = start; i < store.length; i++) {
    if (store[i].timestamp.toISOString() === to.toISOString()) {
        break;
    } else {
        result.push(store[i]);
    }
  }

  return result;
}
