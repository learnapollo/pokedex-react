import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'

const Title = styled.div`
  color: #7F7F7F;
  font-size: 32px;
  font-weight: 300;
  max-width: 400px;
  margin-top: 50px;
`

export default class PokemonCardHeader extends React.Component {

  static propTypes = {
    pokemon: React.PropTypes.object.isRequired,
  }

  render () {
    return (
      <div className='w-100 flex justify-center'>
        <Title>{this.props.pokemon.name} owned by {this.props.pokemon.trainer.name}</Title>
      </div>
    )
  }
}
