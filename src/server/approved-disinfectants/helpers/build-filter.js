import { pageSummaryTexts } from '../staticTexts/pageSummaryTexts.js'
import { approvalDTO } from '../pageConfigs/approval-static-data.js'

const buildFilter = (searchPayload, clearValue = '', startsWith) => {
  let filterToBeCreated = false
  const filterCategories = []

  let clearAllLink = '?clear=all'

  if (
    typeof startsWith !== 'undefined' &&
    startsWith !== null &&
    startsWith !== ''
  )
    clearAllLink = '?startwith=' + startsWith + '&clear=all#tableDisinfectant'

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
        if (approvalCatSelected === clearValue.trim()) approvalCatSelected = []
      }
    }
  }

  const headerApprovalCategory =
    pageSummaryTexts.filterPanelTitles.approvalCategories
  const headerChemicalGroup = pageSummaryTexts.filterPanelTitles.chemicalGroups
  // approval categories
  if (Array.isArray(approvalCatSelected)) {
    if (approvalCatSelected.length > 0) {
      filterToBeCreated = true
      const items = []
      const filterCategoryApprovalCategory = {}
      filterCategoryApprovalCategory.heading = { text: headerApprovalCategory }
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
      filterCategoryApprovalCategory.heading = { text: headerApprovalCategory }
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
      const filterCategoryChemgroup = {}
      filterCategoryChemgroup.heading = { text: headerChemicalGroup }

      chemGroupSelected.forEach((element) => {
        items.push({ text: element, href: createHrefLink(startsWith, element) })
      })
      filterCategoryChemgroup.items = items
      filterCategories.push(filterCategoryChemgroup)
    }
  } else {
    if (chemGroupSelected !== '') {
      filterToBeCreated = true
      const items = []
      const filterCategoryChemgroup = {}
      filterCategoryChemgroup.heading = { text: headerChemicalGroup }

      items.push({
        text: chemGroupSelected,
        href: createHrefLink(startsWith, chemGroupSelected)
      })
      filterCategoryChemgroup.items = items
      filterCategories.push(filterCategoryChemgroup)
    }
  }

  return {
    chemGroupSelected,
    approvalCatSelected,
    filterToBeCreated,
    clearAllLink,
    filterCategories
  }
}

function createHrefLink(startsWith, value) {
  return typeof startsWith !== 'undefined' &&
    startsWith !== null &&
    startsWith !== ''
    ? `?startwith=${startsWith}&clear=${value}#tableDisinfectant`
    : `?clear=${value}#tableDisinfectant`
}

export { buildFilter }
