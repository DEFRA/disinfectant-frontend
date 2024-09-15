/**
 * Object containing static texts for the page summary.
 *
 * @typedef {Object} PageSummaryTexts
 * @property {string} pageTitle - The title of the page.
 * @property {string} pageHeader - The header of the page.
 * @property {string} disinfectantTableHowToReadText - The text explaining how to read the disinfectant table.
 * @property {string} disinfectantTableHowToReadLinkText - The text for the link explaining more about Defra-approved disinfectants.
 * @property {string} defraDisinfectantWhenAndHowText - The text for Defra-approved disinfectants.
 * @property {string} learnMoreAboutApprovalText - The text for learning more about the approval categories.
 * @property {string} approvalCategoriesHeader - The header for the approval categories section.
 * @property {string} relevantLawsText - The text explaining the relevant laws on disinfectant use.
 * @property {string} diseaseOfPoultryOrder - The text for the Diseases of Poultry (England) Order 2003.
 * @property {string} inText - The text "in".
 * @property {string} andText - The text "and".
 * @property {string} avianInfluenzaText - The text for Avian Influenza and Influenza of Avian Origin in Mammals (England) (No 2) Order 2006.
 * @property {string} swineDiseaseText - The text for The Diseases of Swine Regulations 2014.
 * @property {string} fmOrderText - The text for Foot and Mouth Disease (England) Order 2006.
 * @property {string} scotlandText - The text for Scotland.
 * @property {string} walesText - The text for Wales.
 * @property {string} tbOderText - The text for The Tuberculosis in Animals (England) Order 2021.
 * @property {string} generalOrderText - The text for a general order.
 * @property {string} notifiableDiseasesText - The text for notifiable diseases in animals.
 * @property {string} opensInNewWindowText - The text for "opens in a new tab".
 * @property {string} searchText - The text for the search input.
 * @property {string} searchHintText - The text for the search input hint.
 * @property {string} viewFilterText - The text for the view filter options.
 * @property {string} insetTextFirst - The first inset text.
 * @property {string} insetTextSecond - The second inset text.
 * @property {string} disinfectantEnquiryText - The text for disinfectant enquiries.
 * @property {string} publishedText - The text for "Published".
 * @property {string} lastUpdatedText - The text for "Last Updated".
 * @property {Object} filterPanelTitles - The titles for the filter panels.
 * @property {string} filterPanelTitles.approvalCategories - The title for the approval categories filter panel.
 * @property {string} filterPanelTitles.chemicalGroups - The title for the chemical groups filter panel.
 * @property {Object} countryList - The list of countries.
 * @property {string} countryList.england - The text for England.
 * @property {string} countryList.scotland - The text for Scotland.
 * @property {string} countryList.wales - The text for Wales.
 * @property {Object} england - The texts for England.
 * @property {string} england.dop - The text for Diseases of Poultry (England) Order 2003 (DoP).
 * @property {string} england.avian - The text for Avian Influenza and Influenza of Avian Origin in Mammals (England) (No 2) Order 2006 (AI & IAOM).
 * @property {string} england.swine - The text for The Diseases of Swine (England) Regulations 2014 (SVDO).
 * @property {string} england.fmdo - The text for Foot and Mouth Disease (England) Order 2006 (FMDO).
 * @property {string} england.tuber - The text for The Tuberculosis in Animals (England) Order 2021 (TBO).
 * @property {Object} scotland - The texts for Scotland.
 * @property {string} scotland.dop - The text for Diseases of Poultry (Scotland) Order 2003 (DoP).
 * @property {string} scotland.avian - The text for Avian Influenza and Influenza of Avian Origin in Mammals (Scotland) (No 2) Order 2006 (AI & IAOM).
 * @property {string} scotland.swine - The text for The Diseases of Swine (Scotland) Regulations 2014 (SVDO).
 * @property {string} scotland.fmdo - The text for Foot and Mouth Disease (Scotland) Order 2006 (FMDO).
 * @property {string} scotland.tuber - The text for The Tuberculosis in Animals (Scotland) Order 2021 (TBO).
 * @property {Object} wales - The texts for Wales.
 * @property {string} wales.dop - The text for Diseases of Poultry (Wales) Order 2003 (DoP).
 * @property {string} wales.avian - The text for Avian Influenza and Influenza of Avian Origin in Mammals (Wales) (No 2) Order 2006 (AI & IAOM).
 * @property {string} wales.swine - The text for The Diseases of Swine (Wales) Regulations 2014 (SVDO).
 * @property {string} wales.fmdo - The text for Foot and Mouth Disease (Wales) Order 2006 (FMDO).
 * @property {string} wales.tuber - The text for The Tuberculosis in Animals (Wales) Order 2021 (TBO).
 * @property {string} gotText - The text for a general order.
 */
export const pageSummaryTexts = {
  pageTitle: 'Approved Defra-approved disinfectants',
  pageHeader: 'Disinfectants approved for use in England, Scotland and Wales',
  disinfectantTableHowToReadText:
    'The table below displays approved disinfectant products and their approved dilution rates for statutory use. Read the guidance on',
  disinfectantTableHowToReadLinkText:
    'To find out when you must use a Defra-approved disinfectant, which product to use, and in what concentration, visit',
  defraDisinfectantWhenAndHowText: 'Defra-approved disinfectants',
  learnMoreAboutApprovalText: 'Learn more about the approval categories',
  approvalCategoriesHeader: 'Approval categories',
  relevantLawsText:
    'The relevant laws on disinfectant use are called disease orders. There are 4 specific disease orders for the following diseases:',
  diseaseOfPoultryOrder: 'Diseases of Poultry (England) Order 2003',
  inText: 'in',
  andText: 'and',
  avianInfluenzaText:
    'Avian Influenza and Influenza of Avian Origin in Mammals (England) (No 2) Order 2006',
  swineDiseaseText: 'The Diseases of Swine Regulations 2014',
  fmOrderText: 'Foot and Mouth Disease (England) Order 2006',
  scotlandText: 'Scotland',
  walesText: 'Wales',
  tbOderText: 'The Tuberculosis in Animals (England) Order 2021',
  generalOrderText:
    'A general order is issued to control an outbreak of notifiable disease not covered by FMDO, SVDO,DoP, TBO. For more information please see',
  notifiableDiseasesText: 'Notifiable diseases in animals',
  opensInNewWindowText: 'opens in a new tab',
  searchText: 'Search',
  searchHintText: 'Type disinfectant name to search',
  viewFilterText: 'View filter options',
  insetTextFirst: '* = Number of Millilitres To One Gram Disinfectant',
  insetTextSecond:
    'All other disinfectants are measured as Number of Parts Water To One Part Disinfectants.',
  disinfectantEnquiryText: 'Disinfectant enquiries',
  publishedText: 'Published',
  lastUpdatedText: 'Last Updated',
  filterPanelTitles: {
    approvalCategories: 'Approval categories',
    chemicalGroups: 'Chemical groups'
  },
  countryList: {
    england: 'England',
    scotland: 'Scotland',
    wales: 'Wales'
  },
  england: {
    dop: 'Diseases of Poultry (England) Order 2003 (DoP)',
    avian:
      'Avian Influenza and Influenza of Avian Origin in Mammals (England) (No 2) Order 2006 (AI & IAOM)',
    swine: 'The Diseases of Swine (England) Regulations 2014 (SVDO)',
    fmdo: 'Foot and Mouth Disease (England) Order 2006 (FMDO)',
    tuber: 'The Tuberculosis in Animals (England) Order 2021 (TBO)'
  },
  scotland: {
    dop: 'Diseases of Poultry (Scotland) Order 2003 (DoP)',
    avian:
      'Avian Influenza and Influenza of Avian Origin in Mammals (Scotland) (No 2) Order 2006 (AI & IAOM)',
    swine: 'The Diseases of Swine (Scotland) Regulations 2014 (SVDO)',
    fmdo: 'Foot and Mouth Disease (Scotland) Order 2006 (FMDO)',
    tuber: 'The Tuberculosis in Animals (Scotland) Order 2021 (TBO)'
  },
  wales: {
    dop: 'Diseases of Poultry (Wales) Order 2003 (DoP)',
    avian:
      'Avian Influenza and Influenza of Avian Origin in Mammals (Wales) (No 2) Order 2006 (AI & IAOM)',
    swine: 'The Diseases of Swine (Wales) Regulations 2014 (SVDO)',
    fmdo: 'Foot and Mouth Disease (Wales) Order 2006 (FMDO)',
    tuber: 'The Tuberculosis in Animals (Wales) Order 2021 (TBO)'
  },
  gotText:
    'A general order (GO) is issued to control an outbreak of notifiable disease not covered by FMDO, SVDO, DoP, TBO. For more information please see'
}
