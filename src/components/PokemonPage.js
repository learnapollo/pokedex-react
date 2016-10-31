import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PokemonCard from './PokemonCard'

class PokemonPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired,
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    return (
      <div>
        <PokemonCard pokemon={this.props.data.Pokemon} />
      </div>
    )
  }
}

const pokemonQuery = gql`
  query pokemonQuery($id: ID!) {
    Pokemon(id: $id) {
      id
      imageUrl
      name
    }
  }
`

const PokemonPageWithQueries = graphql(pokemonQuery, {
  options: (ownProps) => ({
      variables: {
        id: ownProps.params.pokemonId
      }
    })
  }
)(withRouter(PokemonPage))

export default PokemonPageWithQueries
