/**
 * A GDS styled example about page controller.
 * Provided as an example, remove or modify as required.
 */
// import { proxyFetch } from '~/src/server/common/helpers/proxy-fetch.js'
// import { config } from '~/src/config/index.js'
// import { appSpecificConstants } from '~/src/server/common/helpers/constants.js'
import { approvedCategories } from './pageConfigs/approvedCategory.js'
import { pageSummaryTexts } from './staticTexts/pageSummaryTexts.js'
import { chemicalGroup } from './pageConfigs/chemicalGroup.js'
import { utility } from '../common/utility.js'
import { tableConfig } from './pageConfigs/tableConfig.js'
import { externalLinks } from './staticTexts/externalLinks.js'

// const disAppConfig = config.get('disinfectant')
// const apiPath = disAppConfig.apiPath

const approvedDisinfectantController = {
  handler: async (request, h) => {
    const pagingConfig = {
      items: utility.pageIndexGenerator('A', 'Z', 'View all')
    }

    // #region Test
    //  const options = {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }

    //  response = await proxyFetch(`${apiPath}/mock-api/lookup`,options)

    // axios.get(`${apiPath}/mock-api/lookup`,options)
    // const response = await axios.get(`${apiPath}/mock-api/lookup`)

    // var t = response.data;
    // #endregion

    const productRows = [
      [
        {
          html: 'Advisal®',
          classes: 'govuk-body-s'
        },
        {
          html: 'Envisal GmbH <br><span class="govuk-secondary-text-colour" style="color: #505a5f;">Eulenbsuch 10a Reppenstedt Germany, 21391</span>',
          classes: 'govuk-body-s'
        },
        {
          html: 'Peracetic acid Not approved Formaldehyde',
          classes: 'govuk-body-s'
        },
        {
          html: 'Not approved',
          classes: 'govuk-body-s'
        },
        {
          html: '200',
          classes: 'govuk-body-s'
        },
        {
          html: '200',
          classes: 'govuk-body-s'
        },
        {
          html: '300',
          classes: 'govuk-body-s'
        },
        {
          html: 'Not approved',
          classes: 'govuk-body-s'
        }
      ],
      [
        {
          html: 'Advisal®',
          classes: 'govuk-body-s'
        },
        {
          html: 'Envisal GmbH <br><span class="govuk-secondary-text-colour" style="color: #505a5f;">Eulenbsuch 10a Reppenstedt Germany, 21391</span>',
          classes: 'govuk-body-s'
        },
        {
          html: 'Peracetic acid Not approved Formaldehyde',
          classes: 'govuk-body-s'
        },
        {
          html: 'Not approved',
          classes: 'govuk-body-s'
        },
        {
          html: '200',
          classes: 'govuk-body-s'
        },
        {
          html: '200',
          classes: 'govuk-body-s'
        },
        {
          html: '300',
          classes: 'govuk-body-s'
        },
        {
          html: 'Not approved',
          classes: 'govuk-body-s'
        }
      ],
      [
        {
          html: 'Advisal®',
          classes: 'govuk-body-s'
        },
        {
          html: 'Envisal GmbH <br><span class="govuk-secondary-text-colour" style="color: #505a5f;">Eulenbsuch 10a Reppenstedt Germany, 21391</span>',
          classes: 'govuk-body-s'
        },
        {
          html: 'Peracetic acid Not approved Formaldehyde',
          classes: 'govuk-body-s'
        },
        {
          html: 'Not approved',
          classes: 'govuk-body-s'
        },
        {
          html: '200',
          classes: 'govuk-body-s'
        },
        {
          html: '200',
          classes: 'govuk-body-s'
        },
        {
          html: '300',
          classes: 'govuk-body-s'
        },
        {
          html: 'Not approved',
          classes: 'govuk-body-s'
        }
      ],
      [
        {
          html: 'Advisal®',
          classes: 'govuk-body-s'
        },
        {
          html: 'Envisal GmbH <br><span class="govuk-secondary-text-colour" style="color: #505a5f;">Eulenbsuch 10a Reppenstedt Germany, 21391</span>',
          classes: 'govuk-body-s'
        },
        {
          html: 'Peracetic acid Not approved Formaldehyde',
          classes: 'govuk-body-s'
        },
        {
          html: 'Not approved',
          classes: 'govuk-body-s'
        },
        {
          html: '200',
          classes: 'govuk-body-s'
        },
        {
          html: '200',
          classes: 'govuk-body-s'
        },
        {
          html: '300',
          classes: 'govuk-body-s'
        },
        {
          html: 'Not approved',
          classes: 'govuk-body-s'
        }
      ],
      [
        {
          html: 'Advisal®',
          classes: 'govuk-body-s'
        },
        {
          html: 'Envisal GmbH <br><span class="govuk-secondary-text-colour" style="color: #505a5f;">Eulenbsuch 10a Reppenstedt Germany, 21391</span>',
          classes: 'govuk-body-s'
        },
        {
          html: 'Peracetic acid Not approved Formaldehyde',
          classes: 'govuk-body-s'
        },
        {
          html: 'Not approved',
          classes: 'govuk-body-s'
        },
        {
          html: '200',
          classes: 'govuk-body-s'
        },
        {
          html: '200',
          classes: 'govuk-body-s'
        },
        {
          html: '300',
          classes: 'govuk-body-s'
        },
        {
          html: 'Not approved',
          classes: 'govuk-body-s'
        }
      ],
      [
        {
          html: 'Advisal®',
          classes: 'govuk-body-s'
        },
        {
          html: 'Envisal GmbH <br><span class="govuk-secondary-text-colour" style="color: #505a5f;">Eulenbsuch 10a Reppenstedt Germany, 21391</span>',
          classes: 'govuk-body-s'
        },
        {
          html: 'Peracetic acid Not approved Formaldehyde',
          classes: 'govuk-body-s'
        },
        {
          html: 'Not approved',
          classes: 'govuk-body-s'
        },
        {
          html: '200',
          classes: 'govuk-body-s'
        },
        {
          html: '200',
          classes: 'govuk-body-s'
        },
        {
          html: '300',
          classes: 'govuk-body-s'
        },
        {
          html: 'Not approved',
          classes: 'govuk-body-s'
        }
      ],
      [
        {
          html: 'Advisal®',
          classes: 'govuk-body-s'
        },
        {
          html: 'Envisal GmbH <br><span class="govuk-secondary-text-colour" style="color: #505a5f;">Eulenbsuch 10a Reppenstedt Germany, 21391</span>',
          classes: 'govuk-body-s'
        },
        {
          html: 'Peracetic acid Not approved Formaldehyde',
          classes: 'govuk-body-s'
        },
        {
          html: 'Not approved',
          classes: 'govuk-body-s'
        },
        {
          html: '200',
          classes: 'govuk-body-s'
        },
        {
          html: '200',
          classes: 'govuk-body-s'
        },
        {
          html: '300',
          classes: 'govuk-body-s'
        },
        {
          html: 'Not approved',
          classes: 'govuk-body-s'
        }
      ],
      [
        {
          html: 'Advisal®',
          classes: 'govuk-body-s'
        },
        {
          html: 'Envisal GmbH <br><span class="govuk-secondary-text-colour" style="color: #505a5f;">Eulenbsuch 10a Reppenstedt Germany, 21391</span>',
          classes: 'govuk-body-s'
        },
        {
          html: 'Peracetic acid Not approved Formaldehyde',
          classes: 'govuk-body-s'
        },
        {
          html: 'Not approved',
          classes: 'govuk-body-s'
        },
        {
          html: '200',
          classes: 'govuk-body-s'
        },
        {
          html: '200',
          classes: 'govuk-body-s'
        },
        {
          html: '300',
          classes: 'govuk-body-s'
        },
        {
          html: 'Not approved',
          classes: 'govuk-body-s'
        }
      ],
      [
        {
          html: 'Advisal®',
          classes: 'govuk-body-s'
        },
        {
          html: 'Envisal GmbH <br><span class="govuk-secondary-text-colour" style="color: #505a5f;">Eulenbsuch 10a Reppenstedt Germany, 21391</span>',
          classes: 'govuk-body-s'
        },
        {
          html: 'Peracetic acid Not approved Formaldehyde',
          classes: 'govuk-body-s'
        },
        {
          html: 'Not approved',
          classes: 'govuk-body-s'
        },
        {
          html: '200',
          classes: 'govuk-body-s'
        },
        {
          html: '200',
          classes: 'govuk-body-s'
        },
        {
          html: '300',
          classes: 'govuk-body-s'
        },
        {
          html: 'Not approved',
          classes: 'govuk-body-s'
        }
      ],
      [
        {
          html: 'Advisal®',
          classes: 'govuk-body-s'
        },
        {
          html: 'Envisal GmbH <br><span class="govuk-secondary-text-colour" style="color: #505a5f;">Eulenbsuch 10a Reppenstedt Germany, 21391</span>',
          classes: 'govuk-body-s'
        },
        {
          html: 'Peracetic acid Not approved Formaldehyde',
          classes: 'govuk-body-s'
        },
        {
          html: 'Not approved',
          classes: 'govuk-body-s'
        },
        {
          html: '200',
          classes: 'govuk-body-s'
        },
        {
          html: '200',
          classes: 'govuk-body-s'
        },
        {
          html: '300',
          classes: 'govuk-body-s'
        },
        {
          html: 'Not approved',
          classes: 'govuk-body-s'
        }
      ]
      // [
      //   {
      //     colspan : 8,
      //     text: "No Results found"
      //   }
      // ]
    ]

    tableConfig.rows = productRows

    return h.view('approved-disinfectants/index', {
      pageTitle: pageSummaryTexts.pageTitle,
      heading: pageSummaryTexts.pageHeader,
      approvedCategories,
      chemicalGroup,
      pageSummaryTexts,
      pagingConfig,
      tableConfig,
      externalLinks,
      breadcrumbs: [
        {
          text: 'Home',
          href: externalLinks.homeLink
        },
        {
          text: 'Defra-approved disinfectants'
        }
      ]
    })
  }
}

export { approvedDisinfectantController }
