/**
 * A GDS styled example home page controller.
 * Provided as an example, remove or modify as required.
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
