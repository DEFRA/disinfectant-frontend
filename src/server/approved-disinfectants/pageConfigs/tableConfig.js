const className = 'govuk-body-s'
export const tableConfig = {
  // caption: "Dates and amounts",
  firstCellIsHeader: true,
  classes: 'app-table-layout-width thead-sticky',

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
