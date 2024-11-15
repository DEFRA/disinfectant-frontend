import { pageSummaryTexts } from '../staticTexts/pageSummaryTexts.js'

function createTableItem(element, className) {
  return [
    {
      html: `<div class="govuk-table-heading-wrapper">
                  <span class="table-heading">${pageSummaryTexts.tableColumns.disInfectantName}</span>
                </div>
                <div>
                <span class="govuk-table-span govuk-body first-column-padding"><strong>${element.disInfectantName}</strong></span>
                <span class="govuk-table-span govuk-!-margin-bottom-0">${element.companyName}</span>
                <span class="govuk-table-span govuk-secondary-text-colour">${element.companyAddress != null ? element.companyAddress : ''}</span>
                </div>`,
      classes: className
    },

    {
      html: `<div class="govuk-table-heading-wrapper"><span class="table-heading">${pageSummaryTexts.tableColumns.chemicalgroup}</span></div>
          <div> <span class="govuk-table-span first-column-padding">${element.chemicalGroups != null ? element.chemicalGroups : ''}</span></div>`,
      classes: className
    },
    {
      html: `<div class="govuk-table-heading-wrapper"><span class="table-heading">${pageSummaryTexts.tableColumns.fmdo}</span></div>
          <div> <span class="govuk-table-span first-column-padding">${element.fmdo != null ? element.fmdo : ''}</span></div>`,
      classes: className
    },
    {
      html: `<div class="govuk-table-heading-wrapper"><span class="table-heading">${pageSummaryTexts.tableColumns.svdo}</span></div>
          <div> <span class="govuk-table-span first-column-padding">${element.svdo != null ? element.svdo : ''}</span></div>`,
      classes: className
    },
    {
      html: `<div class="govuk-table-heading-wrapper column-width-50pc"><span class="table-heading">${pageSummaryTexts.tableColumns.dop}</span></div>
          <div> <span class="govuk-table-span first-column-padding">${element.dop != null ? element.dop : ''}</span></div>`,
      classes: className
    },
    {
      html: `<div class="govuk-table-heading-wrapper"><span class="table-heading">${pageSummaryTexts.tableColumns.tbo}</span></div>
          <div> <span class="govuk-table-span first-column-padding">${element.tbo != null ? element.tbo : ''}</span></div>`,
      classes: className
    },
    {
      html: `<div class="govuk-table-heading-wrapper"><span class="table-heading">${pageSummaryTexts.tableColumns.go}</span></div>
          <div> <span class="govuk-table-span first-column-padding">${element.go != null ? element.go : ''}</span></div>`,
      classes: className
    }
  ]
}

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
        html: `<div class="govuk-table-heading-wrapper column-width-50pc"><span class="table-heading">${pageSummaryTexts.tableColumns.dop}</span></div>
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
      tableItems.push(createTableItem(element, className))
    })
  } catch (error) {
    logger.error(`error from table-data ${error.message}`) // logs error code
  }
  logger.info(`table-data process executed`)
  return tableItems
}

export { tableData }
