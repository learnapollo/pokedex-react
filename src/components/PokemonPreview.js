import React from 'react'
import { Link } from 'react-router'

export default class PokemonPreview extends React.Component {

  static propTypes = {
    pokemon: React.PropTypes.object,
  }

  render () {
    return (
      <Link to={`/view/${this.props.pokemon.id}`}>
          <img src={this.props.pokemon.imageUrl} alt={this.props.pokemon.name} className='w-30' />
          {this.props.pokemon.name}
      </Link>
    )
  }
}
