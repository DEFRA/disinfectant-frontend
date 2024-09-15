/**
 * Constants used in the application.
 * @namespace appSpecificConstants
 * @property {object} apiEndpoint - API endpoints.
 * @property {string} apiEndpoint.retrieveList - Endpoint for retrieving the list of approved disinfectants.
 * @property {object} diseaseOrdervaluesToOmit - Disease order values to omit.
 * @property {string} diseaseOrdervaluesToOmit.notApproved - Value for "Not approved" disease order.
 * @property {string} diseaseOrdervaluesToOmit.approvalSuspended - Value for "Approval suspended" disease order.
 */
export const appSpecificConstants = {
  apiEndpoint: {
    retrieveList: '/list/disinfectantApprovedListSI'
  },
  diseaseOrdervaluesToOmit: {
    notApproved: 'Not approved',
    approvalSuspended: 'Approval suspended'
  }
}
