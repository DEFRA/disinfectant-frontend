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
      text: 'Foot and Mouth disease Orders'
    },
    {
      value: 'svdo',
      text: 'Swine Vesicular disease Orders'
    },
    {
      value: 'dpoa',
      text: 'Diseases of Poultry Order and the Avian Influenza and Influenza of Avian Origin in Mammals Order'
    },
    {
      value: 'to',
      text: 'Tuberculosis Orders'
    },
    {
      value: 'go',
      text: 'General Orders'
    }
  ]
}
