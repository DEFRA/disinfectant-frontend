export const utility = {
  pageIndexGenerator: (charA, charZ, currentState) => {
    const a = []
    const j = charZ.charCodeAt(0)
    const viewAll = 'View all'
    const numberRange = '0 to 9'
    if (currentState === viewAll)
      a.push({ number: viewAll, href: '#', current: true })
    else a.push({ number: viewAll, href: '#' })

    for (let i = charA.charCodeAt(0); i <= j; ++i) {
      if (currentState === String.fromCharCode(i))
        a.push({ number: String.fromCharCode(i), href: '#', current: true })
      else a.push({ number: String.fromCharCode(i), href: '' })
    }

    if (currentState === numberRange)
      a.push({ number: numberRange, href: '#', current: true })
    else a.push({ number: numberRange, href: '#' })

    return a
  },
  test: () => {}
}
