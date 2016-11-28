import React from 'react'
import { Link } from 'react-router'

export default class AddPokemonPreview extends React.Component {

  static propTypes = {
    trainerId: React.PropTypes.string.isRequired,
  }

  render () {
    return (
      <Link
        to={`/create/${this.props.trainerId}`}
        style={{ minWidth: 200 }}
        className='link dim mw4 ma2 ba b--dashed bw3 b--silver flex justify-center items-center'
      >
        <div className='silver tc v-mid fw4 f1'>+</div>
      </Link>
    )
  }
}
