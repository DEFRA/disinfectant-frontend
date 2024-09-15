import { config } from '~/src/config/index.js'

const redisConfig = config.get('redis')

/**
 * Represents a Redis service for storing and retrieving data.
 */
class RedisService {
  constructor(redis, server) {
    this.client = redis
    this.server = server
  }

  async storeData(id, data) {
    const storedData = await this.getData(id)

    await this.client.set(
      id,
      JSON.stringify({
        ...(storedData && storedData),
        ...data
      }),
      'EX',
      redisConfig.ttl
    )

    this.server.logger.debug(
      {
        ...(storedData && storedData),
        ...data
      },
      'Redis store data'
    )

    return this.getData(id)
  }

  /**
   * Retrieves data from Redis based on the provided ID.
   * @param {string} id - The ID of the data to retrieve.
   * @returns {Promise<any>} - A promise that resolves to the retrieved data.
   */
  async getData(id) {
    const data = await this.client.get(id)
    const response = data ? JSON.parse(data) : null

    this.server.logger.debug({ data: response }, 'Redis get data')

    return response
  }

  /**
   * Removes data from Redis store.
   * @param {string} id - The ID of the data to be removed.
   * @returns {Promise<string>} The ID of the removed data.
   */
  async removeData(id) {
    await this.client.del(id)

    this.server.logger.info(`Redis store data: ${id} removed`)
    return id
  }
}

export { RedisService }
