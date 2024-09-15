import { chemicalGroup } from './chemicalGroup.js'

describe('chemicalGroup', () => {
  test('should have the correct name', () => {
    expect(chemicalGroup.name).toBe('chkChemicalGroup')
  })

  test('should have the correct classes', () => {
    expect(chemicalGroup.classes).toBe(
      'govuk-checkboxes--small checkboxes-with-two-columns'
    )
  })

  test('should have the correct fieldset legend isPageHeading value', () => {
    expect(chemicalGroup.fieldset.legend.isPageHeading).toBe(true)
  })

  test('should have the correct fieldset legend classes', () => {
    expect(chemicalGroup.fieldset.legend.classes).toBe(
      'govuk-fieldset__legend--s'
    )
  })
})
