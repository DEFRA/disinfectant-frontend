import { tableConfig } from './tableConfig.js'

describe('Table Configuration Tests', () => {
  test('should have firstCellIsHeader set to true', () => {
    expect(tableConfig.firstCellIsHeader).toBe(true)
  })

  test('should have classes set to "app-table-layout-width"', () => {
    expect(tableConfig.classes).toBe('app-table-layout-width')
  })

  test('should have an array of head cells', () => {
    expect(Array.isArray(tableConfig.head)).toBe(true)
    expect(tableConfig.head.length).toBe(8)
  })

  test('should have correct text and classes for each head cell', () => {
    const expectedHeadCells = [
      { text: 'Disinfectant name', classes: 'govuk-body-s' },
      { text: 'Company name and address', classes: 'govuk-body-s' },
      { text: 'Chemical group', classes: 'govuk-body-s' },
      { text: 'Foot and Mouth Disease Orders (FMDO)', classes: 'govuk-body-s' },
      {
        text: 'Swine Vesicular Disease Orders (SVDO)',
        classes: 'govuk-body-s'
      },
      {
        text: 'Diseases of Poultry Order and the Avian Influenza and Influenza of Avian Origin in Mammals Order (DoP, AI & IAOM)',
        classes: 'govuk-body-s'
      },
      { text: 'Tuberculosis Orders (TBO)', classes: 'govuk-body-s' },
      { text: 'General Orders (GO)', classes: 'govuk-body-s' }
    ]

    expect(tableConfig.head).toEqual(expectedHeadCells)
  })
})
