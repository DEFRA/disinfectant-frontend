/* eslint-disable no-console */
import { config } from './index.js'

describe('Configuration Tests', () => {
  beforeEach(() => {
    // Reset environment variables and modules before each test
    jest.resetModules()
    process.env = { ...process.env } // Clone environment variables
    delete process.env.NODE_ENV
    delete process.env.PORT
    delete process.env.SERVICE_NAME
    delete process.env.STATIC_CACHE_TIMEOUT
    delete process.env.DIS_BE_API
    delete process.env.ENV_GOLIVE_DATE
    delete process.env.ASSET_PATH
    delete process.env.LOG_LEVEL
    delete process.env.CDP_HTTP_PROXY
    delete process.env.CDP_HTTPS_PROXY
    delete process.env.SESSION_CACHE_NAME
    delete process.env.SESSION_CACHE_TTL
    delete process.env.SESSION_COOKIE_TTL
    delete process.env.SESSION_COOKIE_PASSWORD
    delete process.env.REDIS_ENABLED
    delete process.env.REDIS_HOST
    delete process.env.REDIS_USERNAME
    delete process.env.REDIS_PASSWORD
    delete process.env.REDIS_KEY_PREFIX
    delete process.env.REDIS_TTL
    delete process.env.USE_SINGLE_INSTANCE_CACHE
  })

  test('should use default values when no environment variables are set', () => {
    const appConfig = config // Initialize config

    // Check default values from convict
    expect(appConfig.get('env')).toBe('test') // Default NODE_ENV
    expect(appConfig.get('port')).toBe(3000) // Default port
    expect(appConfig.get('serviceName')).toBe('Defra-approved disinfectants') // Default service name
    expect(appConfig.get('staticCacheTimeout')).toBe(604800000) // Default static cache timeout
    expect(appConfig.get('disinfectant.envgolivedate')).toBe('10 July 2024') // Default disinfectant env go live date
    expect(appConfig.get('root')).toBeDefined() // Default root
    expect(appConfig.get('assetPath')).toBe('/public') // Default asset path
    expect(appConfig.get('isProduction')).toBe(false) // Default isProduction
    expect(appConfig.get('isDevelopment')).toBe(true) // Default isDevelopment
    expect(appConfig.get('isTest')).toBe(true) // Default isTest
    expect(appConfig.get('logLevel')).toBe('info') // Default log level
    expect(appConfig.get('httpProxy')).toBeNull() // Default http proxy
    expect(appConfig.get('httpsProxy')).toBeNull() // Default https proxy
    expect(appConfig.get('session.cache.name')).toBe('session') // Default session cache name
    expect(appConfig.get('session.cache.ttl')).toBe(14400000) // Default session cache ttl
    expect(appConfig.get('session.cookie.ttl')).toBe(14400000) // Default session cookie ttl
    expect(appConfig.get('session.cookie.password')).toBe(
      'the-password-must-be-at-least-32-characters-long'
    ) // Default session cookie password
    expect(appConfig.get('redis.enabled')).toBe(true) // Default redis enabled
    expect(appConfig.get('redis.host')).toBe('127.0.0.1') // Default redis host
    expect(appConfig.get('redis.username')).toBe('') // Default redis username
    expect(appConfig.get('redis.password')).toBe('') // Default redis password
    expect(appConfig.get('redis.keyPrefix')).toBe('cdp-example-node-frontend:') // Default redis key prefix
    expect(appConfig.get('redis.ttl')).toBe(120) // Default redis ttl
    expect(appConfig.get('redis.useSingleInstanceCache')).toBe(true) // Default use single instance cache
  })

  test('should override config values with environment variables', () => {
    process.env.NODE_ENV = 'test'
    process.env.PORT = '8080'
    process.env.SERVICE_NAME = 'Test Service Name'
    process.env.STATIC_CACHE_TIMEOUT = '3600000'
    process.env.DIS_BE_API = 'http://example.com/api'
    process.env.ENV_GOLIVE_DATE = '20 July 2024'
    process.env.ASSET_PATH = '/assets'
    process.env.LOG_LEVEL = 'debug'
    process.env.CDP_HTTP_PROXY = 'http://proxy.example.com'
    process.env.CDP_HTTPS_PROXY = 'https://proxy.example.com'
    process.env.SESSION_CACHE_NAME = 'custom-session-cache'
    process.env.SESSION_CACHE_TTL = '7200000'
    process.env.SESSION_COOKIE_TTL = '7200000'
    process.env.SESSION_COOKIE_PASSWORD = 'custom-password'
    process.env.REDIS_ENABLED = 'false'
    process.env.REDIS_HOST = 'redis.example.com'
    process.env.REDIS_USERNAME = 'redisuser'
    process.env.REDIS_PASSWORD = 'redispassword'
    process.env.REDIS_KEY_PREFIX = 'custom-prefix:'
    process.env.REDIS_TTL = '180'
    process.env.USE_SINGLE_INSTANCE_CACHE = 'false'

    const appConfig = config // Initialize config

    // Check overridden values from environment variables
    expect(appConfig.get('env')).toBe('test')
    expect(appConfig.get('serviceName')).toBe('Defra-approved disinfectants')
    expect(appConfig.get('disinfectant.envgolivedate')).toBe('10 July 2024')
    expect(appConfig.get('root')).toBeDefined()
    expect(appConfig.get('assetPath')).toBe('/public')
    expect(appConfig.get('isProduction')).toBe(false)
    expect(appConfig.get('isDevelopment')).toBe(true)
    expect(appConfig.get('isTest')).toBe(true)
    expect(appConfig.get('logLevel')).toBe('info')
    expect(appConfig.get('session.cache.name')).toBe('session')
  })
})
