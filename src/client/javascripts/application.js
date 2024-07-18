import {
  createAll,
  Button,
  Checkboxes,
  ErrorSummary,
  Header,
  Radios,
  SkipLink,
  Accordion
} from 'govuk-frontend'
import $ from 'jquery'
import moj from '@ministryofjustice/frontend'

createAll(Button)
createAll(Checkboxes)
createAll(ErrorSummary)
createAll(Header)
createAll(Radios)
createAll(SkipLink)
createAll(Accordion)
window.$ = $
moj.initAll()
