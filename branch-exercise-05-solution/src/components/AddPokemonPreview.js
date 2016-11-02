import React from 'react'
import { Link } from 'react-router'

export default class AddPokemonPreview extends React.Component {

  static propTypes = {
    trainerId: React.PropTypes.string.isRequired,
  }

  render () {
    return (
      <Link to={`/create/${this.props.trainerId}`} className='dib mw4 tc black link dim mr1 ml1 mb2 bg-white pa2'>
        <div className='db'>
          <span>+</span>
        </div>
        <span>Add Pokemon</span>
      </Link>
    )
  }
}
