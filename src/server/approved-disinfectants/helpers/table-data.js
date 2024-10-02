function tableData(approvedDisinfectantList, logger) {
  logger.info(`table-data process initiated`)
  const className = 'govuk-body-s'
  let tableItems = []
  tableItems = [
    [
      {
        html: '<span role="alert" aria-live="polite">No records found</span>',
        classes: className
      },
      { html: '', classes: className },
      { html: '', classes: className },
      { html: '', classes: className },
      { html: '', classes: className },
      { html: '', classes: className },
      { html: '', classes: className },
      { html: '', classes: className }
    ]
  ]
  try {
    tableItems = approvedDisinfectantList?.length > 0 ? [] : tableItems

    approvedDisinfectantList.forEach((element) => {
      tableItems.push([
        { html: element.disInfectantName, classes: className },
        {
          html: `${element.companyName} 
            <br><span class="govuk-secondary-text-colour"> 
            ${element.companyAddress != null ? element.companyAddress : ''} 
            </span>`,
          classes: className
        },
        { html: element.chemicalGroups, classes: className },
        { html: element.fmdo, classes: className },
        { html: element.svdo, classes: className },
        { html: element.dop, classes: className },
        { html: element.tbo, classes: className },
        { html: element.go, classes: className }
      ])
    })
  } catch (error) {
    logger.error(`error from table-data ${error.message}`)
  }
  logger.info(`table-data process executed`)
  return tableItems
}
export { tableData }
