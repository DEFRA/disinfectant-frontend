/**
 * A GDS styled example home page controller.
 * Provided as an example, remove or modify as required.
 */
/**
 * Controller for the home page.
 * @type {Object}
 * @property {Function} handler - Request handler function.
 */
const homeController = {
  handler: (request, h) => {
    return h.view('home/index', {
      pageTitle: 'Home',
      heading: 'Disinfectants Approved for use in England,Scotland and Wales'
    })
  }
}

export { homeController }
