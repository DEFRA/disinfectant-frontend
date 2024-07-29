/**
 * A GDS styled example about page controller.
 * Provided as an example, remove or modify as required.
 */
import { approvedCategories } from './pageConfigs/approvedCategory.js'
import { pageSummaryTexts } from './staticTexts/pageSummaryTexts.js'
import { chemicalGroup } from './pageConfigs/chemicalGroup.js'
import { utility } from '../common/utility.js'
import { tableConfig } from './pageConfigs/tableConfig.js'
import { externalLinks } from './staticTexts/externalLinks.js'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
import { fetchData } from './helpers/fetch-data.js'
import { tableData } from './helpers/table-data.js'
import { chemicalGroupData } from './helpers/chemicalgroup-data.js'
import { approvalData } from './helpers/approval-data.js'

const logger = createLogger()
const approvedDisinfectantController = {
  handler: async (request, h) => {
    try {
      // set and get yars
      const searchPayload = request.yar.get('searchPayload')
      const setStartsWith =
        typeof request.query.startwith !== 'undefined' &&
        request.query?.startwith !== null
          ? request.query?.startwith
          : 'View all' // take from request object

      request.yar.set('startsWith', setStartsWith)
      // set and get yars
      const pagingConfig = {
        items: utility.pageIndexGenerator('A', 'Z', setStartsWith)
      }
      const searchText = searchPayload?.searchtext
      const chemGroupSelected = searchPayload?.chkChemicalGroup
        ? searchPayload.chkChemicalGroup
        : []
      const approvalCatSelected = searchPayload?.chkApprovalCategories
        ? searchPayload.chkApprovalCategories
        : []
      const {
        checmicalGroups,
        approvedDisinfectantList,
        lastModifiedDateWithTime,
        lastModifiedDate
      } = await fetchData(
        chemGroupSelected,
        approvalCatSelected,
        searchText,
        setStartsWith
      )
      approvedCategories.items = approvalData(approvalCatSelected)
      chemicalGroup.items = chemicalGroupData(
        checmicalGroups,
        chemGroupSelected
      )
      tableConfig.rows = tableData(approvedDisinfectantList)
      // let querystring = "?startwith="+setStartsWith+"#tableDisinfectant"
      return h.view('approved-disinfectants/index', {
        pageTitle: pageSummaryTexts.pageTitle,
        heading: pageSummaryTexts.pageHeader,
        approvedCategories,
        chemicalGroup,
        pageSummaryTexts,
        pagingConfig,
        tableConfig,
        externalLinks,
        breadcrumbs: [
          {
            text: 'Home',
            href: externalLinks.homeLink
          },
          {
            text: 'Defra-approved disinfectants'
          }
        ],
        searchText,
        lastModifiedDateWithTime,
        lastModifiedDate
      })
    } catch (error) {
      logger.info(`error from controller handler of index ${error.message}`)
    }
  }
}

export { approvedDisinfectantController }
