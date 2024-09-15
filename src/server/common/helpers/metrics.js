import {
  createMetricsLogger,
  Unit,
  StorageResolution
} from 'aws-embedded-metrics'
import { config } from '~/src/config/index.js'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'

/**
 * Increments a counter metric with the specified name and value.
 *
 * @param {string} metricName - The name of the metric.
 * @param {number} [value=1] - The value to increment the metric by. Default is 1.
 * @returns {Promise<void>} - A promise that resolves when the metric is flushed.
 */
const counter = async (metricName, value = 1) => {
  const logger = createLogger()
  if (!config.get('isProduction')) return

  try {
    const metrics = createMetricsLogger()
    metrics.putMetric(metricName, value, Unit.Count, StorageResolution.Standard)
    await metrics.flush()
  } catch (e) {
    logger.warn(e)
  }
}

export { counter }
