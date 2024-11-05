import { pageSummaryTexts } from '../staticTexts/pageSummaryTexts.js'

const className = 'govuk-body-s'
export const tableConfig = {
  // caption: "Dates and amounts",
  firstCellIsHeader: false,
  classes: 'app-table-layout-width responsive-table-wide-borders thead-sticky',

  head: [
    {
      text: pageSummaryTexts.tableColumns.disInfectantName,
      classes: className
    },
    {
      text: pageSummaryTexts.tableColumns.chemicalgroup,
      classes: className
    },
    {
      text: pageSummaryTexts.tableColumns.fmdo,
      classes: className
    },
    {
      text: pageSummaryTexts.tableColumns.svdo,
      classes: className
    },
    {
      text: pageSummaryTexts.tableColumns.dop,
      classes: className
    },
    {
      text: pageSummaryTexts.tableColumns.tbo,
      classes: className
    },
    {
      text: pageSummaryTexts.tableColumns.go,
      classes: className
    }
  ]
}
