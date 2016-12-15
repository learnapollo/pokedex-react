import React from 'react'
import { propType } from 'graphql-anywhere'
import gql from 'graphql-tag'
import styled from 'styled-components'

const Button = styled.div`
  background-color: ${props => props.save ? '#2BC3A1' : ''};
  color: ${props => props.save ? 'white' : props.delete ? '#ba2626' : '#A3A3A3'};
  height: 48px;
  line-height: 1;
  font-size: 18px;
  padding: 15px 30px;
  cursor: pointer;
  font-weight: 300;
  border-radius: 4px
`

const Card = styled.div`
  background-color: white;
  box-shadow: 0 1px 11px 0 rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 20px;
`

export default class PokemonCard extends React.Component {

  static fragments = {
    pokemon: gql`
      fragment PokemonCardPokemon on Pokemon {
        url
        name
      }
    `
  }

  static propTypes = {
    pokemon: propType(PokemonCard.fragments.pokemon).isRequired,
    handleCancel: React.PropTypes.func.isRequired,
  }

  render () {
    return (
      <div className='w-100 pa4 flex justify-center'>
        <Card style={{ maxWidth: 400 }}>
          <input
            className='w-100 pa3 mv2'
            value={this.props.pokemon.name}
            placeholder='Name'
            readOnly={true}
          />
          <input
            className='w-100 pa3 mv2'
            value={this.props.pokemon.url}
            placeholder='Image Url'
            readOnly={true}
          />
          {this.props.pokemon.url &&
            <img src={this.props.pokemon.url} role='presentation' className='w-100 mv3 pa4' />
          }
          <div className='flex justify-between'>
            <Button onClick={this.props.handleCancel}>Cancel</Button>
          </div>
        </Card>
      </div>
    )
  }
}
