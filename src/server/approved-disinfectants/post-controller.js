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

const postController = {
  handler: async (request, h) => {
    try {
      logger.info(
        `post controller initiated :  ${JSON.stringify(request.payload)}`
      )
      const envGoLiveDate = disInfectant.envgolivedate
      const searchPayload = request.payload
      const prevSearchPayload = request.yar.get('searchPayload')
      // set and get yars
      if (prevSearchPayload !== null) {
        if (searchPayload.searchDisinfectant) {
          searchPayload.chkChemicalGroup = prevSearchPayload?.chkChemicalGroup
            ? prevSearchPayload.chkChemicalGroup
            : []
          searchPayload.chkApprovalCategories =
            prevSearchPayload?.chkApprovalCategories
              ? prevSearchPayload.chkApprovalCategories
              : []
        } else if (searchPayload.applyFilter) {
          searchPayload.searchtext = prevSearchPayload?.searchtext
        }
      }

      // request.yar.set('searchPayload', searchPayload)
      const StartsWith = request.yar.get('startsWith')
      // set and get yars
      const pagingConfig = {
        items: utility.pageIndexGenerator(
          'A',
          'Z',
          StartsWith !== null ? StartsWith : ''
        )
      }
      const searchText = searchPayload?.searchtext
      // added for filter panel flow
      const {
        chemGroupSelected,
        approvalCatSelected,
        filterToBeCreated,
        filterCategories,
        clearAllLink
      } = buildFilter(searchPayload, '', StartsWith)

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
      // const querystring =
      //   StartsWith == null
      //     ? '#tableDisinfectant'
      //     : '?startwith=' + StartsWith + '#tableDisinfectant'
      const querystring =
        StartsWith == null ? '' : '?startwith=' + StartsWith + ''
      logger.info(`post controller handler executed`)
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
        querystring,
        lastModifiedDateWithTime,
        lastModifiedDate,
        envGoLiveDate,
        filterToBeCreated,
        filterCategories,
        clearAllLink
      })
    } catch (error) {
      logger.info(
        `error from post controller handler of index ${error.message}`
      )
    }
  }
}

export { postController }
