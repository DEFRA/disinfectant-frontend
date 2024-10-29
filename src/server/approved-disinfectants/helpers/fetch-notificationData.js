import { proxyFetch } from '../../common/helpers/proxy-fetch.js'
import { config } from '~/src/config/index.js'
import { appSpecificConstants } from '~/src/server/common/helpers/constants.js'

const redisConfig = config.get('redis')
const options = { method: 'GET', headers: { 'Content-Type': 'text/json' } }
let logger
const disInfectant = config.get('disinfectant')

// Redis Keys
const deletedDisinfectantKey = 'deletedDisinfectantData'
const modifiedApprovalCategoriesKey = 'modifiedApprovalCategoriesData'

const fetchNotificationData = async (request) => {
    logger = request.logger
    logger.info(
        `fetch-NotificationData method initiated`
    )

    let deletedDisinfectantResponse = null
    if (redisConfig.enabled) {
        logger.info(`Fetching deleted disinfectants data`)
        deletedDisinfectantResponse = await request.redis.getData(deletedDisinfectantKey)
    }

    if (!deletedDisinfectantResponse) {
        deletedDisinfectantResponse = await fetchDeletedListFromAPI(request)
    }

    let modifiedApprovalCategoriesResponse = null
    if (redisConfig.enabled) {
        logger.info(`Fetching modified approval categories data`)
        modifiedApprovalCategoriesResponse = await request.redis.getData(modifiedApprovalCategoriesKey)
    }

    if (!modifiedApprovalCategoriesResponse) {
        modifiedApprovalCategoriesResponse = await fetchModifiedApprovalCategoriesListFromAPI(request)
    }

    return {
        deletedDisinfectantResponse,
        modifiedApprovalCategoriesResponse
    }
}
/**
 * Fetches the deleted list from the API.
 *
 * @param {Object} request - The request object.
 * @returns {Promise<Object>} - The deleted list response.
 * @throws {Error} - If there is an error while fetching the data.
 */
const fetchDeletedListFromAPI = async (request) => {
    const logger = request.logger
    logger.info(
        `fetch-data method - No Data in Cache. API endpoint ${disInfectant.apiPath}${appSpecificConstants.apiEndpoint.deletedList} Invocation started`
    )
    try {
        const response = await proxyFetch(
            `${disInfectant.apiPath}${appSpecificConstants.apiEndpoint.deletedList}`,
            options
        )
        if (response.ok) {
            const deletedDisinfectantResponse = await response.json()
            if (redisConfig.enabled) {
                request.redis.storeData(deletedDisinfectantKey, deletedDisinfectantResponse)
            }
            return deletedDisinfectantResponse
        }
    } catch (err) {
        logger.error(`error while getting data from api response : ${err}`)
        throw err
    }
}

/**
 * Fetches the modified approval categories list from the API.
 *
 * @param {Object} request - The request object.
 * @returns {Promise<Object>} - The modified approval categories list response.
 * @throws {Error} - If there is an error while fetching the data.
 */
const fetchModifiedApprovalCategoriesListFromAPI = async (request) => {
    const logger = request.logger
    logger.info(
        `fetch-data method - No Data in Cache. API endpoint ${disInfectant.apiPath}${appSpecificConstants.apiEndpoint.disinfectantModifiedList} Invocation started`
    )
    try {
        const response = await proxyFetch(
            `${disInfectant.apiPath}${appSpecificConstants.apiEndpoint.disinfectantModifiedList}`,
            options
        )
        if (response.ok) {
            const modifiedApprovalCategoriesResponse = await response.json()
            if (redisConfig.enabled) {
                request.redis.storeData(modifiedApprovalCategoriesKey, modifiedApprovalCategoriesResponse)
            }
            return modifiedApprovalCategoriesResponse
        }
    } catch (err) {
        logger.error(`error while getting data from api response : ${err}`)
        throw err
    }
}

/**
 * Fetches data for approved disinfectants based on the provided parameters.
 *
 * @param {Object} request - The request object.
 * @returns {Object} - The fetched data including the approved disinfectant list, chemical groups, last modified date with time, and last modified date.
 */


export {
    fetchDeletedListFromAPI,
    fetchModifiedApprovalCategoriesListFromAPI,
    fetchNotificationData
}

