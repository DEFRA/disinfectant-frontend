/* eslint-disable no-console */
import { tableData } from './table-data.js'

describe('tableData', () => {
  test('should return table items with "No records found" when approvedDisinfectantList is empty', () => {
    const approvedDisinfectantList = []
    const result = tableData(approvedDisinfectantList)

    expect(result).toEqual([
      [
        { html: 'No records found', classes: 'govuk-body-s' },
        { html: '', classes: 'govuk-body-s' },
        { html: '', classes: 'govuk-body-s' },
        { html: '', classes: 'govuk-body-s' },
        { html: '', classes: 'govuk-body-s' },
        { html: '', classes: 'govuk-body-s' },
        { html: '', classes: 'govuk-body-s' },
        { html: '', classes: 'govuk-body-s' }
      ]
    ])
  })

  test('should handle errors and return default table items', () => {
    const approvedDisinfectantList = null // Simulating an error by passing null
    const result = tableData(approvedDisinfectantList)

    expect(result).toEqual([
      [
        { html: 'No records found', classes: 'govuk-body-s' },
        { html: '', classes: 'govuk-body-s' },
        { html: '', classes: 'govuk-body-s' },
        { html: '', classes: 'govuk-body-s' },
        { html: '', classes: 'govuk-body-s' },
        { html: '', classes: 'govuk-body-s' },
        { html: '', classes: 'govuk-body-s' },
        { html: '', classes: 'govuk-body-s' }
      ]
    ])
  })
})
