import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import PokemonPreview from '../components/PokemonPreview'

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
        <Title className='tc pa5'>
          Hey {this.props.data.Trainer.name}, there are 0 Pokemons in your pokedex
        </Title>
      </div>
    )
  }
}

const TrainerQuery = gql`query TrainerQuery {
  Trainer(name: "__NAME__") {
    name
  }
}`

const PokedexWithData = graphql(TrainerQuery)(Pokedex)

export default PokedexWithData
