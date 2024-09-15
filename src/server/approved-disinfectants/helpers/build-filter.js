import { pageSummaryTexts } from '../staticTexts/pageSummaryTexts.js'
import { approvalDTO } from '../pageConfigs/approval-static-data.js'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'

const logger = createLogger()
/**
 * Builds a filter based on the search payload, clear value, and startsWith parameter.
 * @param {Object} searchPayload - The search payload object.
 * @param {string} [clearValue=''] - The clear value.
 * @param {string} [startsWith] - The startsWith parameter.
 * @returns {Object} - The filter object containing chemGroupSelected, approvalCatSelected, filterToBeCreated, clearAllLink, and filterCategories.
 */
const buildFilter = (searchPayload, clearValue = '', startsWith) => {
  try {
    let filterToBeCreated = false
    const filterCategories = []
    logger.info(
      `build filter method initiated  ${JSON.stringify(searchPayload)} ${clearValue} ${startsWith} `
    )
    let clearAllLink = '?clear=all'

    if (
      typeof startsWith !== 'undefined' &&
      startsWith !== null &&
      startsWith !== ''
    )
      clearAllLink = `?startwith=${startsWith}&clear=all#tableDisinfectant`
    // clearAllLink = '?startwith=' + startsWith + '&clear=all'

    let chemGroupSelected = searchPayload?.chkChemicalGroup
      ? searchPayload.chkChemicalGroup
      : []
    let approvalCatSelected = searchPayload?.chkApprovalCategories
      ? searchPayload.chkApprovalCategories
      : []

    // remove filter from array
    if (clearValue !== '') {
      if (clearValue === 'all') {
        chemGroupSelected = []
        approvalCatSelected = []
      } else {
        if (Array.isArray(chemGroupSelected)) {
          chemGroupSelected = chemGroupSelected.filter(function (item) {
            return item !== clearValue
          })
        } else {
          if (chemGroupSelected === clearValue.trim()) chemGroupSelected = []
        }

        if (Array.isArray(approvalCatSelected)) {
          approvalCatSelected = approvalCatSelected.filter(function (item) {
            return item !== clearValue
          })
        } else {
          if (approvalCatSelected === clearValue.trim())
            approvalCatSelected = []
        }
      }
    }

    /**
     * Represents the header approval category.
     * @type {string}
     */
    const headerApprovalCategory =
      pageSummaryTexts.filterPanelTitles.approvalCategories
    /**
     * Represents the header for the chemical groups in the filter panel.
     * @type {string}
     */
    const headerChemicalGroup =
      pageSummaryTexts.filterPanelTitles.chemicalGroups
    // approval categories
    if (Array.isArray(approvalCatSelected)) {
      if (approvalCatSelected.length > 0) {
        filterToBeCreated = true
        const items = []
        const filterCategoryApprovalCategory = {}
        filterCategoryApprovalCategory.heading = {
          text: headerApprovalCategory
        }
        approvalCatSelected.forEach((element) => {
          const approvalCattext = approvalDTO.find(
            (elem) => elem.value === element
          )
          items.push({
            text: approvalCattext.text,
            href: createHrefLink(startsWith, approvalCattext.value)
          })
        })
        filterCategoryApprovalCategory.items = items
        filterCategories.push(filterCategoryApprovalCategory)
      }
    } else {
      if (approvalCatSelected !== '') {
        filterToBeCreated = true
        const items = []
        const filterCategoryApprovalCategory = {}
        filterCategoryApprovalCategory.heading = {
          text: headerApprovalCategory
        }
        const approvalCattext = approvalDTO.find(
          (elem) => elem.value === approvalCatSelected
        )
        items.push({
          text: approvalCattext.text,
          href: createHrefLink(startsWith, approvalCattext.value)
        })
        filterCategoryApprovalCategory.items = items
        filterCategories.push(filterCategoryApprovalCategory)
      }
    }

    // chemical group
    if (Array.isArray(chemGroupSelected)) {
      if (chemGroupSelected.length > 0) {
        filterToBeCreated = true
        const items = []
        const filterCategoryChemgroup = {
          heading: {
            text: headerChemicalGroup
          }
        }

        chemGroupSelected.forEach((element) => {
          items.push({
            text: element,
            href: createHrefLink(startsWith, element)
          })
        })
        filterCategoryChemgroup.items = items
        filterCategories.push(filterCategoryChemgroup)
      }
    } else {
      if (chemGroupSelected !== '') {
        filterToBeCreated = true
        const items = []
        const filterCategoryChemgroup = {
          heading: {
            text: headerChemicalGroup
          }
        }

        items.push({
          text: chemGroupSelected,
          href: createHrefLink(startsWith, chemGroupSelected)
        })
        filterCategoryChemgroup.items = items
        filterCategories.push(filterCategoryChemgroup)
      }
    }
    logger.info('build filter method executed')
    return {
      chemGroupSelected,
      approvalCatSelected,
      filterToBeCreated,
      clearAllLink,
      filterCategories
    }
  } catch (err) {
    logger.info(`build filter error:${err}`)
  }
}

/**
 * Creates a href link with query parameters for filtering.
 * @param {string} startsWith - The value to filter by.
 * @param {string} value - The value to clear.
 * @returns {string} The generated href link.
 */
function createHrefLink(startsWith, value) {
  return typeof startsWith !== 'undefined' &&
    startsWith !== null &&
    startsWith !== ''
    ? `?startwith=${startsWith}&clear=${value}#tableDisinfectant`
    : `?clear=${value}#tableDisinfectant`
  // return typeof startsWith !== 'undefined' &&
  //   startsWith !== null &&
  //   startsWith !== ''
  //   ? `?startwith=${startsWith}&clear=${value}`
  //   : `?clear=${value}`
}

export { buildFilter }
