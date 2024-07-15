export const utility = {
  pageIndexGenerator: (charA, charZ, currentState) => {
    const a = []
    const j = charZ.charCodeAt(0)
    if (currentState === 'view all')
      a.push({ number: 'view all', href: '#', current: true })
    else a.push({ number: 'view all', href: '#' })

    for (let i = charA.charCodeAt(0); i <= j; ++i) {
      if (currentState === String.fromCharCode(i))
        a.push({ number: String.fromCharCode(i), href: '#', current: true })
      else a.push({ number: String.fromCharCode(i), href: '' })
    }

    if (currentState === '0 to 9')
      a.push({ number: '0 to 9', href: '#', current: true })
    else a.push({ number: '0 to 9', href: '#' })

    return a
  },
  test: () => {}
}
