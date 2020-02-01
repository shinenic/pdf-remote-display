import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
import Home from './components/Home'
import Search from './components/Search'
import Viewer from './components/Viewer'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'

// const Home = () => {
//   return (
//     <>
//       <Link to="/">Home</Link>
//       <Link to="/display">Display</Link>
//       <Link to="/search">Search</Link>
//     </>
//   )
// }

ReactDOM.render(
  <BrowserRouter>
    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
    <Switch>
      <Route path="/viewer">
        <Viewer />
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

