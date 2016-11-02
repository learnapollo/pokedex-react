import React from 'react'
import gql from 'graphql-tag'

export default class PokemonCardHeader extends React.Component {

  static propTypes = {
    pokemon: React.PropTypes.object.isRequired,
  }

  render () {
    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
          <span className='w-100 pa3 mv2'>{this.props.pokemon.name} owned by {this.props.pokemon.trainer.name}</span>
        </div>
      </div>
    )
  }
}
