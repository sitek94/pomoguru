import './App.css'

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'

import Home from 'features/Home'
import SlackInstalation from 'features/SlackInstalation'
import Settings from 'features/Settings'

const Window = styled.main`
  background: var(--window-background);
  padding: 25px;
  border-radius: 24px;
  border: none;
`

function App () {
  return (
    <Router>
      <Window>
        <Switch>
          <Route path='/slack-installation'>
            <SlackInstalation />
          </Route>
          <Route path='/settings'>
            <Settings />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Window>
    </Router>
  )
}

export default App
