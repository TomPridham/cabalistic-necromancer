import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'

import { App } from './app'

const renderApp = (A: React.FC) => {
  ReactDOM.render(
    <ThemeProvider theme={{}}>
      <A />
    </ThemeProvider>,
    document.getElementById('root')
  )
}

renderApp(App)
