/**
 * Utility object containing helper functions.
 *
 * @typedef {Object} utility
 * @property {Function} pageIndexGenerator - Generates an array of page index objects.
 * @property {Function} test - Placeholder function for testing purposes.
 */
export const utility = {
  pageIndexGenerator: (charA, charZ, currentState) => {
    const defaultValue = 'View all'
    const items = []
    const j = charZ.charCodeAt(0)
    const numberRange = '0 to 9'
    const redirectionURL = '?startwith='
    const sectionId = '#tableDisinfectant'
    // const sectionId = ''
    let current = false
    currentState = currentState.trim() === '' ? defaultValue : currentState
    // currentState = currentState.trim() === '' ? 'A' : currentState

    if (currentState === defaultValue) current = true
    items.push({
      number: defaultValue,
      href: `${redirectionURL}${defaultValue}${sectionId}`,
      current: current
    })
    current = false

    for (let i = charA.charCodeAt(0); i <= j; ++i) {
      if (currentState === String.fromCharCode(i)) current = true
      items.push({
        number: String.fromCharCode(i),
        href: `${redirectionURL}${String.fromCharCode(i)}${sectionId}`,
        current: current
      })
      current = false
    }
    if (currentState === numberRange) current = true
    items.push({
      number: numberRange,
      href: `${redirectionURL}${numberRange}${sectionId}`,
      current: current
    })

    return items
  },
  test: () => {}
}
