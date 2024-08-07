/* eslint-disable prettier/prettier */
import { proxyFetch } from '../../common/helpers/proxy-fetch.js'
import { config } from '~/src/config/index.js'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
import { appSpecificConstants } from '~/src/server/common/helpers/constants.js'
import { formatDate } from '~/src/config/nunjucks/filters/format-date.js'

const options = { method: 'GET', headers: { 'Content-Type': 'text/json' } }
const logger = createLogger()
const disInfectant = config.get('disinfectant')

const fetchData = async (
  chemicalGroupSelected,
  approvalCategoriesSelected,
  searchText,
  startsWith
) => {
  logger.info(
    `fetch-data method initiated  ${JSON.stringify(chemicalGroupSelected)} ${JSON.stringify(approvalCategoriesSelected)} ${JSON.stringify(searchText)} ${JSON.stringify(startsWith)} `
  )
  logger.info(
    `api endpoint ${disInfectant.apiPath}${appSpecificConstants.apiEndpoint.retrieveList} invoked`
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

  let approvedDisinfectantList = []
  let checmicalGroups = []
  let lastModifiedTime = null
  let lastModifiedDateWithTime = null
  let lastModifiedDate = null
  try {
    let getApprovedListResponse
    if (response.ok) {
      getApprovedListResponse = await response.json()
    }

    checmicalGroups = getApprovedListResponse?.documents[0]?.chemicalGroups
      ? getApprovedListResponse.documents[0].chemicalGroups
      : []
    lastModifiedTime =
      getApprovedListResponse?.documents[0]?.lastModifiedDateAndTime

    if (typeof lastModifiedTime !== 'undefined' && lastModifiedTime !== null) {
      lastModifiedDateWithTime = formatDate(
        lastModifiedTime,
        "h:mm aaa 'on' EEEE do MMMM yyyy"
      )
      lastModifiedDate = formatDate(lastModifiedTime, 'd MMMM yyyy')
    }
    approvedDisinfectantList = getApprovedListResponse?.documents[0]
      ?.disInfectants
      ? getApprovedListResponse.documents[0].disInfectants
      : []
    logger.info(
      `approved list disinfectants ${JSON.stringify(approvedDisinfectantList)}`
    )
    if (approvedDisinfectantList.length < 1) {
      logger.info(`approved list disinfectants less than 1 record`)
      throw new Error('no records fetched')
    }
    approvedDisinfectantList = approvedDisinfectantList.sort(function (a, b) {
      return a.disInfectantName.localeCompare(b.disInfectantName)
    })
    // chemical group filtration
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

    // approval categories filtration
    const notApproved =
      appSpecificConstants.diseaseOrdervaluesToOmit.notApproved
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
          !item.go?.includes(notApproved) &&
          !item.go?.includes(approvalSuspended)
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
    // search text filtration
    if (searchText) {
      approvedDisinfectantList = approvedDisinfectantList.filter((el) => {
        return el.disInfectantName
          ?.toLowerCase()
          .includes(searchText?.toLowerCase())
      })
    }

    // starts with filtration
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

      logger.info(
        `fetch-data executed ${JSON.stringify(approvedDisinfectantList)}`
      )
    }
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
export { fetchData }
