import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
import _ from 'lodash'
import { approvalDTO } from '../pageConfigs/approval-static-data.js'

const logger = createLogger()

function approvalData(selectedList) {
  logger.info(`approval-data process initiated`)
  const approvalItems = []
  try {
    approvalDTO.forEach((element) => {
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
