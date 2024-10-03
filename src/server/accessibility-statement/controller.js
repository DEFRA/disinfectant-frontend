import { pageSummary } from './staticTexts/pageSummary.js'
import { externalLink } from './staticTexts/externalLink.js'

const accessibilityController = {
  handler: (_request, h) => {
    return h.view('accessibility-statement/index', {
      pageTitle: pageSummary.pageTitle,
      heading: pageSummary.pageHeader,
      pageSummary,
      externalLink,
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
