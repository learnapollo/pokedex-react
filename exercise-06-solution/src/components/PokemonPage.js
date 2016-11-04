import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import PokemonCard from './PokemonCard'
import PokemonCardHeader from './PokemonCardHeader'

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

    const pokemon = this.props.data.Pokemon

    return (
      <div>
        <PokemonCardHeader pokemon={PokemonCardHeader.fragments.pokemon.filter(pokemon)} />
        <PokemonCard
          pokemon={PokemonCard.fragments.pokemon.filter(pokemon)}
          handleCancel={this.goBack}
          afterChange={this.goBack} />
      </div>
    )
  }

  goBack = () => {
    this.props.router.replace('/')
  }
}

const PokemonQuery = gql`query($id: ID!) {
    Pokemon(id: $id) {
      ... PokemonCardPokemon
      ... PokemonCardHeaderPokemon
    }
  }
`

const PokemonPageWithData = graphql(PokemonQuery, {
  options: (ownProps) => ({
      variables: {
        id: ownProps.params.pokemonId
      },
      fragments: [PokemonCardHeader.fragments.pokemon.fragments(), PokemonCard.fragments.pokemon.fragments()]
    })
  }
)(withRouter(PokemonPage))

export default PokemonPageWithData
