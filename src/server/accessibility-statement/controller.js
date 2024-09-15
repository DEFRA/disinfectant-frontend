/**
 * Controller for handling accessibility statement requests.
 *
 * @type {Object}
 * @property {Function} handler - The handler function for the accessibility statement request.
 * @param {Object} request - The Hapi request object.
 * @param {Object} h - The Hapi response toolkit.
 * @returns {Object} - The Hapi response object.
 */
const accessibilityController = {
  handler: (request, h) => {
    return h.view('accessibility-statement/index', {
      pageTitle: 'Accessibility Statement',
      heading: 'Accessibility statement for www.gov.uk',
      breadcrumbs: [
        {
          text: 'Home',
          href: '/'
        },
        {
          text: 'Accessibility Statement'
        }
      ]
    })
  }
}

export { accessibilityController }
