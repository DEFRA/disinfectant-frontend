import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
import _ from 'lodash'

const logger = createLogger()

function chemicalGroupData(chemicalGroupsList, selectedList) {
  logger.info(`chemicalgroup-data process initiated`)
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
  logger.info(`chemicalgroup-data process executed`)
  return chemicalGroupItems
}

export { chemicalGroupData }
