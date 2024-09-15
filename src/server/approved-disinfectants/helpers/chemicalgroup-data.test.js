import { chemicalGroupData } from './chemicalgroup-data.js'

describe('chemicalGroupData', () => {
  test('should return an array of chemical group items with correct values and checked status', () => {
    const chemicalGroupsList = ['group1', 'group2', 'group3']
    const selectedList = ['group1', 'group3']

    const result = chemicalGroupData(chemicalGroupsList, selectedList)

    expect(result).toEqual([
      { value: 'group1', text: 'group1', checked: true },
      { value: 'group2', text: 'group2', checked: false },
      { value: 'group3', text: 'group3', checked: true }
    ])
  })

  test('should return an empty array when chemicalGroupsList is empty', () => {
    const chemicalGroupsList = []
    const selectedList = ['group1', 'group2']

    const result = chemicalGroupData(chemicalGroupsList, selectedList)

    expect(result).toEqual([])
  })

  test('should return an array of chemical group items with checked status as false when selectedList is empty', () => {
    const chemicalGroupsList = ['group1', 'group2', 'group3']
    const selectedList = []

    const result = chemicalGroupData(chemicalGroupsList, selectedList)

    expect(result).toEqual([
      { value: 'group1', text: 'group1', checked: false },
      { value: 'group2', text: 'group2', checked: false },
      { value: 'group3', text: 'group3', checked: false }
    ])
  })

  test('should return an array of chemical group items with checked status as false when selectedList does not contain any matching elements', () => {
    const chemicalGroupsList = ['group1', 'group2', 'group3']
    const selectedList = ['group4', 'group5']

    const result = chemicalGroupData(chemicalGroupsList, selectedList)

    expect(result).toEqual([
      { value: 'group1', text: 'group1', checked: false },
      { value: 'group2', text: 'group2', checked: false },
      { value: 'group3', text: 'group3', checked: false }
    ])
  })
})
