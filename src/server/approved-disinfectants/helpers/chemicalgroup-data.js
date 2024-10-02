import _ from 'lodash'

function chemicalGroupData(chemicalGroupsList, selectedList, logger) {
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
    logger.error(`error from checmicalgroup-data ${error.message}`)
  }
  logger.info(`chemicalgroup-data process executed`)
  return chemicalGroupItems
}

export { chemicalGroupData }
