/* eslint-disable prettier/prettier */
import { proxyFetch } from '../../common/helpers/proxy-fetch.js'
import { config } from '~/src/config/index.js'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
import { appSpecificConstants } from '~/src/server/common/helpers/constants.js'
import { formatDate } from '~/src/config/nunjucks/filters/format-date.js'

const redisConfig = config.get('redis')
const options = { method: 'GET', headers: { 'Content-Type': 'text/json' } }
const logger = createLogger()
const disInfectant = config.get('disinfectant')
const rediskey = 'disinfectantApprovedData'

/**
 * Fetches data for approved disinfectants based on the provided parameters.
 *
 * @param {Object} request - The request object.
 * @param {string} chemicalGroupSelected - The selected chemical group.
 * @param {string[]} approvalCategoriesSelected - The selected approval categories.
 * @param {string} searchText - The search text.
 * @param {boolean} startsWith - Indicates whether the search should start with the provided text.
 * @returns {Object} - The fetched data including the approved disinfectant list, chemical groups, last modified date with time, and last modified date.
 */
const fetchData = async (
  request,
  chemicalGroupSelected,
  approvalCategoriesSelected,
  searchText,
  startsWith
) => {
  logger.info(
    `fetch-data method initiated  ${JSON.stringify(chemicalGroupSelected)} ${JSON.stringify(approvalCategoriesSelected)} ${JSON.stringify(searchText)} ${JSON.stringify(startsWith)} `
  )

  let getApprovedListResponse = null
  if (redisConfig.enabled) {
    logger.info(`Data from cache started to be extracted`)
    getApprovedListResponse = await request.redis.getData(rediskey)
  }

  if (!getApprovedListResponse) {
    getApprovedListResponse = await fetchApprovedListFromAPI(request)
  }

  const {
    approvedDisinfectantList,
    checmicalGroups,
    lastModifiedDateWithTime,
    lastModifiedDate
  } = processApprovedList(
    getApprovedListResponse,
    chemicalGroupSelected,
    approvalCategoriesSelected,
    searchText,
    startsWith
  )

  return {
    approvedDisinfectantList,
    checmicalGroups,
    lastModifiedDateWithTime,
    lastModifiedDate
  }
}

/**
 * Fetches the approved list from the API.
 *
 * @param {Object} request - The request object.
 * @returns {Promise<Object>} - The approved list response.
 * @throws {Error} - If there is an error while fetching the data.
 */
const fetchApprovedListFromAPI = async (request) => {
  logger.info(
    `fetch-data method - No Data in Cache. API endpoint ${disInfectant.apiPath}${appSpecificConstants.apiEndpoint.retrieveList} Invocation started`
  )
  const response = await proxyFetch(
    `${disInfectant.apiPath}${appSpecificConstants.apiEndpoint.retrieveList}`,
    options
  ).catch((err) => {
    logger.info(
      `error while calling api endpoint ${JSON.stringify(err.message)}`
    )
    throw err
  })

  try {
    if (response.ok) {
      const getApprovedListResponse = await response.json()
      if (redisConfig.enabled) {
        request.redis.storeData(rediskey, getApprovedListResponse)
      }
      return getApprovedListResponse
    }
  } catch (err) {
    logger.info(`error while getting data from api response : ${err}`)
    throw err
  }
}

/**
 * Processes the approved list of disinfectants based on the provided parameters.
 *
 * @param {Object} getApprovedListResponse - The response containing the approved list of disinfectants.
 * @param {string} chemicalGroupSelected - The selected chemical group for filtering the list.
 * @param {Array} approvalCategoriesSelected - The selected approval categories for filtering the list.
 * @param {string} searchText - The search text for filtering the list.
 * @param {boolean} startsWith - Indicates whether the search text should match the start of the disinfectant names.
 * @returns {Object} - An object containing the processed approved disinfectant list, chemical groups, last modified date with time, and last modified date.
 * @throws {Error} - If no records are fetched from the approved list.
 */
const processApprovedList = (
  getApprovedListResponse,
  chemicalGroupSelected,
  approvalCategoriesSelected,
  searchText,
  startsWith
) => {
  let approvedDisinfectantList = []
  let checmicalGroups = []
  let lastModifiedTime = null
  let lastModifiedDateWithTime = null
  let lastModifiedDate = null

  try {
    checmicalGroups = getChemicalGroups(getApprovedListResponse)
    lastModifiedTime = getLastModifiedTime(getApprovedListResponse)

    if (typeof lastModifiedTime !== 'undefined' && lastModifiedTime !== null) {
      lastModifiedDateWithTime = formatDate(
        lastModifiedTime,
        "h:mm aaa ('GMT'xxx) 'on' EEEE do MMMM yyyy"
      )
      lastModifiedDate = formatDate(lastModifiedTime, 'd MMMM yyyy')
    }

    approvedDisinfectantList = getDisinfectantList(getApprovedListResponse)

    if (approvedDisinfectantList.length < 1) {
      logger.info(`approved list disinfectants less than 1 record`)
      throw new Error('no records fetched')
    }

    approvedDisinfectantList = sortApprovedDisinfectantList(
      approvedDisinfectantList
    )

    approvedDisinfectantList = filterByChemicalGroup(
      approvedDisinfectantList,
      chemicalGroupSelected
    )

    approvedDisinfectantList = filterByApprovalCategories(
      approvedDisinfectantList,
      approvalCategoriesSelected
    )

    approvedDisinfectantList = filterBySearchText(
      approvedDisinfectantList,
      searchText
    )

    approvedDisinfectantList = filterByStartsWith(
      approvedDisinfectantList,
      startsWith
    )

    logger.info(
      `fetch-data executed ${JSON.stringify(approvedDisinfectantList)}`
    )
  } catch (error) {
    logger.info(`error from fetch-data ${error.message}`)
    throw error
  }

  return {
    approvedDisinfectantList,
    checmicalGroups,
    lastModifiedDateWithTime,
    lastModifiedDate
  }
}

/**
 * Retrieves the chemical groups from the response of the approved list API.
 * @param {Object} getApprovedListResponse - The response object from the approved list API.
 * @returns {Array} - An array of chemical groups.
 */
const getChemicalGroups = (getApprovedListResponse) => {
  return getApprovedListResponse?.documents[0]?.chemicalGroups || []
}

/**
 * Retrieves the last modified date and time from the response of the approved list API.
 *
 * @param {Object} getApprovedListResponse - The response object from the approved list API.
 * @returns {string|undefined} The last modified date and time, or undefined if not available.
 */
const getLastModifiedTime = (getApprovedListResponse) => {
  return getApprovedListResponse?.documents[0]?.lastModifiedDateAndTime
}

/**
 * Retrieves the list of approved disinfectants from the response object.
 * @param {Object} getApprovedListResponse - The response object containing the approved list.
 * @returns {Array} - The list of approved disinfectants.
 */
const getDisinfectantList = (getApprovedListResponse) => {
  return getApprovedListResponse?.documents[0]?.disInfectants || []
}

/**
 * Sorts the approved disinfectant list in alphabetical order based on the disinfectant name.
 * @param {Array} approvedDisinfectantList - The list of approved disinfectants to be sorted.
 * @returns {Array} - The sorted approved disinfectant list.
 */
const sortApprovedDisinfectantList = (approvedDisinfectantList) => {
  return approvedDisinfectantList.sort(function (a, b) {
    return a.disInfectantName.localeCompare(b.disInfectantName)
  })
}

/**
 * Filters the approved disinfectant list based on the selected chemical group(s).
 * @param {Array} approvedDisinfectantList - The list of approved disinfectants.
 * @param {string|string[]} chemicalGroupSelected - The selected chemical group(s).
 * @returns {Array} - The filtered approved disinfectant list.
 */
const filterByChemicalGroup = (
  approvedDisinfectantList,
  chemicalGroupSelected
) => {
  if (chemicalGroupSelected) {
    if (Array.isArray(chemicalGroupSelected)) {
      if (chemicalGroupSelected.length > 0) {
        chemicalGroupSelected = chemicalGroupSelected.reduce(
          (unique, item) =>
            unique.includes(item) ? unique : [...unique, item],
          []
        )

        approvedDisinfectantList = approvedDisinfectantList.filter(
          (elem) => elem.chemicalGroups !== null
        )

        approvedDisinfectantList = approvedDisinfectantList.filter((el) => {
          const checmialgroupArr = el.chemicalGroups
            ?.toLowerCase()
            .split(';')
            .map((elem) => elem.trim())

          return chemicalGroupSelected.every((chemgroup) =>
            checmialgroupArr.find(
              (elem) => elem === chemgroup.toLowerCase().trim()
            )
          )
        })
      }
    } else {
      approvedDisinfectantList = approvedDisinfectantList.filter(
        (elem) => elem.chemicalGroups !== null
      )

      approvedDisinfectantList = approvedDisinfectantList.filter((el) => {
        const checmialgroupArr = el.chemicalGroups
          ?.toLowerCase()
          .split(';')
          .map((elem) => elem.trim())

        return checmialgroupArr.find(
          (elem) => elem === chemicalGroupSelected.toLowerCase().trim()
        )
      })
    }
  }

  return approvedDisinfectantList
}

/**
 * Filters the approved disinfectant list based on the selected approval categories.
 * @param {Array} approvedDisinfectantList - The list of approved disinfectants.
 * @param {Array|string} approvalCategoriesSelected - The selected approval categories.
 * @returns {Array} - The filtered approved disinfectant list.
 */
const filterByApprovalCategories = (
  approvedDisinfectantList,
  approvalCategoriesSelected
) => {
  const notApproved = appSpecificConstants.diseaseOrdervaluesToOmit.notApproved
  const approvalSuspended =
    appSpecificConstants.diseaseOrdervaluesToOmit.approvalSuspended

  const dynamicFilters = [
    {
      key: 'fmdo',
      value: (item) =>
        !item.fmdo?.includes(notApproved) &&
        !item.fmdo?.includes(approvalSuspended)
    },
    {
      key: 'svdo',
      value: (item) =>
        !item.svdo?.includes(notApproved) &&
        !item.svdo?.includes(approvalSuspended)
    },
    {
      key: 'dop',
      value: (item) =>
        !item.dop?.includes(notApproved) &&
        !item.dop?.includes(approvalSuspended)
    },
    {
      key: 'tbo',
      value: (item) =>
        !item.tbo?.includes(notApproved) &&
        !item.tbo?.includes(approvalSuspended)
    },
    {
      key: 'go',
      value: (item) =>
        !item.go?.includes(notApproved) && !item.go?.includes(approvalSuspended)
    }
  ]

  if (approvalCategoriesSelected) {
    if (Array.isArray(approvalCategoriesSelected)) {
      let dynamicFiltersSelected = dynamicFilters.filter((el) => {
        return approvalCategoriesSelected?.includes(el.key)
      })

      dynamicFiltersSelected = dynamicFiltersSelected.map((elem) => {
        return elem.value
      })

      if (approvalCategoriesSelected.length > 0) {
        approvedDisinfectantList = approvedDisinfectantList.filter((item) =>
          dynamicFiltersSelected.every((f) => f(item))
        )
      }
    } else {
      let dynamicFiltersSelected = dynamicFilters.filter((el) => {
        return el.key === approvalCategoriesSelected
      })

      dynamicFiltersSelected = dynamicFiltersSelected.map((elem) => {
        return elem.value
      })

      if (approvalCategoriesSelected.length > 0) {
        approvedDisinfectantList = approvedDisinfectantList.filter((item) =>
          dynamicFiltersSelected.every((f) => f(item))
        )
      }
    }
  }

  return approvedDisinfectantList
}

/**
 * Filters the approved disinfectant list based on the search text.
 * @param {Array} approvedDisinfectantList - The list of approved disinfectants.
 * @param {string} searchText - The search text to filter the list.
 * @returns {Array} - The filtered approved disinfectant list.
 */
const filterBySearchText = (approvedDisinfectantList, searchText) => {
  if (searchText) {
    approvedDisinfectantList = approvedDisinfectantList.filter((el) => {
      return el.disInfectantName
        ?.toLowerCase()
        .includes(searchText?.toLowerCase())
    })
  }

  return approvedDisinfectantList
}

/**
 * Filters the approved disinfectant list based on a given starting string.
 * @param {Array} approvedDisinfectantList - The list of approved disinfectants.
 * @param {string} startsWith - The starting string to filter by.
 * @returns {Array} - The filtered approved disinfectant list.
 */
const filterByStartsWith = (approvedDisinfectantList, startsWith) => {
  if (startsWith) {
    if (startsWith !== 'View all' && startsWith !== '0 to 9') {
      approvedDisinfectantList = approvedDisinfectantList.filter((el) => {
        return el.disInfectantName
          ?.toLowerCase()
          .startsWith(startsWith.toLowerCase())
      })
    } else if (startsWith === '0 to 9') {
      approvedDisinfectantList = approvedDisinfectantList.filter((el) => {
        return !isNaN(el.disInfectantName?.charAt(0))
      })
    }
  }

  return approvedDisinfectantList
}

export { fetchData }
