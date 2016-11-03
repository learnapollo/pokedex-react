import React from 'react'

export default class PokemonCard extends React.Component {

  static propTypes = {
    pokemon: React.PropTypes.object.isRequired,
    handleCancel: React.PropTypes.func.isRequired,
  }

  render () {
    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
          <input
            className='w-100 pa3 mv2'
            value={this.props.pokemon.name}
            placeholder='Name'
            readOnly={true}
          />
          <input
            className='w-100 pa3 mv2'
            value={this.props.pokemon.imageUrl}
            placeholder='Image Url'
            readOnly={true}
          />
          {this.props.pokemon.imageUrl &&
            <img src={this.props.pokemon.imageUrl} role='presentation' className='w-100 mv3' />
          }
          <div className='flex justify-between'>
            <button className='pa3 bn dim ttu pointer' onClick={this.props.handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}
