import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router'

class PokemonCard extends React.Component {

  static propTypes = {
    deletePokemon: React.PropTypes.func.isRequired,
    updatePokemon: React.PropTypes.func.isRequired,
    pokemon: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
  }

  state = {
    name: this.props.pokemon.name,
    imageUrl: this.props.pokemon.imageUrl,
  }

  render () {
    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
          <input
            className='w-100 pa3 mv2'
            value={this.state.name}
            placeholder='Name'
            onChange={(e) => this.setState({name: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            value={this.state.imageUrl}
            placeholder='Image Url'
            onChange={(e) => this.setState({imageUrl: e.target.value})}
          />
          {this.state.imageUrl &&
            <img src={this.state.imageUrl} role='presentation' className='w-100 mv3' />
          }
          <button className='pa3 red bn dim ttu pointer' onClick={this.handleDelete}>Delete</button>
          <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.handleCancel}>Cancel</button>
          {this.state.name && this.state.imageUrl &&
            <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.handleUpdate}>Update</button>
          }
        </div>
      </div>
    )
  }

  handleUpdate = () => {
    this.props.updatePokemon({variables: {id: this.props.pokemon.id, name: this.state.name, imageUrl: this.state.imageUrl}})
      .then(this.goBack)
  }

  handleDelete = () => {
    this.props.deletePokemon({variables: {id: this.props.pokemon.id}})
      .then(this.goBack)
  }

  handleCancel = () => {
    this.goBack()
  }

  goBack = () => {
    this.props.router.replace('/')
  }
}

const updatePokemon = gql`
  mutation updatePokemon($id: ID!, $name: String!, $imageUrl: String!) {
    updatePokemon(id: $id, name: $name, imageUrl: $imageUrl) {
      id
    }
  }
`

const deletePokemon = gql`
  mutation deletePokemon($id: ID!) {
    deletePokemon(id: $id) {
      id
    }
  }
`

const PokemonCardWithMutations =  graphql(deletePokemon, {name : 'deletePokemon'})(
  graphql(updatePokemon, {name: 'updatePokemon'})(withRouter(PokemonCard))
)


export default PokemonCardWithMutations
