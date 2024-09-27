import { pageSummaryTexts } from '../staticTexts/pageSummaryTexts.js'

export const approvedCategories = {
  name: 'chkApprovalCategories',
  classes: 'govuk-checkboxes--small',
  fieldset: {
    legend: {
      text: pageSummaryTexts.filterPanelTitles.approvalCategories,
      classes: 'govuk-fieldset__legend--s'
    }
  }
}
