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

      request.yar.set('searchPayload', searchPayload)
      const setStartsWith = request.yar.get('startsWith')
      // set and get yars
      const pagingConfig = {
        items: utility.pageIndexGenerator(
          'A',
          'Z',
          setStartsWith !== null ? setStartsWith : 'View all'
        )
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
      const querystring =
        setStartsWith == null
          ? '#tableDisinfectant'
          : '?startwith=' + setStartsWith + '#tableDisinfectant'
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
        envGoLiveDate
      })
    } catch (error) {
      logger.info(
        `error from post controller handler of index ${error.message}`
      )
    }
  }
}

export { postController }
