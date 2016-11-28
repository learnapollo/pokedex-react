import React from 'react'
import ReactDOM from 'react-dom'
import Pokedex from './components/Pokedex'
import { Router, Route, browserHistory } from 'react-router'
import 'tachyons'
import './index.css'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={Pokedex} />
  </Router>
  ),
  document.getElementById('root')
)
