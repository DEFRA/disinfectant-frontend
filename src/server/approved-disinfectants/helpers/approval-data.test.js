import { approvalData } from './approval-data.js'

describe('approvalData', () => {
  test('should return an array of approval items with correct values', () => {
    const selectedList = ['A', 'B', 'C']
    const result = approvalData(selectedList)
    expect(result).toHaveLength(5)
  })
})
