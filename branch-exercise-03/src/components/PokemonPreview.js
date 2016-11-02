import React from 'react'
import { Link } from 'react-router'

export default class PokemonPreview extends React.Component {

  static propTypes = {
    pokemon: React.PropTypes.object,
  }

  render () {
    return (
      <div className='dib mw4 tc black link dim ml1 mr1 mb2 bg-white pa2'>
        <div className='db'>
          <img src={this.props.pokemon.imageUrl} alt={this.props.pokemon.name} />
        </div>
        <span className='gray'>{this.props.pokemon.name}</span>
      </div>
    )
  }
}
