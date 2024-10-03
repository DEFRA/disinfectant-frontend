import { pageSummaryTexts } from '../staticTexts/pageSummaryTexts.js'
import { approvalDTO } from '../pageConfigs/approval-static-data.js'

let searchText = ''

const clearSelectedValues = (selectedArray, clearValue, logger) => {
  if (Array.isArray(selectedArray)) {
    return selectedArray.filter((item) => item !== clearValue) // returns new filtered array without clearValue value/s
  } else if (selectedArray === clearValue.trim()) {
    return [] // return empty array so no filter will be applied
  } else {
    logger.info(`No conditons for ${selectedArray} clearance`)
    return selectedArray
  }
}
const buildFilter = (searchPayload, logger, startsWith, clearValue = '') => {
  let clearAllLink = '?clear=all'
  let filterToBeCreated = false
  let chemGroupSelected = []
  let approvalCatSelected = []
  const filterCategories = []
  try {
    logger.info(
      `build filter method initiated  ${JSON.stringify(searchPayload)} ${clearValue} ${startsWith} `
    )
    if (
      typeof startsWith !== 'undefined' &&
      startsWith !== null &&
      startsWith !== ''
    ) {
      clearAllLink = `?startwith=${startsWith}&clear=all#tableDisinfectant`
    }
    chemGroupSelected = searchPayload?.chkChemicalGroup
      ? searchPayload.chkChemicalGroup
      : []
    approvalCatSelected = searchPayload?.chkApprovalCategories
      ? searchPayload.chkApprovalCategories
      : []
    searchText = searchPayload?.searchtext
    if (clearValue !== '') {
      if (clearValue === 'all') {
        chemGroupSelected = []
        approvalCatSelected = []
        searchText = ''
      } else {
        chemGroupSelected = clearSelectedValues(
          chemGroupSelected,
          clearValue,
          logger
        )
        approvalCatSelected = clearSelectedValues(
          approvalCatSelected,
          clearValue,
          logger
        )
      }
    }
    const headerApprovalCategory =
      pageSummaryTexts.filterPanelTitles.approvalCategories
    const headerChemicalGroup =
      pageSummaryTexts.filterPanelTitles.chemicalGroups
    filterToBeCreated = createApprovalCategory(
      approvalCatSelected,
      filterToBeCreated,
      headerApprovalCategory,
      startsWith,
      filterCategories,
      logger
    )
    filterToBeCreated = createChemicalGroup(
      chemGroupSelected,
      filterToBeCreated,
      headerChemicalGroup,
      startsWith,
      filterCategories,
      logger
    )
    logger.info('build filter method executed')
  } catch (err) {
    logger.error(`build filter error:${err}`)
  }
  return {
    chemGroupSelected,
    approvalCatSelected,
    filterToBeCreated,
    clearAllLink,
    filterCategories,
    searchText
  }
}
function createChemicalGroup(
  chemGroupSelected,
  filterToBeCreated,
  headerChemicalGroup,
  startsWith,
  filterCategories,
  logger
) {
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
  } else if (chemGroupSelected !== '') {
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
  } else {
    logger.info('No conditions for chemGroupSelected')
  }
  return filterToBeCreated
}
function createApprovalCategory(
  approvalCatSelected,
  filterToBeCreated,
  headerApprovalCategory,
  startsWith,
  filterCategories,
  logger
) {
  if (Array.isArray(approvalCatSelected)) {
    if (approvalCatSelected.length > 0) {
      filterToBeCreated = true
      const items = []
      const filterCategoryApprovalCategory = {}
      filterCategoryApprovalCategory.heading = {
        text: headerApprovalCategory
      }
      approvalCatSelected.forEach((element) => {
        // eslint-disable-next-line
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
  } else if (approvalCatSelected !== '') {
    filterToBeCreated = true
    const items = []
    const filterCategoryApprovalCategory = {}
    filterCategoryApprovalCategory.heading = {
      text: headerApprovalCategory
    }
    // eslint-disable-next-line
    const approvalCattext = approvalDTO.find(
      (elem) => elem.value === approvalCatSelected
    )
    items.push({
      text: approvalCattext.text,
      href: createHrefLink(startsWith, approvalCattext.value)
    })
    filterCategoryApprovalCategory.items = items
    filterCategories.push(filterCategoryApprovalCategory)
  } else {
    logger.info('No conditions for approvalCatSelected')
  }
  return filterToBeCreated
}
function createHrefLink(startsWith, value) {
  return typeof startsWith !== 'undefined' &&
    startsWith !== null &&
    startsWith !== ''
    ? `?startwith=${startsWith}&clear=${value}#tableDisinfectant`
    : `?clear=${value}#tableDisinfectant`
}
export { buildFilter }
