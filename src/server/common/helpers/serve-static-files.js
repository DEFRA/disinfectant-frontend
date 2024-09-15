import { config } from '~/src/config/index.js'

/**
 * Serve static files plugin for the server.
 *
 * @type {Object}
 * @property {Object} plugin - The plugin object.
 * @property {string} plugin.name - The name of the plugin.
 * @property {Function} plugin.register - The registration function for the plugin.
 */
const serveStaticFiles = {
  plugin: {
    name: 'staticFiles',
    register: async (server) => {
      server.route([
        {
          options: {
            auth: false,
            cache: {
              expiresIn: config.get('staticCacheTimeout'),
              privacy: 'private'
            }
          },
          method: 'GET',
          path: '/favicon.ico',
          handler: function (request, h) {
            return h.response().code(204).type('image/x-icon')
          }
        },
        {
          options: {
            auth: false,
            cache: {
              expiresIn: config.get('staticCacheTimeout'),
              privacy: 'private'
            }
          },
          method: 'GET',
          path: `${config.get('assetPath')}/{param*}`,
          handler: {
            directory: {
              path: '.',
              redirectToSlash: true
            }
          }
        }
      ])
    }
  }
}

export { serveStaticFiles }
