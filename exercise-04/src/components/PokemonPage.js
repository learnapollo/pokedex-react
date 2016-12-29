import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import PokemonCard from './PokemonCard'
import PokemonCardHeader from './PokemonCardHeader'

class PokemonPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      Pokemon: React.PropTypes.object,
    }).isRequired,
    router: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired,
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpexted error occurred</div>)
    }

    const pokemon = this.props.data.Pokemon

    return (
      <div>
        <PokemonCard pokemon={pokemon} handleCancel={this.goBack}/>
      </div>
    )
  }

  goBack = () => {
    this.props.router.replace('/')
  }
}

const PokemonQuery = gql`query PokemonQuery($id: ID!) {
    Pokemon(id: $id) {
      ... PokemonCardPokemon
    }
  }
  ${PokemonCard.fragments.pokemon}
`

const PokemonPageWithData = graphql(PokemonQuery, {
  options: (ownProps) => ({
      variables: {
        id: ownProps.params.pokemonId
      }
    })
  }
)(withRouter(PokemonPage))

export default PokemonPageWithData
