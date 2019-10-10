import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { App } from './app'

const renderApp = (A: React.FC) => {
  ReactDOM.render(
    <ThemeProvider theme={{}}>
      <Router>
        <A />
      </Router>
    </ThemeProvider>,
    document.getElementById('root')
  )
}

renderApp(App)
