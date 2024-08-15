import inert from '@hapi/inert'

import { health } from '~/src/server/health/index.js'
import { serveStaticFiles } from '~/src/server/common/helpers/serve-static-files.js'
import { about } from '~/src/server/about/index.js'
import { approvedDisinfectant } from '~/src/server/approved-disinfectants/index.js'

const router = {
  plugin: {
    name: 'router',
    register: async (server) => {
      await server.register([inert])

      // Health-check route. Used by platform to check if service is running, do not remove!
      await server.register([health])

      // Application specific routes, add your own routes here
      await server.register([about, approvedDisinfectant])

      // Static assets
      await server.register([serveStaticFiles])
    }
  }
}

export { router }
