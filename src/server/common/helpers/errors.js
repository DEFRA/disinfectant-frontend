/**
 * Returns the error message based on the provided status code.
 * @param {number} statusCode - The status code.
 * @returns {string} - The error message.
 */
function statusCodeMessage(statusCode) {
  const errorCodeNum = 404

  if (statusCode === errorCodeNum) {
    return 'If you typed the web address, check it is correct. <br><br> If you pasted the web address, check you copied the entire address.'
  } else {
    return 'Try again later.<br><br>Email <a href="mailto:disinfectant@apha.gov.uk"> disinfectant@apha.gov.uk </a> for further information.'
  }
}
/**
 * Returns the heading title based on the given status code.
 * @param {number} statusCode - The status code.
 * @returns {Object} - The heading title object.
 */
function statusCodeHeading(statusCode) {
  const errorCodeNum = 404

  if (statusCode === errorCodeNum) {
    return { title: 'Page Not Found' }
  } else {
    return { title: 'Sorry, there is a problem with the service' }
  }
}

/**
 * Handles all errors in the server.
 * @param {Object} request - The request object.
 * @param {Object} h - The response toolkit object.
 * @returns {Object} - The response object.
 */
function catchAll(request, h) {
  const { response } = request
  if (!response.isBoom) {
    return h.continue
  }
  request.logger.error(response?.stack)
  const statusCode = response.output.statusCode
  const errorMessage = statusCodeMessage(statusCode)
  const errorHeading = statusCodeHeading(statusCode)
  return h
    .view('error/index', {
      pageTitle: errorHeading.title,
      heading: errorHeading.title,
      message: errorMessage
    })
    .code(statusCode)
}
export { catchAll }
