const className = 'govuk-body-s govuk-!-width-one-quarter'
export const tableConfig = {
  // caption: "Dates and amounts",
  firstCellIsHeader: true,
  // classes: 'govuk-table--small-text-until-tablet',

  head: [
    {
      text: 'Disinfectant name',
      classes: className
    },
    {
      text: 'Company name and address',
      classes: className
    },
    {
      text: 'Chemical group',
      classes: className
    },
    {
      text: 'Foot and Mouth Disease Orders (FMDO)',
      classes: className
    },
    {
      text: 'Swine Vesicular Disease Orders (SVDO)',
      classes: className
    },
    {
      text: 'Diseases of Poultry Order and the Avian Influenza and Influenza of Avian Origin in Mammals Order (DoP, AI & IAOM)',
      classes: className
    },
    {
      text: 'Tuberculosis Orders (TBO)',
      classes: className
    },
    {
      text: 'General Orders (GO)',
      classes: className
    }
  ]
}
