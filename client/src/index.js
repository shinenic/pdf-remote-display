import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
import Search from './components/Search'
import Display from './components/Display'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'

const Home = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/display">Display</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
      </ul>
    </nav>
  )
}

ReactDOM.render(
  <BrowserRouter>
    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
    <Switch>
      <Route path="/display">
        <Display />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </BrowserRouter>
  , document.getElementById('root'))

serviceWorker.register()

