import { homeController } from '~/src/server/home/controller.js'

/**
 * Sets up the routes used in the home page.
 * These routes are registered in src/server/router.js.
 */
/**
 * Represents the home plugin.
 * @type {Object}
 * @property {Object} plugin - The plugin object.
 * @property {string} plugin.name - The name of the plugin.
 * @property {Function} plugin.register - The registration function for the plugin.
 */
const home = {
  plugin: {
    name: 'home',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/home',
          ...homeController
        }
      ])
    }
  }
}

export { home }
