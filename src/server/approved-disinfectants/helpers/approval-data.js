import _ from 'lodash'
import { approvalDTO } from '../pageConfigs/approval-static-data.js'

function approvalData(selectedList, logger) {
  logger.info(`approval-data process initiated`)
  const approvalItems = []
  approvalDTO.forEach((element) => {
    const isSelected = _.includes(selectedList, element.value)
    approvalItems.push({
      value: element.value,
      text: element.text,
      checked: isSelected
    })
  })
  logger.info(`approval-data process executed`)
  return approvalItems
}

export { approvalData }
