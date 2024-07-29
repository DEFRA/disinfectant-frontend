import { createLogger } from '~/src/server/common/helpers/logging/logger.js'

const logger = createLogger()

function tableData(approvedDisinfectantList) {
  const className = 'govuk-body-s govuk-!-width-one-quarter'
  let tableItems = []
  // let tableItems = [{text:'d',classes:className},
  //                     {text:'d',classes:className},
  //                     {text:'d',classes:className},
  //                     {text:'No Results Found',classes:className},
  //                     {text:'dd',classes:className},
  //                     {text:'d',classes:className},
  //                     {text:'d',classes:className},
  //                     {text:'d',classes:className}];
  try {
    tableItems = approvedDisinfectantList?.length > 0 ? [] : tableItems

    approvedDisinfectantList.forEach((element) => {
      tableItems.push([
        { html: element.disInfectantName, classes: className },
        {
          html:
            element.companyName +
            '<br><span class="govuk-secondary-text-colour">' +
            (element.companyAddress != null ? element.companyAddress : '') +
            '</span>',
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
    logger.info(`error from table-data ${error.message}`)
  }
  return tableItems
}
export { tableData }
