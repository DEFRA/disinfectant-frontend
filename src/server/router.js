import inert from '@hapi/inert'

import { health } from '~/src/server/health/index.js'
import { serveStaticFiles } from '~/src/server/common/helpers/serve-static-files.js'
import { about } from '~/src/server/about/index.js'
import { approvedDisinfectant } from '~/src/server/approved-disinfectants/index.js'
import { accessibilityStatement } from './accessibility-statement/index.js'

/**
 * Router object that defines the routes and plugins for the server.
 * @typedef {Object} Router
 * @property {Object} plugin - Plugin configuration for the router.
 * @property {string} plugin.name - The name of the router plugin.
 * @property {Function} plugin.register - The registration function for the router plugin.
 */
const router = {
  plugin: {
    name: 'router',
    register: async (server) => {
      await server.register([inert])

      // Health-check route. Used by platform to check if service is running, do not remove!
      await server.register([health])

      // Application specific routes, add your own routes here
      await server.register([
        about,
        approvedDisinfectant,
        accessibilityStatement
      ])

      // Static assets
      await server.register([serveStaticFiles])
    }
  }
}

export { router }
