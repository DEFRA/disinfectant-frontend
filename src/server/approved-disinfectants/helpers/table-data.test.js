/* eslint-disable no-console */
import { tableData } from './table-data.js'

const govUkBodySStyle = 'govuk-body-s'

describe('tableData', () => {
  test('should return table items with "No records found" when approvedDisinfectantList is empty', () => {
    const approvedDisinfectantList = []
    const result = tableData(approvedDisinfectantList)

    expect(result).toEqual([
      [
        { html: 'No records found', classes: govUkBodySStyle },
        { html: '', classes: govUkBodySStyle },
        { html: '', classes: govUkBodySStyle },
        { html: '', classes: govUkBodySStyle },
        { html: '', classes: govUkBodySStyle },
        { html: '', classes: govUkBodySStyle },
        { html: '', classes: govUkBodySStyle },
        { html: '', classes: govUkBodySStyle }
      ]
    ])
  })

  test('should handle errors and return default table items', () => {
    const approvedDisinfectantList = null // Simulating an error by passing null
    const result = tableData(approvedDisinfectantList)

    expect(result).toEqual([
      [
        { html: 'No records found', classes: govUkBodySStyle },
        { html: '', classes: govUkBodySStyle },
        { html: '', classes: govUkBodySStyle },
        { html: '', classes: govUkBodySStyle },
        { html: '', classes: govUkBodySStyle },
        { html: '', classes: govUkBodySStyle },
        { html: '', classes: govUkBodySStyle },
        { html: '', classes: govUkBodySStyle }
      ]
    ])
  })

  test('should create table data with json input', () => {
    const approvedDisinfectantList = [
      {
        '@odata.etag': 'W/"12830326"',
        chemicalGroups:
          'Biguanide; Other halogen; Quaternary Ammonium Compound (QAC), including Alkyldimethylbenzylammonium chloride (ADBAC) and Didecyldimethylammonium chloride (DDAC)',
        companyAddress:
          "1 Skiddaw Road,Croft Business Park,Bromborough' Wirral,CH62 3RB",
        companyName: 'ACOL_EditedVersion1',
        disInfectantName: 'Activ8 Hard Surface Disinfectants Cleaner',
        dop: '2 * ',
        dsf_approvalslistsiid: '52997e36-55e0-ee11-904c-0022481ae5f3',
        fmdo: '12 * ',
        go: '99 * ',
        svdo: '59 * ',
        tbo: 'Not approved'
      }
    ] // Simulating an error by passing null
    const result = tableData(approvedDisinfectantList)

    expect(result).toEqual([
      [
        {
          html: 'Activ8 Hard Surface Disinfectants Cleaner',
          classes: 'govuk-body-s'
        },
        {
          html: `ACOL_EditedVersion1 \n            <br><span class="govuk-secondary-text-colour"> \n            1 Skiddaw Road,Croft Business Park,Bromborough' Wirral,CH62 3RB \n            </span>`,
          classes: 'govuk-body-s'
        },
        {
          html: 'Biguanide; Other halogen; Quaternary Ammonium Compound (QAC), including Alkyldimethylbenzylammonium chloride (ADBAC) and Didecyldimethylammonium chloride (DDAC)',
          classes: 'govuk-body-s'
        },
        { html: '12 * ', classes: 'govuk-body-s' },
        { html: '59 * ', classes: 'govuk-body-s' },
        { html: '2 * ', classes: 'govuk-body-s' },
        { html: 'Not approved', classes: 'govuk-body-s' },
        { html: '99 * ', classes: 'govuk-body-s' }
      ]
    ])
  })

  test('should create table data with json input with address as null', () => {
    const approvedDisinfectantList = [
      {
        '@odata.etag': 'W/"12830326"',
        chemicalGroups:
          'Biguanide; Other halogen; Quaternary Ammonium Compound (QAC), including Alkyldimethylbenzylammonium chloride (ADBAC) and Didecyldimethylammonium chloride (DDAC)',
        companyAddress: null,
        companyName: 'ACOL_EditedVersion1',
        disInfectantName: 'Activ8 Hard Surface Disinfectants Cleaner',
        dop: '2 * ',
        dsf_approvalslistsiid: '52997e36-55e0-ee11-904c-0022481ae5f3',
        fmdo: '12 * ',
        go: '99 * ',
        svdo: '59 * ',
        tbo: 'Not approved'
      }
    ] // Simulating an error by passing null
    const result = tableData(approvedDisinfectantList)

    expect(result).toEqual([
      [
        {
          html: 'Activ8 Hard Surface Disinfectants Cleaner',
          classes: 'govuk-body-s'
        },
        {
          html: 'ACOL_EditedVersion1 \n            <br><span class="govuk-secondary-text-colour"> \n             \n            </span>',
          classes: 'govuk-body-s'
        },
        {
          html: 'Biguanide; Other halogen; Quaternary Ammonium Compound (QAC), including Alkyldimethylbenzylammonium chloride (ADBAC) and Didecyldimethylammonium chloride (DDAC)',
          classes: 'govuk-body-s'
        },
        { html: '12 * ', classes: 'govuk-body-s' },
        { html: '59 * ', classes: 'govuk-body-s' },
        { html: '2 * ', classes: 'govuk-body-s' },
        { html: 'Not approved', classes: 'govuk-body-s' },
        { html: '99 * ', classes: 'govuk-body-s' }
      ]
    ])
  })
})
