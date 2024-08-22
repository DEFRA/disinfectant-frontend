const accessibilityController = {
  handler: (request, h) => {
    return h.view('accessibility-statement/index', {
      pageTitle: 'Accessibility Statement',
      heading: 'Accessibility statement for www.gov.uk',
      breadcrumbs: [
        {
          text: 'Home',
          href: '/'
        },
        {
          text: 'Accessibility Statement'
        }
      ]
    })
  }
}

export { accessibilityController }
