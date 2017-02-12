import React from 'react'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router'
import gql from 'graphql-tag'
import styled from 'styled-components'

import PokemonPreview from '../components/PokemonPreview'
import AddPokemonPreview from '../components/AddPokemonPreview'
import PageNavigation from '../components/PageNavigation'

const POKEMONS_PER_PAGE = 3

const Title = styled.div`
  color: #7F7F7F;
  font-size: 32px;
  font-weight: 300;
`

class Pokedex extends React.Component {

  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      Trainer: React.PropTypes.object,
    }).isRequired,
    router: React.PropTypes.object.isRequired,
  }

  componentWillReceiveProps({ router, data: { Trainer }, params: { page } }) {
    if (!Trainer) {
      return
    }
    const pokemonCount = Trainer._ownedPokemonsMeta.count
    if ((!pokemonCount && !this._isFirstPage()) || isNaN(page) || pokemonCount < (page - 1) * POKEMONS_PER_PAGE || page < 1) {
      router.replace('/1')
    }
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
      return (<div>An unexpected error occured</div>)
    }

    return (
      <div className='w-100 bg-light-gray min-vh-100'>
        <Title className='tc pa5'>
          Hey {this.props.data.Trainer.name}, there are {this.props.data.Trainer._ownedPokemonsMeta.count} Pokemons in your pokedex
        </Title>
        <div className='flex flex-wrap justify-center center w-75'>
          {!this._isFirstPage() && <PageNavigation onClick={this._previousPage} isPrevious={true} />}
          {this.props.params.page === '1' && <AddPokemonPreview trainerId={this.props.data.Trainer.id} />}
          {this.props.data.Trainer.ownedPokemons.map((pokemon) =>
            <PokemonPreview key={pokemon.id} pokemon={pokemon} />
          )}
          {!this._isLastPage() && <PageNavigation onClick={this._nextPage} isPrevious={false} />}
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
        skip: (
          ownProps.params &&
          ownProps.params.page &&
          (ownProps.params.page - 1) * POKEMONS_PER_PAGE
        ) || 0,
        first: POKEMONS_PER_PAGE,
      },
      forceFetch: true,
    })
  }
)(withRouter(Pokedex))

export default PokedexWithData
