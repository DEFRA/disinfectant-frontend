import { accessibilityController } from '~/src/server/accessibility-statement/controller.js'

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
