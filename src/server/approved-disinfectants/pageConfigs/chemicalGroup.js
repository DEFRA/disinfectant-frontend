import { pageSummaryTexts } from '../staticTexts/pageSummaryTexts.js'

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
