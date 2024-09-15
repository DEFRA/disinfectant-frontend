import { pageSummaryTexts } from '../staticTexts/pageSummaryTexts.js'

/**
 * Represents the configuration for approved categories.
 * @typedef {Object} ApprovedCategories
 * @property {string} name - The name of the approved categories.
 * @property {string} classes - The CSS classes for the approved categories.
 * @property {Object} fieldset - The fieldset configuration for the approved categories.
 * @property {Object} fieldset.legend - The legend configuration for the approved categories.
 * @property {string} fieldset.legend.text - The text for the legend of the approved categories.
 * @property {boolean} fieldset.legend.isPageHeading - Indicates if the legend is a page heading.
 * @property {string} fieldset.legend.classes - The CSS classes for the legend of the approved categories.
 */

/**
 * The configuration for approved categories.
 * @type {ApprovedCategories}
 */
export const approvedCategories = {
  name: 'chkApprovalCategories',
  classes: 'govuk-checkboxes--small',
  fieldset: {
    legend: {
      text: pageSummaryTexts.filterPanelTitles.approvalCategories,
      isPageHeading: true,
      classes: 'govuk-fieldset__legend--s'
    }
  }
}
