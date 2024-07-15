// import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
import { approvedCategories } from './pageConfigs/approvedCategory.js'
import { pageSummaryTexts } from './staticTexts/pageSummaryTexts.js'
import { chemicalGroup } from './pageConfigs/chemicalGroup.js'
import { tableConfig } from './pageConfigs/tableConfig.js'

const postController = {
  handler: async (request, h) => {
    // const logger = createLogger()
    // var s = request.payload.approvedCategories
    // const { action, ...data } = request.payload
    // const payload = { ...data }
    // const options = {
    //   method: 'POST',
    //   body: JSON.stringify(payload)
    // }

    return h.view('approved-disinfectants/index', {
      pageTitle: 'Approved Defra-approved disinfectants',
      heading: 'Disinfectants Approved for use in England,Scotland and Wales ',
      approvedCategories,
      chemicalGroup,
      pageSummaryTexts,
      tableConfig
    })
  }
}

export { postController }
