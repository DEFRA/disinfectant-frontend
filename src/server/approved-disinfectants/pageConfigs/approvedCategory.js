export const approvedCategories = {
  name: 'approvedCategories',
  classes: 'govuk-checkboxes--small',
  fieldset: {
    legend: {
      text: 'Approved categories',
      isPageHeading: true,
      classes: 'govuk-fieldset__legend--s'
    }
  },
  items: [
    {
      value: 'fmdo',
      text: 'Foot and Mouth Disease Orders (FMDO)'
    },
    {
      value: 'svdo',
      text: 'Swine Vesicular Disease Orders (SVDO)'
    },
    {
      value: 'dpoa',
      text: 'Diseases of Poultry Order and the Avian Influenza and Influenza of Avian Origin in Mammals Order (DoP, AI & IAOM)'
    },
    {
      value: 'tbo',
      text: 'Tuberculosis Orders (TBO)'
    },
    {
      value: 'go',
      text: 'General Orders (GO)'
    }
  ]
}
