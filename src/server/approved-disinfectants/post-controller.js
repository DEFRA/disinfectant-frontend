
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
import { approvedCategories } from './pageConfigs/approvedCategory.js'
import { pageSummaryTexts }  from './staticTexts/pageSummaryTexts.js'
import { chemicalGroup } from './pageConfigs/chemicalGroup.js'
import { utility } from '../common/utility.js'
import { tableConfig } from './pageConfigs/tableConfig.js'

const postController = {
  handler: async (request, h) => {
    const logger = createLogger()
    var s = request.payload.approvedCategories;
     const { action, ...data } = request.payload
    const payload = { ...data }
    const options = {
      method: 'POST',
      body: JSON.stringify(payload)
    }

    return h.view('approved-disinfectants/index', {
      pageTitle: 'Approved Defra-approved disinfectants',
      heading: 'Disinfectants Approved for use in England,Scotland and Wales ',
      approvedCategories,
      chemicalGroup,
      pageSummaryTexts,
     // pagingConfig,
      tableConfig 
    })
    
    //#region 
    //const { contact, organization } = routePaths
    // const routeContext = {
    //   pageTitle: 'Contact',
    //   heading: 'Contact',
    //   fields,
    //   postHandler: routePaths.contact
    // }
    // try {
    //   // const response = await httpFetcher(`${apiPath}create/submission`, options)
    //   // const { message, document } = await response.json
    //   // if (message === 'success') {
    //   //   const route = action === 'sac' ? organization : contact
    //   //   return h.redirect(`${route}/${document._id}`)
    //   // } else {
    //   //   logger.error('Failed to save the document')
    //   //   return h.view('form-submission/contact/index', {
    //   //     ...routeContext,
    //   //     error: 'Failed to save the document'
    //   //   })
    //   // }
    //   
    // } catch (error) {
    //   logger.error(error)
    //   // return h.view('form-submission/contact/index', {
    //   //   ...routeContext,
    //   //   error: error.message
    //   // })
    // }
    //#end region
  }
}

export { postController }
