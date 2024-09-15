import { config } from '~/src/config/index.js'
import { ProxyAgent, fetch as undiciFetch } from 'undici'

/**
 * Fetches the specified URL without using a proxy.
 *
 * @param {string} url - The URL to fetch.
 * @param {object} opts - The fetch options.
 * @returns {Promise<Response>} - A promise that resolves to the response.
 */
const nonProxyFetch = (url, opts) => {
  return undiciFetch(url, {
    ...opts
  })
}

/**
 * Fetches the specified URL using a proxy if available, otherwise uses the default fetch implementation.
 * @param {string} url - The URL to fetch.
 * @param {object} opts - The fetch options.
 * @returns {Promise<Response>} - A promise that resolves to the response of the fetch request.
 */
const proxyFetch = (url, opts) => {
  const proxy = config.get('httpsProxy') ?? config.get('httpProxy')
  if (!proxy) {
    return nonProxyFetch(url, opts)
  } else {
    return undiciFetch(url, {
      ...opts,
      dispatcher: new ProxyAgent({
        uri: proxy,
        keepAliveTimeout: 10,
        keepAliveMaxTimeout: 10
      })
    })
  }
}

export { proxyFetch }
