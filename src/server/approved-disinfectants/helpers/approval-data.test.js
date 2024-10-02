import { approvalData } from './approval-data.js'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'

const logger = createLogger()

describe('approvalData', () => {
  test('should return an array of approval items with correct values', () => {
    const selectedList = ['A', 'B', 'C']
    const result = approvalData(selectedList, logger)
    expect(result).toHaveLength(5)
  })
})
