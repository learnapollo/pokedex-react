import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import PokemonPreview from '../components/PokemonPreview'
import PlaceholderPreview from '../components/PlaceholderPreview'

class Pokedex extends React.Component {

  static propTypes = {
    data: React.PropTypes.object.isRequired,
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    return (
      <div className='w-100 bg-light-gray min-vh-100'>
        <div className='tc pt4'>
          Hey {this.props.data.Trainer.name}, there are {this.props.data.Trainer.ownedPokemons.length} Pokemons in your pokedex
        </div>
        <div className='flex flex-wrap items-stretch pt5 center mw7'>
          {this.props.data.Trainer.ownedPokemons.map((pokemon) =>
            <PokemonPreview key={pokemon.id} pokemon={pokemon} />
          )}
          <PlaceholderPreview key={this.props.data.Trainer.id} trainerId={this.props.data.Trainer.id}/>
        </div>
      </div>
    )
  }
}

const TrainerQuery = gql`query($name: String!) {
  Trainer(name: $name) {
    id
    name
    ownedPokemons {
      id
      name
      imageUrl
    }
  }
}`

const PokedexWithData = graphql(TrainerQuery, {
  options: {
      variables: {
        name: "Nilan"
      }
    }
  }
)(Pokedex)

export default PokedexWithData
