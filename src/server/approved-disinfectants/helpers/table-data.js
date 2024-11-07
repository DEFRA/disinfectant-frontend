import { pageSummaryTexts } from '../staticTexts/pageSummaryTexts.js'

function tableData(approvedDisinfectantList, logger) {
  logger.info(`table-data process initiated`)
  const className = 'govuk-body-s'
  let tableItems = []
  tableItems = [
    [
      {
        html: `<div class="govuk-table-heading-wrapper">
                <span class="table-heading">${pageSummaryTexts.tableColumns.disInfectantName}</span>
              </div> 
              <div>
              <span class="govuk-table-span" role="alert" aria-live="polite">No records found</span>
              </div>`,
        classes: className
      },

      {
        html: `<div class="govuk-table-heading-wrapper"><span class="table-heading">${pageSummaryTexts.tableColumns.chemicalgroup}</span></div>
        <div> <span class="govuk-table-span"></span></div>`,
        classes: className
      },
      {
        html: `<div class="govuk-table-heading-wrapper"><span class="table-heading">${pageSummaryTexts.tableColumns.fmdo}</span></div>
        <div> <span class="govuk-table-span"></span></div>`,
        classes: className
      },
      {
        html: `<div class="govuk-table-heading-wrapper"><span class="table-heading">${pageSummaryTexts.tableColumns.svdo}</span></div>
        <div> <span class="govuk-table-span"></span></div>`,
        classes: className
      },
      {
        html: `<div class="govuk-table-heading-wrapper"><span class="table-heading">${pageSummaryTexts.tableColumns.dop}</span></div>
        <div> <span class="govuk-table-span"></span></div>`,
        classes: className
      },
      {
        html: `<div class="govuk-table-heading-wrapper"><span class="table-heading">${pageSummaryTexts.tableColumns.tbo}</span></div>
        <div> <span class="govuk-table-span"></span></div>`,
        classes: className
      },
      {
        html: `<div class="govuk-table-heading-wrapper"><span class="table-heading">${pageSummaryTexts.tableColumns.go}</span></div>
        <div> <span class="govuk-table-span"></span></div>`,
        classes: className
      }
    ]
  ]
  try {
    tableItems = approvedDisinfectantList?.length > 0 ? [] : tableItems

    approvedDisinfectantList.forEach((element) => {
      tableItems.push([
        {
          html: `<div class="govuk-table-heading-wrapper">
                  <span class="table-heading">${pageSummaryTexts.tableColumns.disInfectantName}</span>
                </div> 
                <div>
                <span class="govuk-table-span govuk-body-s"><strong>${element.disInfectantName}</strong></span> 
                <span class="govuk-table-span govuk-!-margin-bottom-0">${element.companyName}</span>
                <span class="govuk-table-span govuk-secondary-text-colour">${element.companyAddress != null ? element.companyAddress : ''}</span>
                </div>`,
          classes: className
        },

        {
          html: `<div class="govuk-table-heading-wrapper"><span class="table-heading">${pageSummaryTexts.tableColumns.chemicalgroup}</span></div>
          <div> <span class="govuk-table-span">${element.chemicalGroups != null ? element.chemicalGroups : ''}</span></div>`,
          classes: className
        },
        {
          html: `<div class="govuk-table-heading-wrapper"><span class="table-heading">${pageSummaryTexts.tableColumns.fmdo}</span></div>
          <div> <span class="govuk-table-span">${element.fmdo != null ? element.fmdo : ''}</span></div>`,
          classes: className
        },
        {
          html: `<div class="govuk-table-heading-wrapper"><span class="table-heading">${pageSummaryTexts.tableColumns.svdo}</span></div>
          <div> <span class="govuk-table-span">${element.svdo != null ? element.svdo : ''}</span></div>`,
          classes: className
        },
        {
          html: `<div class="govuk-table-heading-wrapper"><span class="table-heading">${pageSummaryTexts.tableColumns.dop}</span></div>
          <div> <span class="govuk-table-span">${element.dop != null ? element.dop : ''}</span></div>`,
          classes: className
        },
        {
          html: `<div class="govuk-table-heading-wrapper"><span class="table-heading">${pageSummaryTexts.tableColumns.tbo}</span></div>
          <div> <span class="govuk-table-span">${element.tbo != null ? element.tbo : ''}</span></div>`,
          classes: className
        },
        {
          html: `<div class="govuk-table-heading-wrapper"><span class="table-heading">${pageSummaryTexts.tableColumns.go}</span></div>
          <div> <span class="govuk-table-span">${element.go != null ? element.go : ''}</span></div>`,
          classes: className
        }
      ])
    })
  } catch (error) {
    logger.error(`error from table-data ${error.message}`)
  }
  logger.info(`table-data process executed`)
  return tableItems
}
export { tableData }
