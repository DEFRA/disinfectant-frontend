import { aboutController } from '~/src/server/about/controller.js'

/**
 * Sets up the routes used in the /about page.
 * These routes are registered in src/server/router.js.
 */
/**
 * Represents the about plugin.
 * @type {Object}
 * @property {Object} plugin - The plugin object.
 * @property {string} plugin.name - The name of the plugin.
 * @property {Function} plugin.register - The registration function for the plugin.
 */
const about = {
  plugin: {
    name: 'about',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/about',
          ...aboutController
        }
      ])
    }
  }
}

export { about }
