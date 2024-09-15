import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
import _ from 'lodash'

const logger = createLogger()

/**
 * Generates an array of chemical group items based on the provided chemical groups list and selected list.
 * @param {string[]} chemicalGroupsList - The list of chemical groups.
 * @param {string[]} selectedList - The list of selected chemical groups.
 * @returns {Object[]} - An array of chemical group items.
 */
function chemicalGroupData(chemicalGroupsList, selectedList) {
  logger.info(`chemicalgroup-data process initiated`)
  const chemicalGroupItems = []
  try {
    chemicalGroupsList.forEach((element) => {
      // const isSelected = _.find(selectedList, function (n) {
      //    return n.toLowerCase().trim() === element.toLowerCase().trim()
      // })
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
