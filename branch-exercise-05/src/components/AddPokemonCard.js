import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class AddPokemonCard extends React.Component {

  static propTypes = {
    router: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired,
  }

  state = {
    name: '',
    imageUrl: '',
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
          <div className='flex justify-between'>
            <button className='pa3 bn dim ttu pointer' onClick={this.handleCancel}>Cancel</button>
            {this.canSave()
              ? <button className='pa3 bn dim ttu bg-dark-green pointer' onClick={this.handleSave}>Save</button>
              : <button className='pa3 bn ttu gray light-gray'>Save</button>
            }
          </div>
        </div>
      </div>
    )
  }

  canSave = () => {
    return this.state.name && this.state.imageUrl
  }

  handleSave = () => {

  }

  handleCancel = () => {
    this.props.router.replace('/')
  }
}

export default withRouter(AddPokemonCard)
