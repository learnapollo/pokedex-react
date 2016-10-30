import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class AddPokemonCard extends React.Component {

  static propTypes = {
    router: React.PropTypes.object.isRequired,
    mutate: React.PropTypes.func.isRequired,
    params: React.PropTypes.object.isRequired,
  }

  state = {
    name: '',
    imageUrl: '',
  }

  render () {
    console.log(this.props)
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
          <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.handleCancel}>Cancel</button>
          {this.state.name && this.state.imageUrl &&
            <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.handleSave}>Save</button>
          }
        </div>
      </div>
    )
  }

  handleSave = () => {
    const {name, imageUrl} = this.state
    const trainerId = this.props.params.trainerId
    this.props.mutate({variables: {name, imageUrl, trainerId}})
      .then(() => {
        this.props.router.replace('/')
      })
  }

  handleCancel = () => {
    this.props.router.replace('/')
  }
}

const addMutation = gql`
  mutation ($name: String!, $imageUrl: String!, $trainerId: ID) {
    createPokemon(name: $name, imageUrl: $imageUrl, trainerId: $trainerId) {
      id
      trainer {
        id
      }
    }
  }
`

const PageWithMutation = graphql(addMutation)(withRouter(AddPokemonCard))

export default PageWithMutation
