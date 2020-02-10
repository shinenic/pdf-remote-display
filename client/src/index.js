import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
import Home from './components/Home'
import Search from './components/Search'
import Viewer from './components/viewer/Viewer'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/viewer">
        <Viewer />
      </Route>
      <Route path="/filelist">
        <Search />
      </Route>
      <Route path="/songlist">
        <Search />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </BrowserRouter>
  , document.getElementById('root'))

serviceWorker.register()

