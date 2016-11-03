import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import PokemonCard from './PokemonCard'

class PokemonPage extends React.Component {

  static propTypes = {
    router: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired,
  }

  render () {
    return (
      <div>
        {this.props.params.pokemonId}
      </div>
    )
  }

  goBack = () => {
    this.props.router.replace('/')
  }
}

export default withRouter(PokemonPage)
