import { approvedDisinfectantController } from '~/src/server/approved-disinfectants/controller.js'
import { postController } from '~/src/server/approved-disinfectants/post-controller.js'

/**
 * Sets up the routes used in the /about page.
 * These routes are registered in src/server/router.js.
 */
const approvedDisinfectant = {
  plugin: {
    name: 'approvedDisinfectant',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/',
          ...approvedDisinfectantController
        },
        {
          method: 'POST',
          path: '/',
          ...postController
        },
        {
          method: 'GET',
          path: '/DisinfectantsExternal',
          ...approvedDisinfectantController
        },
        {
          method: 'GET',
          path: '/DisinfectantsExternal/Default.aspx',
          ...approvedDisinfectantController
        }
      ])
    }
  }
}

export { approvedDisinfectant }
