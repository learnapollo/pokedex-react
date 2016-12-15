import React from 'react'
import { propType } from 'graphql-anywhere'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
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

class PokemonCard extends React.Component {

  static fragments = {
    pokemon: gql`
      fragment PokemonCardPokemon on Pokemon {
        id
        url
        name
      }
    `
  }

  static propTypes = {
    pokemon: propType(PokemonCard.fragments.pokemon).isRequired,
    handleCancel: React.PropTypes.func.isRequired,
    afterChange: React.PropTypes.func.isRequired,
    updatePokemon: React.PropTypes.func.isRequired,
    deletePokemon: React.PropTypes.func.isRequired,
  }

  state = {
    name: this.props.pokemon.name,
    url: this.props.pokemon.url,
  }

  render () {
    return (
      <div className='w-100 pa4 flex justify-center'>
        <Card style={{ maxWidth: 400 }}>
          <input
            className='w-100 pa3 mv2'
            value={this.state.name}
            placeholder='Name'
            onChange={(e) => this.setState({name: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            value={this.state.url}
            placeholder='Image Url'
            onChange={(e) => this.setState({url: e.target.value})}
          />
          {this.state.url &&
            <img src={this.state.url} role='presentation' className='w-100 mv3 pa4' />
          }
          <div className='flex justify-between'>
            <Button delete onClick={this.handleDelete}>Delete</Button>
            <Button onClick={this.props.handleCancel}>Cancel</Button>
            {this.canUpdate()
              ? <Button save onClick={this.handleUpdate}>Update</Button>
              : <Button disabled>Update</Button>
            }
          </div>
        </Card>
      </div>
    )
  }

  canUpdate = () => {
    return this.state.name && this.state.url &&
      (this.props.pokemon.name !== this.state.name || this.props.pokemon.url !== this.state.url)
  }

  handleUpdate = () => {
    this.props.updatePokemon({variables: { id: this.props.pokemon.id, name: this.state.name, url: this.state.url }})
      .then(this.props.afterChange)
  }

  handleDelete = () => {
    this.props.deletePokemon({variables: { id: this.props.pokemon.id }})
      .then(this.props.afterChange)
  }
}

const updatePokemon = gql`
  mutation updatePokemon($id: ID!, $name: String!, $url: String!) {
    updatePokemon(id: $id, name: $name, url: $url) {
      id
      ... PokemonCardPokemon
    }
  }
  ${PokemonCard.fragments.pokemon}
`

const deletePokemon = gql`
  mutation deletePokemon($id: ID!) {
    deletePokemon(id: $id) {
      id
    }
  }
`

const PokemonCardWithMutations =  graphql(deletePokemon, {name : 'deletePokemon'})(
  graphql(updatePokemon, {name: 'updatePokemon'})(PokemonCard)
)

export default PokemonCardWithMutations
