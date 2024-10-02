import path from 'path'
import hapi from '@hapi/hapi'

import { config } from '~/src/config/index.js'
import { nunjucksConfig } from '~/src/config/nunjucks/index.js'
import { router } from './router.js'
import { requestLogger } from '~/src/server/common/helpers/logging/request-logger.js'
import { catchAll } from '~/src/server/common/helpers/errors.js'
import { secureContext } from '~/src/server/common/helpers/secure-context/index.js'
import { sessionCache } from '~/src/server/common/helpers/session-cache/session-cache.js'
import { getCacheEngine } from '~/src/server/common/helpers/session-cache/cache-engine.js'
import { RedisService } from './common/helpers/redis-service.js'
import { buildRedisClient } from './common/helpers/redis-client.js'

const redisConfig = config.get('redis')
let redisClient = null
if (redisConfig.enabled) {
  redisClient = buildRedisClient()
}
const isProduction = config.get('isProduction')

async function createServer() {
  const server = hapi.server({
    port: config.get('port'),
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      },
      files: {
        relativeTo: path.resolve(config.get('root'), '.public')
      },
      security: {
        hsts: {
          maxAge: 31536000,
          includeSubDomains: true,
          preload: false
        },
        xss: 'enabled',
        noSniff: true,
        xframe: true
      }
    },
    router: {
      stripTrailingSlash: true
    },
    cache: [
      {
        name: config.get('session.cache.name'),
        engine: getCacheEngine()
      }
    ]
  })

  await server.register(requestLogger)

  if (isProduction) {
    await server.register(secureContext)
  }

  if (redisConfig.enabled) {
    const redisService = new RedisService(redisClient, server)
    server.decorate('request', 'redis', redisService)
    server.decorate('server', 'redis', redisService)
  }

  await server.register([sessionCache, nunjucksConfig])

  // Register all of the controllers/routes defined in src/server/router.js
  await server.register([router])

  server.ext('onPreResponse', catchAll)

  // --- Penetration Test Fixes Start ---
  // Add security headers to prevent vulnerabilities
  server.ext('onPreResponse', (request, h) => {
    const response = request.response
    if (!response.isBoom) {
      // Add Content-Security-Policy header
      response.header('Content-Security-Policy', getSecurityPolicy())
      // Add Referrer-Policy header
      response.header('Referrer-Policy', 'no-referrer')
      // Prevent MIME-type sniffing
      response.header('X-Content-Type-Options', 'nosniff')
      // Add cross-domain policies to prevent external cross-domain requests
      response.header('X-Permitted-Cross-Domain-Policies', 'none')
    }
    return h.continue
  })

  // --- Penetration Test Fixes End ---

  return server
}

function getSecurityPolicy() {
  return (
    "default-src 'self';" +
    "object-src 'none';" +
    "script-src 'self' www.google-analytics.com *.googletagmanager.com ajax.googleapis.com *.googletagmanager.com/gtm.js 'unsafe-inline' 'unsafe-eval' 'unsafe-hashes';" +
    "form-action 'self';" +
    "base-uri 'self';" +
    "connect-src 'self' *.google-analytics.com *.analytics.google.com *.googletagmanager.com;" +
    "style-src 'self' 'unsafe-inline' tagmanager.google.com *.googleapis.com;" +
    "img-src 'self' *.google-analytics.com *.googletagmanager.com;"
  )
}

export { createServer }
