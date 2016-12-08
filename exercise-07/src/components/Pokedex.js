import React from 'react'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router'
import gql from 'graphql-tag'

import PokemonPreview from '../components/PokemonPreview'
import AddPokemonPreview from '../components/AddPokemonPreview'
import PageNavigation from '../components/PageNavigation'

const POKEMONS_PER_PAGE = 3

class Pokedex extends React.Component {

  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      Trainer: React.PropTypes.object,
    }).isRequired,
    router: React.PropTypes.object.isRequired,
  }

  _nextPage = () => {
    this.props.router.replace(`/${+this.props.params.page + 1}`)
  }

  _previousPage = () => {
    this.props.router.replace(`/${+this.props.params.page - 1}`)
  }

  _isFirstPage = () => {
    return this.props.params.page === '1'
  }

  _isLastPage = () => {
    return this.props.data.Trainer._ownedPokemonsMeta.count <= this.props.params.page * POKEMONS_PER_PAGE
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpexted error occured</div>)
    }

    return (
      <div className='w-100 bg-light-gray min-vh-100'>
        <div className='tc pa5'>
          Hey {this.props.data.Trainer.name}, there are {this.props.data.Trainer.ownedPokemons.length} Pokemons in your pokedex
        </div>
        <div className='flex flex-wrap justify-center center w-75'>
          {this._isFirstPage() && <AddPokemonPreview trainerId={this.props.data.Trainer.id} />}
          {this.props.data.Trainer.ownedPokemons.map((pokemon) =>
            <PokemonPreview key={pokemon.id} pokemon={pokemon} />
          )}
        </div>
      </div>
    )
  }
}

const TrainerQuery = gql`query TrainerQuery($name: String!) {
  Trainer(name: $name) {
    id
    name
    ownedPokemons {
      id
      name
      url
    }
    _ownedPokemonsMeta {
      count
    }
  }
}`

const PokedexWithData = graphql(TrainerQuery, {
    options: (ownProps) => ({
      variables: {
        name: '__NAME__',
      }
      },
      forceFetch: true,
    })
  }
)(withRouter(Pokedex))

export default PokedexWithData
