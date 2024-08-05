import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
import _ from 'lodash'

const logger = createLogger()
const items = [
  {
    value: 'fmdo',
    text: 'Foot and Mouth Disease Orders (FMDO)'
  },
  {
    value: 'svdo',
    text: 'Swine Vesicular Disease Orders (SVDO)'
  },
  {
    value: 'dop',
    text: 'Diseases of Poultry Order and the Avian Influenza and Influenza of Avian Origin in Mammals Order (DoP, AI & IAOM)'
  },
  {
    value: 'tbo',
    text: 'Tuberculosis Orders (TBO)'
  },
  {
    value: 'go',
    text: 'General Orders (GO)'
  }
]

function approvalData(selectedList) {
  logger.info(`approval-data process initiated`)
  const approvalItems = []
  try {
    items.forEach((element) => {
      const isSelected = _.includes(selectedList, element.value)
      approvalItems.push({
        value: element.value,
        text: element.text,
        checked: isSelected
      })
    })
  } catch (error) {
    logger.info(`error from approval-data ${error.message}`)
  }
  logger.info(`approval-data process executed`)
  return approvalItems
}

export { approvalData }
