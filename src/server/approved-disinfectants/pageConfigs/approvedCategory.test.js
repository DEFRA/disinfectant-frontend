import { approvedCategories } from './approvedCategory.js'

describe('Approved Categories Page Configs', () => {
  test('should have the correct name', () => {
    expect(approvedCategories.name).toBe('chkApprovalCategories')
  })

  test('should have the correct classes', () => {
    expect(approvedCategories.classes).toBe('govuk-checkboxes--small')
  })

  test('should have isPageHeading set to true', () => {
    expect(approvedCategories.fieldset.legend.isPageHeading).toBe(true)
  })

  test('should have the correct fieldset legend classes', () => {
    expect(approvedCategories.fieldset.legend.classes).toBe(
      'govuk-fieldset__legend--s'
    )
  })
})
