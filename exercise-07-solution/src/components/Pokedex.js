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
    if (this.props.data.Trainer._ownedPokemonsMeta.count > this.props.params.page * POKEMONS_PER_PAGE) {
      this.props.router.replace(`/${+this.props.params.page + 1}`)
    } else {
      console.log('last page')
    }
  }

  _previousPage = () => {
    if (this.props.params.page > 1) {
      this.props.router.replace(`/${+this.props.params.page - 1}`)
    } else {
      console.log('first page')
    }
  }

  render () {
    debugger

    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    debugger

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpexted error occured</div>)
    }

    if (isNaN(this.props.params.page) || this.props.data.Trainer._ownedPokemonsMeta.count < (+this.props.params.page - 1) * POKEMONS_PER_PAGE) {
      this.props.router.replace('/')
    }

    return (
      <div className='w-100 bg-light-gray min-vh-100'>
        <div className='tc pa5'>
          Hey {this.props.data.Trainer.name}, there are {this.props.data.Trainer._ownedPokemonsMeta.count} Pokemons in your pokedex
        </div>
        <div className='flex flex-wrap justify-center center w-75'>
          <PageNavigation onClick={this._previousPage} isPrevious={true} />
          {this.props.params.page === '1' && <AddPokemonPreview trainerId={this.props.data.Trainer.id} />}
          {this.props.data.Trainer.ownedPokemons.map((pokemon) =>
            <PokemonPreview key={pokemon.id} pokemon={pokemon} />
          )}
          <PageNavigation onClick={this._nextPage} isPrevious={false} />
        </div>
      </div>
    )
  }
}

const TrainerQuery = gql`query TrainerQuery($name: String!, $first: Int!, $skip: Int!) {
  Trainer(name: $name) {
    id
    name
    ownedPokemons(first: $first, skip: $skip) {
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
        skip: (ownProps.params.page - 1) * POKEMONS_PER_PAGE,
        first: POKEMONS_PER_PAGE,
      }
    })
  }
)(withRouter(Pokedex))

export default PokedexWithData
