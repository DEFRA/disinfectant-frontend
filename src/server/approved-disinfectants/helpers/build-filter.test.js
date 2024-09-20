/* eslint-disable no-console */
import { buildFilter } from './build-filter.js'

describe('buildFilter', () => {
  test('should return the correct filter object', () => {
    const searchPayload = {
      chkChemicalGroup: ['group1', 'group2'],
      chkApprovalCategories: ['fmdo', 'svdo', 'dop', 'tbo', 'go']
    }
    const clearValue = 'group1'
    const startsWith = 'A'

    const result = buildFilter(searchPayload, startsWith, clearValue)

    expect(result.chemGroupSelected).toEqual(['group2'])
    expect(result.approvalCatSelected).toEqual([
      'fmdo',
      'svdo',
      'dop',
      'tbo',
      'go'
    ])
    expect(result.filterToBeCreated).toBe(true)
    expect(result.clearAllLink).toBe('?startwith=A&clear=all#tableDisinfectant')
    expect(result.filterCategories).toEqual([
      {
        heading: {
          text: 'Approval categories'
        },
        items: [
          {
            text: 'Foot and Mouth Disease Orders (FMDO)',
            href: '?startwith=A&clear=fmdo#tableDisinfectant'
          },
          {
            text: 'Swine Vesicular Disease Orders (SVDO)',
            href: '?startwith=A&clear=svdo#tableDisinfectant'
          },
          {
            text: 'Diseases of Poultry Order and the Avian Influenza and Influenza of Avian Origin in Mammals Order (DoP, AI & IAOM)',
            href: '?startwith=A&clear=dop#tableDisinfectant'
          },
          {
            text: 'Tuberculosis Orders (TBO)',
            href: '?startwith=A&clear=tbo#tableDisinfectant'
          },
          {
            text: 'General Orders (GO)',
            href: '?startwith=A&clear=go#tableDisinfectant'
          }
        ]
      },
      {
        heading: {
          text: 'Chemical groups'
        },
        items: [
          {
            text: 'group2',
            href: '?startwith=A&clear=group2#tableDisinfectant'
          }
        ]
      }
    ])
  })

  test('should return the correct filter objects for data', async () => {
    const searchPayload = {
      chkChemicalGroup: 'group1',
      chkApprovalCategories: ['fmdo', 'svdo', 'dop', 'tbo', 'go']
    }
    const clearValue = 'group2'
    const startsWith = 'A'

    const result = await buildFilter(searchPayload, startsWith, clearValue)

    expect(result.chemGroupSelected).toEqual('group1')
    expect(result.approvalCatSelected).toEqual([
      'fmdo',
      'svdo',
      'dop',
      'tbo',
      'go'
    ])
    expect(result.filterToBeCreated).toBe(true)
    expect(result.clearAllLink).toBe('?startwith=A&clear=all#tableDisinfectant')
  })

  test('should return the correct filter objects for ApprovalCategorySelectedIsNotAnArray', async () => {
    const searchPayload = {
      chkChemicalGroup: 'group1',
      chkApprovalCategories: 'fmdo'
    }
    const clearValue = 'group2'
    const startsWith = 'A'

    const result = await buildFilter(searchPayload, startsWith, clearValue)

    expect(result.chemGroupSelected).toEqual('group1')
    expect(result.approvalCatSelected).toEqual('fmdo')
    expect(result.filterToBeCreated).toBe(true)
    expect(result.clearAllLink).toBe('?startwith=A&clear=all#tableDisinfectant')
  })

  test('should return the correct filter object when clearValue is "all"', () => {
    const searchPayload = {
      chkChemicalGroup: ['group1', 'group2'],
      chkApprovalCategories: ['fmdo', 'svdo', 'dop', 'tbo', 'go']
    }
    const clearValue = 'all'
    const startsWith = 'A'

    const result = buildFilter(searchPayload, startsWith, clearValue)

    expect(result.chemGroupSelected).toEqual([])
    expect(result.approvalCatSelected).toEqual([])
    expect(result.filterToBeCreated).toBe(false)
    expect(result.clearAllLink).toBe('?startwith=A&clear=all#tableDisinfectant')
    expect(result.filterCategories).toEqual([])
  })

  test('should return the correct filter object when clearValue is not provided', () => {
    const searchPayload = {
      chkChemicalGroup: ['group1', 'group2'],
      chkApprovalCategories: ['fmdo', 'svdo', 'dop', 'tbo', 'go']
    }
    const startsWith = 'A'

    const result = buildFilter(searchPayload, startsWith)

    expect(result.chemGroupSelected).toEqual(['group1', 'group2'])
    expect(result.approvalCatSelected).toEqual([
      'fmdo',
      'svdo',
      'dop',
      'tbo',
      'go'
    ])
    expect(result.filterToBeCreated).toBe(true)
    expect(result.clearAllLink).toBe('?startwith=A&clear=all#tableDisinfectant')
    expect(result.filterCategories).toEqual([
      {
        heading: {
          text: 'Approval categories'
        },
        items: [
          {
            text: 'Foot and Mouth Disease Orders (FMDO)',
            href: '?startwith=A&clear=fmdo#tableDisinfectant'
          },
          {
            text: 'Swine Vesicular Disease Orders (SVDO)',
            href: '?startwith=A&clear=svdo#tableDisinfectant'
          },
          {
            text: 'Diseases of Poultry Order and the Avian Influenza and Influenza of Avian Origin in Mammals Order (DoP, AI & IAOM)',
            href: '?startwith=A&clear=dop#tableDisinfectant'
          },
          {
            text: 'Tuberculosis Orders (TBO)',
            href: '?startwith=A&clear=tbo#tableDisinfectant'
          },
          {
            text: 'General Orders (GO)',
            href: '?startwith=A&clear=go#tableDisinfectant'
          }
        ]
      },
      {
        heading: {
          text: 'Chemical groups'
        },
        items: [
          {
            text: 'group1',
            href: '?startwith=A&clear=group1#tableDisinfectant'
          },
          {
            text: 'group2',
            href: '?startwith=A&clear=group2#tableDisinfectant'
          }
        ]
      }
    ])
  })

  test('should return the correct filter object when startsWith is not provided', () => {
    const searchPayload = {
      chkChemicalGroup: ['group1', 'group2'],
      chkApprovalCategories: ['fmdo', 'svdo', 'dop', 'tbo', 'go']
    }
    const clearValue = 'group1'

    const result = buildFilter(searchPayload, undefined, clearValue)

    expect(result.chemGroupSelected).toEqual(['group2'])
    expect(result.approvalCatSelected).toEqual([
      'fmdo',
      'svdo',
      'dop',
      'tbo',
      'go'
    ])
    expect(result.filterToBeCreated).toBe(true)
    expect(result.clearAllLink).toBe('?clear=all')
    expect(result.filterCategories).toEqual([
      {
        heading: {
          text: 'Approval categories'
        },
        items: [
          {
            text: 'Foot and Mouth Disease Orders (FMDO)',
            href: '?clear=fmdo#tableDisinfectant'
          },
          {
            text: 'Swine Vesicular Disease Orders (SVDO)',
            href: '?clear=svdo#tableDisinfectant'
          },
          {
            text: 'Diseases of Poultry Order and the Avian Influenza and Influenza of Avian Origin in Mammals Order (DoP, AI & IAOM)',
            href: '?clear=dop#tableDisinfectant'
          },
          {
            text: 'Tuberculosis Orders (TBO)',
            href: '?clear=tbo#tableDisinfectant'
          },
          {
            text: 'General Orders (GO)',
            href: '?clear=go#tableDisinfectant'
          }
        ]
      },
      {
        heading: {
          text: 'Chemical groups'
        },
        items: [
          {
            text: 'group2',
            href: '?clear=group2#tableDisinfectant'
          }
        ]
      }
    ])
  })

  test('should return the correct filter object when startsWith and clearValue are not provided', () => {
    const searchPayload = {
      chkChemicalGroup: ['group1', 'group2'],
      chkApprovalCategories: ['fmdo', 'svdo', 'dop', 'tbo', 'go']
    }

    const result = buildFilter(searchPayload)

    expect(result.chemGroupSelected).toEqual(['group1', 'group2'])
    expect(result.approvalCatSelected).toEqual([
      'fmdo',
      'svdo',
      'dop',
      'tbo',
      'go'
    ])
    expect(result.filterToBeCreated).toBe(true)
    expect(result.clearAllLink).toBe('?clear=all')
    expect(result.filterCategories).toEqual([
      {
        heading: {
          text: 'Approval categories'
        },
        items: [
          {
            text: 'Foot and Mouth Disease Orders (FMDO)',
            href: '?clear=fmdo#tableDisinfectant'
          },
          {
            text: 'Swine Vesicular Disease Orders (SVDO)',
            href: '?clear=svdo#tableDisinfectant'
          },
          {
            text: 'Diseases of Poultry Order and the Avian Influenza and Influenza of Avian Origin in Mammals Order (DoP, AI & IAOM)',
            href: '?clear=dop#tableDisinfectant'
          },
          {
            text: 'Tuberculosis Orders (TBO)',
            href: '?clear=tbo#tableDisinfectant'
          },
          {
            text: 'General Orders (GO)',
            href: '?clear=go#tableDisinfectant'
          }
        ]
      },
      {
        heading: {
          text: 'Chemical groups'
        },
        items: [
          {
            text: 'group1',
            href: '?clear=group1#tableDisinfectant'
          },
          {
            text: 'group2',
            href: '?clear=group2#tableDisinfectant'
          }
        ]
      }
    ])
  })
})
