import { approvedCategories } from './pageConfigs/approvedCategory.js'
import { pageSummaryTexts } from './staticTexts/pageSummaryTexts.js'
import { chemicalGroup } from './pageConfigs/chemicalGroup.js'
import { utility } from '../common/utility.js'
import { tableConfig } from './pageConfigs/tableConfig.js'
import { externalLinks } from './staticTexts/externalLinks.js'
import { fetchData } from './helpers/fetch-data.js'
import { tableData } from './helpers/table-data.js'
import { chemicalGroupData } from './helpers/chemicalgroup-data.js'
import { approvalData } from './helpers/approval-data.js'
import { config } from '~/src/config/index.js'
import { buildFilter } from './helpers/build-filter.js'

const disInfectant = config.get('disinfectant')

const postController = {
  handler: async (request, h) => {
    const logger = request.logger
    try {
      logger.info(
        `post controller initiated :  ${JSON.stringify(request.payload)}`
      )
      const envGoLiveDate = disInfectant.envgolivedate
      const searchPayload = request.payload

      const StartsWith = request.yar.get('startsWith')
      // set and get yars
      const pagingConfig = {
        items: utility.pageIndexGenerator(
          'A',
          'Z',
          StartsWith !== null ? StartsWith : ''
        )
      }

      // added for filter panel flow
      const {
        chemGroupSelected,
        approvalCatSelected,
        filterToBeCreated,
        filterCategories,
        clearAllLink,
        searchText
      } = buildFilter(searchPayload, logger, StartsWith, '')

      if (typeof searchPayload !== 'undefined' && searchPayload) {
        searchPayload.chkChemicalGroup = chemGroupSelected
        searchPayload.chkApprovalCategories = approvalCatSelected
        searchPayload.searchtext = searchText
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
      approvedCategories.items = approvalData(approvalCatSelected, logger)
      chemicalGroup.items = chemicalGroupData(
        checmicalGroups,
        chemGroupSelected,
        logger
      )
      tableConfig.rows = tableData(approvedDisinfectantList, logger)
      const querystring =
        StartsWith === null || StartsWith === ''
          ? '?startwith=View all#tableDisinfectant'
          : `?startwith=${StartsWith}#tableDisinfectant`

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
      logger.error(
        `error from post controller handler of index ${error.message}`
      )
    }
  }
}

export { postController }
