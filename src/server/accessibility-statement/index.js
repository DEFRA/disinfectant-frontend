import { accessibilityController } from '~/src/server/accessibility-statement/controller.js'

/**
 * Object representing the accessibility statement plugin.
 * @type {Object}
 * @property {string} plugin.name - The name of the plugin.
 * @property {Function} plugin.register - The registration function for the plugin.
 */
const accessibilityStatement = {
  plugin: {
    name: 'accessibilityStatement',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/accessibility-statement',
          ...accessibilityController
        }
      ])
    }
  }
}

export { accessibilityStatement }
