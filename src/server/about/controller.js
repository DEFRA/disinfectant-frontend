/**
 * A GDS styled example about page controller.
 * Provided as an example, remove or modify as required.
 */
/**
 * Controller for handling the about page.
 * @type {Object}
 * @property {Function} handler - The handler function for the about page.
 */
const aboutController = {
  handler: (request, h) => {
    return h.view('about/index', {
      pageTitle: 'About',
      heading: 'About',
      breadcrumbs: [
        {
          text: 'Home',
          href: '/'
        },
        {
          text: 'About'
        }
      ]
    })
  }
}

export { aboutController }
