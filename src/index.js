import React from 'react'
import ReactDOM from 'react-dom'
import Pokedex from './components/Pokedex'
import AddPokemonCard from './components/AddPokemonCard'
import PokemonPage from './components/PokemonPage'
import { Router, Route, browserHistory } from 'react-router'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import 'tachyons'
import './index.css'

const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/ciuwgdxhn25po0151dv2imjad'})

const client = new ApolloClient({ networkInterface })

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route path='/' component={Pokedex} />
      <Route path='/view/:pokemonId' component={PokemonPage} />
      <Route path='/create/:trainerId' component={AddPokemonCard} />
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('root')
)
