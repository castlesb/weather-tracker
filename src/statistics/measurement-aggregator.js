import { HttpError } from '../errors';
import { Measurement } from '../measurements/measurement';

/**
 * Compute statistics for given measurements
 * @param {Measurement} measurements
 * @param {String[]} metrics
 * @param {String[]} stats
 * @return {*}
 */
export function computeStats(measurements, metrics, stats) {
  const result = [];
  for (let metric of metrics) {
      // const metricArray = measurements.map(m => m.getMetric(metric));
      const metricArray = measurements.filter(m => m.getMetric(metric) != null).map(m => m.getMetric(metric));
      console.log(`METRIC ARRAY: ${JSON.stringify(metricArray)}`);
      if (metricArray.length === 0) return result;
    for (let stat of stats) {
      if (stat === 'min') {
        result.push({metric, stat: 'min', value: arrayMin(metricArray)});
      } else if (stat === 'max') {
        result.push({metric, stat: 'max', value: arrayMax(metricArray)});
      } else {
        const sum = metricArray.reduce((acc, val) => acc + val, 0);
        const average = metricArray.reduce((a, b) => a + b) / metricArray.length;
        result.push({metric, stat: 'average', value: Math.round( average * 10) / 10});
      }
    }
  }

  return result;
}

function arrayMin(arr) {
  return arr.reduce(function (a, b) {
    return (a < b ? a : b);
  });
}

function arrayMax(arr) {
  return arr.reduce(function (a, b) {
    return (a > b ? a : b);
  });
}
