import React from 'react'
import { Link } from 'react-router'

export default class PokemonPreview extends React.Component {

  static propTypes = {
    pokemon: React.PropTypes.object,
  }

  render () {
    return (
      <div className='link dim grow mw4 bg-white ma2 pa3 shadow-1'>
        <img src={this.props.pokemon.url} alt={this.props.pokemon.name} />
        <div className='gray tc'>{this.props.pokemon.name}</div>
      </div>
    )
  }
}
