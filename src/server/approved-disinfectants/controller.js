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
import { config } from '~/src/config/index.js'
import { buildFilter } from './helpers/build-filter.js'

const logger = createLogger()
const disInfectant = config.get('disinfectant')

/**
 * Controller for handling approved disinfectants.
 * @namespace approvedDisinfectantController
 */
const approvedDisinfectantController = {
  handler: async (request, h) => {
    try {
      logger.info(`get controller handler initiated`)
      // set and get yars

      if (Object.keys(request.query).length === 0) {
        request.yar.set('searchPayload', {})
      }
      const envGoLiveDate = disInfectant.envgolivedate
      const searchPayload = request.yar.get('searchPayload')

      const StartsWith =
        typeof request.query.startwith !== 'undefined' &&
        request.query?.startwith !== null
          ? request.query?.startwith
          : '' // take from request object

      request.yar.set('startsWith', StartsWith)
      // set and get yars
      const pagingConfig = {
        items: utility.pageIndexGenerator('A', 'Z', StartsWith)
      }
      // added for filter panel flow
      const clearValue =
        typeof request.query.clear !== 'undefined' &&
        request.query?.clear !== null
          ? request.query?.clear
          : '' // take from request object
      // added for filter panel flow

      const searchText = searchPayload?.searchtext

      // added for filter panel flow
      const {
        chemGroupSelected,
        approvalCatSelected,
        filterToBeCreated,
        filterCategories,
        clearAllLink
      } = buildFilter(searchPayload, clearValue, StartsWith)

      //  let chemGroupSelected = chemicalGroupSelected
      //  let approvalCatSelected = approvedCategorySelected

      if (typeof searchPayload !== 'undefined' && searchPayload) {
        searchPayload.chkChemicalGroup = chemGroupSelected
        searchPayload.chkApprovalCategories = approvalCatSelected
      }

      request.yar.set('searchPayload', searchPayload)
      // added for filter panel flow
      const {
        checmicalGroups,
        approvedDisinfectantList,
        lastModifiedDateWithTime,
        lastModifiedDate
      } = await fetchData(
        request,
        chemGroupSelected,
        approvalCatSelected,
        searchText,
        StartsWith
      )
      approvedCategories.items = approvalData(approvalCatSelected)
      chemicalGroup.items = chemicalGroupData(
        checmicalGroups,
        chemGroupSelected
      )
      tableConfig.rows = tableData(approvedDisinfectantList)

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
        lastModifiedDate,
        envGoLiveDate,
        filterToBeCreated,
        clearAllLink,
        filterCategories
      })
    } catch (error) {
      logger.info(`error from controller handler of index ${error.message}`)
    }
  }
}

export { approvedDisinfectantController }
