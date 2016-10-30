import React from 'react'
import PokemonPreview from '../components/PokemonPreview'
import PlaceholderPreview from '../components/PlaceholderPreview'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Pokedex extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    return (
      <div className='w-100 flex justify-center'>
        <div className='w-100' style={{ maxWidth: 400 }}>
          Welcome to your Pokedex, {this.props.data.Trainer.name}!
        </div>
        <div>
          <PlaceholderPreview key={this.props.data.Trainer.id} trainerId={this.props.data.Trainer.id}/>
          {this.props.data.Trainer.ownedPokemons.map((pokemon) =>
            <PokemonPreview key={pokemon.id} pokemon={pokemon} />
          )}
        </div>
      </div>
    )
  }
}

const TrainerQuery = gql`query { Trainer(name: "Nilan") { id name ownedPokemons { id name imageUrl } } }`

const ListPageWithData = graphql(TrainerQuery, {options: { pollInterval: 1000 } })(Pokedex)

export default ListPageWithData
