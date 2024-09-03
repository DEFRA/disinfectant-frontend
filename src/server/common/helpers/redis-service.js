import { config } from '~/src/config/index.js'

const redisConfig = config.get('redis')

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
        ...(storedData),
        ...data
      }),
      'EX',
      redisConfig.ttl
    )

    this.server.logger.debug(
      {
        ...(storedData),
        ...data
      },
      'Redis store data'
    )

    return await this.getData(id)
  }

  async getData(id) {
    const data = await this.client.get(id)
    const response = data ? JSON.parse(data) : null

    this.server.logger.debug({ data: response }, 'Redis get data')

    return response
  }

  async removeData(id) {
    await this.client.del(id)

    this.server.logger.info(`Redis store data: ${id} removed`)
    return id
  }
}

export { RedisService }
