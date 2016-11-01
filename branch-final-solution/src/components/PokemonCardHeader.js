import React from 'react'

export default class PokemonCardHeader extends React.Component {

  static propTypes = {
    trainer: React.PropTypes.object.isRequired,
  }

  render () {
    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
          <span className='w-100 pa3 mv2'>This is one of {this.props.trainer.ownedPokemons.length} pokemons of the trainer {this.props.trainer.name}</span>
        </div>
      </div>
    )
  }
}
