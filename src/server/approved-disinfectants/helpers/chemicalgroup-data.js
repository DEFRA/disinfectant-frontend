import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
import _ from 'lodash'

const logger = createLogger()

function chemicalGroupData(chemicalGroupsList, selectedList) {
  const chemicalGroupItems = []
  try {
    chemicalGroupsList.forEach((element) => {
      const isSelected = _.includes(selectedList, element.trim())
      chemicalGroupItems.push({
        value: element.trim(),
        text: element.trim(),
        checked: isSelected
      })
    })
  } catch (error) {
    logger.info(`error from checmicalgroup-data ${error.message}`)
  }
  return chemicalGroupItems
}

export { chemicalGroupData }
