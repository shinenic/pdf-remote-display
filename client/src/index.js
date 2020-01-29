import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
import Search from './components/Search'
import Display from './components/Display'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter, Switch } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Search />
    </Switch>
  </BrowserRouter>
  , document.getElementById('root'))

serviceWorker.register()
