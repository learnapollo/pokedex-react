import React from 'react'
import ReactDOM from 'react-dom'
import Pokedex from './components/Pokedex'
import PokemonPage from './components/PokemonPage'
import { Router, Route, browserHistory } from 'react-router'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import 'tachyons'
import './index.css'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/ciuwgdxhn25po0151dv2imjad'}),
})

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route path='/' component={Pokedex} />
      <Route path='/view/:pokemonId' component={PokemonPage} />
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('root')
)
