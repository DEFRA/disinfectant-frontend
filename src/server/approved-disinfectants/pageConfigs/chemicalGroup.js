import { pageSummaryTexts } from '../staticTexts/pageSummaryTexts.js'

/**
 * Represents the configuration for the chemical group.
 * @typedef {Object} ChemicalGroup
 * @property {string} name - The name of the chemical group.
 * @property {string} classes - The CSS classes for the chemical group checkboxes.
 * @property {Object} fieldset - The fieldset configuration for the chemical group.
 * @property {Object} fieldset.legend - The legend configuration for the chemical group fieldset.
 * @property {string} fieldset.legend.text - The text for the chemical group fieldset legend.
 * @property {boolean} fieldset.legend.isPageHeading - Indicates if the chemical group fieldset legend is a page heading.
 * @property {string} fieldset.legend.classes - The CSS classes for the chemical group fieldset legend.
 */
export const chemicalGroup = {
  name: 'chkChemicalGroup',
  classes: 'govuk-checkboxes--small checkboxes-with-two-columns',
  fieldset: {
    legend: {
      text: pageSummaryTexts.filterPanelTitles.chemicalGroups,
      isPageHeading: true,
      classes: 'govuk-fieldset__legend--s'
    }
  }
}
