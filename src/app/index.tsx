import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'

import { App } from './app'
import { GlobalStyles, Reset, theme } from './styles'

const renderApp = (A: React.FC) => {
  ReactDOM.render(
    <>
      <Reset />
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <A />
      </ThemeProvider>
    </>,
    document.getElementById('root')
  )
}

renderApp(App)
